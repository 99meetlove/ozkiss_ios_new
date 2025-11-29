import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function POST(req) {
  const body = await req.json();
  const { host_id, price } = body;

  if (!host_id || !price) {
    return NextResponse.json(
      { error: "Missing host_id or price" },
      { status: 400 }
    );
  }

  // Save new price
  const { error } = await supabase
    .from("hosts")
    .update({
      base_price: price,
    })
    .eq("host_id", host_id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    price,
  });
}
