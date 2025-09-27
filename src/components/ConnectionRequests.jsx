import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import {
  getUserConnectionRequests,
  acceptUserConnectionRequest,
} from "../utils/firebaseData";
import { getUserFromFirestoreSilent } from "../config/firebase";

export default function ConnectionRequests() {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);
        const connectionRequests = await getUserConnectionRequests(
          currentUser.uid
        );

        // Fetch user data for each request
        const requestsWithUserData = await Promise.all(
          connectionRequests.map(async (request) => {
            try {
              const userData = await getUserFromFirestoreSilent(
                request.fromUserId
              );
              return {
                ...request,
                userData: userData,
              };
            } catch (error) {
              console.error("Error fetching user data for request:", error);
              return {
                ...request,
                userData: null,
              };
            }
          })
        );

        setRequests(requestsWithUserData);
      } catch (error) {
        console.error("Error fetching connection requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [currentUser]);

  const handleAcceptRequest = async (requestId) => {
    try {
      const success = await acceptUserConnectionRequest(
        currentUser.uid,
        requestId
      );
      if (success) {
        // Remove the accepted request from the list
        setRequests(requests.filter((req) => req.id !== requestId));
      }
    } catch (error) {
      console.error("Error accepting connection request:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No connection requests
        </h3>
        <p className="text-gray-500">
          You don't have any pending connection requests at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        Connection Requests ({requests.length})
      </h3>

      {requests.map((request) => (
        <div
          key={request.id}
          className="bg-white rounded-lg shadow-xs border border-gray-200 p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-1 border-gray-100">
                <img
                  src={
                    request.userData?.profilePicture || "/default-avatar.png"
                  }
                  alt={request.userData?.fullName || "User"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <Link
                  to={`/connect-profile/${request.fromUserId}`}
                  className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {request.userData?.fullName || "Unknown User"}
                </Link>
                <p className="text-sm text-gray-500">
                  {new Date(request.createdAt).toLocaleDateString()}
                </p>
                {request.userData?.bio && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {request.userData.bio}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-x-4">
              {/* Accept Button */}
              <button
                onClick={() => handleAcceptRequest(request.id)}
                className="px-2 py-2 border sm:border-none sm:bg-blue-600 border-blue-600 text-white rounded-full sm:rounded-lg hover:bg-blue-700 transition text-sm flex items-center justify-center"
              >
                {/* Text on larger screens */}
                <span className="hidden sm:block">Accept</span>
                {/* Icon on mobile */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 stroke-blue-600 hover:stroke-white sm:hidden"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>

              {/* Decline Button */}
              <button className="px-2 py-2 border border-gray-500 sm:border-none sm:bg-gray-200 text-gray-700 rounded-full sm:rounded-lg hover:bg-gray-700 hover:text-white  transition text-sm flex items-center justify-center">
                {/* Text on larger screens */}
                <span className="hidden sm:block">Decline</span>
                {/* Icon on mobile */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 stroke-gray-500 hover:stroke-white sm:hidden"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
