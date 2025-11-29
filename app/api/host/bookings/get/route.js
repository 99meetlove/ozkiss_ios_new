import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function POST(req) {
  const body = await req.json();
  const { host_id } = body;

  if (!host_id) {
    return NextResponse.json(
      { error: "Missing host_id" },
      { status: 400 }
    );
  }

  // Host bookings
  const { data: bookings } = await supabase
    .from("booking")
    .select("*")
    .eq("host_id", host_id)
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  const upcoming = [];
  const past = [];

  const now = new Date();

  for (let b of bookings) {
    // Fetch user
    const { data: user } = await supabase
      .from("users")
      .select("id, name, avatar")
      .eq("id", b.user_id)
      .single();

    const bookingTime = new Date(`${b.date}T${b.time}:00`);

    const withUser = { ...b, user };

    if (bookingTime >= now) {
      upcoming.push(withUser);
    } else {
      past.push(withUser);
    }
  }

  return NextResponse.json({
    success: true,
    upcoming,
    past,
  });
}
