import multer from "multer";
import path from "path";

// storage config
const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file");
 