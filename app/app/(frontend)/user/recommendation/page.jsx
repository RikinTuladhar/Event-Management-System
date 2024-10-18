"use client";
import Navbar from "@/components/UserNav";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    const { id } = user;
    axios
      .get(`/api/algorithm?userId=${id}`)
      .then((res) => {
        console.log(res.data);
        setEvents(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Navbar />
      <div className="w-full min-h-min ">
        <h3 className="ml-10 my-10">Recommendation </h3>
        <div className="w-[90%] flex justify-evenly py-10">
          {events.length > 0 ? (
            events.map((e) => (
              <div className="bg-slate-200 border  w-[18rem]">
                <img
                  src={e?.image}
                  onError={(e) => (e.target.src = "/noimage.jpg")}
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body py-2 space-y-3">
                  <h3 class="card-title px-2">{e?.name}</h3>
                  <h5 class="card-title px-2 text-gray-500">
                    Category: {e?.category}
                  </h5>
                  <p class="card-text px-2">
                    {e?.description.length > 100
                      ? e?.description.slice(0, 100) + "..."
                      : e?.description}
                  </p>
                  <div className="w-full pl-5 py-2">
                  <Link href={`/events/${e.id}`} class=" btn btn-primary">
                    View
                  </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No recommendation for you</div>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
