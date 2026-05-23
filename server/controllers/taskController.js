const Task = require("../models/Task");

// Create Task (Admin only)
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      project,
      assignedTo,
      dueDate,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Tasks
const getTasks = async (req, res) => {
  try {
    let tasks;

    // Admin sees all
    if (req.user.role === "admin") {
      tasks = await Task.find()
        .populate(
          "assignedTo",
          "name email role"
        )
        .populate(
          "project",
          "title"
        );
    }

    // Member sees assigned only
    else {
      tasks = await Task.find({
        assignedTo: req.user.id,
      })
        .populate(
          "assignedTo",
          "name email role"
        )
        .populate(
          "project",
          "title"
        );
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Task Status
const updateTaskStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Only assigned member or admin
    if (
      req.user.role !== "admin" &&
      task.assignedTo.toString() !==
        req.user.id
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    task.status = status;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
};