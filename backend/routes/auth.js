import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";



const router = express.Router();
const prisma = new PrismaClient();

router.post("/signup", async(req, res) => {
    try{
        const {name, email, password} = req.body;
        const existingUser = await prisma.user.findUnique({where: {email}});

        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name, 
                email,
                password : hashedPassword,
            },
        });

        res.status(201).json({message: "User created successfully", userId: user.id});

    }catch(error){
        console.error(error);
        res.status(500).json({message: "Something went Wrong"});
    }
});



router.post("/login", async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await prisma.user.findUnique({where: {email}});
        if(!user){
            res.status(400).json({message: "Invalid Credentials"});
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            res.status(400).json({message : "Invalid Credentials"});
        }

        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: "2h"}
        );

        res.json({message:"Login Successfull", token});
    }catch(error){
        console.error(error);
        console.error("LOGIN ERROR:", error.message, error.stack);
        res.status(500).json({message: "Something went Wrong"});
    }
});



router.get("/me", authMiddleware, async(req, res)=> {
    try{
        const user = await prisma.user.findUnique({
            where: {id: req.user.id},
            select: {id: true, name:true, email:true}
        });
        res.json(user);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Something went Wrong"});
    }
});

export default router;

