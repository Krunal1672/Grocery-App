import Address from "../models/address.model.js";

// add address :/api/address/add
export const addAddress = async (req, res) => {
  try {
    const userId = req.user;
    const { address } = req.body;
    await Address.create({
        ... address,
        userId
    })
    res
      .status(201)
      .json({ success: true, message: "Address added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get address:// /api/address/get
export const getAddress = async (req, res) => {
    try {
      const userId = req.user;
      const addresses = await Address.find({ userId }).sort({ createAt: -1});
      res.status(200).json({ success: true, addresses });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };