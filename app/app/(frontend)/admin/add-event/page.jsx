"use client";

import React, { useEffect, useState } from "react";
import AdminNav from "@/components/AdminNav";
import axios from "axios";

const page = () => {
  const [event, setEvent] = useState({
    name: "",
    price: "",
    date: "",
    location: "",
    description: "",
    time: "",
    image: null, // Use null for the image initially
    category:""
  });

  function handleSubmit(e) {
    e.preventDefault();
    
    // Create a FormData object
    const formData = new FormData();
    formData.append("name", event.name);
    formData.append("price", event.price);
    formData.append("date", event.date);
    formData.append("location", event.location);
    formData.append("description", event.description);
    formData.append("time", event.time);
    formData.append("category", event.category);
    formData.append("image", event.image); // Append the file
    
    // Send the FormData object using axios
    axios.post("/api/event", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
  }

  return (
    <div className="w-full min-h-screen">
      <AdminNav />
      <div className=" py-20 container flex justify-center items-center">
        <form className="w-[50%] " onSubmit={handleSubmit}>
          <div className="mb-3 ">
            <label className="form-label">Event Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setEvent({ ...event, name: e.target.value })}
            />
          </div>
          <div className="mb-3 ">
            <label className="form-label">Event Description</label>
            <div>
              <textarea
                cols={100}
                onChange={(e) => setEvent({ ...event, description: e.target.value })}
              ></textarea>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => setEvent({ ...event, date: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Time</label>
            <input
              type="time"
              className="form-control"
              onChange={(e) => setEvent({ ...event, time: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setEvent({ ...event, location: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setEvent({ ...event, price: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Poster</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setEvent({ ...event, image: e.target.files[0] })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
          <div>
          <select name="" id="" onChange={e=>setEvent({...event,category:e.target.value})} >
                <option value="Food">Food</option>
                <option value="Music">Music</option>
                <option value="Art">Art</option>
            </select>
          </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
