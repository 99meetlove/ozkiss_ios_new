import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function POST(req) {
  const body = await req.json();
  const { user_id, title, message, type } = body;

  if (!user_id || !title) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Insert notification
  const { data, error } = await supabase
    .from("notifications")
    .insert({
      user_id,
      title,
      message,
      type: type || "system",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    notification: data,
  });
}
