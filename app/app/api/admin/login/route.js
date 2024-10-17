import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const db = await connectToDatabase(); // Establish database connection
    const data = await request.json(); // Parse incoming JSON data
    const { email, password } = data; // Extract name and password
    console.log(email, password);

    const query = "SELECT * FROM user WHERE email = ? AND password = ?";
    const [user] = await db.query(query, [email, password]); // Run query and extract the result

    if (user.length === 0) {
      // If user array is empty, return 400 with error message
      return NextResponse.json(
        { message: "Incorrect email or password" },
        { status: 400 }
      );
    }

    // If user exists, return the user data
    const object = {
      id: user[0].id,
      firstname: user[0].firstname,
      lastname: user[0].lastname,
      email: user[0].email,
      role: user[0].role,
    };
    return NextResponse.json(object);
  } catch (err) {
    console.error("Error during login:", err);
    return NextResponse.json(
      { error: "Something went wrong", details: err.message },
      { status: 500 }
    );
  }
}
