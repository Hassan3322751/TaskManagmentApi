const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Task = require('../models/Task');
const sampleTasks = require('../constants/sampleData');

const router = express.Router();

router.get('/seed-full', async (req, res) => {
  try {
    const testEmail = "testuser@example.com";
    const testPassword = "Password123";
    
    await User.deleteMany({ email: testEmail });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(testPassword, salt);

    const newUser = await User.create({
      firstName: "Test",
      lastName: "User",
      username: "testuser_" + Math.floor(Math.random() * 1000), // Ensure unique username
      email: testEmail,
      password: hashedPassword,
    });

    // 3. Clean up and Insert Tasks for this specific user
    await Task.deleteMany({ user: newUser._id });

    const tasksWithUser = sampleTasks.map(task => ({
      ...task,
      user: newUser._id,
      status: task.status || 'Not Started' 
    }));

    await Task.insertMany(tasksWithUser);

    res.json({
      message: 'Database seeded successfully!',
      credentials: {
        email: testEmail,
        password: testPassword,
        note: "Use these to login on the frontend"
      },
      stats: {
        tasksInserted: tasksWithUser.length,
        userId: newUser._id
      }
    });

  } catch (err) {
    console.error('Seed error:', err);
    res.status(500).json({ 
      message: 'Failed to seed database', 
      error: err.message 
    });
  }
});

module.exports = router;