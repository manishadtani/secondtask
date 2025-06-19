import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks");
      console.log("Fetched data: ", res.data);
      setTasks(res.data.tasks);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch tasks. Please login.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout"); // 🔐 Call logout API
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-blue-200 p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-800">📋 Your Tasks</h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/create-task")}
            className="bg-blue-700 hover:bg-blue-800 transition-colors text-white px-4 py-2 rounded-lg shadow-md"
          >
            + Create Task
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 transition-colors text-white px-4 py-2 rounded-lg shadow-md"
          >
            🔒 Logout
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-blue-700 text-lg">Loading...</p>
      ) : error ? (
        <p className="text-red-600 text-lg">{error}</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-600 text-lg">No tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white/30 backdrop-blur-lg rounded-xl shadow-md border border-gray-300 p-5 transition-transform hover:scale-[1.02]"
            >
              <h3 className="font-semibold text-xl text-gray-800 mb-1">
                {task.title}
              </h3>
              <p className="text-gray-700 text-sm mb-3">{task.description}</p>

              {task.image && (
                <img
                  src={task.image}
                  alt="task"
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              )}

              <p
                className={`text-sm font-semibold ${
                  task.is_completed ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {task.is_completed ? "✔️ Completed" : "⏳ Pending"}
              </p>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => navigate(`/edit-task/${task._id}`)}
                  className="bg-yellow-500 hover:bg-yellow-600 transition-colors text-white px-3 py-1 rounded-md text-sm"
                >
                  ✏️ Update
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-600 hover:bg-red-700 transition-colors text-white px-3 py-1 rounded-md text-sm"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
