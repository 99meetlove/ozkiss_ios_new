import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(req) {
  const user = await supabase.auth.getUser();
  const id = user.data.user.id;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  return NextResponse.json({ data });
}
