import { Link } from "react-router-dom";
import star from "../../../assets/star.svg";

export default function ConnectedSecondContent({ partner }) {
  if (!partner) {
    return (
      <div className="w-full h-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center rounded-xl shadow-md bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-y-6 rounded-xl shadow-md bg-white">
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-row justify-start gap-x-20">
          <div className="flex flex-col gap-y-1">
            <h4 className="font-semibold text-lg sm:text-xl text-gray-900">
              Recent Activity
            </h4>
            <div className="flex flex-row justify-center items-center gap-x-1">
              <p className="font-medium text-base sm:text-lg text-gray-900">
                Last login:
              </p>
              <p className="font-regular text-base sm:text-lg text-gray-900">
                2 days ago
              </p>
            </div>
          </div>
          {partner.interests && partner.interests.length > 0 && (
            <div className="flex flex-col gap-y-1">
              <h4 className="font-semibold text-lg sm:text-xl text-gray-900">
                Interests
              </h4>
              <div className="flex flex-wrap gap-2">
                {partner.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-base font-medium bg-blue-100 text-blue-800"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {partner.goals && partner.goals.length > 0 && (
          <div className="flex flex-col gap-y-1">
            <h4 className="font-semibold text-lg sm:text-xl text-gray-900">
              Goals
            </h4>
            <div className="prose prose-sm sm:prose-base max-w-none">
              {partner.goals.map((goal, index) => (
                <p
                  key={index}
                  className="text-gray-600 text-base font-medium leading-relaxed"
                >
                  {goal}
                </p>
              ))}
            </div>
          </div>
        )}

        {partner.bio && (
          <div className="flex flex-col gap-y-1">
            <h4 className="font-semibold text-lg sm:text-xl text-gray-900">
              About
            </h4>
            <div className="prose prose-sm sm:prose-base max-w-none">
              <p className="text-gray-600 text-base font-medium leading-relaxed">
                {partner.bio}
              </p>
            </div>
          </div>
        )}

        {partner.tasks && partner.tasks.length > 0 && (
          <div className="flex flex-col gap-y-1">
            <h4 className="font-semibold text-lg sm:text-xl text-gray-900">
              Shared Goals
            </h4>
            <ul className="list-disc list-inside text-gray-600 text-base font-medium leading-relaxed space-y-1">
              {partner.tasks.slice(0, 3).map((task, index) => (
                <li key={task.id || index}>{task.title}</li>
              ))}
            </ul>
            {partner.tasks.length > 3 && (
              <Link
                to="/see-more"
                className="text-blue-600 hover:underline inline-block mt-2"
              >
                See More
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-y-1">
        <h4 className="font-semibold text-lg sm:text-xl text-gray-900">
          Partner Rating
        </h4>
        <div className="flex flex-row gap-x-1">
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              className="w-6 h-6 sm:w-8 sm:h-8"
              src={star}
              alt={`Star ${i + 1}`}
            />
          ))}
        </div>
        <p className="text-base text-gray-500">5 of 5 stars</p>
      </div>
    </div>
  );
}
