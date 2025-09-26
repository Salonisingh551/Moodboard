import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import MoodAI from "./pages/MoodAI";
import Tips from "./pages/Tips";
import SidebarLayout from "./pages/SidebarLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route element={<SidebarLayout/>}>
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/mood-ai" element={<MoodAI />} />
      <Route path="/tips" element={<Tips />} />
      <Route path="/faq" element={<FAQ />} />
      </Route>
    </Routes>
  );
}

export default App;



