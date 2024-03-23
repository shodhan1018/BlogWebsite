const express=require("express");
const dotenv=require("dotenv")
const app=express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const router=require("./backend/routes/routes")
const mongoose=require("mongoose")
const User=require("./backend/model/userModel");
dotenv.config();
const str=process.env.MONGO_CONNECTION_STRING;
app.use(cookieParser());
app.use(express.json())
app.use(cors());
app.use("/",router);

  
app.get("/", async (req,res)=>{
    
    res.send("Blog website")
})

mongoose.connect(str)
.then( ()=>{
    console.log("Connected to Database");
    app.listen(3000, async ()=>{
        console.log("Server is connected...")
    })
})
.catch((err)=>console.log(err));

