import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`/tasks/${id}`);
        const task = res.data.task;

        setTitle(task.title);
        setDescription(task.description);
        setImage(task.image);
        setIsCompleted(task.is_completed);
      } catch (err) {
        console.error(err);
        setMessage("Failed to load task");
      }
    };

    fetchTask();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("Updating...");

    try {
      await axios.put(`/tasks/${id}`, {
        title,
        description,
        is_completed: isCompleted,
        image,
      });

      setMessage("Task updated successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setMessage("Update failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleUpdate}
        className="p-6 border rounded shadow-md bg-white w-[400px] space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Edit Task</h2>

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
          placeholder="Image URL"
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
          className="bg-yellow-600 text-white w-full py-2 rounded"
        >
          Update Task
        </button>

        <p className="text-center text-sm text-gray-600">{message}</p>
      </form>
    </div>
  );
};

export default EditTask;
