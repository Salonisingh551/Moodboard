import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; 

export default function Home() {
  return (
     <div className="min-h-screen flex bg-white-50">
      {/* Left side: text (centered vertically) */}
      <div className="flex-[1.5] flex flex-col justify-center items-start pl-28 pt-28 pb-28">
        
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Understand Your Mood, Transform Your Day</h1>
        <p className="text-gray-600 text-xl max-w-md mb-8">
          Capture your daily feelings, journal your thoughts, and let AI reveal patterns in your moods. Moodboard helps you take control of your mental well-being effortlessly.
        </p>
        <div>
           <Link
          to="/register"
          className="bg-gray-800 text-white px-6 py-3 rounded-full !text-blue-300  hover:bg-gray-600 transition">
          Get Started
        </Link>
        </div>
      </div>

      {/* Right side: logo (centered vertically) */}
      <div className="flex-1 flex justify-center items-center pr-20">
        <img src={logo} alt="Moodboard Logo" className="w-115 h-90 rounded-full" />
      </div>
    </div>
  );
} 
