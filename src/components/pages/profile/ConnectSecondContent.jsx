import star from "../../../assets/star.svg";

export default function ConnectSecondContent({ partner }) {
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
        <div className="flex sm:flex-row flex-col justify-start gap-x-20">
          <div className="flex flex-col gap-y-1">
            <h4 className="font-semibold text-lg sm:text-xl text-gray-900">
              Recent Activity
            </h4>
            <div className="flex flex-row sm:justify-center justify-start items-center gap-x-1 mb-4">
              <p className="font-medium text-base sm:text-lg text-gray-900">
                Last login:
              </p>
              <p className="font-regular text-base sm:text-lg text-gray-900">
                2 days ago
              </p>
            </div>
          </div>
          {/* Interests */}
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

        {/* Goals */}
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
                  {goal.title}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Bio */}
        {/* {partner.bio && (
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
        )} */}
      </div>

      {/* Partner Rating */}
      <div className="flex flex-col gap-y-1">
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
        <p className="text-base text-gray-500">5 of 5 stars</p>
      </div>
    </div>
  );
}
