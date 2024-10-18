"use client";
import Navbar from "@/components/AdminNav";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios
      .get("/api/booked/detailed")
      .then((res) => {
        console.log(res.data);
        setEvents(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen px-10 py-10 space-y-10 ">
        {events?.length > 0 ? (
          events.map((event) => (
            <div className="w-full flex bg-slate-300 h-[18rem]">
              <div className="w-[30%]  h-full bg-red-400">
                <img
                  className="w-full h-full"
                  src={
                    events?.image?.length == 0 ? "/noimage.jpg" : event.image
                  }
                  onError={(e) => (e.target.src = "/noimage.jpg")}
                  alt="event image"
                />
              </div>
              <div className="w-[70%] space-y-2 py-10 h-full px-10">
                <h2>{event.name}</h2>
                <h5 className="text-gray-500">Category: {event.category}</h5>
                <div className="space-x-2 text-xl">
                  <span>Total Seats: {event.seats} </span>
                  <span>Total Booked: {event.total_bookings} </span>
                </div>
                <div className="space-x-2 text-xl">
                  <span>Location: {event.location}</span>
                  <span>Time: {event.time}</span>
                  <span>Date: {event.date}</span>
                </div>
                <div>
                  <p>{event.description}</p>
                </div>
                <button className="px-5 py-2 bg-black borer rounded-2xl">
                  <Link
                    className="text-white no-underline "
                    href={`/admin/users-booked-events/${event.event_id}`}
                  >
                    View
                  </Link>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No Users have booked events</div>
        )}
      </div>
    </>
  );
};

export default page;
