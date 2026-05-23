const Task = require("../models/Task");

const getDashboard = async (
  req,
  res
) => {
  try {
    const query =
      req.user.role === "admin"
        ? {}
        : {
            assignedTo: req.user.id,
          };

    const totalTasks =
      await Task.countDocuments(query);

    const completedTasks =
      await Task.countDocuments({
        ...query,
        status: "Completed",
      });

    const pendingTasks =
      await Task.countDocuments({
        ...query,
        status: {
          $ne: "Completed",
        },
      });

    const overdueTasks =
      await Task.countDocuments({
        ...query,
        dueDate: {
          $lt: new Date(),
        },
        status: {
          $ne: "Completed",
        },
      });

    res.status(200).json({
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};