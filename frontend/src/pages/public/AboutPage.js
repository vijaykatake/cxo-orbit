import React, { useState } from "react";
import Rahul from "../../assets/advisory/Subodh.jpeg";
import Priyanka from "../../assets/advisory/Priyanka.jpeg";
import Sudesh from "../../assets/advisory/sandesh.jpg";
import bhushan from "../../assets/advisory/bhushan01.jpg";
import randhir from "../../assets/advisory/randhir.jpg";
import Subodh from "../../assets/advisory/Rahul.jpeg";
import PrasadT from "../../assets/advisory/PrasadT.jpeg";
export default function AboutPage() {
  /* =========================
     DATA
  ========================= */

  const teamMembers = [
    {
      name: "Subodh Naik",
      role: "Head Operations",
      image: Subodh,
      desc: "Leads operations strategy and execution across CXO Orbit initiatives.",
    },
    {
      name: "Priyanka Gundu",
      role: "Manager Operations",
      image: Priyanka,
      desc: "Ensures seamless coordination of events and member engagement.",
    },
  ];

  const advisoryMembers = [
    {
      name: "Randhir Padwal",
      image: randhir,
      role: "Advisory Member",
      desc: "Strategic advisor with strong experience in enterprise leadership.",
    },
    {
      name: "Sandesh Yadav",
      image: Sudesh,
      role: "Advisory Member",
      desc: "Guides CXO engagement and ecosystem partnerships.",
    },
    {
      name: "Rahul Mergu",
      image: Rahul,
      role: "Advisory Member",
      desc: `Rahul Shivram Mergu is a seasoned professional with expertise in cybersecurity, cloud computing, and strategic IT leadership. Holding certifications like CISM and CCISO, he has deep experience in AWS and Azure environments.

With CXO-level experience (CISO/CIO roles), he aligns IT strategy with business goals effectively. He has 23+ years of experience across multiple industries.

Currently serving as Vice President IT at MarketsandMarkets Research Pvt Ltd.`,
    },
    {
      name: "Bhushan Patil",
      image: bhushan,
      role: "Advisory Member",
      desc: "Supports strategic growth and executive networking.",
    },
    {
      name: "Sagar Mulik",
      image: null,
      role: "Advisory Member",
      desc: "Expert in enterprise operations and scaling organizations.",
    },
    {
      name: "Sangeeta Kant",
      image: null,
      role: "Advisory Member",
      desc: "Focuses on leadership development and CXO collaboration.",
    },
    {
      name: "Prasad Tripurari",
      image: PrasadT,
      role: "Advisory Member",
      desc: `Prasad Tripurari is a Transformational CTO and has over 25 years of experience as the driving force behind large-scale technology innovation and business transformation. Currently, he is leading the technology and digital strategy at the Ramoji Group of Companies. He is the recipient of numerous prestigious awards and recognition, such as the Cyber Security Award, AI Award, Top 25 Digital Star Award, and CIO 100 Award and is also a Certified Independent Director.

His skills and experience cover technology strategy, artificial intelligence, cybersecurity, cloud computing, and emerging technology, and he also has strong experience working and mentoring cross-functional and high-performing teams. Prasad has a proven record of designing and implementing enterprise-level solutions that bring business impact.`,
    },
  ];

  /* =========================
     STATE (MODAL)
  ========================= */

  const [selectedMember, setSelectedMember] = useState(null);

  const closeModal = () => setSelectedMember(null);

  /* =========================
     MEMBER CARD
  ========================= */

  const MemberCard = ({ member, role }) => (
    <div className="bg-white shadow-md rounded overflow-hidden hover:shadow-xl transition duration-300 mx-auto w-full max-w-sm flex flex-col">
      {/* Image */}
      <div className="w-full h-48 flex items-center justify-center bg-gray-100 overflow-hidden">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="max-h-full object-contain transition duration-500 hover:scale-105"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-[#0B2C4D] text-white flex items-center justify-center text-xl font-bold">
            {member.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 text-center flex flex-col flex-grow">
        <h3 className="text-[#0B2C4D] font-bold text-lg">{member.name}</h3>

        {role && (
          <p className="text-soft-gold text-sm font-semibold mt-1">{role}</p>
        )}

        {/* Short Description */}
        {member.desc && (
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {member.desc}
          </p>
        )}

        {/* Read More */}
        {member.desc && (
          <button
            onClick={() => setSelectedMember(member)}
            className="text-blue-600 text-xs mt-2 hover:underline"
          >
            Read More →
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="section">
      <div className="container-main">
        {/* TITLE */}
        <div className="text-center mb-10">
          <h1 className="section-title">About CXO Orbit Global</h1>
          <p className="section-subtitle">
            A Premium Executive Leadership & Collaboration Platform
          </p>
        </div>
        {/* =========================
    ABOUT DESCRIPTION
========================= */}
        <section className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-gray-600 text-sm md:text-base leading-7 mb-4">
            CXO Orbit Global is a premium executive engagement and leadership
            platform dedicated to connecting, empowering, and enabling CXO
            leaders across industries and geographies.
          </p>

          <p className="text-gray-600 text-sm md:text-base leading-7 mb-4">
            The platform was created with a vision to build a trusted ecosystem
            where CIOs, CISOs, CTOs, and business leaders collaborate, exchange
            strategic insights, and shape the future of enterprise technology
            and leadership.
          </p>

          <p className="text-gray-600 text-sm md:text-base leading-7">
            Through curated roundtables, leadership forums, and executive
            conferences, CXO Orbit Global fosters meaningful conversations,
            high-value peer connections, and long-term strategic partnerships.
          </p>
        </section>
        {/* OUR TEAM */}
        <section className="py-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-[#0B2C4D]">Our Team</h2>
            <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {teamMembers.map((member, i) => (
              <MemberCard key={i} member={member} role={member.role} />
            ))}
          </div>
        </section>

        {/* ADVISORY */}
        <section className="py-10">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-[#0B2C4D]">
              Advisory Members
            </h2>
            <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advisoryMembers.map((member, i) => (
              <MemberCard key={i} member={member} role={member.role} />
            ))}
          </div>
        </section>
        {/* =========================
    MISSION & VISION
========================= */}
        <section className="mt-12">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Mission */}
            <div className="bg-white shadow-md rounded p-6 text-center hover:shadow-lg transition">
              <h2 className="text-xl font-bold text-[#0B2C4D] mb-2">
                Our Mission
              </h2>
              <p className="text-gray-600 text-sm leading-6">
                To create the world’s most trusted CXO community platform for
                collaboration, innovation, and leadership excellence.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white shadow-md rounded p-6 text-center hover:shadow-lg transition">
              <h2 className="text-xl font-bold text-[#0B2C4D] mb-2">
                Our Vision
              </h2>
              <p className="text-gray-600 text-sm leading-6">
                To become a globally recognized hub for executive knowledge
                exchange, strategic partnerships, and future-ready leadership.
              </p>
            </div>
          </div>
        </section>

        {/* =========================
    JOURNEY
========================= */}
        <section className="mt-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-[#0B2C4D]">
              Our Journey So Far
            </h2>

            <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>

            <p className="text-gray-600 text-sm mt-3 max-w-2xl mx-auto">
              CXO Orbit Global has successfully organized multiple executive
              engagements across leading technology hubs in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Pune */}
            <div className="bg-white shadow-md rounded p-5 text-center hover:shadow-lg transition">
              <h3 className="font-bold text-lg text-[#0B2C4D] mb-1">Pune</h3>
              <p className="text-gray-600 text-sm">CIO & CISO Roundtables</p>
            </div>

            {/* Mumbai */}
            <div className="bg-white shadow-md rounded p-5 text-center hover:shadow-lg transition">
              <h3 className="font-bold text-lg text-[#0B2C4D] mb-1">Mumbai</h3>
              <p className="text-gray-600 text-sm">Leadership Forums</p>
            </div>

            {/* Goa */}
            <div className="bg-white shadow-md rounded p-5 text-center hover:shadow-lg transition">
              <h3 className="font-bold text-lg text-[#0B2C4D] mb-1">Goa</h3>
              <p className="text-gray-600 text-sm">CXO Strategy Sessions</p>
            </div>
          </div>
        </section>
        {/* =========================
            MODAL POPUP
        ========================= */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto relative p-6">
              {/* Close */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
              >
                ✕
              </button>

              {/* Image */}
              <img
                src={selectedMember.image || randhir}
                alt={selectedMember.name}
                className="w-full max-h-64 object-contain rounded mb-4 bg-gray-100"
              />

              {/* Content */}
              <h3 className="text-2xl font-bold text-[#0B2C4D] mb-2">
                {selectedMember.name}
              </h3>

              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line text-justify indent-6">
                {selectedMember.desc}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
