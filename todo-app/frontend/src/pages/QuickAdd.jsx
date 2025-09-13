import React, { useState } from "react";
import axios from "axios";

const QuickAdd = ({ userId, onTaskAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "normal",
    status: "todo",
    dueDate: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/tasks", {
        ...formData,
        userId, // 👈 pass the logged-in user ID
      });

      if (onTaskAdded) onTaskAdded(res.data); // refresh parent state
      setFormData({
        title: "",
        description: "",
        priority: "normal",
        status: "todo",
        dueDate: "",
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="quick-add">
      <h3 className="qa-head">➕ Add New Task</h3>

      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Task description"
        value={formData.description}
        onChange={handleChange}
      />

      <div className="row">
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="normal">Normal</option>
          <option value="high">High</option>
          <option value="low">Low</option>
        </select>

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
      />

      <button type="submit" className="primary">Add Task</button>
    </form>
  );
};

export default QuickAdd;
