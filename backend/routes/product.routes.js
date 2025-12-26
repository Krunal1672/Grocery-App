import  express from "express";
import { authSeller } from "../middlewares/authSeller.js";
import { upload } from "../config/multer.js";
import { addProduct, changeStock, getProduct, getProductById } from "../controllers/product.controller.js";

const router = express.Router();
router.post("/add-product", authSeller, upload.array("image", 4), addProduct);
router.get("/list", getProduct);
router.get("/id", getProductById);
router.post("/stock", authSeller, changeStock);

export default router;
