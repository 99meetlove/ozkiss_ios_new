import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  const { id } = await req.json();

  await supabase
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("id", id);

  return NextResponse.json({ success: true });
}
