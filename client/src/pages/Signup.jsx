import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

const Signup = () => {
  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "member",
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
        !formData.name ||
        !formData.email ||
        !formData.password
      ) {
        return toast.error(
          "Please fill all fields"
        );
      }

      if (
        formData.password
          .length < 6
      ) {
        return toast.error(
          "Password must be at least 6 characters"
        );
      }

      try {
        setLoading(true);

        await API.post(
          "/auth/signup",
          formData
        );

        toast.success(
          "Account created 🎉"
        );

        navigate(
          "/login"
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Signup failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <h1>
          Build smarter
          teams with{" "}
          <span className="auth-highlight">
            Ethara Task
          </span>
        </h1>

        <p>
          Assign work,
          track progress,
          and manage
          projects in one
          intelligent
          workspace.
        </p>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h1>
            Create Account
          </h1>

          <p>
            Signup to get
            started
          </p>

          <form
            onSubmit={
              handleSubmit
            }
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
            />

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

            <select
              name="role"
              value={
                formData.role
              }
              onChange={
                handleChange
              }
            >
              <option value="member">
                Member
              </option>

              <option value="admin">
                Admin
              </option>
            </select>

            <button
              type="submit"
              className="full-btn"
              disabled={
                loading
              }
            >
              {loading
                ? "Creating..."
                : "Signup"}
            </button>
          </form>

          <p className="auth-link">
            Already have an
            account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;