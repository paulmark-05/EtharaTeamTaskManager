import {
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import toast from "react-hot-toast";

import {
  AuthContext,
} from "../context/AuthContext";

const Projects = () => {
  const { user } =
    useContext(AuthContext);

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
    });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects =
    async () => {
      try {
        setLoading(true);

        const res =
          await API.get(
            "/projects"
          );

        setProjects(res.data);
      } catch (error) {
        toast.error(
          "Failed to fetch projects"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await API.post(
          "/projects",
          formData
        );

        toast.success(
          "Project created 🚀"
        );

        setFormData({
          title: "",
          description:
            "",
        });

        fetchProjects();
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Error creating project"
        );
      }
    };

  return (
    <div>
      <div className="page-header">
        <h1>Projects</h1>
        <p>
          Manage team
          projects
        </p>
      </div>

      {user?.role ===
        "admin" && (
        <div className="card form-card">
          <h2>
            Create Project
          </h2>

          <form
            onSubmit={
              handleSubmit
            }
          >
            <input
              type="text"
              name="title"
              placeholder="Project title"
              value={
                formData.title
              }
              onChange={
                handleChange
              }
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
            />

            <button
              type="submit"
            >
              Create Project
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loader-box">
          Loading...
        </div>
      ) : (
        <div className="project-grid">
          {projects.map(
            (
              project
            ) => (
              <div
                className="project-card"
                key={
                  project._id
                }
              >
                <div className="project-top">
                  <span className="project-icon">
                    📁
                  </span>

                  <span className="project-pill">
                    Active
                  </span>
                </div>

                <h2>
                  {
                    project.title
                  }
                </h2>

                <p>
                  {
                    project.description
                  }
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Projects;