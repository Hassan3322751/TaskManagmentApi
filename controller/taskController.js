const Task = require('../models/Task');
const mongoose = require('mongoose');

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const [activeTasks, completedTasks, stats] = await Promise.all([
      Task.find({ user: userId, status: { $ne: 'Completed' } })
        .sort({ createdAt: -1 }).limit(4),

      Task.find({ user: userId, status: 'Completed' })
        .sort({ updatedAt: -1 }).limit(3),

      Task.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(userId) } },
        {
            $group: {
            _id: null,
            total: { $sum: 1 },
            completedCount: { $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] } },
            inProgressCount: { $sum: { $cond: [{ $eq: ["$status", "In Progress"] }, 1, 0] } },
            notStartedCount: { $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] } },
            }
        },
        {
            $project: {
            _id: 0,
            total: 1,
            // Rounded Percentage Calculation
            completed: {
                $cond: [
                { $eq: ["$total", 0] }, 0, 
                { $round: [{ $multiply: [{ $divide: ["$completedCount", "$total"] }, 100] }, 0] }
                ]
            },
            inProgress: {
                $cond: [
                { $eq: ["$total", 0] }, 0, 
                { $round: [{ $multiply: [{ $divide: ["$inProgressCount", "$total"] }, 100] }, 0] }
                ]
            },
            pending: {
                $cond: [
                { $eq: ["$total", 0] }, 0, 
                { $round: [{ $multiply: [{ $divide: ["$notStartedCount", "$total"] }, 100] }, 0] }
                ]
            }
            }
        }
        ])
    ]);

    res.json({
      activeTasks,
      completedTasks,
      stats: stats[0] || { total: 0, completed: 0, inProgress: 0, pending: 0 }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching dashboard' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority, search, sortBy = 'dueDate', sortOrder = 'asc' } = req.query;
    const query = { user: req.user.id };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) query.title = { $regex: search, $options: 'i' };

    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };
    const skip = (Number(page) - 1) * Number(limit);

    const tasks = await Task.find(query).sort(sort).skip(skip).limit(Number(limit));
    const total = await Task.countDocuments(query);

    res.json({ tasks, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)), total });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    if (err.kind === 'ObjectId') return res.status(400).json({ message: 'Invalid Task ID' });
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, imageUrl } = req.body;
    const task = new Task({
      user: req.user.id,
      title: title.trim(),
      description: description?.trim() || '',
      status: status || 'Pending',
      priority: priority || 'Medium',
      dueDate: dueDate ? new Date(dueDate) : null,
      imageUrl: imageUrl?.trim() || null,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const fields = ['title', 'description', 'status', 'priority', 'dueDate', 'imageUrl'];
    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        task[field] = (typeof req.body[field] === 'string') ? req.body[field].trim() : req.body[field];
      }
    });

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};