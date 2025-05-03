const express = require('express');
const router = express.Router();
const LineLogin = require('line-login');
const jwt = require('jsonwebtoken');
const { pool } = require('../db');

const line = new LineLogin({
  channelID: process.env.LINE_CHANNEL_ID,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  callbackURL: process.env.LINE_CALLBACK_URL,
});

// LINE Login endpoint
router.get('/line', line.auth());

// LINE Login callback
router.get('/line/callback', line.callback(
  async (req, res, next, token_response) => {
    try {
      const profile = await line.verify(token_response.access_token);
      
      // Check if user exists in database
      const userResult = await pool.query(
        'SELECT * FROM users WHERE line_user_id = $1',
        [profile.userId]
      );

      let user;
      if (userResult.rows.length === 0) {
        // Create new user
        const newUserResult = await pool.query(
          'INSERT INTO users (line_user_id, display_name, profile_image_url) VALUES ($1, $2, $3) RETURNING *',
          [profile.userId, profile.displayName, profile.pictureUrl]
        );
        user = newUserResult.rows[0];
      } else {
        user = userResult.rows[0];
      }

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({ token, user });
    } catch (error) {
      next(error);
    }
  }
));

module.exports = router;