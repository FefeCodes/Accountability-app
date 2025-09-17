import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import ThemeToggle from "../ThemeToggle";
import logo from "../../assets/logo.svg";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <header
        className={`px-4 md:px-10 py-6 transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } shadow-sm`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <img className="text-white font-bold text-sm" src={logo} alt=""/>
            </div>
            <span className="text-xl font-bold">CommitBuddy</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={handleSignIn}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                isDarkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={handleGetStarted}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Get Started
            </button>
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className="relative px-4 md:px-10 py-10 md:py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-80 w-60 h-60 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
          <div className="absolute top-40 right-10 w-60 h-60 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-60 h-60 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>

        <div className="w-full relative z-10">
          <div className="text-center w-full gap-y-1 flex flex-col items-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Find Your Accountability Partner
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Achieve More, Together
            </h2>
            <p
              className={`w-4/5 text-base md:text-lg mb-8 leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Stay consistent, crush your goals, and never feel stuck again. <br/>Our
              accountability app connects you with like-minded partners who help
              you stay on track; whether you're learning tech, building
              projects, or improving habits.
            </p>
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center px-6 md:px-10 md:py-6 py-4 bg-blue-600 text-white md:text-base text-xl md:font-medium font-semibold rounded-full hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Get Started for Free
              <svg
                className="ml-2 w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-10 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`aspect-square rounded-2xl overflow-hidden ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-200"
                } flex items-center justify-center`}
              >
                <div
                  className={`${
                    isDarkMode ? "bg-gray-600" : "bg-gray-300"
                  } flex items-center justify-center`}
                >
                  <img className="" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-10 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div
              className={`p-6 rounded-2xl transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-50"
              } shadow-lg hover:shadow-xl`}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Match with partners who share your goals
              </h3>
            </div>

            <div
              className={`p-6 rounded-2xl transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-50"
              } shadow-lg hover:shadow-xl border-2 border-dashed border-blue-500`}
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Track progress with shared milestones
              </h3>
            </div>

            <div
              className={`p-6 rounded-2xl transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-50"
              } shadow-lg hover:shadow-xl`}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Stay motivated through reminders & check-ins
              </h3>
            </div>

            <div
              className={`p-6 rounded-2xl transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-50"
              } shadow-lg hover:shadow-xl`}
            >
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Celebrate wins together
              </h3>
            </div>
          </div>
        </div>
      </section>

      
      <footer className="px-4 md:px-10 py-8 text-center">
        <p
          className={`text-lg font-medium ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          No excuses. Just Progress
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
