"use client";

import React, { useState } from "react";
import AdminNav from "@/components/AdminNav";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  
  const [event, setEvent] = useState({
    name: "",
    price: "",
    date: "",
    location: "",
    description: "",
    time: "",
    image: null,
    category: "",
    seats:""
  });

  const [errors, setErrors] = useState({}); // Track validation errors

  const validate = () => {
    const newErrors = {};

   
    if (!event.name) newErrors.name = "Event name is required.";
    if (!event.description) newErrors.description = "Description is required.";
    if (!event.date) newErrors.date = "Event date is required.";
    if (!event.time) newErrors.time = "Event time is required.";
    if (!event.location) newErrors.location = "Location is required.";
    if (!event.price) newErrors.price = "Price is required.";
    if (!event.category) newErrors.category = "Category is required.";
    if (!event.image) newErrors.image = "Event poster is required.";

   
    if (event.price && event.price < 0) newErrors.price = "Price cannot be negative.";

    // File type validation for image
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (event.image && !validImageTypes.includes(event.image.type)) {
      newErrors.image = "Only JPG, JPEG, or PNG files are allowed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return; // Stop submission if validation fails

    const formData = new FormData();
    formData.append("name", event.name);
    formData.append("price", event.price);
    formData.append("date", event.date);
    formData.append("location", event.location);
    formData.append("description", event.description);
    formData.append("time", event.time);
    formData.append("category", event.category);
    formData.append("image", event.image);
    formData.append("seats", event.seats);

    axios
      .post("/api/event", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response.data);
        alert("Event added successfully!");
        router.push("/admin");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="w-full min-h-screen">
      <AdminNav />
      <div className="container flex items-center justify-center py-20">
        <form className="w-[50%]" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Event Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setEvent({ ...event, name: e.target.value })}
              placeholder="Enter name of the event"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label">Event Description</label>
            <textarea
              cols={80}
              className="px-2 py-2 border"
              onChange={(e) => setEvent({ ...event, description: e.target.value })}
              placeholder="Enter the description of this event"
            ></textarea>
            {errors.description && <p className="text-red-500">{errors.description}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => setEvent({ ...event, date: e.target.value })}
            />
            {errors.date && <p className="text-red-500">{errors.date}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label">Time</label>
            <input
              type="time"
              className="form-control"
              onChange={(e) => setEvent({ ...event, time: e.target.value })}
            />
            {errors.time && <p className="text-red-500">{errors.time}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setEvent({ ...event, location: e.target.value })}
            />
            {errors.location && <p className="text-red-500">{errors.location}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setEvent({ ...event, price: e.target.value })}
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}
          </div>
          
          <div className="mb-3">
            <label className="form-label">Seats</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setEvent({ ...event, seats: e.target.value })}
            />
            {errors.seats && <p className="text-red-500">{errors.seats}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Poster</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setEvent({ ...event, image: e.target.files[0] })}
            />
            {errors.image && <p className="text-red-500">{errors.image}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
           <div>
           <select
              onChange={(e) => setEvent({ ...event, category: e.target.value })}
            >
              <option value="">Select a category</option>
              <option value="Food">Food</option>
              <option value="Music">Music</option>
              <option value="Art">Art</option>
            </select>
           </div>
            {errors.category && <p className="text-red-500">{errors.category}</p>}
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
