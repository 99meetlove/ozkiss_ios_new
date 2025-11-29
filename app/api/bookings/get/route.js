import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function POST(req) {
  const body = await req.json();
  const { user_id } = body;

  if (!user_id) {
    return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
  }

  // Get all bookings by this user
  const { data: bookings } = await supabase
    .from("booking")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  // Enrich booking with host info
  const result = [];

  for (let b of bookings) {
    const { data: host } = await supabase
      .from("hosts")
      .select("*")
      .eq("id", b.host_id)
      .single();

    result.push({
      ...b,
      host,
    });
  }

  return NextResponse.json({
    success: true,
    bookings: result,
  });
}
