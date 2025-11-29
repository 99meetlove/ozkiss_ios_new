import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  const body = await req.json();
  const user = await supabase.auth.getUser();
  const me = user.data.user.id;

  const { room_id, text } = body;

  await supabase.from("messages").insert({
    room_id,
    sender_id: me,
    text,
  });

  return NextResponse.json({ success: true });
}
