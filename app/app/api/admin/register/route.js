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

    const isExist = "select * from user where email= ?";
    const [user] = await db.query(isExist, [data.email]);
    console.log(user)
    if (user.length > 0) {
      return NextResponse.json(
        { message: "User already exist" },
        { status: 400 }
      );
    }

    // Example: Insert user data into the database
    const sql =
      "INSERT INTO user (firstname,lastname,email,password,role) VALUES (?,?,?,?,?)";

    await db.query(sql, [
      data.firstname,
      data.lastname,
      data.email,
      data.password,
      data.role,
    ]);

    return NextResponse.json(
      { message: "Admin registered successfully!" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
