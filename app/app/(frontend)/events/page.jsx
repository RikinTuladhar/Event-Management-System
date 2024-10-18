"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios.get("/api/event").then((res) => {
      setEvents(res.data);
    });
  }, []);
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-slate-200">
        <h1 className="text-center">List of events</h1>
        <div className="grid w-full grid-cols-3 py-10 gap-y-10 justify-items-center">
          {events.map((event) => (
            <div className="card w-[15rem]">
              <img
                src={event.image}
                onError={(e) => (e.target.src = "/noimage.jpg")}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="text-gray-500">{event.category}</p>
                <p class="card-text px-2">
                  {event?.description.length > 100
                    ? event?.description.slice(0, 100) + "..."
                    : event?.description}
                </p>
                <Link href={`/events/${event.id}`} className="btn btn-primary">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
