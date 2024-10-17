"use client";

import React from "react";
import AdminNav from "@/components/AdminNav";
const page = () => {
  const admin = JSON.parse(localStorage.getItem("user"))
  return (
    <div className="w-full min-h-screen">
      <AdminNav />
      <div className="mt-10 text-center">
        <h2>Welcome Admin {admin?.firstname} </h2>
      </div>
      <div className="flex w-full px-10 py-10 justify-evenly">
        <div className="flex items-center justify-center w-[20%] h-[10rem] bg-slate-600">
          <h3>Total Events</h3>
        </div>
        <div className="flex items-center justify-center w-[20%] h-[10rem] bg-slate-600">
          <h3>Total Booked</h3>
        </div>
      </div>
    </div>
  );
};

export default page;
