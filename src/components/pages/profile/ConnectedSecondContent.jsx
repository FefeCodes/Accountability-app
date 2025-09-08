import { Link } from "react-router-dom";
import star from "../../../assets/star.svg";

export default function ConnectedSecondContent() {
  return (
    <div className="w-full h-auto px-8 py-5 flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-row justify-start gap-x-20">
          <div className="flex flex-col gap-y-1">
            <h4 className="font-semibold text-xl">Recent Activity</h4>
            <div className="flex flex-row gap-x-1">
              <p>Last login:</p>
              <p className="font-light">2 days ago</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <h4 className="font-semibold text-xl">Mutual Connections</h4>
            <p>Jane Doe, Fefe, Gracie, Ara</p>
          </div>
        </div>

        <div className="flex flex-col gap-y-1">
          <h4 className="font-semibold text-xl">My Goal</h4>
          <p>
            I want to build a fully functional web app using React within the next 6 weeks. 
            The app will include user authentication, responsive design, and data management with hooks and state. 
            I’ll commit 10 hours per week to coding, following tutorials, and documenting my progress. 
            My accountability partner will help me stay on track by reviewing my GitHub commits and project milestones. 
            By the end of this goal, I expect to have a polished portfolio project that demonstrates my skills in modern frontend development and improves my chances of landing freelance or junior developer opportunities.
          </p>
        </div>

        <div className="flex flex-col gap-y-1">
          <h4 className="font-semibold text-xl">Shared Goal</h4>
          <p>
            Build a Portfolio Website Together
            Design UI in Figma, code frontend in React/HTML/CSS.
            Set 6-week timeline.
            Upload final version to GitHub & deploy.
            Launch a Mini SaaS Project
          </p>
          <Link 
            to="/see-more" 
            className="text-blue-600 hover:underline mt-1 inline-block"
          >
            See More
          </Link>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-xl">Partner Rating</h4>
        <div className="flex flex-row gap-x-1">
          {[...Array(5)].map((_, i) => (
            <img key={i} className="w-8 h-8" src={star} alt="Star" />
          ))}
        </div>
      </div>
    </div>
  );
}
