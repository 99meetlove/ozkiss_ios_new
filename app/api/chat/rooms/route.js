import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET() {
  const user = await supabase.auth.getUser();
  const me = user.data.user.id;

  const { data: rooms } = await supabase
    .from("chat_rooms")
    .select("*")
    .or(`user1.eq.${me},user2.eq.${me}`);

  let result = [];

  for (const room of rooms) {
    const other = room.user1 === me ? room.user2 : room.user1;

    const { data: profile } = await supabase
      .from("profiles")
      .select("name, avatar_url, is_online, last_seen")
      .eq("id", other)
      .single();

    const { data: lastMsg } = await supabase
      .from("messages")
      .select("text, created_at")
      .eq("room_id", room.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    result.push({
      id: room.id,
      other_name: profile.name,
      other_avatar: profile.avatar_url,
      last_message: lastMsg?.text || "",
      last_time: lastMsg?.created_at || "",
    });
  }

  return NextResponse.json({ data: result });
}
