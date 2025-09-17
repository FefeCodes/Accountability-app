export default function SeeMoreContent() {
  return (
        <div className="w-full h-auto px-8 py-5 flex flex-col gap-y-6 bg-white p-4 rounded-xl shadow-sm">
          <h4 className="font-semibold text-xl">Shared Goal</h4>
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <strong>Build a Portfolio Website Together</strong>
              <ul className="list-disc pl-6 space-y-1">
                <li>Design UI in Figma</li>
                <li>Code frontend in React/HTML/CSS</li>
                <li>Set 6-week timeline</li>
                <li>Upload final version to GitHub & deploy</li>
              </ul>
            </li>
            <li>
              <strong>Launch a Mini SaaS Project</strong>
              <ul className="list-disc pl-6 space-y-1">
                <li>Divide backend (Node.js) & frontend (React)</li>
                <li>Use Agile sprints for 10 weeks</li>
                <li>Deploy MVP on Vercel/Heroku</li>
              </ul>
            </li>
            <li>
              <strong>Contribute to Open Source Together</strong>
              <ul className="list-disc pl-6 space-y-1">
                <li>Pick a beginner-friendly GitHub repo</li>
                <li>Work on issues: bug fixes, docs, features</li>
                <li>Submit at least 2 pull requests</li>
              </ul>
            </li>
            <li>
              <strong>Complete a Coding Bootcamp Curriculum</strong>
              <ul className="list-disc pl-6 space-y-1">
                <li>Follow freeCodeCamp/Odin Project roadmap</li>
                <li>Check-in 3 times a week</li>
                <li>Finish 2 capstone projects together</li>
              </ul>
            </li>
            <li>
              <strong>Build a Mobile App Prototype</strong>
              <ul className="list-disc pl-6 space-y-1">
                <li>Design screens in Figma</li>
                <li>Develop with React Native/Flutter</li>
                <li>Test and launch a demo in 8 weeks</li>
              </ul>
            </li>
          </ol>
        </div>
  );
}
