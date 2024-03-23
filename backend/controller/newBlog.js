const mongoose=require("mongoose");
const { Blog,User}=require("../model/blogs")

const jwt=require("jsonwebtoken")
const SECRET_KEY="MyKey";



const insertOne=async (req,res)=>{
    const token= req.body.headers.token;
    // console.log(req.body)
    // const tokenCookie = req.cookies.jwt;
    
    jwt.verify(String(token),SECRET_KEY,async (err,data)=>{
        if(err){
            res.status(404).json({message:"Invalid Token"});
        }
        else{
            try{
                // console.log(data.id)
                const blogData=req.body.body;
                const newBlog= new Blog({
                    title:blogData.title,
                    body:blogData.body,
                    author:data.id
                });
                
                await  newBlog.save();
                const p=await User.findByIdAndUpdate(data.id, { $push: { blogs: newBlog._id } });
                console.log(p);
            }
            catch(err){
                console.log(err);
            }
            
        }
        res.json({message:" "});
    })
}

module.exports=insertOne;