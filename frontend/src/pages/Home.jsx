import { Link } from "react-router-dom";
// import logo from "../assets/logo.png"; // your generated logo

export default function Home() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center p-10">
        {/* <img src={logo} alt="Moodboard Logo" className="w-32 h-32 mb-6" /> */}
        <h1 className="text-3xl font-bold mb-4">Welcome to Moodboard</h1>
        <p className="text-gray-600 text-center max-w-md">
          Track your emotions, reflect with journals, and use AI-powered insights
          to understand your moods better.
        </p>
      </div>

      
    </div>
  );
}
