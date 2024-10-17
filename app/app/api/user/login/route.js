import { connectToDatabase } from "@/lib/db";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const sql = "SELECT * FROM user";
    const [user] = await db.query(sql);
    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message });
  }
}

export async function POST(request) {
  try {
    const db = await connectToDatabase();
    const data = await request.json(); // Parse the incoming JSON data

    // Example: Insert user data into the database
    const sql = "INSERT INTO user (name) VALUES (?)";

    await db.query(sql, [data.name]);

    return NextResponse.json(
      { message: "User created successfully!" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
