import {
  useContext,
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

import {
  AuthContext,
} from "../context/AuthContext";

const Login = () => {
  const navigate =
    useNavigate();

  const { login } =
    useContext(AuthContext);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

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

      if (
        !formData.email ||
        !formData.password
      ) {
        return toast.error(
          "Please fill all fields"
        );
      }

      try {
        setLoading(true);

        const res =
          await API.post(
            "/auth/login",
            formData
          );

        login(
          res.data.user,
          res.data.token
        );

        toast.success(
          "Login successful 🚀"
        );

        navigate(
          "/dashboard"
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Invalid email or password"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <h1>
          Welcome back to{" "}
          <span className="auth-highlight">
            Ethara Task
          </span>
        </h1>

        <p>
          Continue managing
          projects, assigning
          tasks and tracking
          productivity.
        </p>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h1>
            Welcome Back
          </h1>

          <p>
            Login to continue
          </p>

          <form
            onSubmit={
              handleSubmit
            }
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
            />

            <button
              type="submit"
              className="full-btn"
              disabled={
                loading
              }
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>
          </form>

          <p className="auth-link">
            No account?{" "}
            <Link to="/signup">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;