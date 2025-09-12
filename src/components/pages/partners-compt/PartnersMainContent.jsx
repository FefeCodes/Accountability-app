import { useState } from "react";
import Search from "../../forms/Search";
import PartnersCard from "./PartnersCard";
import PartnersCardConnected from "./PartnersCardConnected";
import PartnersInitialConnected from "./PartnersInitialConnected";

export default function PartnersMainContent() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Connect", "Connected"];

  const partners = Array(9).fill(null);
  const connectedPartners = Array(3).fill(null);

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
        <div
        className={`px-3 sm:px-5 py-6 bg-amber-300 flex-1 overflow-y-auto 
          ${
            activeTab === "Connected"
              ? "flex flex-col w-full gap-4 sm:gap-6"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          }`}
      >
        {activeTab === "All" && (
          <>
            {(() => {
              const mixedPartners = [
                ...partners.map((_, i) => ({ type: "partner", id: i })),
                ...connectedPartners.map((_, i) => ({ type: "init", id: i })),
              ];

              // Shuffle
              mixedPartners.sort(() => Math.random() - 0.5);

              return mixedPartners.map((item) =>
                item.type === "partner" ? (
                  <PartnersCard key={`p-${item.id}`} />
                ) : (
                  <PartnersInitialConnected key={`i-${item.id}`} />
                )
              );
            })()}
          </>
        )}

        {activeTab === "Connect" &&
          partners.map((_, i) => <PartnersCard key={i} />)}

        {activeTab === "Connected" &&
          connectedPartners.map((_, i) => (
            <PartnersCardConnected key={`conn-${i}`} />
          ))}
      </div>
      </div>
      
    </div>
  );
}
