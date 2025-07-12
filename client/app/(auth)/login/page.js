import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <>
      <h2 className="text-center text-3xl font-bold text-gray-900">
        Welcome back to Storio
      </h2>
      <form className="mt-8 space-y-4">
        <input
          type="email"
          placeholder="Email Address"
          className="w-full px-4 py-3 border rounded-md"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-orange-400 text-white py-3 rounded-md font-semibold"
        >
          Sign In
        </button>
      </form>
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        
        <Link href={"/signup"} className="text-orange-500 font-medium">Sign up</Link>
      </p>
    </>
  );
}
