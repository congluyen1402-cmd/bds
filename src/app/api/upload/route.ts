import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;
    const folder = data.get("folder") as string || "site"; // e.g. "site", "listings", "agents"

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create public directory if not exists
    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
    await mkdir(uploadDir, { recursive: true });

    // Sanitize filename and create unique hash
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const originalName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const baseName = path.parse(originalName).name;
    const webpFilename = `${baseName}-${uniqueSuffix}.webp`;
    
    const destPath = path.join(uploadDir, webpFilename);

    // Process with sharp (convert to WebP, compress)
    // If it's a huge image, resize it keeping aspect ratio to max 1920px width
    await sharp(buffer)
      .resize(1920, 1920, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 80, effort: 4 })
      .toFile(destPath);

    const publicUrl = `/uploads/${folder}/${webpFilename}`;

    return NextResponse.json({ success: true, url: publicUrl });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
  }
}
