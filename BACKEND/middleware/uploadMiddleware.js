import multer from "multer";
import path from "path";
import ApiError from "../utils/ApiError.js";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1️⃣  STORAGE CONFIG
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Option A: Disk storage (files saved to /uploads temporarily)
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // unique-name: userId-timestamp-originalname
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// Option B: Memory storage (files stay in buffer — good for direct Cloudinary upload)
const memoryStorage = multer.memoryStorage();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2️⃣  FILE FILTER — Only allow images
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];

const ALLOWED_EXTENSIONS = [".jpeg", ".jpg", ".png", ".webp", ".avif"];

const fileFilter = (req, file, cb) => {
  // ── Check MIME type ──
  const isMimeValid = ALLOWED_MIME_TYPES.includes(file.mimetype);

  // ── Check file extension ──
  const ext = path.extname(file.originalname).toLowerCase();
  const isExtValid = ALLOWED_EXTENSIONS.includes(ext);

  if (isMimeValid && isExtValid) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        400,
        `Invalid file type: '${file.originalname}'. Only JPEG, PNG, WebP, and AVIF are allowed.`
      ),
      false
    );
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3️⃣  SIZE LIMITS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB per file

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4️⃣  MULTER INSTANCES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ✅ Primary upload instance (disk storage — for Cloudinary via file path)
export const upload = multer({
  storage: diskStorage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 6, // 1 main + 5 gallery max
  },
});

// ✅ Memory upload instance (buffer — for direct stream to Cloudinary)
export const uploadMemory = multer({
  storage: memoryStorage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 6,
  },
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5️⃣  PRE-BUILT FIELD CONFIGURATIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Product images (1 main + up to 5 gallery)
export const productImageFields = upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "galleryImages", maxCount: 5 },
]);

// Single avatar/profile picture
export const avatarUpload = upload.single("avatar");

// Single generic image
export const singleImageUpload = upload.single("image");

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6️⃣  MULTER ERROR HANDLER MIDDLEWARE
//     Place AFTER routes to catch multer-specific errors
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const multerErrors = {
      LIMIT_FILE_SIZE: `File too large. Maximum size is ${
        MAX_FILE_SIZE / (1024 * 1024)
      }MB`,
      LIMIT_FILE_COUNT: "Too many files uploaded",
      LIMIT_UNEXPECTED_FILE: `Unexpected field name: '${err.field}'`,
      LIMIT_FIELD_KEY: "Field name too long",
      LIMIT_FIELD_VALUE: "Field value too long",
      LIMIT_FIELD_COUNT: "Too many fields",
      LIMIT_PART_COUNT: "Too many parts",
    };

    const message = multerErrors[err.code] || "File upload error";
    return res.status(400).json({
      success: false,
      message,
    });
  }

  // Pass non-multer errors to the global error handler
  next(err);
};