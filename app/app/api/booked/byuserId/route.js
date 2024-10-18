import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  try {
    const db = await connectToDatabase();
    const sql =
      "SELECT b.id as id, u.id as user_id, e.id as event_id, u.firstname, u.lastname, u.email, u.role,e.name,e.price,e.date,e.location,e.description,e.time,e.image,e.category,e.seats  FROM booked b inner join user u on b.user_id = u.id inner join event e on b.event_id = e.id where u.id = ?";
    const [usersBooked] = await db.query(sql, userId);

    return NextResponse.json(usersBooked);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong when fetching data" },
      { status: 500 }
    );
  }
}
