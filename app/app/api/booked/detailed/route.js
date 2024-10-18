import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
// SELECT 
//     e.id AS event_id, 
//     e.name, 
//     e.price, 
//     e.date, 
//     e.location, 
//     e.description, 
//     e.time, 
//     e.image, 
//     e.category, 
//     e.seats, 
//     e.occupied,
//     COUNT(b.id) AS total_bookings
// FROM 
//     ems.booked b 
// INNER JOIN 
//     ems.user u ON b.user_id = u.id 
// INNER JOIN 
//     ems.event e ON b.event_id = e.id 
// GROUP BY 
//     e.id;

export async function GET(req){
    try {
        const db = await connectToDatabase();
        const sql = "SELECT e.id AS event_id, e.name, e.price, e.date, e.location, e.description, e.time, e.image, e.category, e.seats, e.occupied,COUNT(b.id) AS total_bookings FROM ems.booked b INNER JOIN ems.user u ON b.user_id = u.id INNER JOIN ems.event e ON b.event_id = e.id GROUP BY e.id ";
        const [detailed] = await db.query(sql);
        return NextResponse.json(detailed);
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {message:"Error when fetching detailed booked data"},
            {status:500}
        );
    }
}