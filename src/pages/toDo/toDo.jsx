import React, { useState, useEffect, useRef } from "react";
import "./todo.scss";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showUpdatedMsg, setShowUpdatedMsg] = useState(false);

  const hasLoadedTasks = useRef(false); // ✅ Prevent overwrite on initial mount

  // Load tasks from localStorage once
  useEffect(() => {
    const saved = localStorage.getItem("todoTasks");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setTasks(parsed);
        }
      } catch (e) {
        console.error("Invalid localStorage data:", e);
      }
    }
    hasLoadedTasks.current = true;
  }, []);

  // Save tasks only after initial load
  useEffect(() => {
    if (hasLoadedTasks.current) {
      localStorage.setItem("todoTasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleAddOrUpdate = () => {
    if (input.trim() === "") return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = input.trim();
      setTasks(updated);
      setEditIndex(null);
      setShowUpdatedMsg(true);
      setTimeout(() => setShowUpdatedMsg(false), 1000);
    } else {
      setTasks([...tasks, input.trim()]);
    }

    setInput("");
  };

  const handleEdit = (index) => {
    setInput(tasks[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    const updated = tasks.filter((_, i) => i !== deleteIndex);
    setTasks(updated);
    setDeleteIndex(null);
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setDeleteIndex(null);
    setShowConfirm(false);
  };

  return (
    <div className="todo-container">
      <h2>To-Do List</h2>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddOrUpdate}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      {showUpdatedMsg && <div className="update-msg">Task updated!</div>}

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks yet.</p>
        ) : (
          tasks.map((task, index) => (
            <div key={index} className="task-item">
              <span>{task}</span>
              <div className="actions">
                <button className="edit" onClick={() => handleEdit(index)}>
                  Edit
                </button>
                <button className="delete" onClick={() => handleDelete(index)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showConfirm && (
        <div id="todo-delete">
          <h3>Are you sure you want to delete this task?</h3>
          <div id="confirmation-btn">
            <button id="yes" onClick={confirmDelete}>
              Yes
            </button>
            <button id="no" onClick={cancelDelete}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Todo;
