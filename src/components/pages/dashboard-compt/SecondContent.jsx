import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PartnersCard from "../partners-compt/PartnersCard";
import PartnersInitialConnected from "../partners-compt/PartnersInitialConnected";
import seeMoreIcon from "../../../assets/arrowright.svg";
import { getPartners } from "../../../utils/firebaseData";

export default function SecondContent() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const partnersData = await getPartners();
        setPartners(partnersData.slice(0, 4));
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {partners.map((partner) =>
            partner.isConnected ? (
              <PartnersInitialConnected key={partner.id} partner={partner} />
            ) : (
              <PartnersCard key={partner.id} partner={partner} />
            )
          )}
        </div>
      )}
    </div>
  );
}
