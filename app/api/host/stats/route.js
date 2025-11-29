import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(req) {
  const user = await supabase.auth.getUser();
  const hostId = user.data.user.id;

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .eq("host_id", hostId);

  const monthlyEarnings = bookings.reduce(
    (sum, b) => sum + b.host_income,
    0
  );

  const totalBookings = bookings.length;

  return NextResponse.json({
    data: {
      monthly_earnings: monthlyEarnings,
      total_bookings: totalBookings,
    },
  });
}
