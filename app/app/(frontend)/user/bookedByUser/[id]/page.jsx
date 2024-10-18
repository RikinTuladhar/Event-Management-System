"use client";
import Navbar from "@/components/UserNav";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";

const UserBookedEventsPage = ({ params }) => {
  const { id } = params;
  const [events, setEvents] = useState([]);
  const [reload, setReload] = useState(false);

  // Fetch booked events
  const fetchBookedEvents = useCallback(async () => {
    try {
      const res = await axios.get(`/api/booked/byuserId?userId=${id}`);
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchBookedEvents();
  }, [fetchBookedEvents, reload]);

  // Handle event cancellation
  const handleCancel = async (eventId, userId) => {
    const confirmation = confirm("Are you sure you want to cancel?");
    if (!confirmation) return;

    try {
      const res = await axios.delete(`/api/booked?event_id=${eventId}&user_id=${userId}`);
      alert(res.data.message);
      setReload(!reload);
    } catch (error) {
      console.error("Cancellation error:", error);
      alert(error?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen px-10 py-10 space-y-10">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Event Name</th>
              <th>Price</th>
              <th>Date</th>
              <th>Location</th>
              <th>Time</th>
              <th>Category</th>
              <th>View</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event, index) => (
                <tr key={event.event_id}>
                  <td>{index + 1}</td>
                  <td>{event.name}</td>
                  <td>{event.price}</td>
                  <td>{event.date}</td>
                  <td>{event.location}</td>
                  <td>{event.time}</td>
                  <td>{event.category}</td>
                  <td>
                    <Link href={`/events/${event.event_id}`}>View</Link>
                  </td>
                  <td
                    className="text-red-500 cursor-pointer hover:underline"
                    onClick={() => handleCancel(event.event_id, event.user_id)}
                  >
                    Cancel
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No events booked by you.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserBookedEventsPage;
