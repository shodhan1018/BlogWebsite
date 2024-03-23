const mongoose=require("mongoose");
const {Blog,User}=require("../model/blogs");
const jwt=require("jsonwebtoken");
const SECRET_KEY="MyKey";
const ObjectId = require('mongoose').Types.ObjectId;
const allBlogs = async (req,res)=>{
    try{
    console.log(req.cookies);
    const blogs = await Blog.find({}).populate("author");
    console.log(blogs);
    res.status(201).json({blogs:blogs});
    }
    catch(error){
        res.status(404).json({message:"Blogs Not found..."});
    }
    
}



const myBlogs = async (req,res)=>{
    const token = req.headers.token;
    // const token=req.cookies.jwt;
    console.log(req.cookies)
    jwt.verify(String(token),SECRET_KEY,async (err,data)=>{
        if(err){
            res.status(404).json({meassage:"Message not Found"});
        }
        else{
        try{
            console.log(data);
            const blogs = await User.findById(data.id).populate("blogs");
            // console.log(blogs);
            res.status(200).json(blogs);
        }
        catch(error){
            console.log(error);
            res.status(404).json({message:"User Blogs or User not found"})
        }
    }
    })
    
}

const deleteBlog = async (req,res)=>{
    // const token= req.body.headers.token;
     const blogId=req.params.id;
     console.log(blogId)
    
     try{
        const blogs= await Blog.findByIdAndDelete({_id:blogId})
        
        console.log(blogs);
     }
     catch(error){
        console.log(error)
     }
    res.json({meassage:"akjgsdhuv"})
    
}

module.exports={allBlogs,myBlogs,deleteBlog};