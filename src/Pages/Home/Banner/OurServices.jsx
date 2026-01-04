import React from "react";

const howItWorks = [
  { title: "Booking Pick & Drop", desc: "From personal packages to business shipments — we deliver on time, every time." },
  { title: "Cash On Delivery", desc: "From personal packages to business shipments — we deliver on time, every time." },
  { title: "Delivery Hub", desc: "From personal packages to business shipments — we deliver on time, every time." },
  { title: "Booking SME & Corporate", desc: "From personal packages to business shipments — we deliver on time, every time." },
];

const services = [
  { title: "Express & Standard Delivery", highlight: false },
  { title: "Nationwide Delivery", highlight: true },
  { title: "Fulfillment Solution", highlight: false },
  { title: "Cash on Home Delivery", highlight: false },
  { title: "Corporate Service / Contract Logistics", highlight: false },
  { title: "Parcel Return", highlight: false },
];

const OurServices = () => {
  return (
    <div className="space-y-20">

      {/* ================= HOW IT WORKS ================= */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          How it Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((item, index) => (
            <div key={index} className="card bg-white shadow-md">
              <div className="card-body text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  📍
                </div>
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= OUR SERVICES ================= */}
      <section className="bg-[#0a3a4a] py-16 px-4 rounded-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white border border-dashed inline-block px-6 py-2 rounded-lg">
            Our Services
          </h2>
          <p className="text-gray-300 mt-4 max-w-xl mx-auto text-sm">
            Enjoy fast, reliable parcel delivery and flexible logistics solutions
            all over Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className={`card shadow-md ${
                service.highlight
                  ? "bg-lime-300 scale-105"
                  : "bg-white"
              }`}
            >
              <div className="card-body text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  📦
                </div>
                <h3 className="font-semibold text-sm">{service.title}</h3>
                <p className="text-xs text-gray-600">
                  Reliable logistics service tailored for your business needs.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default OurServices;