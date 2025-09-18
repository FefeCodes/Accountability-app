import { useState } from "react";

export default function ProfileInterests({ userData, onUpdate, loading }) {
  const [interests, setInterests] = useState(userData.interests || []);
  const [newInterest, setNewInterest] = useState("");

  const handleAddInterest = (e) => {
    e.preventDefault();
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      const updatedInterests = [...interests, newInterest.trim()];
      setInterests(updatedInterests);
      onUpdate({ interests: updatedInterests });
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interestToRemove) => {
    const updatedInterests = interests.filter(
      (interest) => interest !== interestToRemove
    );
    setInterests(updatedInterests);
    onUpdate({ interests: updatedInterests });
  };

  const commonInterests = [
    "Technology",
    "Sports",
    "Music",
    "Art",
    "Reading",
    "Travel",
    "Cooking",
    "Photography",
    "Gaming",
    "Fitness",
    "Movies",
    "Writing",
    "Dancing",
    "Hiking",
    "Swimming",
    "Yoga",
    "Meditation",
    "Learning",
    "Volunteering",
  ];

  const handleAddCommonInterest = (interest) => {
    if (!interests.includes(interest)) {
      const updatedInterests = [...interests, interest];
      setInterests(updatedInterests);
      onUpdate({ interests: updatedInterests });
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">My Interests</h2>

      {/* Add new interest */}
      <form onSubmit={handleAddInterest} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            placeholder="Add a new interest..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={
              loading ||
              !newInterest.trim() ||
              interests.includes(newInterest.trim())
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add
          </button>
        </div>
      </form>

      {/* Current interests */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Your Interests
        </h3>
        {interests.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            <p>No interests added yet. Add some interests above!</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {interest}
                <button
                  onClick={() => handleRemoveInterest(interest)}
                  disabled={loading}
                  className="ml-1 text-blue-600 hover:text-blue-800 disabled:opacity-50"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Common interests */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Common Interests
        </h3>
        <div className="flex flex-wrap gap-2">
          {commonInterests.map((interest) => (
            <button
              key={interest}
              onClick={() => handleAddCommonInterest(interest)}
              disabled={loading || interests.includes(interest)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                interests.includes(interest)
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
