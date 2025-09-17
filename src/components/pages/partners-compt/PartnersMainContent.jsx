import { useState, useEffect } from "react";
import Search from "../../forms/Search";
import PartnersCard from "./PartnersCard";
import PartnersCardConnected from "./PartnersCardConnected";
import PartnersInitialConnected from "./PartnersInitialConnected";
import {
  getAllUsersAsPartners,
  getUserPartnerRelationships,
} from "../../../utils/firebaseData";
import { useAuth } from "../../../hooks/useAuth";

export default function PartnersMainContent() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("All");
  const [allUsers, setAllUsers] = useState([]);
  const [userRelationships, setUserRelationships] = useState({
    connectedPartners: [],
    sentRequests: [],
    receivedRequests: [],
  });
  const [loading, setLoading] = useState(true);

  const tabs = ["All", "Connect", "Connected"];

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);

        // Get all users as potential partners
        const usersData = await getAllUsersAsPartners(currentUser.uid);
        setAllUsers(usersData);

        // Get user's partner relationships
        const relationships = await getUserPartnerRelationships(
          currentUser.uid
        );
        setUserRelationships(relationships);
      } catch (error) {
        console.error("Error fetching partners data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  // Helper function to get user's connection status
  const getUserConnectionStatus = (userId) => {
    // Check if connected (either as sender or recipient)
    const isConnected = userRelationships.connectedPartners.some(
      (partner) =>
        (partner.fromUserId === currentUser.uid &&
          partner.toUserId === userId) ||
        (partner.toUserId === currentUser.uid && partner.fromUserId === userId)
    );

    // Check if sent request is pending
    const hasSentRequest = userRelationships.sentRequests.some(
      (request) => request.toUserId === userId && request.status === "pending"
    );

    // Check if received request is pending
    const hasReceivedRequest = userRelationships.receivedRequests.some(
      (request) => request.fromUserId === userId && request.status === "pending"
    );

    if (isConnected) return "connected";
    if (hasSentRequest) return "pending";
    if (hasReceivedRequest) return "received";
    return "available";
  };

  // Filter users based on connection status
  const connectedUsers = allUsers.filter(
    (user) => getUserConnectionStatus(user.uid) === "connected"
  );
  const availableUsers = allUsers.filter(
    (user) => getUserConnectionStatus(user.uid) === "available"
  );
  const pendingUsers = allUsers.filter(
    (user) => getUserConnectionStatus(user.uid) === "pending"
  );

  return (
    <div className="w-full px-6 sm:px-6 py-6 h-[calc(100vh-5rem)]">
      {/* Fixed Tabs + Search */}
      <div
        className="sticky top-6 z-10 flex flex-row items-center gap-3 sm:gap-6 px-3 sm:px-5 py-3 bg-white rounded-t-xl shadow-sm overflow-x-auto"
        role="tablist"
        aria-label="Partners tabs"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            role="tab"
            aria-selected={activeTab === tab}
            tabIndex={activeTab === tab ? 0 : -1}
            className={`whitespace-nowrap px-4 sm:px-5 py-2 sm:py-2.5 text-base font-medium transition-colors focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 relative ${
              activeTab === tab
                ? "text-[#3C91E6] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-[#3C91E6] after:rounded"
                : "text-gray-600 hover:text-[#3C91E6]"
            }`}
          >
            {tab}
          </button>
        ))}

        <div className="ml-6 w-40 sm:w-1/2">
          <Search />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="mt-4 px-3 sm:px-5 py-6 bg-white shadow-sm rounded-b-xl flex-1 flex flex-col">
        {loading ? (
          <div className="px-3 sm:px-5 py-6 flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        ) : allUsers.length === 0 ? (
          <div className="px-3 sm:px-5 py-6 flex-1 overflow-y-auto flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
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
                No users found
              </h3>
              <p className="text-gray-500 mb-4">
                {activeTab === "All"
                  ? "No other users are available at the moment."
                  : activeTab === "Connect"
                  ? "No available users to connect with."
                  : "You haven't connected with any users yet."}
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Refresh
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`px-3 sm:px-5 py-6 flex-1 overflow-y-auto 
              ${
                activeTab === "Connected"
                  ? "flex flex-col w-full gap-4 sm:gap-6"
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              }`}
          >
            {activeTab === "All" && (
              <>
                {(() => {
                  const mixedUsers = [
                    ...availableUsers.map((user) => ({
                      type: "partner",
                      data: { ...user, connectionStatus: "available" },
                    })),
                    ...connectedUsers.map((user) => ({
                      type: "init",
                      data: { ...user, connectionStatus: "connected" },
                    })),
                    ...pendingUsers.map((user) => ({
                      type: "partner",
                      data: { ...user, connectionStatus: "pending" },
                    })),
                  ];

                  // Shuffle
                  mixedUsers.sort(() => Math.random() - 0.5);

                  return mixedUsers.map((item) =>
                    item.type === "partner" ? (
                      <PartnersCard
                        key={`p-${item.data.uid}`}
                        partner={item.data}
                      />
                    ) : (
                      <PartnersInitialConnected
                        key={`i-${item.data.uid}`}
                        partner={item.data}
                      />
                    )
                  );
                })()}
              </>
            )}

            {activeTab === "Connect" &&
              availableUsers.map((user) => (
                <PartnersCard
                  key={user.uid}
                  partner={{ ...user, connectionStatus: "available" }}
                />
              ))}

            {activeTab === "Connected" &&
              connectedUsers.map((user) => (
                <PartnersCardConnected
                  key={user.uid}
                  partner={{ ...user, connectionStatus: "connected" }}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
