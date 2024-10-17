"use client";
import React, { useEffect, useState } from "react";
import AdminNav from "@/components/AdminNav";
import Link from "next/link";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
const page = () => {
  const [events, setEvents] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    axios
      .get("/api/event")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => console.log(err));
  }, [reload]);

  function handleDelete(id) {
    const isDelete = confirm("Are you sure you want to delete?");
    if (isDelete) {
      console.log(id);
      axios
        .delete(`/api/event?id=${id}`)
        .then((res) => {
          console.log(res.data.message);
          alert(res.data.message);
          setReload(!reload);
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  }

  return (
    <div className="w-full min-h-screen">
      <AdminNav />
      <div className="flex items-center w-full justify-evenly">
        <div></div>
        <h2 className="my-10 text-center">All Events</h2>
        <div>
          <button className="px-3 py-2 bg-black border rounded-xl ">
            <Link href="/admin/add-event" className="text-white no-underline ">
              Add
            </Link>
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
              events.map((event, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{event.name}</td>
                  <td>{event.date}</td>
                  <td>{event.time}</td>
                  <td>{event.price}</td>
                  <td>{event.location}</td>
                  <td>{event.category}</td>

                  <td>
                    <Link href={`/events/${event.id}`}>View</Link>
                  </td>
                  <td>
                    {" "}
                    <Link className="text-black" href={`/admin/edit-event/${event.id}`}>
                      {" "}
                      <Pencil />
                    </Link>
                  </td>
                  <td
                    className="cursor-pointer"
                    onClick={(e) => handleDelete(event.id)}
                  >
                    {" "}
                    <Trash2 />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
