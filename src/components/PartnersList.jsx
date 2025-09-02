import { useState } from "react";
import PartnersCard from "./PartnersCard";

export default function PartnersList() {
  const [partners, setPartners] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      goal: "Building a personal finance app",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      connectionStatus: "not_connected",
    },
    {
      id: 2,
      name: "Michael Lee",
      goal: "Learning React.js for web apps",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      connectionStatus: "pending",
    },
    {
      id: 3,
      name: "Emily Brown",
      goal: "Creating a fitness tracking project",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      connectionStatus: "connected",
    },
    {
      id: 4,
      name: "David Smith",
      goal: "Exploring AI and chatbots",
      image: "https://randomuser.me/api/portraits/men/76.jpg",
      connectionStatus: "not_connected",
    },
  ]);

  const handleConnect = async (user, setLoading) => {
    try {
      setLoading(true);

      
      await new Promise((resolve) => setTimeout(resolve, 1200));

      
      setPartners((prev) =>
        prev.map((p) =>
          p.id === user.id ? { ...p, connectionStatus: "pending" } : p
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      {partners.map((user) => (
        <PartnersCard
          key={user.id}
          user={user}
          onButtonClick={handleConnect}
        />
      ))}
    </div>
  );
}
