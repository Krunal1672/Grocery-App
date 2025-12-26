import multer from "multer";

const storage = multer.diskStorage({
    destination:"upload",
    filename:(req,file,cd)=>{
        return cd(null, `${Date.now()}${file.originalname}`)
    }
})
export const upload =multer({storage:storage})
