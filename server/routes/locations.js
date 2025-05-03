const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const { authenticateToken } = require('../middleware/auth');

// Get locations for a project
router.get('/project/:projectId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM locations WHERE project_id = $1 ORDER BY grid_position_y, grid_position_x',
      [req.params.projectId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new location
router.post('/', authenticateToken, async (req, res) => {
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

    const result = await pool.query(
      `INSERT INTO locations (
        project_id, title, description, address, latitude, longitude,
        grid_position_x, grid_position_y, qr_code_data
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [project_id, title, description, address, latitude, longitude,
       grid_position_x, grid_position_y, qr_code_data]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Record QR code scan
router.post('/scan', authenticateToken, async (req, res) => {
  const { qr_code_data } = req.body;

  try {
    // Find location by QR code
    const locationResult = await pool.query(
      'SELECT * FROM locations WHERE qr_code_data = $1',
      [qr_code_data]
    );

    if (locationResult.rows.length === 0) {
      return res.status(404).json({ error: 'Invalid QR code' });
    }

    const location = locationResult.rows[0];

    // Get or create progress record
    const progressResult = await pool.query(
      `INSERT INTO project_progress (user_id, project_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, project_id) DO UPDATE
       SET updated_at = NOW()
       RETURNING *`,
      [req.user.id, location.project_id]
    );

    // Record scanned location
    await pool.query(
      `INSERT INTO scanned_locations (progress_id, location_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [progressResult.rows[0].id, location.id]
    );

    // Check completion status
    const scannedCount = await pool.query(
      'SELECT COUNT(*) FROM scanned_locations WHERE progress_id = $1',
      [progressResult.rows[0].id]
    );

    const totalLocations = await pool.query(
      'SELECT COUNT(*) FROM locations WHERE project_id = $1',
      [location.project_id]
    );

    const isComplete = scannedCount.rows[0].count === totalLocations.rows[0].count;

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
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;