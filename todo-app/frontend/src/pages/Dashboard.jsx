// Dashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import "../styles/Dashboard.css";
import {
  FaUserCircle,
  FaBell,
  FaSearch,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import axios from "axios";

// Priority ordering
const priorityOrder = { High: 0, Medium: 1, Low: 2 };
const todayIso = (d = new Date()) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate())
    .toISOString()
    .slice(0, 10);

const Dashboard = ({ userId, username = "guest", onLogout = () => {} }) => {
  // States
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");
  const [filterProject, setFilterProject] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [sortBy, setSortBy] = useState("deadline");
  const [showOnly, setShowOnly] = useState("all");
  const [expanded, setExpanded] = useState(new Set());
  const [notifications, setNotifications] = useState([]);
  const [quickAddTitle, setQuickAddTitle] = useState("");
  const [quickAddDeadline, setQuickAddDeadline] = useState("");
  const [quickAddPriority, setQuickAddPriority] = useState("Medium");
  const [quickAddProject, setQuickAddProject] = useState("");
  const [todayStr, setTodayStr] = useState(todayIso());

  // Fetch user & tasks
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/${username}`
        );
        setUser(res.data);
      } catch {
        setUser({ name: username, avatarUrl: null });
      }
    };

    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/tasks?userId=${userId}`
        );
        setTasks(res.data);
        setProjects([
          "All",
          ...new Set(res.data.map((t) => t.project || "General")),
        ]);
      } catch {
        setTasks([]);
        setProjects(["All"]);
      }
    };

    fetchUser();
    fetchTasks();
    const timer = setInterval(() => setTodayStr(todayIso()), 60000);
    return () => clearInterval(timer);
  }, [username, userId]);

  // Counters
  const counts = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    return { total, completed, pending: total - completed };
  }, [tasks]);

  // Filters
  const visibleTasks = useMemo(() => {
    let list = tasks.slice();

    if (filterProject !== "All")
      list = list.filter((t) => t.project === filterProject);
    if (filterPriority !== "All")
      list = list.filter((t) => t.priority === filterPriority);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.tags || []).join(" ").toLowerCase().includes(q)
      );
    }
    if (sortBy === "deadline") {
      list.sort((a, b) => (a.deadline || "").localeCompare(b.deadline || ""));
    } else if (sortBy === "priority") {
      list.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    return list;
  }, [tasks, filterProject, filterPriority, query, sortBy]);

  // API actions
  const addTask = async () => {
    if (!quickAddTitle.trim()) return;
    try {
      const newTask = {
        title: quickAddTitle,
        deadline: quickAddDeadline || null,
        priority: quickAddPriority,
        project: quickAddProject || "General",
        completed: false,
        userId,
      };
      const res = await axios.post("http://localhost:5000/api/tasks", newTask);
      setTasks((prev) => [res.data, ...prev]);
      setQuickAddTitle("");
      setQuickAddDeadline("");
      setQuickAddPriority("Medium");
      setQuickAddProject("");
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const toggleComplete = async (id) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;
    try {
      const updated = { ...task, completed: !task.completed };
      await axios.put(`http://localhost:5000/api/tasks/${id}`, updated);
      setTasks((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const toggleExpand = (id) =>
    setExpanded((prev) => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });

  // Progress bar %
  const progressPercent = counts.total
    ? Math.round((counts.completed / counts.total) * 100)
    : 0;

  return (
    <div className="dash-wrap">
      {/* Header */}
      <header className="dash-header">
  {/* Left - Profile */}
  <div className="header-left">
    <FaUserCircle size={28} />
    <span>{user?.name || username}</span>
  </div>

  {/* Middle - Search */}
  <div className="header-middle">
    <div className="search">
      <FaSearch className="icon" />
      <input
        placeholder="Search tasks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  </div>

  {/* Right - Notifications & Logout */}
  <div className="header-right">
    <button className="notif-btn">
      <FaBell className="icon" />
    </button>
    <button className="logout" onClick={onLogout}>
      <FaSignOutAlt /> Logout
    </button>
  </div>
</header>


      <div className="dash-body">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Projects</h3>
          <ul>
            {projects.map((p) => (
              <li
                key={p}
                className={p === filterProject ? "active" : ""}
                onClick={() => setFilterProject(p)}
              >
                {p}
              </li>
            ))}
          </ul>
          <h3>Filters</h3>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="All">All priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <h3>Sort</h3>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="deadline">By deadline</option>
            <option value="priority">By priority</option>
          </select>
        </aside>

        {/* Main content */}
        <main className="main">
          <section className="overview">
            <div className="card">
              <h4>Total</h4>
              <p>{counts.total}</p>
            </div>
            <div className="card">
              <h4>Completed</h4>
              <p>{counts.completed}</p>
            </div>
            <div className="card">
              <h4>Pending</h4>
              <p>{counts.pending}</p>
            </div>
            <div className="card">
              <h4>Progress</h4>
              <div className="progress">
                <div
                  className="bar"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <small>{progressPercent}% done</small>
            </div>
          </section>

          {/* Quick Add */}
          <section className="quick-add">
            <h3>
              <FaPlus /> Add Task
            </h3>
            <input
              placeholder="Task title..."
              value={quickAddTitle}
              onChange={(e) => setQuickAddTitle(e.target.value)}
            />
            <div className="row">
              <input
                type="date"
                value={quickAddDeadline}
                onChange={(e) => setQuickAddDeadline(e.target.value)}
              />
              <select
                value={quickAddPriority}
                onChange={(e) => setQuickAddPriority(e.target.value)}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <input
                placeholder="Project"
                value={quickAddProject}
                onChange={(e) => setQuickAddProject(e.target.value)}
              />
            </div>
            <button className="primary" onClick={addTask}>
              Add Task
            </button>
          </section>

          {/* Task List */}
          <section className="tasks">
            <h3>Task List</h3>
            <ul>
              {visibleTasks.map((t) => (
                <li key={t._id} className={t.completed ? "completed" : ""}>
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleComplete(t._id)}
                  />
                  <span
                    className="title"
                    onClick={() => toggleExpand(t._id)}
                  >
                    {t.title}
                  </span>
                  <small>
                    {t.deadline} | {t.priority} | {t.project}
                  </small>
                  <button onClick={() => deleteTask(t._id)}>❌</button>
                  {expanded.has(t._id) && (
                    <div className="details">
                      <p>{t.description || "No details"}</p>
                      {t.tags?.length > 0 && (
                        <p>Tags: {t.tags.join(", ")}</p>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
