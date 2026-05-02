import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/apiClient";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email.includes("@")) return setError("Enter a valid email.");
    if (!formData.password) return setError("Password is required.");

    try {
      setLoading(true);
      const response = await api.post("/auth/login", formData);
      login(response.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "480px" }}>
      <h2 className="mb-4">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" name="email" type="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input className="form-control" name="password" type="password" value={formData.password} onChange={handleChange} />
        </div>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
        <p className="mt-3 mb-0">
          New user? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
