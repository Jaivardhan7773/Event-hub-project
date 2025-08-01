import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";


const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    return {
      folder: "events",
      resource_type: "image",
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
    };
  },
});


const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 5MB
});

export default upload;
