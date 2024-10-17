import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="w-[25%] border px-10 py-20">
        <form>
          <h1>Sign up</h1>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
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
            />
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
              Check me out
            </label>
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
  );
};

export default page;
