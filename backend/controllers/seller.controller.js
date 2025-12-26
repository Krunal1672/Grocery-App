import jwt from "jsonwebtoken"

// login seller : api/seller/login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res
        .status(200)
        .json({ message: "Login successful", success: true });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
  } catch (error) {
    console.error("Error in sellerLogin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// logout seller : api/seller/logout

export const sellerLogout = async(req,res)=>{
    try {
      res.clearCookie("sellerToken",{
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

// check auth seller : api/seller/is-auth

export const isAuthSeller = async(req,res)=>{
  try {
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Error in checkAuth:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}