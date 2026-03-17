import React from "react";

export default function AboutPage() {
  return (
    <div className="section">
      <div className="container-main">
        {/* Page Title */}
        <div className="text-center mb-14">
          <h1 className="section-title">About CXO Orbit Global</h1>
          <p className="section-subtitle">
            A Premium Executive Leadership & Collaboration Platform
          </p>
        </div>

        {/* About Description */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="mb-6">
            CXO Orbit Global is a premium executive engagement and leadership
            platform dedicated to connecting, empowering, and enabling CXO
            leaders across industries and geographies.
          </p>

          <p className="mb-6">
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

        {/* Mission Vision */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Mission */}
          <div className="card text-center">
            <h2 className="text-2xl font-bold text-royal-blue mb-4">
              Our Mission
            </h2>

            <p>
              To create the world’s most trusted CXO community platform for
              collaboration, innovation, and leadership excellence.
            </p>
          </div>

          {/* Vision */}
          <div className="card text-center">
            <h2 className="text-2xl font-bold text-royal-blue mb-4">
              Our Vision
            </h2>

            <p>
              To become a globally recognized hub for executive knowledge
              exchange, strategic partnerships, and future-ready enterprise
              leadership.
            </p>
          </div>
        </div>

        {/* Journey Section */}
        <div className="mt-20">
          <h2 className="section-title text-center">Our Journey So Far</h2>

          <p className="text-center max-w-4xl mx-auto mb-10">
            CXO Orbit Global has successfully organized multiple executive
            engagements across leading technology hubs in India.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <h3 className="font-bold text-lg mb-2">Pune</h3>
              <p>CIO & CISO Closed-Door Roundtables</p>
            </div>

            <div className="card text-center">
              <h3 className="font-bold text-lg mb-2">Mumbai</h3>
              <p>Technology Leadership Forums</p>
            </div>

            <div className="card text-center">
              <h3 className="font-bold text-lg mb-2">Goa</h3>
              <p>CXO Networking & Strategy Sessions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
