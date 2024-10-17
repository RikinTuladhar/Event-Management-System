import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const db = await connectToDatabase();
    const sql = "select * from event where id = ?";
    const [event] = await db.query(sql, [id]);
    const object = {
      id: event[0].id || "",
      name: event[0].name || "",
      price: event[0].price || "",
      date: event[0].date || "",
      location: event[0].location || "",
      description: event[0].description || "",
      time: event[0].time || "",
      image: event[0].image || "",
      category: event[0].category || "unknown",
    };
    return NextResponse.json(object);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error fetching event id " + id });
  }
}
