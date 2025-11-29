import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const host_id = searchParams.get("host_id");

  const { data } = await supabase
    .from("host_media")
    .select("*")
    .eq("host_id", host_id)
    .order("created_at", { ascending: false });

  return NextResponse.json({ data });
}
