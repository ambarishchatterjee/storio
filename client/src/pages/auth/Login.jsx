import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { userLogin } from "../../api/api";
import { useAuthContext } from "../../hooks/useAuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await userLogin(formData); // ✅ await added
      localStorage.setItem("user", JSON.stringify(user)); // store entire user object (token, name, etc.)
      toast.success(user.message)
      dispatch({ type: "LOGIN", payload: user });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      toast.error(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 px-4">
      <h2 className="text-center text-3xl font-bold text-gray-900">
        Welcome back to Storio
      </h2>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full px-4 py-3 border rounded-md"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-3 border rounded-md"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-orange-400 text-white py-3 rounded-md font-semibold"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}

      <p className="text-center text-sm text-gray-600 mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-orange-500 font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
}
