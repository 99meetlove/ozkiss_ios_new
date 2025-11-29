import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const room = searchParams.get("room");

  const { data } = await supabase
    .from("messages")
    .select("*")
    .eq("room_id", room)
    .order("created_at", { ascending: true });

  return NextResponse.json({ data });
}
