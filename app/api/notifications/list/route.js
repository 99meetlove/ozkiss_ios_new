import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function POST(req) {
  const body = await req.json();
  const { user_id } = body;

  if (!user_id) {
    return NextResponse.json(
      { error: "Missing user_id" },
      { status: 400 }
    );
  }

  // get notifications for this user
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    notifications: data,
    unread: data.filter((n) => !n.is_read).length,
  });
}
