import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const sql =
      "SELECT b.id as id, u.id as user_id, e.id as event_id, u.firstname, u.lastname, u.email, u.role,e.name,e.price,e.date,e.location,e.description,e.time,e.image,e.category,e.seats  FROM booked b inner join user u on b.user_id = u.id inner join event e on b.event_id = e.id;";
    const [books] = await db.query(sql);
    return NextResponse.json(books);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { event_id, user_id } = await req.json();
    const db = await connectToDatabase();
    const selectSeats = "SELECT seats,occupied FROM ems.event where id = ?";
    const [retrieve] = await db.query(selectSeats, event_id);
    const totalSeat = retrieve[0].seats;
    const occupied = retrieve[0].occupied || 0;
    const isAlreayBooked =
      "SELECT * FROM booked where user_id = ? and event_id = ?";
    const [alreayBooked] = await db.query(isAlreayBooked, [user_id, event_id]);
    if (alreayBooked.length > 0) {
      return NextResponse.json({ message: "Already Booked" });
    }
    if (totalSeat <= occupied) {
      return NextResponse.json({
        message: "No Seats Left",
      });
    }

    const updateOccupied = occupied + 1;
    const sqlForUpateOccupied = "update event set occupied = ? where id = ?";
    const [setOccupied] = await db.query(sqlForUpateOccupied, [
      updateOccupied,
      event_id,
    ]);

    if (setOccupied.affectedRows > 0) {
      const sql = "INSERT INTO booked(event_id,user_id) value(?,?)";
      const affected = db.query(sql, [event_id, user_id]);
      return NextResponse.json({ message: "Booked" }, { status: 201 });
    } else {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const event_id = searchParams.get("event_id");
    const user_id = searchParams.get("user_id");

    const db = await connectToDatabase();

    // Delete the booking
    const sqlDeleteBooked = "DELETE FROM booked WHERE event_id = ? AND user_id = ?";
    await db.query(sqlDeleteBooked, [event_id, user_id]);

    // Fetch the current 'occupied' value
    const sqlEvent = "SELECT occupied FROM event WHERE id = ?";
    const [rows] = await db.query(sqlEvent, [event_id]);

    if (rows.length === 0) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    const eventOccupied = rows[0].occupied; // Correctly access the occupied value
    const updateEvent = eventOccupied - 1;

    // Update the occupied value
    const sqlUpdateOccupied = "UPDATE event SET occupied = ? WHERE id = ?";
    await db.query(sqlUpdateOccupied, [updateEvent, event_id]);

    return NextResponse.json({ message: "Cancelled from booked" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error when canceling" }, { status: 500 });
  }
}
