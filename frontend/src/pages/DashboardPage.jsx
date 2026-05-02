import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiClient";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load tasks.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditingTaskId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      if (editingTaskId) {
        await api.put(`/tasks/${editingTaskId}`, { title, description });
      } else {
        await api.post("/tasks", { title, description });
      }
      resetForm();
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save task.");
    }
  };

  const toggleTask = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, {
        title: task.title,
        description: task.description,
        completed: !task.completed,
      });
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Could not update task status.");
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description || "");
    setEditingTaskId(task._id);
  };

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete task.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Task Dashboard</h2>
          <small className="text-muted">Hello, {user?.name}</small>
        </div>
        <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
      </div>

      <div className="card p-4 mb-4 shadow-sm">
        <h5 className="mb-3">{editingTaskId ? "Edit Task" : "Add New Task"}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <div className="d-flex gap-2">
            <button className="btn btn-primary" type="submit">{editingTaskId ? "Update Task" : "Add Task"}</button>
            {editingTaskId && (
              <button className="btn btn-secondary" type="button" onClick={resetForm}>Cancel</button>
            )}
          </div>
        </form>
      </div>

      <div className="card p-4 shadow-sm">
        <h5 className="mb-3">Your Tasks</h5>
        {tasks.length === 0 ? (
          <p className="text-muted mb-0">No tasks yet. Add your first one.</p>
        ) : (
          <div className="list-group">
            {tasks.map((task) => (
              <div key={task._id} className="list-group-item d-flex justify-content-between align-items-start">
                <div className="me-3">
                  <h6 className={`mb-1 ${task.completed ? "text-decoration-line-through text-muted" : ""}`}>{task.title}</h6>
                  {task.description && <p className="mb-1 text-muted">{task.description}</p>}
                  <small className={task.completed ? "text-success" : "text-warning"}>
                    {task.completed ? "Completed" : "Pending"}
                  </small>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-success" onClick={() => toggleTask(task)}>
                    {task.completed ? "Undo" : "Done"}
                  </button>
                  <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(task)}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(task._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
