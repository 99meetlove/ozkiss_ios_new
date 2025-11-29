import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const user = await supabase.auth.getUser();
  const me = user.data.user.id;

  const { data: room } = await supabase
    .from("chat_rooms")
    .select("*")
    .eq("id", id)
    .single();

  const otherId = room.user1 === me ? room.user2 : room.user1;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, name, avatar_url, is_online, last_seen")
    .eq("id", otherId)
    .single();

  return NextResponse.json({ other: profile });
}
