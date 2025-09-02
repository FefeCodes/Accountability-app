import PartnersCard from "./PartnersCard";
import seeMoreIcon from "../assets/arrowright.svg";

export default function SecondContent() {
  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-2xl sm:text-3xl">Partners</h2>
        <div className="flex items-center gap-2 text-[#545454] cursor-pointer hover:underline">
          <p>See More</p>
          <img src={seeMoreIcon} alt="See more" className="w-4 h-4" />
        </div>
      </div>

      {/* Responsive Cards Section */}
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          xl:grid-cols-4 
          gap-6
        "
      >
        <PartnersCard />
        <PartnersCard />
        <PartnersCard />
        <PartnersCard />
      </div>
    </div>
  );
}
