"use client";
import Navbar from "@/components/AdminNav";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = ({ params }) => {
  if (!params?.eventId) return <div>Loading...</div>; // Ensure params are ready

  const [events, setEvents] = useState([]);

  const { eventId } = params;
  useEffect(() => {
    axios
      .get(`/api/booked`)
      .then((res) => {
        console.log(res.data);
        const filtered = res.data.filter((i) => i.event_id == eventId);
        console.log(filtered);
        setEvents(filtered);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center w-full min-h-screen px-10 py-10 ">
        {events.length > 0 ? (
          <div className="w-[80%] px-10 py-5 rounded-md bg-slate-200 h-full">
            <div className="w-full mb-5 h-[30rem]">
              <img
                className="object-contain w-full h-full"
                src={events[0]?.image}
                onError={(e) => (e.target.src = "/noimage.jpg")}
                alt="Image of event"
              />
            </div>
            <div>
              <h1>{events[0].name}</h1>
            </div>
            <div className="text-gray-700">
              <h3>Category :{events[0].category}</h3>
            </div>
            <div className="w-full space-x-10 font-bold ">
              <span>Total Seats: {events[0].seats}</span>
              <span>Total Booked: {events.length}</span>
            </div>
            <div className="flex flex-col font-bold w-fulltext-xl ">
              <span>Location: {events[0].location} </span>
              <span>Time: {events[0].time}</span>
              <span>Date: {events[0].date}</span>
            </div>

            <div className="py-10">
              <p>{events[0].description}</p>
            </div>
            <div className="w-full">
              <h3>Users Who have booked</h3>
              <table className="table w-full">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((e, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{e?.firstname}</td>
                      <td>{e?.lastname}</td>
                      <td>{e?.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>No Data found</div>
        )}
      </div>
    </>
  );
};

export default Page;
