import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PartnersCard from "../partners-compt/PartnersCard";
import PartnersInitialConnected from "../partners-compt/PartnersInitialConnected";
import PartnersCardConnected from "../partners-compt/PartnersCardConnected";
import seeMoreIcon from "../../../assets/arrowright.svg";
import {
  getAllUsersAsPartners,
  getUserPartnerRelationships,
} from "../../../utils/firebaseData";
import { useAuth } from "../../../hooks/useAuth";

export default function SecondContent() {
  const { currentUser } = useAuth();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);

        // Get all users and relationships (same as partners screen)
        const [allUsers, userRelationships] = await Promise.all([
          getAllUsersAsPartners(currentUser.uid),
          getUserPartnerRelationships(currentUser.uid),
        ]);

        // Get connection status for each user
        const getUserConnectionStatus = (userId) => {
          const isConnected = userRelationships.connectedPartners.some(
            (partner) =>
              (partner.fromUserId === currentUser.uid &&
                partner.toUserId === userId) ||
              (partner.toUserId === currentUser.uid &&
                partner.fromUserId === userId)
          );

          const hasSentRequest = userRelationships.sentRequests.some(
            (request) =>
              request.toUserId === userId && request.status === "pending"
          );

          const hasReceivedRequest = userRelationships.receivedRequests.some(
            (request) =>
              request.fromUserId === userId && request.status === "pending"
          );

          if (isConnected) return "connected";
          if (hasSentRequest) return "pending";
          if (hasReceivedRequest) return "received";
          return "available";
        };

        // Mix different types of users and take first 4
        const connectedUsers = allUsers.filter(
          (user) => getUserConnectionStatus(user.uid) === "connected"
        );
        const availableUsers = allUsers.filter(
          (user) => getUserConnectionStatus(user.uid) === "available"
        );
        const pendingUsers = allUsers.filter(
          (user) => getUserConnectionStatus(user.uid) === "pending"
        );

        const mixedUsers = [
          ...availableUsers.map((user) => ({
            type: "partner",
            data: { ...user, connectionStatus: "available" },
          })),
          ...connectedUsers.map((user) => ({
            type: "connected",
            data: { ...user, connectionStatus: "connected" },
          })),
          ...pendingUsers.map((user) => ({
            type: "partner",
            data: { ...user, connectionStatus: "pending" },
          })),
        ];

        // Shuffle and take first 4
        mixedUsers.sort(() => Math.random() - 0.5);
        setPartners(mixedUsers.slice(0, 4));
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-2xl sm:text-2xl">Partners</h2>
          <Link
            to="/partners"
            className="flex items-center gap-2 text-[#545454] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1 gap-x-1"
            aria-label="See more partners"
          >
            <span className="text-base">See More</span>
            <img
              src={seeMoreIcon}
              alt=""
              aria-hidden="true"
              className="w-6 h-6"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-2xl sm:text-2xl">Partners</h2>
        {partners.length > 0 && (
          <Link
            to="/partners"
            className="flex items-center gap-2 text-[#545454] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1 gap-x-1"
            aria-label="See more partners"
          >
            <span className="text-base">See More</span>
            <img
              src={seeMoreIcon}
              alt=""
              aria-hidden="true"
              className="w-6 h-6"
            />
          </Link>
        )}
      </div>

      {partners.length === 0 ? (
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
            No partners yet
          </h3>
          <p className="text-gray-500 mb-4">
            Start connecting with accountability partners to see them here.
          </p>
          <Link
            to="/partners"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Browse Partners
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {partners.map((item) => {
            if (item.type === "connected") {
              return (
                <PartnersInitialConnected
                  key={`c-${item.data.uid}`}
                  partner={item.data}
                />
              );
            } else if (item.type === "partner") {
              return (
                <PartnersCard key={`p-${item.data.uid}`} partner={item.data} />
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}
