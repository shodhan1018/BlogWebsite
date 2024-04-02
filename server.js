const express=require("express");
const dotenv=require("dotenv")
require('dotenv').config()
const app=express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const router=require("./backend/routes/routes")
const mongoose=require("mongoose")
const User=require("./backend/model/userModel");
dotenv.config();
app.use(cookieParser());
app.use(express.json())
app.use(cors());
app.use("/",router);

  
app.get("/", async (req,res)=>{
    
    res.send("Blog website")
})

mongoose.connect(process.env.DATABASE_CONNECTION_URL)
.then( ()=>{
    console.log("Database URl", process.env.DATABASE_CONNECTION_URL);
    console.log("Connected to Database");
    app.listen(3000, async ()=>{
        console.log("Server is connected...")
    })
})
.catch((err)=>{
    console.log("Database URl", process.env.DATABASE_CONNECTION_URL)
    console.log(err)
});

