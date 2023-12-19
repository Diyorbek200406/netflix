export const dynamic = "force-dynamic";

import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Account from "@/database/account";

// Login POST

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { pin, uid, accountId } = await req.json();
    const current_account = await Account.findOne({ _id: accountId, uid });
    if (!current_account) return NextResponse.json({ success: false, message: "Account not found" });
    const isMatch = await compare(pin, current_account.pin);
    if (isMatch) return NextResponse.json({ success: true, data: current_account });
    else return NextResponse.json({ success: false, message: "Incorrect pin" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Something went wrong" });
  }
}
