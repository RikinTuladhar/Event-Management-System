import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
export async function GET() {
  try {
    const db = await connectToDatabase();
    const sql = "SELECT * FROM event";
    const [events] = await db.query(sql);
    return NextResponse.json(events);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error when fetching events" },
      { status: 500 }
    );
  }
}

const uploadDir = path.join(process.cwd(), "public", "uploads"); // Define your upload directory

export async function POST(req) {
  const formData = await req.formData(); // Extract FormData from request
  const name = formData.get("name");
  const price = formData.get("price");
  const date = formData.get("date");
  const location = formData.get("location");
  const description = formData.get("description");
  const time = formData.get("time");
  const image = formData.get("image");
  const category = formData.get("category");

  // Check if image is present
  if (!image) {
    return NextResponse.json(
      { message: "File not found in the request" },
      { status: 400 }
    );
  }

  const arrayBuffer = await image.arrayBuffer(); // Read file into buffer
  const buffer = new Uint8Array(arrayBuffer); // Convert to Uint8Array
  const filePath = path.join(uploadDir, image.name); // Fixing the file path usage

  try {
    // Write file to the server
    await fs.writeFile(filePath, buffer);

    // Validate fields
    if (!name || !price || !date || !location || !description || !time) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert into the database
    const db = await connectToDatabase();
    const sql =
      "INSERT INTO event(`name`, `price`, `date`, `location`, `description`, `time`, `category`, `image`) VALUES (?,?,?,?,?,?,?,?)";

    await db.query(sql, [
      name,
      price,
      date,
      location,
      description,
      time,
      category,
      `/uploads/${image.name}`,
    ]);

    return NextResponse.json(
      { message: "Event created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error when creating event" },
      { status: 500 }
    );
  }
}

export async function PUT(params) {}
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    const db = await connectToDatabase();
    const sql = "DELETE FROM event WHERE id = ?";
    await db.query(sql, [id]);
    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );  // Changed status to 200
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error when deleting event" },
      { status: 500 }
    );
  }
}
