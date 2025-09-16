import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [journals, setJournals] = useState([]);
    const[title, setTitle] = useState("");
    const[content, setContent] = useState("");
    const [mood, setMood] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {user, logout} = useAuth();

    

    useEffect(() => {
      if(!user?.token){
        navigate("/login");
        return;
      }

      axios.get("http://localhost:5000/api/journals",
        {headers: {Authorization: `Bearer ${user?.token}`},
      }).then((res) => {
        console.log("API Response:", res.data);
        setJournals(res.data);}).catch((err) => {
        console.error("API Error:", err.response || err.message);
        console.error(err);
        if(err.response?.status === 401){
          logout();
          navigate("/login");
        }
      });

    }, [user, navigate, logout]);


    const handleCreate = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/journals",
        { title, content, mood },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setJournals([...journals, res.data]);
      setTitle("");
      setContent("");
      setMood("");
    } catch (err) {
      console.error("Error creating journal", err);
      setError("Failed to create Journal");
    }
  };


  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

     
      <form
        onSubmit={handleCreate}
        className="mb-6 p-4 border rounded shadow bg-gray-50"
      >
        <h2 className="text-lg font-semibold mb-3">Create New Journal</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Title"
          className="w-full mb-3 p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Content"
          className="w-full mb-3 p-2 border rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>

        <input
          type="text"
          placeholder="Mood (optional)"
          className="w-full mb-3 p-2 border rounded"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Journal
        </button>
      </form>

      
      <div>
        <h2 className="text-lg font-semibold mb-3">Your Journals</h2>
        {journals.length === 0 ? (
          <p>No journals yet. Start writing!</p>
        ) : (
          <ul className="space-y-3">
            {journals.map((j) => (
              <li key={j.id} className="p-4 border rounded shadow">
                <h3 className="font-bold">{j.title}</h3>
                <p>{j.content}</p>
                {j.mood && (
                  <p className="text-sm text-gray-600">Mood: {j.mood}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
