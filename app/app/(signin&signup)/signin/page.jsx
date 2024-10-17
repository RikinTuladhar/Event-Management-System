"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/api/admin/login", user)
      .then((res) => {
        console.log(res)
        window.localStorage.setItem("user",JSON.stringify(res.data))
        alert("Welcome user "  + res.data.firstname)
        if(res.data.role == "ADMIN"){
          router.push("/admin")
        }else{
          router.push("/user")
        }
      })
      .catch((err) => {
        alert(err.response.data.message)
        console.log(err)
      });
    console.log(user);
  }
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="w-[25%] border px-10 py-20">
        <form onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <div id="emailHelp" className="form-text">
              {}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <div className="flex flex-col w-full gap-y-5">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button>
              <Link href={"/"}> Go back</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
