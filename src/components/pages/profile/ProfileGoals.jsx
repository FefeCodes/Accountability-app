import { useState } from "react";

export default function ProfileGoals({ userData, onUpdate, loading }) {
  const [goals, setGoals] = useState(userData.goals || []);
  const [newGoal, setNewGoal] = useState("");

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (newGoal.trim()) {
      const updatedGoals = [...goals, newGoal.trim()];
      setGoals(updatedGoals);
      onUpdate({ goals: updatedGoals });
      setNewGoal("");
    }
  };

  const handleRemoveGoal = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
    onUpdate({ goals: updatedGoals });
  };

  const handleUpdateGoal = (index, newValue) => {
    const updatedGoals = goals.map((goal, i) =>
      i === index ? newValue : goal
    );
    setGoals(updatedGoals);
    onUpdate({ goals: updatedGoals });
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">My Goals</h2>

      {/* Add new goal */}
      <form onSubmit={handleAddGoal} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Add a new goal..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={loading || !newGoal.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add
          </button>
        </div>
      </form>

      {/* Goals list */}
      <div className="space-y-2">
        {goals.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No goals added yet. Add your first goal above!</p>
          </div>
        ) : (
          goals.map((goal, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3 py-2 px-2 border border-gray-200 rounded-lg bg-white"
            >
              <input
                type="text"
                value={goal}
                onChange={(e) => handleUpdateGoal(index, e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              />
              <button
                onClick={() => handleRemoveGoal(index)}
                disabled={loading}
                className="text-red-600 hover:text-red-700 p-2 rounded-full transition-colors disabled:opacity-50"
                aria-label="Remove goal"
              >
                {/* Trash can SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h8"
                  />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
