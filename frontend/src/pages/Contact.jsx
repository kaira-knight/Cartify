import React from "react";

function Contact() {
  return (
    <div className="px-20 py-10 bg-gray-50 min-h-screen">

      {/* Breadcrumb */}
      <p className="text-gray-500 mb-8">Home / <span className="text-black">Contact</span></p>

      <div className="flex gap-8">

        {/* LEFT SIDE */}
        <div className="w-1/3 bg-white p-6 shadow rounded-lg">

          {/* Call */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">📞 Call To Us</h3>
            <p className="text-gray-500 text-sm">
              We are available 24/7, 7 days a week.
            </p>
            <p className="mt-2 text-sm">Phone: +8801611112222</p>
          </div>

          <hr className="my-4" />

          {/* Email */}
          <div>
            <h3 className="font-semibold text-lg mb-2">✉️ Write To Us</h3>
            <p className="text-gray-500 text-sm">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className="mt-2 text-sm">customer@exclusive.com</p>
            <p className="text-sm">support@exclusive.com</p>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="w-2/3 bg-white p-6 shadow rounded-lg">

          {/* Inputs */}
          <div className="flex gap-4 mb-4">
            <input type="text" placeholder="Your Name *" className="w-1/3 p-2 border rounded" />
            <input type="email" placeholder="Your Email *" className="w-1/3 p-2 border rounded" />
            <input type="text" placeholder="Your Phone *" className="w-1/3 p-2 border rounded" />
          </div>

          {/* Message */}
          <textarea
            placeholder="Your Message"
            rows="6"
            className="w-full p-3 border rounded mb-4"
          ></textarea>

          {/* Button */}
          <div className="text-right">
            <button className="bg-red-500 text-white px-6 py-2 rounded">
              Send Message
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Contact;
