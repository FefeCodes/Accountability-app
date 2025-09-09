import PartnersCard from "../partners-compt/PartnersCard";
import PartnersInitialConnected from "../partners-compt/PartnersInitialConnected"
import seeMoreIcon from "../../../assets/arrowright.svg";

export default function SecondContent() {
  return (
    <div className="w-full">
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-2xl sm:text-2xl">Partners</h2>
        <a
          href="/partners"
          className="flex items-center gap-2 text-[#545454] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1 gap-x-1"
          aria-label="See more partners"
        >
          <span className="text-base">See More</span>
          <img src={seeMoreIcon} alt="" aria-hidden="true" className="w-6 h-6" />
        </a>
      </div>

      
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          xl:grid-cols-4 
          gap-4 sm:gap-6
        "
      >
        <PartnersCard />
        <PartnersInitialConnected />
        <PartnersInitialConnected />
        <PartnersCard />
      </div>
    </div>
  );
}
