import { useState } from "react";

export default function ProfileTasks({ userData, onUpdate, loading }) {
  const [tasks, setTasks] = useState(userData.tasks || []);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const task = {
        id: Date.now().toString(),
        title: newTask.trim(),
        isCompleted: false,
        createdAt: new Date().toISOString(),
      };
      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
      onUpdate({ tasks: updatedTasks });
      setNewTask("");
    }
  };

  const handleToggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
    onUpdate({ tasks: updatedTasks });
  };

  const handleUpdateTask = (taskId, newTitle) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: newTitle } : task
    );
    setTasks(updatedTasks);
    onUpdate({ tasks: updatedTasks });
  };

  const handleRemoveTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    onUpdate({ tasks: updatedTasks });
  };

  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const totalTasks = tasks.length;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">My Tasks</h2>
        <div className="text-sm text-gray-600">
          {completedTasks}/{totalTasks} completed
        </div>
      </div>

      {/* Add new task */}
      <form onSubmit={handleAddTask} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={loading || !newTask.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add
          </button>
        </div>
      </form>

      {/* Tasks list */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No tasks added yet. Add your first task above!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => handleToggleTask(task.id)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <input
                type="text"
                value={task.title}
                onChange={(e) => handleUpdateTask(task.id, e.target.value)}
                className={`flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${
                  task.isCompleted ? "line-through text-gray-500" : ""
                }`}
              />
              <button
                onClick={() => handleRemoveTask(task.id)}
                disabled={loading}
                className="px-3 py-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
