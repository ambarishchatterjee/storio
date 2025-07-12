import React from "react";

export default function page() {
  return (
    <div className=" bg-white px-6 py-2 text-gray-900">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-6 text-center">
          Get in Touch
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Have questions? Need support? We'd love to hear from you.
        </p>

        <form className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            required
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-md font-medium hover:bg-purple-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
