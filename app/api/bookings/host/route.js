import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET() {
  const user = await supabase.auth.getUser();
  const id = user.data.user.id;

  const { data } = await supabase
    .from("bookings")
    .select("*")
    .eq("host_id", id)
    .order("created_at", { ascending: false });

  return NextResponse.json({ data });
}
