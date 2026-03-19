import React from "react";
import bhushan from "../../assets/advisory/bhushan.jpg";
import sandesh from "../../assets/advisory/sandesh.jpg";
import randhir from "../../assets/advisory/randhir.jpg";

export default function AboutPage() {
  const advisors = [
    {
      name: "Bhushan Patil",
      role: "Strategy & Finance Director",
      image: bhushan,
      desc: "22+ years across strategy, finance, and governance. Leads capital strategy, risk management, and compliance frameworks for institutional partnerships.",
    },
    {
      name: "Sandesh Yadav",
      role: "Cybersecurity Advisor",
      image: sandesh,
      desc: "Cybersecurity expert with 20+ years in cloud security, application defense, and enterprise compliance. Ensures secure digital growth.",
    },
    {
      name: "Dr. Randhir Padwal",
      role: "Technology & Strategy Advisor",
      image: randhir,
      desc: "Technology leader with expertise in digital transformation, cybersecurity, ERP modernization, and regulatory compliance across industries.",
    },
  ];

  return (
    <div className="section">
      <div className="container-main">
        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="section-title">About CXO Orbit Global</h1>
          <p className="section-subtitle">
            A Premium Executive Leadership & Collaboration Platform
          </p>
        </div>

        {/* About Description */}
        <div className="max-w-4xl mx-auto text-center mb-10">
          <p className="mb-4">
            CXO Orbit Global is a premium executive engagement and leadership
            platform dedicated to connecting, empowering, and enabling CXO
            leaders across industries and geographies.
          </p>

          <p className="mb-4">
            The platform was created with a vision to build a trusted ecosystem
            where CIOs, CISOs, CTOs, and business leaders collaborate, exchange
            strategic insights, and shape the future of enterprise technology
            and leadership.
          </p>

          <p>
            Through curated roundtables, leadership forums, and executive
            conferences, CXO Orbit Global fosters meaningful conversations,
            high-value peer connections, and long-term strategic partnerships.
          </p>
        </div>

        {/* ── Our Recognition ───────────────── */}
        <section className="py-4">
          {/* Title */}
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-[#0B2C4D] tracking-wide">
              Our Recognition
            </h2>

            <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>

            <p className="fade-up text-gray-600 text-base md:text-lg mt-3 max-w-2xl mx-auto">
              Guided by{" "}
              <span className="text-soft-gold font-semibold">
                distinguished industry leaders
              </span>{" "}
              and advisors
            </p>
          </div>

          {/* Advisors Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {advisors.map((member, index) => (
              <div
                key={index}
                className="card-animate bg-white shadow-md rounded overflow-hidden hover:shadow-xl transition duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-[4/3] object-fill transition duration-500 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-4 text-center">
                  <h3 className="text-[#0B2C4D] font-bold text-lg">
                    {member.name}
                  </h3>

                  <p className="text-soft-gold text-sm font-semibold mb-2">
                    {member.role}
                  </p>

                  <p className="text-gray-600 text-sm">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Vision */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="card text-center">
            <h2 className="text-xl font-bold text-royal-blue mb-2">
              Our Mission
            </h2>
            <p className="text-sm">
              To create the world’s most trusted CXO community platform for
              collaboration, innovation, and leadership excellence.
            </p>
          </div>

          <div className="card text-center">
            <h2 className="text-xl font-bold text-royal-blue mb-2">
              Our Vision
            </h2>
            <p className="text-sm">
              To become a globally recognized hub for executive knowledge
              exchange, strategic partnerships, and future-ready leadership.
            </p>
          </div>
        </div>

        {/* Journey */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-[#0B2C4D] text-center mb-4">
            Our Journey So Far
          </h2>

          <p className="text-center max-w-3xl mx-auto mb-6 text-sm">
            CXO Orbit Global has successfully organized multiple executive
            engagements across leading technology hubs in India.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <h3 className="font-bold text-lg mb-1">Pune</h3>
              <p className="text-sm">CIO & CISO Roundtables</p>
            </div>

            <div className="card text-center">
              <h3 className="font-bold text-lg mb-1">Mumbai</h3>
              <p className="text-sm">Leadership Forums</p>
            </div>

            <div className="card text-center">
              <h3 className="font-bold text-lg mb-1">Goa</h3>
              <p className="text-sm">CXO Strategy Sessions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
