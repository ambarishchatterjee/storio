import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 mb-20">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Store, share, and <br /> access your files securely
          </h1>
          <p className="text-lg mb-8 text-gray-700">
            Secure cloud storage for all your documents, photos, and more.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-gradient-to-r from-purple-500 to-orange-400 text-white text-lg px-6 py-3 rounded-md font-semibold shadow hover:opacity-90"
          >
            Get Started
          </Link>
        </div>
        <div className="bg-[#f7f7f7] rounded-lg shadow-md p-6 border border-gray-200 space-y-4">
          <h3 className="text-xl font-semibold text-center">
            Your Files, Organized
          </h3>
          <div className="flex justify-center">
            <img
              src={"/storio_logo.webp"}
              width={128}
              height={128}
              className="w-32 h-32"
              alt="Storio Logo"
            />
          </div>
          <button className="bg-[#ececec] px-6 py-2 rounded-md text-gray-900 font-medium w-full hover:bg-[#e2e2e2]">
            Upload
          </button>
          <ul className="text-sm text-gray-600 space-y-1 list-disc pl-6">
            <li>Upload, manage, and preview all file types</li>
            <li>Tag files and search with advanced filters</li>
            <li>Easily share your files with security in mind</li>
            <li>20GB of free storage</li>
          </ul>
        </div>
      </div>
      
      {/* <Footer /> */}
    </>
  )
}
