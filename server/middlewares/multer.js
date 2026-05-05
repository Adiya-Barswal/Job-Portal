import multer from "multer";
import path from "path";

// storage config
const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file");
 



// export const multiUpload = multer({ storage }).fields([
//   { name: "profilePhoto", maxCount: 1 },  // ✅ profile photo ke liye
//   { name: "file", maxCount: 1 }           // ✅ resume ke liye
// ]);

