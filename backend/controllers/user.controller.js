import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register user : api/user/register

export const registerUser = async (req,res)=>{
    try {
      const {name , email, password} = req.body;
      if(!name || !email || !password){
        return res.status(400).json({ message : "all fields are required" , success: false})        
      }
      const existingUser = await User.findOne({email})
      if(existingUser){
        return res.status(400).json({ message : "user already exists" , success: false})   
      }
      const hashedpassword = await bcrypt.hash(password,10);
      const user = await User.create({
        name,
        email,
        password:hashedpassword
      })
      const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {
        expiresIn:"7d",
      });
      res.cookie( "token", token,{
        HttpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite:process.env.NODE_ENV === "production" ? "none" : "strict", 
        maxAge: 7*24*60*60*1000,
      });
      res.json({
        message: "User register successfully",
        success: true,
        user:{
            name : user.name,
            email : user.email
        }
      })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Internal server error"});
    }
};

//login user : api/user/login

export const loginUser = async (req,res)=>{
  try {
    const {email,password} =req.body;
    if(!email || !password){
      return res.status(400).json({ message : "all fields are required" , success: false})    
    }
    const user = await User .findOne({ email })
    if(!user){
      return res.status(400).json({ message : "Invalid email or password" , success: false})   
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
      return res.status(400).json({ message : "Invalid email or password" , success: false})   
    }
    const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {
      expiresIn:"7d",
    });
    res.cookie( "token", token,{
      HttpOnly:true,
      secure: process.env.NODE_ENV === "production",
      sameSite:process.env.NODE_ENV === "production" ? "none" : "strict", 
      maxAge: 7*24*60*60*1000,
    });
    res.json({
      message: "logged in successfully",
      success: true,
      user:{
          name : user.name,
          email : user.email
      }
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message : "Internal server error"});
  }  
};

// logout user : api/user/logout

export const logoutUser = async(req,res)=>{
    try {
      res.clearCookie("token",{
        HttpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite:process.env.NODE_ENV === "production" ? "none" : "strict", 
      })
      res.json({
        message: "User logged out successfully",
        success: true
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({ message : "Internal server error"});
    }
};

// check auth user : api/user/is-auth

export const isAuthUser = async(req,res)=>{
  try {
    const UserId =req.user;
    if(!UserId){
      return res.status(401).json({ message : "unauthorized" , success: false})    
    }
    const user = await User.findById(UserId).select("-password")
    res.json({
      success : true,
      user,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message : "Internal server error"});
  }
}