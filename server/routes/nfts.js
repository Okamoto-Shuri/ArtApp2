const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const { authenticateToken } = require('../middleware/auth');

// Get NFTs for a user
router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT n.*, p.title as project_title, p.image_url as project_image_url
       FROM nfts n
       JOIN projects p ON n.project_id = p.id
       WHERE n.owner_id = $1
       ORDER BY n.created_at DESC`,
      [req.params.userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Claim NFT for completed project
router.post('/claim', authenticateToken, async (req, res) => {
  const { project_id } = req.body;

  try {
    // Check completion status
    const progressResult = await pool.query(
      'SELECT * FROM project_progress WHERE user_id = $1 AND project_id = $2',
      [req.user.id, project_id]
    );

    if (progressResult.rows.length === 0 || !progressResult.rows[0].completion_status) {
      return res.status(400).json({ error: 'Project not completed' });
    }

    if (progressResult.rows[0].nft_claimed) {
      return res.status(400).json({ error: 'NFT already claimed' });
    }

    // Generate token ID and metadata
    const tokenId = `${project_id}-${Date.now()}`;
    const metadataUrl = `https://api.example.com/metadata/${tokenId}`;

    // Create NFT record
    const nftResult = await pool.query(
      `INSERT INTO nfts (project_id, token_id, metadata_url, owner_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [project_id, tokenId, metadataUrl, req.user.id]
    );

    // Update progress record
    await pool.query(
      'UPDATE project_progress SET nft_claimed = true WHERE id = $1',
      [progressResult.rows[0].id]
    );

    res.json(nftResult.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;