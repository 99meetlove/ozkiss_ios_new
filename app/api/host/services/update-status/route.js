import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function POST(req) {
  const body = await req.json();
  const { service_id, enabled } = body;

  if (!service_id) {
    return NextResponse.json(
      { error: "Missing service_id" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("host_services")
    .update({ enabled })
    .eq("id", service_id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
