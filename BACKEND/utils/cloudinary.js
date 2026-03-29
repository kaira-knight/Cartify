import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Upload a single image
export const uploadImage = async (filePath, folder = "products") => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    transformation: [
      { width: 800, height: 800, crop: "limit" },
      { quality: "auto" },
      { fetch_format: "auto" },
    ],
  });

  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};

// ✅ Delete a single image
export const deleteImage = async (publicId) => {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId);
};

// ✅ Delete multiple images
export const deleteMultipleImages = async (publicIds) => {
  if (!publicIds || publicIds.length === 0) return;

  const deletePromises = publicIds.map((id) =>
    cloudinary.uploader.destroy(id)
  );
  await Promise.all(deletePromises);
};

export default cloudinary;