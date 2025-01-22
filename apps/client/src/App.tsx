import React, { useState, useEffect } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/TaskService";
import "./App.css";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [newTaskStatus, setNewTaskStatus] = useState<string>("pending");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const fetchedTasks = await getTasks();
    setTasks(fetchedTasks);
  };

  const handleCreateTask = async () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        title: newTaskTitle,
        description: newTaskDescription,
        status: newTaskStatus,
      };
      try {
        const createdTask = await createTask(newTask);
        setTasks([...tasks, createdTask]);
        setNewTaskTitle("");
        setNewTaskDescription("");
        setNewTaskStatus("pending");
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  };

  const handleEditTask = async () => {
    if (editingTask) {
      const updatedTask = await updateTask(editingTask);
      setTasks(
        tasks.map((task) => (task.id === editingTask.id ? updatedTask : task))
      );
      setEditingTask(null);
    }
  };

  const handleToggleTask = async (task: Task) => {
    const updatedTask = await updateTask({
      ...task,
      status: task.status === "completed" ? "pending" : "completed",
    });
    setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
  };

  const cancelEditing = () => {
    setEditingTask(null);
  };

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <button onClick={handleCreateTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.status}>
            <div>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <span>Status: {task.status}</span>
            </div>
            <div>
              <button onClick={() => handleToggleTask(task)}>
                {task.status === "completed"
                  ? "Mark Pending"
                  : "Mark Completed"}
              </button>
              <button onClick={() => startEditing(task)}>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {editingTask && (
        <div className="edit-modal">
          <h2>Edit Task</h2>
          <input
            type="text"
            value={editingTask.title}
            onChange={(e) =>
              setEditingTask({ ...editingTask, title: e.target.value })
            }
          />
          <textarea
            value={editingTask.description}
            onChange={(e) =>
              setEditingTask({ ...editingTask, description: e.target.value })
            }
          ></textarea>
          <select
            value={editingTask.status}
            onChange={(e) =>
              setEditingTask({ ...editingTask, status: e.target.value })
            }
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={handleEditTask}>Save</button>
          <button onClick={cancelEditing}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default App;
