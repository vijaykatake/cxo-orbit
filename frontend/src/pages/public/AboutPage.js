import React, { useState } from "react";
import Rahul from "../../assets/advisory/Subodh.jpeg";
import Priyanka from "../../assets/advisory/Priyanka.jpeg";
import Sudesh from "../../assets/advisory/sandesh.jpg";
import bhushan from "../../assets/advisory/bhushan01.jpg";
import randhir from "../../assets/advisory/randhir.jpg";
import Subodh from "../../assets/advisory/Rahul.jpeg";
import PrasadT from "../../assets/advisory/PrasadT.jpeg";

export default function AboutPage() {
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
      desc: `Rahul Shivram Mergu is a seasoned professional...`,
    },
    {
      name: "Bhushan Patil",
      image: bhushan,
      role: "Advisory Member",
      desc: "Supports strategic growth and executive networking.",
    },
    {
      name: "Prasad Tripurari",
      image: PrasadT,
      role: "Advisory Member",
      desc: `Prasad Tripurari is a Transformational CTO...`,
    },
    {
      name: "Sangeeta Kant",
      image: null,
      role: "Advisory Member",
      desc: "Focuses on leadership development and CXO collaboration.",
    },
    {
      name: "Sagar Mulik",
      image: null,
      role: "Advisory Member",
      desc: "Expert in enterprise operations and scaling organizations.",
    },
  ];

  const [selectedMember, setSelectedMember] = useState(null);

  const MemberCard = ({ member, role }) => (
    <div className="bg-white shadow-md rounded hover:shadow-xl transition mx-auto w-full max-w-sm flex flex-col">
      <div className="w-full h-48 flex items-center justify-center bg-gray-100">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="max-h-full object-contain"
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

      <div className="p-4 text-center flex flex-col flex-grow">
        <h3 className="text-[#0B2C4D] font-bold text-lg">{member.name}</h3>
        <p className="text-soft-gold text-sm font-semibold mt-1">{role}</p>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{member.desc}</p>

        <button
          onClick={() => setSelectedMember(member)}
          className="text-blue-600 text-xs mt-2 hover:underline"
        >
          Read More →
        </button>
      </div>
    </div>
  );

  return (
    <div className="section">
      <div className="container-main">
        {/* TITLE */}
        <div className="text-center mb-2">
          <h1 className="section-title">About CXO Orbit Global</h1>

          <p className="section-subtitle mb-1">
            CXO Orbit Global is a premium executive engagement platform built
            for the leaders
          </p>
        </div>

        {/* DESCRIPTION (TIGHT + CENTER + STYLED) */}
        <section className="max-w-4xl mx-auto text-center mb-2 px-4">
          <p className="text-[#D4AF37] text-[18px] leading-7 text-center">
            <span className="font-semibold">Driving</span> the future of
            enterprise technology and business. We bring together the world's
            most forward-thinking{" "}
            <span className="text-[#0B2C4D] font-bold">CIOs, CISOs, CTOs</span>,
            and senior business leaders in trusted environments designed for
            real dialogue and strategic impact.
          </p>
        </section>

        {/* FEATURE CARDS */}
        <section className="max-w-6xl mx-auto mb-4 px-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <div className="flex gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <i className="fa-solid fa-users"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0B2C4D]">
                    Curated peer connections
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    High-value relationships with peers who understand your
                    challenges - across industries and geographies.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <div className="flex gap-3">
                <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                  <i className="fa-regular fa-comment"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0B2C4D]">
                    Strategic dialogue
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Roundtables, leadership forums, and executive conferences
                    designed for candid, insight- driven conversations.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <div className="flex gap-3">
                <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                  <i className="fa-solid fa-wave-square"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0B2C4D]">
                    Lasting partnerships
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    A trusted ecosystem that fosters long-term strategic
                    partnerships - not just one-time networking moments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OUR TEAM */}
        <section className="py-4">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-[#0B2C4D]">Our Team</h2>
            <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {teamMembers.map((m, i) => (
              <MemberCard key={i} member={m} role={m.role} />
            ))}
          </div>
        </section>

        {/* ADVISORY */}
        <section className="py-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-[#0B2C4D]">
              Advisory Members
            </h2>
            <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {advisoryMembers.map((m, i) => {
              const total = advisoryMembers.length;
              const isLastSingle = total % 3 === 1 && i === total - 1;

              return (
                <div key={i} className={isLastSingle ? "md:col-start-2" : ""}>
                  <MemberCard member={m} role={m.role} />
                </div>
              );
            })}
          </div>
        </section>
        {/* =========================
    EXECUTIVE HERO SECTION
========================= */}
        <section className="max-w-6xl mx-auto mt-6 mb-6 px-4">
          <div className="bg-gray-50 rounded-xl p-6 md:p-10">
            {/* Badge */}
            <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide">
              CXO ORBIT GLOBAL
            </div>

            {/* Heading */}
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-snug mb-4">
              The executive platform for leaders who shape enterprise
              transformation
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-base md:text-lg leading-7 max-w-3xl">
              A premium, invitation-based engagement platform connecting CIOs,
              CISOs, CTOs, and senior business leaders through curated forums,
              strategic roundtables, and high-trust peer networks.
            </p>
          </div>
        </section>
        {/* MODAL */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-3 right-3 text-xl"
              >
                ✕
              </button>

              <img
                src={selectedMember.image || randhir}
                className="w-full max-h-64 object-contain mb-4"
              />

              <h3 className="text-2xl font-bold text-[#0B2C4D] mb-2">
                {selectedMember.name}
              </h3>

              <p className="text-gray-700 text-sm leading-relaxed text-justify">
                {selectedMember.desc}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
