import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function POST(req) {
  const body = await req.json();
  const { host_id } = body;

  if (!host_id) {
    return NextResponse.json({ error: "Missing host_id" }, { status: 400 });
  }

  // =======================================================
  // LOAD HOST DETAILS
  // =======================================================
  const { data: host, error: hostErr } = await supabase
    .from("hosts")
    .select("city, service_category, base_price")
    .eq("host_id", host_id)
    .single();

  if (hostErr) {
    return NextResponse.json({ error: hostErr.message }, { status: 500 });
  }

  // Fallback defaults
  const city = host.city || "default";
  const category = host.service_category || "general";

  // =======================================================
  // LOAD PRICE PRESETS BY LOCATION + CATEGORY
  // =======================================================
  const { data: preset } = await supabase
    .from("pricing_presets")
    .select("*")
    .eq("city", city)
    .eq("category", category)
    .single();

  // If no preset found → use system default
  let min = 200;
  let max = 800;
  let recommended = 400;

  if (preset) {
    min = preset.min_price;
    max = preset.max_price;
    recommended = preset.recommended_price;
  }

  // =======================================================
  // LOAD HOST SAVED PRICE
  // =======================================================
  let saved_price = host.base_price ? Number(host.base_price) : null;

  return NextResponse.json({
    range: {
      min,
      max,
      recommended,
    },
    price: saved_price,
  });
}
