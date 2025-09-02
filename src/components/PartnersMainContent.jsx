import { useState } from "react";
import PartnersCard from "./PartnersCard";
import PartnersCardConnected from "./PartnersCardConnected";
import PartnersInitialConnected from "./PartnersInitialConnected";

export default function PartnersMainContent() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Connect", "Connected"];

  const partners = Array(4).fill(null); // For All + Connect tab
  const connectedPartners = Array(3).fill(null); // For Connected tab

  return (
    <div className="w-full m-6">
      {/* Tabs */}
      <div className="flex gap-6 px-5 py-3 bg-white rounded-t-xl shadow-sm overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-5 py-2 text-sm font-medium border-b-4 transition-colors focus:outline-none focus:ring-0 ${
              activeTab === tab
                ? "border-[#3C91E6] text-[#3C91E6]"
                : "border-transparent text-gray-600 hover:text-[#3C91E6]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Container */}
      <div
        className={`mt-4 px-5 py-6 bg-white shadow-sm rounded-b-xl 
          ${activeTab === "Connected" 
            ? "flex flex-col w-full gap-6" 
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"}`}
      >
        {/* All tab */}
        {activeTab === "All" && (
          <>
            {partners.map((_, i) => (
              <PartnersCard key={i} />
            ))}
            {connectedPartners.map((_, i) => (
              <PartnersInitialConnected key={`init-${i}`} />
            ))}
          </>
        )}

        {/* Connect tab */}
        {activeTab === "Connect" &&
          partners.map((_, i) => <PartnersCard key={i} />)}

        {/* Connected tab */}
        {activeTab === "Connected" &&
          connectedPartners.map((_, i) => (
            <PartnersCardConnected key={`conn-${i}`} />
          ))}
      </div>
    </div>
  );
}
