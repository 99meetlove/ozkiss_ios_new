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

  const { data, error } = await supabase
    .from("hosts")
    .select("*")
    .eq("host_id", host_id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ host: data });
}
