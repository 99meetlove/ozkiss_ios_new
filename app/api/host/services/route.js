import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const { data } = await supabase
    .from("host_services")
    .select("*")
    .eq("host_id", id)
    .order("created_at", { ascending: true });

  return NextResponse.json({ data });
}
