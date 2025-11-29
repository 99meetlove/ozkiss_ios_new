import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  const body = await req.json();

  const {
    host_id,
    service_id,
    service_label,
    type,
    duration,
    price,
    date,
    time,
    isApp
  } = body;

  const user = await supabase.auth.getUser();
  const client_id = user.data.user.id;

  const client_fee = price * 0.15;
  const host_income = price * 0.9;
  const cashback = isApp ? price * 0.07 : price * 0.04;

  const { data, error } = await supabase.from("bookings").insert({
    host_id,
    client_id,
    service_id,
    service_label,
    type,
    duration,
    price,
    date,
    time,
    client_fee,
    host_income,
    cashback,
    status: "pending",
  }).select().single();

  return NextResponse.json({ data, error });
}
