const express=require("express")
// const User=require("../model/userModel")
const {User} =require("../model/blogs");
const {OAuth2Client, UserRefreshClient} = require('google-auth-library');
const jwt=require("jsonwebtoken")
const SECRET_KEY="MyKey";
const CLIENT_ID = "497231389779-dlf46tk6chkjll1h239hr60sq71vqbcf.apps.googleusercontent.com";
const {verify}=require("jsonwebtoken")
const client= new OAuth2Client(CLIENT_ID);

async function verifyGoogleId(credentials,callBack){
    const ticket=await client.verifyIdToken({
        idToken:credentials,
        audience:CLIENT_ID
    });
    const payload = ticket.getPayload()
    callBack(null,payload);
}

async function login(req,res,next){
    verifyGoogleId(req.body.credential,async (err,userData)=>{
        res.set('Access-Control-Allow-Origin', '*');
        if(err){
            res.status(401).json({meassage:"Unauthorized Access"});
        }
        else{
            console.log(userData.email);
            let existing;
            try{
               existing= await User.findOne({email:userData.email})
            }
            catch{
                return new Error;
            }
            if(!existing){
                try{
                 existing=new User({
                    name:userData.name,
                    email:userData.email,
                    image:userData.picture,
                });
                await existing.save();
                }
                catch(err){
                    console.log(err);
                }

            }
            console.log(existing);
            const token=jwt.sign({id:existing._id},SECRET_KEY,{
                expiresIn:"50000000s"
            })
            res.cookie('jwt', token, { httpOnly: true });
            res.json({message:"User successFully Logged in",token:token});
        }
    })
}

module.exports={login};