export default function ProgressBar({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full h-auto p-4 flex flex-row justify-start items-center gap-x-10 bg-white pl-20 pr-20">
      <img
        src={"/src/assets/arrow-left.svg"}
        alt={"back arrow"}
        className="w-10 h-10"
      />
      <div className="w-full bg-[#F4F4F4] rounded-full h-2.5">
        <div
          className="bg-[#00C48C] h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
