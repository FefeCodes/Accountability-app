import FirstContent from "./FirstContent";
import SecondContent from "./SecondContent";

export default function DashboardMainContent() {
  return (
    <main className="flex flex-col gap-8 p-6 w-full bg-gray-50 min-h-screen">
      {/* First Section */}
      <section className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
        <FirstContent />
      </section>

      {/* Second Section */}
      <section className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
        <SecondContent />
      </section>
    </main>
  );
}
