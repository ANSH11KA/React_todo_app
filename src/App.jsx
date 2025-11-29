import { Check, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">My Tasks</h1>

          {/*Add task*/}
          <div className="flex gap-5">
            <input
              type="text"
              placeholder="Add your task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={addTask}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Add
            </button>
          </div>

          <div className="space-y-2">
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No Task yet..</p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className="bg-black/30 w-5 h-5"
                  >
                    {task.completed && <Check />}
                  </button>
                  <span className={task.completed ? "line-through" : ""}>
                    {task.text}
                  </span>
                  <button onClick={() => deleteTask(task.id)}>
                    <Trash2 />
                  </button>
                </div>
              ))
            )}
          </div>

          {tasks.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p>
                {tasks.filter((t) => t.completed).length} of {tasks.length}{" "}
                tasks completed
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
