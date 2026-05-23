const Project = require("../models/Project");

// Create Project (Admin only)
const createProject = async (req, res) => {
  try {
    const { title, description, members } =
      req.body;

    const project =
      await Project.create({
        title,
        description,
        members,
        createdBy: req.user.id,
      });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Projects
const getProjects = async (req, res) => {
  try {
    let projects;

    // Admin sees all projects
    if (req.user.role === "admin") {
      projects = await Project.find()
        .populate(
          "members",
          "name email role"
        )
        .populate(
          "createdBy",
          "name email"
        );
    }

    // Member sees assigned projects only
    else {
      projects = await Project.find({
        members: req.user.id,
      }).populate(
        "members",
        "name email role"
      );
    }

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
};