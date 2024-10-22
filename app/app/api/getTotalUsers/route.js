import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const db = await connectToDatabase();
    const sql = "SELECT * FROM ems.user where role = ?";
    const [users] = await db.query(sql, "user");
    return NextResponse.json({ message: users.length });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching totoal" },
      { status: 500 }
    );
  }
}
