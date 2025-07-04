import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
 const { login, error } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await login(formData);
      if (success) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Unexpected login error:", err);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl"
      >
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Login
        </h2>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            username
          </label>
          <input
            type="text"
            name="username"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <p
          onClick={() => navigate("/register")}
          className="text-right p-2 cursor-pointer"
        >
          register
        </p>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
