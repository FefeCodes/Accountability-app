import Header from "./Header";
import PartnersMainContent from "./PartnersMainContent";
import SideBar from "./SideBar";

export default function Partners() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:block">
        <SideBar />
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <Header title="Partners" showSearch={true} showAdd={false} />

        <PartnersMainContent />
        
      </div>
    </div>
  );
}
