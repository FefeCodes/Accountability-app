import star from "../../../assets/star.svg";

export default function ConnectSecondContent() {
  return (
    <div className="w-full h-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-y-6 rounded-xl shadow-md bg-white">
      <div className="flex flex-col gap-y-6">
        {/* Mutual Connections */}
        <div className="flex flex-col gap-y-2">
          <h4 className="font-semibold text-lg sm:text-xl text-gray-900">
            Mutual Connections
          </h4>
          <div className="flex flex-wrap gap-2">
            {["Jane Doe", "Fefe", "Gracie", "Ara"].map((name, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Goal Description */}
        <div className="flex flex-col gap-y-2">
          <h4 className="font-semibold text-lg sm:text-xl text-gray-900">
            My Goal
          </h4>
          <div className="prose prose-sm sm:prose-base max-w-none">
            <p className="text-gray-600 leading-relaxed">
              I want to build a fully functional web app using React within the
              next 6 weeks. The app will include user authentication, responsive
              design, and data management with hooks and state. I'll commit 10
              hours per week to coding, following tutorials, and documenting my
              progress.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              My accountability partner will help me stay on track by reviewing
              my GitHub commits and project milestones. By the end of this goal,
              I expect to have a polished portfolio project that demonstrates my
              skills in modern frontend development and improves my chances of
              landing freelance or junior developer opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Partner Rating */}
      <div className="flex flex-col gap-y-3">
        <h4 className="font-semibold text-lg sm:text-xl text-gray-900">
          Partner Rating
        </h4>
        <div className="flex flex-row gap-x-1">
          {[...Array(5)].map((_, index) => (
            <img
              key={index}
              className="w-6 h-6 sm:w-8 sm:h-8"
              src={star}
              alt={`Star ${index + 1}`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500">5.0 out of 5 stars</p>
      </div>
    </div>
  );
}
