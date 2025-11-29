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

  // ============================================================
  // 1) LOAD BOOKINGS
  // ============================================================
  const { data: bookings, error: bookErr } = await supabase
    .from("bookings")
    .select("*")
    .eq("host_id", host_id);

  if (bookErr) {
    return NextResponse.json(
      { error: bookErr.message },
      { status: 500 }
    );
  }

  // No bookings? → just return empty stats
  if (!bookings || bookings.length === 0) {
    return NextResponse.json({
      completion: 0,
      response: 0,
      returning: 0,
      rating: 0,
      ai_score: 20,
      chart: [],
    });
  }

  // ============================================================
  // 2) COMPLETION RATE
  // ============================================================
  const totalBookings = bookings.length;
  const completed = bookings.filter((b) => b.status === "completed").length;
  const completionRate = Math.round((completed / totalBookings) * 100);

  // ============================================================
  // 3) RESPONSE RATE
  //    booking.status = "accepted" counts as responded
  // ============================================================
  const responded = bookings.filter(
    (b) => b.status === "accepted" || b.status === "completed"
  ).length;
  const responseRate = Math.round((responded / totalBookings) * 100);

  // ============================================================
  // 4) RETURNING CLIENTS
  // ============================================================
  const users = {};
  bookings.forEach((b) => {
    if (!users[b.user_id]) users[b.user_id] = 0;
    users[b.user_id]++;
  });

  const returningUsers = Object.values(users).filter((v) => v >= 2).length;
  const returningRate = Math.round(
    (returningUsers / Object.keys(users).length) * 100
  );

  // ============================================================
  // 5) AVERAGE RATING
  // ============================================================
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("host_id", host_id);

  const avgRating =
    reviews && reviews.length > 0
      ? reviews.reduce((a, b) => a + b.rating, 0) / reviews.length
      : 0;

  // ============================================================
  // 6) EARNINGS CHART (last 14 days)
  // ============================================================
  const days = 14;
  const today = new Date();
  const chart = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10); // yyyy-mm-dd

    const dayEarn = bookings
      .filter((b) => b.date === key)
      .reduce((sum, b) => sum + b.host_earning, 0); // host earning field

    chart.push({
      date: key.slice(5), // show mm-dd
      value: Math.round(dayEarn / 100),
    });
  }

  // ============================================================
  // 7) AI PERFORMANCE SCORE
  // ============================================================
  const ai_score = Math.round(
    completionRate * 0.3 +
      responseRate * 0.3 +
      returningRate * 0.2 +
      avgRating * 2 // rating out of 5 → scale to 10
  );

  return NextResponse.json({
    completion: completionRate,
    response: responseRate,
    returning: returningRate,
    rating: avgRating,
    ai_score,
    chart,
  });
}
