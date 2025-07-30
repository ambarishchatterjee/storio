import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <div className=" bg-white px-6 py-12 text-gray-900 flex flex-col justify-between">
        <div className="max-w-6xl mx-auto w-full">
          <Navigation />
          <Outlet />
        </div>
      </div>
      <Footer />

      <Copyright />
    </>
  );
}
