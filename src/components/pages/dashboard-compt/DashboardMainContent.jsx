import FirstContent from "./FirstContent";
import SecondContent from "./SecondContent";
import ConnectionRequests from "../../ConnectionRequests";

export default function DashboardMainContent() {
  return (
    <section
      className="flex flex-col gap-6 sm:gap-8 p-4 sm:p-6 w-full bg-gray-50 h-9/10"
      aria-labelledby="dashboard-overview-heading"
    >
      <section
        className="bg-white rounded-xl shadow-sm p-4 sm:p-6"
        aria-labelledby="dashboard-stats-heading"
      >
        <h2 id="dashboard-stats-heading" className="sr-only">
          Overview statistics
        </h2>
        <FirstContent />
      </section>

      <section
        className="bg-white rounded-xl shadow-sm p-4 sm:p-6"
        aria-labelledby="connection-requests-heading"
      >
        <h2
          id="connection-requests-heading"
          className="text-xl font-semibold text-gray-800 mb-4"
        >
          Connection Requests
        </h2>
        <ConnectionRequests />
      </section>

      <section
        className="bg-white rounded-xl shadow-sm p-4 sm:p-6"
        aria-labelledby="dashboard-partners-heading"
      >
        <h2 id="dashboard-partners-heading" className="sr-only">
          Partners section
        </h2>
        <SecondContent />
      </section>
    </section>
  );
}
