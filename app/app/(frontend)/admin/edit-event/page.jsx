"use client";
import React, { useEffect, useState } from "react";
import AdminNav from "@/components/AdminNav";
import Link from "next/link";
import axios from "axios";
const page = () => {
  const [events, setEvents] = useState([]);
  useEffect(()=>{
    axios.get("/api/event")
    .then((res)=>{
      console.log(res.data)
      setEvents(res.data)
    }).catch((err)=>console.log(err))
  },[])

  return (
    <div className="w-full min-h-screen">
      <AdminNav />
      <div className="w-full flex items-center justify-evenly">
        <div></div>
        <h2 className="my-10 text-center">All Events</h2>
        <div>
          <button className="px-3 py-2 border bg-black ">
            <Link href="/admin/add-event">Add</Link>
          </button>
        </div>
      </div>
      <div className="container relative">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Price</th>
              <th scope="col">Location</th>
              <th scope="col">Category</th>
              <th scope="col">View</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {events &&
              events.map((e, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{e.name}</td>
                  <td>{e.date}</td>
                  <td>{e.time}</td>
                  <td>{e.price}</td>
                  <td>{e.location}</td>
                  <td>{e.category}</td>
                  <td><Link href={`/events/${e.id}`}>View</Link></td>
                  <td>Edit</td>
                  <td>Delete</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
