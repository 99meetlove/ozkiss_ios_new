import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function POST(req) {
  const body = await req.json();
  const { host_id, id_front, id_back, selfie } = body;

  if (!host_id || !id_front || !id_back || !selfie) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  // Save verification images
  const { error } = await supabase
    .from("hosts")
    .update({
      id_front,
      id_back,
      selfie,
      verify_status: "pending",
    })
    .eq("host_id", host_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Notify Admin (admin user_id = "admin")
  await supabase.from("notifications").insert({
    user_id: "admin",
    title: "New Host Verification",
    message: `Host ${host_id} submitted verification documents.`,
    type: "system",
  });

  return NextResponse.json({ success: true });
}
