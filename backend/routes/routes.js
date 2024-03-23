const express= require("express");
const {login}=require("../controller/Login");
const user=require("../controller/UserDetails");
const insertOne=require("../controller/newBlog");
const {allBlogs,myBlogs,deleteBlog}=require("../controller/AllBlogs");
const Router=express.Router();

Router.post("/login",login);
Router.get("/user",user);
Router.post("/insertBlog",insertOne);
Router.get("/allblogs",allBlogs);
Router.get("/myblogs",myBlogs);
Router.delete("/blog/delete/:id",deleteBlog);

module.exports=Router;
