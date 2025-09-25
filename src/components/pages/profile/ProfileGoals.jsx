import { useState } from "react";

export default function ProfileGoals({ userData, onUpdate, loading }) {
  const [goals, setGoals] = useState(
    Array.isArray(userData.goals)
      ? userData.goals.map((g, index) =>
          typeof g === "string"
            ? {
                id: String(index),
                title: g,
                description: "",
                category: "General",
                targetDate: null,
                progress: 0,
                milestones: [],
                isActive: true,
                createdAt: new Date().toISOString(),
              }
            : g
        )
      : []
  );
  const [newGoal, setNewGoal] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [draftGoals, setDraftGoals] = useState([]);

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (newGoal.trim()) {
      const goal = {
        id: Date.now().toString(),
        title: newGoal.trim(),
        description: "",
        category: "General",
        targetDate: null,
        progress: 0,
        milestones: [],
        isActive: true,
        createdAt: new Date().toISOString(),
      };
      const updatedGoals = [goal, ...goals];
      setGoals(updatedGoals);
      onUpdate({ goals: updatedGoals });
      setNewGoal("");
    }
  };

  const beginEdit = () => {
    setDraftGoals(JSON.parse(JSON.stringify(goals)));
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setDraftGoals([]);
  };

  const saveEdit = () => {
    setGoals(draftGoals);
    onUpdate({ goals: draftGoals });
    setIsEditing(false);
  };

  const handleRemoveGoal = (index) => {
    if (isEditing) {
      const updated = draftGoals.filter((_, i) => i !== index);
      setDraftGoals(updated);
    } else {
      const updatedGoals = goals.filter((_, i) => i !== index);
      setGoals(updatedGoals);
      onUpdate({ goals: updatedGoals });
    }
  };

  const handleUpdateField = (index, field, value) => {
    if (isEditing) {
      const updated = draftGoals.map((goal, i) =>
        i === index ? { ...goal, [field]: value } : goal
      );
      setDraftGoals(updated);
    } else {
      const updatedGoals = goals.map((goal, i) =>
        i === index ? { ...goal, [field]: value } : goal
      );
      setGoals(updatedGoals);
      onUpdate({ goals: updatedGoals });
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">My Goals</h2>
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button
              type="button"
              onClick={beginEdit}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={cancelEdit}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEdit}
                disabled={loading}
                className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                Update
              </button>
            </>
          )}
        </div>
      </div>

      {/* Add new goal */}
      {isEditing && (
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
      )}

      {/* Goals list */}
      <div className="space-y-2">
        {(isEditing ? draftGoals : goals).length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No goals {isEditing ? "in draft" : "added"} yet.</p>
          </div>
        ) : (
          (isEditing ? draftGoals : goals).map((goal, index) => (
            <div
              key={goal.id || index}
              className="p-3 border border-gray-200 rounded-lg bg-white space-y-3"
            >
              {!isEditing ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-900">
                      {goal.title || "Untitled goal"}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveGoal(index)}
                      disabled={loading}
                      className="text-red-600 hover:text-red-700 p-2 rounded-full transition-colors disabled:opacity-50"
                      aria-label="Remove goal"
                    >
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
                  <div className="text-sm text-gray-600">
                    Category: {goal.category || "General"}
                  </div>
                  {goal.description ? (
                    <div className="text-sm text-gray-700">
                      {goal.description}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400 italic">
                      No description
                    </div>
                  )}
                  <div className="text-xs text-gray-600">
                    Target:{" "}
                    {goal.targetDate
                      ? new Date(goal.targetDate).toLocaleDateString()
                      : "—"}
                  </div>
                  <div className="text-xs text-gray-600">
                    Progress:{" "}
                    {typeof goal.progress === "number" ? goal.progress : 0}%
                  </div>
                  {(goal.milestones || []).length > 0 && (
                    <div className="pt-2">
                      <div className="text-xs text-gray-500 mb-1">
                        Milestones
                      </div>
                      <ul className="list-disc pl-5 space-y-1">
                        {(goal.milestones || []).map((m, mi) => (
                          <li
                            key={mi}
                            className={`text-sm ${
                              m.completed
                                ? "line-through text-gray-500"
                                : "text-gray-700"
                            }`}
                          >
                            {m.title || "Untitled milestone"}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="text-xs text-gray-500">
                    Created:{" "}
                    {goal.createdAt
                      ? new Date(goal.createdAt).toLocaleString()
                      : ""}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={goal.title || ""}
                        onChange={(e) =>
                          handleUpdateField(index, "title", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        value={goal.category || "General"}
                        onChange={(e) =>
                          handleUpdateField(index, "category", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Description
                    </label>
                    <textarea
                      value={goal.description || ""}
                      onChange={(e) =>
                        handleUpdateField(index, "description", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Target Date
                      </label>
                      <input
                        type="date"
                        value={
                          goal.targetDate ? goal.targetDate.slice(0, 10) : ""
                        }
                        onChange={(e) =>
                          handleUpdateField(
                            index,
                            "targetDate",
                            e.target.value
                              ? new Date(e.target.value).toISOString()
                              : null
                          )
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Progress (%)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={
                          typeof goal.progress === "number" ? goal.progress : 0
                        }
                        onChange={(e) =>
                          handleUpdateField(
                            index,
                            "progress",
                            Math.min(100, Math.max(0, Number(e.target.value)))
                          )
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      />
                    </div>
                    <div className="flex items-end">
                      <label className="inline-flex items-center gap-2 text-xs text-gray-600">
                        <input
                          type="checkbox"
                          checked={goal.isActive !== false}
                          onChange={(e) =>
                            handleUpdateField(
                              index,
                              "isActive",
                              e.target.checked
                            )
                          }
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        Active
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Milestones
                    </label>
                    <div className="space-y-2">
                      {(goal.milestones || []).map((m, mi) => (
                        <div key={mi} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={m.title || ""}
                            onChange={(e) => {
                              const next = [...(goal.milestones || [])];
                              next[mi] = { ...next[mi], title: e.target.value };
                              handleUpdateField(index, "milestones", next);
                            }}
                            className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          />
                          <label className="inline-flex items-center gap-1 text-xs text-gray-600">
                            <input
                              type="checkbox"
                              checked={Boolean(m.completed)}
                              onChange={(e) => {
                                const next = [...(goal.milestones || [])];
                                next[mi] = {
                                  ...next[mi],
                                  completed: e.target.checked,
                                };
                                handleUpdateField(index, "milestones", next);
                              }}
                              className="w-4 h-4"
                            />
                            Done
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const next = (goal.milestones || []).filter(
                                (_, j) => j !== mi
                              );
                              handleUpdateField(index, "milestones", next);
                            }}
                            className="text-red-600 hover:text-red-700 p-2 rounded-full transition-colors"
                            aria-label="Remove milestone"
                          >
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
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateField(index, "milestones", [
                            ...(goal.milestones || []),
                            { title: "", completed: false },
                          ])
                        }
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        + Add milestone
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleRemoveGoal(index)}
                      disabled={loading}
                      className="text-red-600 hover:text-red-700 p-2 rounded-full transition-colors disabled:opacity-50"
                      aria-label="Remove goal"
                    >
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
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
