import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function POST(req) {
  const body = await req.json();
  const { user_id } = body;

  if (!user_id) {
    return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
  }

  // Fetch wallet
  const { data: wallet } = await supabase
    .from("wallet")
    .select("*")
    .eq("user_id", user_id)
    .single();

  if (!wallet) {
    return NextResponse.json({
      success: true,
      balance: 0,
      transactions: [],
    });
  }

  // Fetch transactions
  const { data: tx } = await supabase
    .from("wallet_transactions")
    .select("*")
    .eq("wallet_id", wallet.id)
    .order("created_at", { ascending: false });

  return NextResponse.json({
    success: true,
    balance: wallet.balance,
    transactions: tx,
  });
}
