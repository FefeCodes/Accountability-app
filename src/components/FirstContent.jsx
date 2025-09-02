export default function FirstContent() {
  return (
    <div className="w-full">
      {/* Greeting Section */}
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold">
          Hi Fefe, ready to crush some goals today?
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-[#545454] mt-2">
          <p className="font-light">Current Goal:</p>
          <p className="font-medium">Work on "ecowear" designs</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {/* Card 1 */}
        <div className="w-full flex flex-col items-start py-4 px-5 bg-[#FBFDFF] drop-shadow-md rounded-lg border-l-4 border-l-[#3C91E6]">
          <p className="font-light text-sm">Total Partners</p>
          <p className="text-xl font-semibold">6</p>
        </div>

        {/* Card 2 */}
        <div className="w-full flex flex-col items-start py-4 px-5 bg-[#F9FFFD] drop-shadow-md rounded-lg border-l-4 border-l-[#00C48C]">
          <p className="font-light text-sm">Total Partner Groups</p>
          <p className="text-xl font-semibold">2</p>
        </div>

        {/* Card 3 */}
        <div className="w-full flex flex-col items-start py-4 px-5 bg-[#FFFDF7] drop-shadow-md rounded-lg border-l-4 border-l-[#F8BD00]">
          <p className="font-light text-sm">All Tasks</p>
          <p className="text-xl font-semibold">10</p>
        </div>

        {/* Card 4 */}
        <div className="w-full flex flex-col items-start py-4 px-5 bg-[#FAF6FF] drop-shadow-md rounded-lg border-l-4 border-l-[#8A38F5]">
          <p className="font-light text-sm">Task Done</p>
          <p className="text-xl font-semibold">6</p>
        </div>
      </div>
    </div>
  );
}
