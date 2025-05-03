import { Router, Request, Response } from 'express';
import { pool } from '../db';
import { authenticateToken } from '../middleware/auth';
import { Location, ProjectProgress, ScannedLocation } from '../types';

const router = Router();

// Get locations for a project
router.get('/project/:projectId', async (req: Request, res: Response) => {
  try {
    const result = await pool.query<Location>(
      'SELECT * FROM locations WHERE project_id = $1 ORDER BY grid_position_y, grid_position_x',
      [req.params.projectId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Create new location
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  const {
    project_id,
    title,
    description,
    address,
    latitude,
    longitude,
    grid_position_x,
    grid_position_y,
    qr_code_data
  } = req.body;

  try {
    // Verify project ownership
    const projectResult = await pool.query(
      'SELECT owner_id FROM projects WHERE id = $1',
      [project_id]
    );

    if (projectResult.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (projectResult.rows[0].owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const result = await pool.query<Location>(
      `INSERT INTO locations (
        project_id, title, description, address, latitude, longitude,
        grid_position_x, grid_position_y, qr_code_data
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [project_id, title, description, address, latitude, longitude,
       grid_position_x, grid_position_y, qr_code_data]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Record QR code scan
router.post('/scan', authenticateToken, async (req: Request, res: Response) => {
  const { qr_code_data } = req.body;

  try {
    // Find location by QR code
    const locationResult = await pool.query<Location>(
      'SELECT * FROM locations WHERE qr_code_data = $1',
      [qr_code_data]
    );

    if (locationResult.rows.length === 0) {
      return res.status(404).json({ error: 'Invalid QR code' });
    }

    const location = locationResult.rows[0];

    // Get or create progress record
    const progressResult = await pool.query<ProjectProgress>(
      `INSERT INTO project_progress (user_id, project_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, project_id) DO UPDATE
       SET updated_at = NOW()
       RETURNING *`,
      [req.user.id, location.project_id]
    );

    // Record scanned location
    await pool.query<ScannedLocation>(
      `INSERT INTO scanned_locations (progress_id, location_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [progressResult.rows[0].id, location.id]
    );

    // Check completion status
    const scannedCount = await pool.query<{ count: string }>(
      'SELECT COUNT(*) FROM scanned_locations WHERE progress_id = $1',
      [progressResult.rows[0].id]
    );

    const totalLocations = await pool.query<{ count: string }>(
      'SELECT COUNT(*) FROM locations WHERE project_id = $1',
      [location.project_id]
    );

    const isComplete = parseInt(scannedCount.rows[0].count) === parseInt(totalLocations.rows[0].count);

    if (isComplete) {
      await pool.query(
        'UPDATE project_progress SET completion_status = true WHERE id = $1',
        [progressResult.rows[0].id]
      );
    }

    res.json({
      success: true,
      location,
      isComplete,
      progress: {
        collected: parseInt(scannedCount.rows[0].count),
        total: parseInt(totalLocations.rows[0].count)
      }
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;