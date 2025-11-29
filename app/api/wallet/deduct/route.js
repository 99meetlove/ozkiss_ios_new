import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function POST(req) {
  const body = await req.json();
  const { user_id, amount, type, description, related_booking_id } = body;

  if (!user_id || !amount || !type) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // amount MUST be negative for deduction
  if (amount >= 0) {
    return NextResponse.json({ error: "Amount must be negative" }, { status: 400 });
  }

  // Get wallet
  const { data: wallet } = await supabase
    .from("wallet")
    .select("*")
    .eq("user_id", user_id)
    .single();

  if (!wallet) {
    return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
  }

  // Prevent insufficient balance
  if (wallet.balance + amount < 0) {
    return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
  }

  // Update balance
  const newBalance = wallet.balance + amount;

  await supabase
    .from("wallet")
    .update({ balance: newBalance })
    .eq("id", wallet.id);

  // Insert transaction log
  await supabase.from("wallet_transactions").insert({
    wallet_id: wallet.id,
    amount,
    type,
    description,
    related_booking_id,
  });

  return NextResponse.json({
    success: true,
    balance: newBalance,
  });
}
