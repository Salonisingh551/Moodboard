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
    const [editingId, setEditingId] = useState(null);

    

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

  const handleDelete = async(id)=>{
   
    try{
      await axios.delete(`http://localhost:5000/api/journals/${id}`, {
        headers: {Authorization: `Bearer ${user.token}`}
      });
      setJournals(journals.filter((j)=> j.id != id));
    }catch(err){
      console.error("Not able to delete the journal", err);
      setError("Failed to delete");
    }
  };

  const handleUpdate = async(id)=> {
   
    try{
      const res = await axios.put(`http://localhost:5000/api/journals/${id}`, 
        {title, content, mood},
        {headers: {Authorization: `Bearer ${user.token}`}
      });
      setEditingId(null);
      setTitle("");
      setContent("");
      setMood("");
      setJournals(journals.map((j)=>(j.id === id ? res.data : j)));
    }catch(err){
      console.error("Not able to update the journal", err);
      setError("Failed to update");
    }
  }

  // function handleLogout(){
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // }


  return(
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* <button 
      onClick={handleLogout} 
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
>
      Logout
     </button> */}

      <form onSubmit={(e)=>{
        e.preventDefault();
        if(editingId){
          handleUpdate(editingId);
        }else{
          handleCreate(e);
        }
        }} className="mb-6 p-4 border rounded shadow bg-gray-50">

        <h2 className="text-lg font-semibold mb-3">{editingId? "Edit Journal": "Create new Journal"}</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <div className="space-y-3">
        <input 
        type="text"
        placeholder="Title"
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e)=>{setTitle(e.target.value)}}
        required
        />

        <textarea 
        placeholder="content"
        className="w-full p-2 border rounded"
        value={content}
        onChange={(e)=> setContent(e.target.value)}
        required
        />

        <input
        placeholder="Mood"
        className="w-full p-2 border rounded"
        value={mood}
        onChange={(e)=>{setMood(e.target.value)}}
        />

        <button
          type="submit"
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update Journal" : "Add Journal"}
        </button>
        </div>
      </form>


      <div>
        <h2 className="text-lg font-semibold mb-3">Your Journals</h2>
        {journals.length === 0 ? (
          <p>No Journals yet. Start writing.</p>
        ): (
          <ul className="space-y-3">
            {journals.map((j)=>(
              <li key={j.id} className="p-4 border rounded shadow">
                <h3 className="font-bold">{j.title}</h3>
                <p>{j.content}</p>
                {j.mood && <p className="text-sm text-gray-600">{j.mood}</p>}

                <div className="mt-2 flex gap-2">
                  <button
                  className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-600"
                  onClick={()=> {
                    setEditingId(j.id);
                    setTitle(j.title);
                    setContent(j.content);
                    setMood(j.mood || "");
                  }}>
                    Edit
                  </button>
                  <button
                  className="px-3 py-1 bg-red-400 text-white rounded hover:bg-red-600"
                  onClick={()=> handleDelete(j.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
    
}
