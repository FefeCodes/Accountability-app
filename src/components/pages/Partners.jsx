import Header from "../Header";
import PartnersMainContent from "./partners-compt/PartnersMainContent";
import SideBar from "../SideBar";

export default function Partners() {
  return (
    <div className="flex h-screen bg-gray-50">
      
      <aside className="hidden md:block">
        <SideBar />
      </aside>

      
      <main className="flex flex-col flex-1" role="main">
        <Header title="Partners" showSearch={true} showAdd={false} />

        <PartnersMainContent />
        
      </main>
    </div>
  );
}
