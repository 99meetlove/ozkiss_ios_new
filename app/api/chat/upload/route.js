import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  const form = await req.formData();
  const file = form.get("file");
  const room_id = form.get("room");

  const fileName = `${Date.now()}_${file.name}`;
  const filePath = `chat/${fileName}`;

  const { error } = await supabase.storage
    .from("ozkiss-media")
    .upload(filePath, file);

  if (error) return NextResponse.json({ error });

  const { data } = supabase.storage
    .from("ozkiss-media")
    .getPublicUrl(filePath);

  const user = await supabase.auth.getUser();
  const me = user.data.user.id;

  await supabase.from("messages").insert({
    room_id,
    sender_id: me,
    image_url: data.publicUrl,
  });

  return NextResponse.json({ success: true });
}
