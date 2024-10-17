"use client";
import Navbar from "@/components/Navbar";
import AdminNav from "@/components/AdminNav";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { Clock } from "lucide-react";
import { MapPin } from "lucide-react";
import { Bookmark } from "lucide-react";
import { Users } from "lucide-react";
const page = ({ params }) => {
  const { id } = params;
  const user = JSON.parse(window.localStorage.getItem("user"));
  const [event, setEvent] = useState({
    id: "",
    name: "",
    price: "",
    date: "",
    location: "",
    description: "",
    time: "",
    image: "",
    category: "",
    seats: "",
  });
  useEffect(() => {
    axios
      .get(`/api/event/${id}`)
      .then((res) => {
        console.log(res.data);
        setEvent(res?.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {user.role === "USER" ? <Navbar /> : <AdminNav />}
      <div className="w-full min-h-screen ">
        <div className="w-full flex justify-center space-x-10  items-center px-10 h-[20rem] bg-blue-600">
          <div className="w-[20%] h-[90%]">
            <img
              className="object-contain w-full h-full rounded-2xl"
              src={event.image}
              alt=""
            />
          </div>
          <div className="px-10 ">
            <h2>{event.name}</h2>
            <div className="flex items-center gap-2">
              <CalendarDays />{" "}
              <div>
                <h5>{event.date}</h5>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {" "}
              <Clock />
              <h5>{event.time}</h5>
            </div>
            <div className="flex items-center gap-2">
              {" "}
              <MapPin />
              <h5>{event.location}</h5>
            </div>
            <div className="flex items-center gap-2">
              {" "}
              <Users />
              <h5>Total: {event.seats}</h5>
            </div>
          </div>
          <div className="px-10 py-12 ">
            <div className="flex flex-col items-center justify-between gap-2 px-10 py-3 bg-purple-400 border rounded-3xl ">
              <div className="flex gap-2">
                {" "}
                <h5>Rs {event.price}</h5>
              </div>
              {user.role == "USER" && (
                <div className="px-2 py-1 bg-red-400 rounded-2xl">
                  <h5 className="text-white">Book Now</h5>
                </div>
              )}
              {user.role == "USER" && (
                <div className="flex gap-2">
                  {" "}
                  <Bookmark />
                  <h5>Bookmark</h5>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-[50%] flex justify-center items-center py-5">
          <div>
            <h3>Event Description</h3>
            <h5 className="text-gray-500">Category: {event.category}</h5>
            <div className="mt-10">
              <p>{event.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
