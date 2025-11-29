import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function POST(req) {
  const body = await req.json();
  const { user_id, name, avatar } = body;

  if (!user_id) {
    return NextResponse.json(
      { error: "Missing user_id" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("users")
    .update({
      name,
      avatar,
    })
    .eq("user_id", user_id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    avatar,
  });
}
