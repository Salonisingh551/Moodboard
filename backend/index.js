import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import journalRoutes from "./routes/journals.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

//gvbhsjkglrgn;gwnZ:HUE;aeonhj blmfbrjk.,mfsvolkrmf,.

//middleware
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/api/journals", journalRoutes);





app.get("/", (req, res) => {
    res.send("Backend working");
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});