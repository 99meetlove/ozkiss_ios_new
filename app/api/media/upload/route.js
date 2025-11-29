import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const hostId = formData.get("host_id");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Read metadata
    const meta = await sharp(buffer).metadata();
    const width = meta.width || null;
    const height = meta.height || null;

    // Generate thumbnail (width 400px)
    const thumbnailBuffer = await sharp(buffer)
      .resize({ width: 400 })
      .jpeg({ quality: 70 })
      .toBuffer();

    const fileName = `${Date.now()}-${file.name}`;
    const thumbName = `thumb-${fileName}`;

    // Upload original
    const { data: originalData, error: originalError } = await supabase.storage
      .from("host-media")
      .upload(fileName, buffer, { contentType: file.type });

    if (originalError) throw originalError;

    // Upload thumbnail
    const { data: thumbData, error: thumbError } = await supabase.storage
      .from("host-media")
      .upload(thumbName, thumbnailBuffer, {
        contentType: "image/jpeg",
      });

    if (thumbError) throw thumbError;

    const originalUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL +
      "/storage/v1/object/public/host-media/" +
      originalData.path;

    const thumbnailUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL +
      "/storage/v1/object/public/host-media/" +
      thumbData.path;

    // Insert into DB
    await supabase.from("host_media").insert({
      host_id: hostId,
      file_url: originalUrl,
      thumbnail_url: thumbnailUrl,
      width,
      height,
      type: "photo",
      status: "pending",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Upload failed", details: err.message },
      { status: 500 }
    );
  }
}
