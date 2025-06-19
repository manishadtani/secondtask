import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [image, setImage] = useState("");

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Creating task...");

    try {
      await axios.post("/tasks", {
        title,
        description,
        is_completed: isCompleted,
        image,
      });

      setMessage("Task created successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Task creation failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="p-6 border rounded shadow-md bg-white w-[400px] space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Create New Task</h2>

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        ></textarea>

        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
          Mark as completed
        </label>

        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Create Task
        </button>

        <p className="text-center text-sm text-gray-600">{message}</p>
      </form>
    </div>
  );
};

export default CreateTask;
