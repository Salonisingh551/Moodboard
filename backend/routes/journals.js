import express from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
const prisma = new PrismaClient();


// CREATE journal
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content, mood } = req.body;

    const journal = await prisma.journal.create({
      data: {
        title,
        content,
        mood,
        userId: req.user.id,
      },
    });

    res.json(journal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


// GET all journals of logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const journals = await prisma.journal.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });
    res.json(journals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


// UPDATE journal
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, mood } = req.body;

    const updatedJournal = await prisma.journal.update({
      where: { id: Number(id) },
      data: { title, content, mood },
    });

    res.json(updatedJournal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


// DELETE journal
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.journal.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Journal deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


export default router;
