import crypto from "node:crypto";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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
  const env = process.env as Record<string, string | undefined>;
  const CLOUDINARY_URL = env["CLOUDINARY_URL"];
  const CLOUDINARY_CLOUD_NAME = env["CLOUDINARY_CLOUD_NAME"];
  const CLOUDINARY_API_KEY = env["CLOUDINARY_API_KEY"];
  const CLOUDINARY_API_SECRET = env["CLOUDINARY_API_SECRET"];

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

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("image");

  if (!file || typeof file === "string") {
    return NextResponse.json(
      { error: "A valid image file is required." },
      { status: 400 }
    );
  }

  try {
    const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = computeSignature({ folder: "hostels", timestamp }, apiSecret);

    const uploadData = new FormData();
    uploadData.append("file", file as File);
    uploadData.append("api_key", apiKey);
    uploadData.append("timestamp", String(timestamp));
    uploadData.append("signature", signature);
    uploadData.append("folder", "hostels");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      {
        method: "POST",
        body: uploadData,
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

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
