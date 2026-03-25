import React from "react";

function Contact() {
  return (
    <div className="px-4 sm:px-8 lg:px-20 py-6 sm:py-10 bg-gray-50 min-h-screen">

      {/* Breadcrumb */}
      <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
        Home / <span className="text-black">Contact</span>
      </p>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

        {/* LEFT SIDE */}
        <div className="
          w-full 
          lg:w-1/3 
          bg-white 
          p-5 sm:p-6 
          shadow 
          rounded-lg
        ">

          {/* Call */}
          <div className="mb-6">
            <h3 className="font-semibold text-base sm:text-lg mb-2">
              📞 Call To Us
            </h3>

            <p className="text-gray-500 text-sm">
              We are available 24/7, 7 days a week.
            </p>

            <p className="mt-2 text-sm">
              Phone: +91 9234623044
            </p>
          </div>

          <hr className="my-4" />

          {/* Email */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-2">
              ✉️ Write To Us
            </h3>

            <p className="text-gray-500 text-sm">
              Fill out our form and we will contact you within 24 hours.
            </p>

            <p className="mt-2 text-sm">
              customer@exclusive.com
            </p>

            <p className="text-sm">
              support@exclusive.com
            </p>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="
          w-full 
          lg:w-2/3 
          bg-white 
          p-5 sm:p-6 
          shadow 
          rounded-lg
        ">

          {/* Inputs Row */}
          <div className="
            flex 
            flex-col 
            sm:flex-row 
            gap-4 
            mb-4
          ">
            <input
              type="text"
              placeholder="Your Name *"
              className="
                w-full 
                sm:w-1/3 
                p-2 
                border 
                rounded
              "
            />

            <input
              type="email"
              placeholder="Your Email *"
              className="
                w-full 
                sm:w-1/3 
                p-2 
                border 
                rounded
              "
            />

            <input
              type="text"
              placeholder="Your Phone *"
              className="
                w-full 
                sm:w-1/3 
                p-2 
                border 
                rounded
              "
            />
          </div>

          {/* Message */}
          <textarea
            placeholder="Your Message"
            rows="6"
            className="
              w-full 
              p-3 
              border 
              rounded 
              mb-4
            "
          ></textarea>

          {/* Button */}
          <div className="text-center sm:text-right">
            <button
              className="
                bg-red-500 
                hover:bg-red-600 
                text-white 
                px-6 
                py-2 
                rounded 
                w-full 
                sm:w-auto
              "
            >
              Send Message
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Contact;