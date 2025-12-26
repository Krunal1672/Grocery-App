import jwt from "jsonwebtoken"

export const authUser = (req,res,next)=>{
    try {
       const {token} = req.cookies;
       if(!token){
        return res.status(401).json({ message : "unauthorized" , success: false})   
       }
       const decoed = jwt.verify(token ,process.env.JWT_SECRET)
       req.user = decoed.id;
       next();
    } catch (error) {
        console.error("Authentication error",error);
        return res.status(401).json({ message : "unauthorized" , success: false})   
    }
}; 