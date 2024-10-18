import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

const cosineSimilarity = (vec1, vec2) => {
  const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
  const magnitudeA = Math.sqrt(vec1.reduce((sum, val) => sum + val ** 2, 0));
  const magnitudeB = Math.sqrt(vec2.reduce((sum, val) => sum + val ** 2, 0));
  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
};

// API Route Handler
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();

    // Fetch all users and bookings
    const [users] = await db.query("SELECT id FROM user");
    const [bookings] = await db.query("SELECT user_id, event_id FROM booked");

    // Build the User-Event Matrix
    const userEventMatrix = {};
    users.forEach((user) => (userEventMatrix[user.id] = []));
    bookings.forEach(({ user_id, event_id }) => {
      userEventMatrix[user_id].push(event_id);
    });

    // Calculate Similarity Scores
    const currentUserVector = userEventMatrix[userId] || [];
    const similarityScores = users
      .filter((user) => user.id !== parseInt(userId))
      .map((user) => ({
        userId: user.id,
        similarity: cosineSimilarity(
          currentUserVector,
          userEventMatrix[user.id]
        ),
      }))
      .sort((a, b) => b.similarity - a.similarity);

    // Find Recommended Events
    const recommendedEvents = new Set();
    similarityScores.forEach((simUser) => {
      userEventMatrix[simUser.userId].forEach((eventId) => {
        if (!currentUserVector.includes(eventId)) {
          recommendedEvents.add(eventId);
        }
      });
    });

    // Ensure recommendedEvents is an array of IDs
    const eventIds = Array.from(recommendedEvents);
    if (eventIds.length === 0) {
      return NextResponse.json([]);
    }

    // Fetch Event Details
    const placeholders = eventIds.map(() => "?").join(","); // Generate placeholders like ?,?,?
    const [events] = await db.query(
      `SELECT * FROM event WHERE id IN (${placeholders})`,
      eventIds
    );

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
