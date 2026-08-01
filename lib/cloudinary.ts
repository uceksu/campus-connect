import crypto from "node:crypto";

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
]);

function parseCloudinaryUrl(url: string) {
  const parsed = new URL(url);

  if (parsed.protocol !== "cloudinary:") {
    throw new Error("Invalid CLOUDINARY_URL: expected cloudinary:// protocol.");
  }

  return {
    cloudName: parsed.hostname,
    apiKey: parsed.username,
    apiSecret: parsed.password,
  };
}

function getCloudinaryConfig() {
  const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
  const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
  const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

  if (CLOUDINARY_URL) {
    return parseCloudinaryUrl(CLOUDINARY_URL);
  }

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error(
      "Missing Cloudinary configuration. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET, or set CLOUDINARY_URL."
    );
  }

  return {
    cloudName: CLOUDINARY_CLOUD_NAME,
    apiKey: CLOUDINARY_API_KEY,
    apiSecret: CLOUDINARY_API_SECRET,
  };
}

function computeSignature(params: Record<string, string | number>, apiSecret: string) {
  const sortedKeys = Object.keys(params).sort();
  const stringToSign = sortedKeys
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return crypto
    .createHash("sha1")
    .update(stringToSign + apiSecret)
    .digest("hex");
}

export async function uploadHostelImage(file: File, folder = "hostels") {
  if (!file) {
    throw new Error("No image file provided.");
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Invalid image type. Use JPG, PNG, WEBP, or AVIF.");
  }

  if (file.size > MAX_UPLOAD_SIZE) {
    throw new Error("Image is too large. Maximum size is 5MB.");
  }

  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = computeSignature({ folder, timestamp }, apiSecret);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signature);
  formData.append("folder", folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    const message = result.error?.message || "Cloudinary upload failed.";
    throw new Error(message);
  }

  if (!result.secure_url) {
    throw new Error("Cloudinary did not return a secure URL.");
  }

  return result.secure_url as string;
}
