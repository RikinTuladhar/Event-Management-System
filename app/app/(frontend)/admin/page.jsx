"use client";

import React, { useEffect, useState } from "react";
import AdminNav from "@/components/AdminNav";
import axios from "axios";
const page = () => {
  const admin = JSON.parse(localStorage.getItem("user"));
  const[total, setTotal] = useState({
    totalEvent: "",
    totalUser: "",
  });
  useEffect(() => {
    Promise.all([
      axios.get("/api/getTotalEvents"),
      axios.get("/api/getTotalUsers"),
    ])
      .then(([resForEvent, resForUser]) => {
        setTotal({
          totalEvent: resForEvent.data.message,
          totalUser: resForUser.data.message,
        });
        console.log(resForEvent.data.message, resForUser.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="w-full min-h-screen">
      <AdminNav />
      <div className="mt-10 text-center">
        <h2>Welcome {admin?.firstname} to dashboard </h2>
      </div>
      <div className="flex w-full px-10 py-10 justify-evenly">
        <div className="flex items-center justify-center rounded-xl w-[20%] h-[10rem] bg-slate-600">
          <h3>Total Events: {total?.totalEvent}</h3>
        </div>
        <div className="flex items-center justify-center rounded-xl w-[20%] h-[10rem] bg-slate-600">
          <h3>Total Users: {total?.totalUser}</h3>
        </div>
      </div>
    </div>
  );
};

export default page;
