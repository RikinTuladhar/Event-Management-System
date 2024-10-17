"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "USER",
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(user);
    axios
      .post("/api/user/register", user)
      .then((res) => {
        console.log(res);
        router.push("/signin")
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-full min-h-screen py-10">
        <div className="w-[25%] border px-10 py-20">
          <form onSubmit={handleSubmit}>
            <h1>Sign up for user</h1>

            <div class="mb-3">
              <label class="form-label">First Name</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) =>
                  setUser({ ...user, firstname: e.target.value })
                }
              />
              <div id="emailHelp" class="form-text">
                {}
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Last Name</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setUser({ ...user, lastname: e.target.value })}
              />
              <div id="emailHelp" class="form-text">
                {}
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Email address</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <div id="emailHelp" class="form-text">
                {}
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>

            <div className="flex flex-col w-full gap-y-5">
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
              <button>
                <Link href={"/"}> Go back</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
