import React, { useState } from "react";
import Rahul from "../../assets/advisory/Subodh.jpeg";
import Priyanka from "../../assets/advisory/Priyanka.jpeg";
import Sudesh from "../../assets/advisory/sandesh.jpg";
import bhushan from "../../assets/advisory/bhushan01.jpg";
import randhir from "../../assets/advisory/randhir.jpeg";
import Subodh from "../../assets/advisory/Rahul.jpeg";
import PrasadT from "../../assets/advisory/PrasadT.jpeg";
import Purvi from "../../assets/advisory/Purvi.jpeg";
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
      name: "Dr. Randhir Padwal",
      image: randhir,
      role: "Mumbai",
      desc: "Strategic advisor with strong experience in enterprise leadership.",
    },
    {
      name: "Sandesh Yadav",
      image: Sudesh,
      role: "Pune",
      desc: "Guides CXO engagement and ecosystem partnerships.",
    },
    {
      name: "Rahul Mergu",
      image: Rahul,
      role: "Pune",
      desc: `Rahul Shivram Mergu is a seasoned professional...`,
    },
    {
      name: "Bhushan Patil",
      image: bhushan,
      role: "Pune",
      desc: "Supports strategic growth and executive networking.",
    },
    {
      name: "Prasad Tripurari",
      image: PrasadT,
      role: "Hydrabd",
      desc: `Prasad Tripurari is a Transformational CTO...`,
    },
    {
      name: "Purvi Shah",
      role: "Mumbai",
      image: Purvi,
      desc: `
      Drives enterprise value through IT strategy and digital transformation.
      Dynamic CIO with over 20 years of diverse experience spanning Real Estate, Banking, Telecom, Vehicle Finance, and Paper Stationery Exports. With over a decade of IT leadership in the Real Estate sector, I have driven digital transformation and technology strategy through the successful implementation of Salesforce, SAP, and other enterprise solutions. Known for strategic thinking, business process clarity, and an analytical mindset, I combine innovation with governance to build high-performance teams, optimize costs, and enhance customer and partner experiences-delivering measurable business value through a structured approach to change management and digital excellence.
•	Leadership Vision: I lead with the belief that technology transformation succeeds when innovation, process discipline, and people empowerment move in harmony.`,
    },
    {
      name: "Sangeeta Kant",
      image: null,
      role: "Singapur",
      desc: "Focuses on leadership development and CXO collaboration.",
    },
    {
      name: "Sagar Mulik",
      image: null,
      role: "Dubai",
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
          <p className="text-[#0B2C4D] text-[18px] leading-7 text-center">
            <span className="font-semibold">Driving</span> the future of
            enterprise technology and business. We bring together the world's
            most forward-thinking{" "}
            <span className="text-[#0B2C4D] font-bold">CIOs, CISOs, CTOs</span>,
            and senior business leaders in trusted environments designed for
            real dialogue and strategic impact.
          </p>
        </section>

        {/* FEATURE CARDS */}
        <section className="max-w-8xl mx-auto mb-4 px-4">
          <div className="grid md:grid-cols-3 gap-1">
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <div className="flex gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <i className="fa-solid fa-users"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-[rgb(31_166_160)]">
                    Curated peer connections
                  </h3>
                  <p className="text-gray-600 text-[16px] leading-6 font-semibold text-justified text-left mt-1">
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
                  <h3 className="font-semibold text-[rgb(31_166_160)]">
                    Strategic dialogue
                  </h3>
                  <p className="text-gray-600 text-[16px] leading-6 font-semibold text-justified text-left mt-1">
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
                  <h3 className="font-semibold text-[rgb(31_166_160)]">
                    Lasting partnerships
                  </h3>
                  <p className="text-gray-600 text-[16px] leading-6 font-semibold text-justified text-left mt-1">
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
            <h2 className="text-3xl font-bold text-[#0B2C4D]">
              Our Leadership Team
            </h2>
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
        {/* =========================    EXECUTIVE PLATFORM SECTION ========================= */}
        <section className="max-w-4xl mx-auto text-center mb-4 px-4">
          {/* TITLE (same as Advisory / About style) */}
          <div className="text-center mb-2">
            <h2 className="text-3xl font-bold text-[#0B2C4D]">
              MISSION & VISION
            </h2>
            <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
          </div>

          {/* SUBTITLE (same as About subtitle style) */}
          <p className="section-subtitle mb-1">
            Grounded in purpose. Driven by leadership.
          </p>

          {/* DESCRIPTION (same as Driving paragraph style) */}
          <p className="text-[#0B2C4D] text-[18px] leading-7 text-center">
            <span className="font-semibold">CXO Orbit Global</span> was founded
            on a singular conviction: that the most consequential decisions in
            enterprise technology and business leadership are best made within a
            trusted peer ecosystem — not in isolation.
          </p>
        </section>
        {/* ========================= MISSION INTRO + CARDS ========================= */}
        <section className="max-w-6xl mx-auto mb-6 px-4">
          {/* CARDS */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* OUR MISSION */}
            <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-[rgb(31_166_160)] text-center py-2">
                OUR MISSION
              </h3>
              <p className="text-gray-600 text-[16px] leading-6 font-semibold text-justified text-left mt-1">
                To connect, empower, and enable CXO leaders across industries
                and geographies by providing a premium platform for strategic
                collaboration, peer exchange, and executive development.
              </p>
            </div>

            {/* OUR VISION */}
            <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-[rgb(31_166_160)] text-center py-2">
                OUR VISION
              </h3>
              <p className="text-gray-600 text-[16px] leading-6 font-semibold text-justified text-left mt-1">
                To be the world's most trusted executive ecosystem — where
                global C-suite leaders convene to exchange insight, forge
                strategic alliances, and collectively shape the future of
                enterprise technology and leadership.
              </p>
            </div>
          </div>
        </section>
        {/* =========================    What We Offer ========================= */}
        <section className="max-w-4xl mx-auto text-center mb-4 px-4">
          {/* TITLE (same as Advisory / About style) */}
          <div className="text-center mb-2">
            <h2 className="text-3xl font-bold text-[#0B2C4D]">WHAT WE OFFER</h2>
            <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
          </div>

          {/* SUBTITLE (same as About subtitle style) */}
          <p className="section-subtitle mb-1">
            Curated experiences designed for executive impact
          </p>

          {/* DESCRIPTION (same as Driving paragraph style) */}
          <p className="text-[#0B2C4D] text-[18px] leading-7 text-center">
            Every offering within{" "}
            <span className="font-semibold">CXO Orbit Global</span> is designed
            with one objective:{" "}
            <span className="font-semibold">
              to deliver substantive value to senior leaders navigating complex,
              high-stakes decisions.
            </span>
          </p>
        </section>
        {/* =========================    WHAT WE OFFER CARDS ========================= */}
        <section className="max-w-8xl mx-auto mb-6 px-4">
          <div className="grid md:grid-cols-3 gap-4">
            {/* 1 */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <div className="flex gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <i className="fa-solid fa-calendar-check"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-[rgb(31_166_160)]">
                    Executive roundtables
                  </h3>
                  <p className="text-gray-600 text-[16px] leading-6 font-semibold text-left mt-1">
                    Intimate, moderated discussions on the most pressing issues
                    in enterprise technology, cybersecurity, and digital
                    transformation.
                  </p>
                </div>
              </div>
            </div>

            {/* 2 */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <div className="flex gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <i className="fa-solid fa-users"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-[rgb(31_166_160)]">
                    Leadership forums
                  </h3>
                  <p className="text-gray-600 text-[16px] leading-6 font-semibold text-left mt-1">
                    Structured peer forums that facilitate ongoing dialogue
                    between senior leaders across sectors and geographies.
                  </p>
                </div>
              </div>
            </div>

            {/* 3 */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <div className="flex gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <i className="fa-solid fa-star"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-[rgb(31_166_160)]">
                    Executive conferences
                  </h3>
                  <p className="text-gray-600 text-[16px] leading-6 font-semibold text-left mt-1">
                    High-calibre flagship events that convene global CXO leaders
                    for keynotes, strategic briefings, and curated networking.
                  </p>
                </div>
              </div>
            </div>

            {/* 4 */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <div className="flex gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <i className="fa-regular fa-comments"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-[rgb(31_166_160)]">
                    Peer advisory networks
                  </h3>
                  <p className="text-gray-600 text-[16px] leading-6 font-semibold text-left mt-1">
                    Exclusive, ongoing access to a community of C-suite peers
                    for confidential guidance, strategic input, and
                    collaborative problem-solving.
                  </p>
                </div>
              </div>
            </div>

            {/* 5 */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <div className="flex gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <i className="fa-solid fa-book-open"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-[rgb(31_166_160)]">
                    Thought leadership & research
                  </h3>
                  <p className="text-gray-600 text-[16px] leading-6 font-semibold text-left mt-1">
                    Curated intelligence, industry research, and executive
                    insights published exclusively for platform members.
                  </p>
                </div>
              </div>
            </div>

            {/* 6 */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <div className="flex gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <i className="fa-solid fa-handshake"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-[rgb(31_166_160)]">
                    Strategic partnerships
                  </h3>
                  <p className="text-gray-600 text-[16px] leading-6 font-semibold text-left mt-1">
                    Facilitated introductions and long-term partnership
                    opportunities between enterprise leaders and technology
                    innovators.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* =========================    Who we serve ========================= */}
        <section className="max-w-4xl mx-auto text-center mb-4 px-4">
          {/* TITLE (same as Advisory / About style) */}
          <div className="text-center mb-2">
            <h2 className="text-3xl font-bold text-[#0B2C4D]">WHO WE SERVE</h2>
            <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
          </div>

          {/* SUBTITLE (same as About subtitle style) */}
          <p className="section-subtitle mb-1">
            Built exclusively for C-suite and senior executive leaders
          </p>

          {/* DESCRIPTION (same as Driving paragraph style) */}
          <p className="text-[#0B2C4D] text-[18px] leading-7 text-center">
            <span className="font-semibold">CXO Orbit Global</span> is an
            invitation-based platform. Membership is extended to senior leaders
            who drive strategic decision-making at the highest levels of their
            organisations.
          </p>
        </section>
        {/* ========================= WHO WE SERVE - CARDS ========================= */}
        <section className="max-w-8xl mx-auto mb-6 px-4">
          <div className="grid md:grid-cols-3 gap-4">
            {/* 1 */}
            <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-[rgb(31_166_160)] text-center py-2">
                Chief Information Officers
              </h3>
              <p className="text-gray-600 text-[16px] leading-6 font-semibold text-left mt-1">
                Enterprise technology strategy, digital transformation, and IT
                governance.
              </p>
            </div>

            {/* 2 */}
            <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-[rgb(31_166_160)] text-center py-2">
                Chief Information Security Officers
              </h3>
              <p className="text-gray-600 text-[16px] leading-6 font-semibold text-left mt-1">
                Cybersecurity leadership, risk management, and enterprise
                resilience.
              </p>
            </div>

            {/* 3 */}
            <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-[rgb(31_166_160)] text-center py-2">
                Chief Technology Officers
              </h3>
              <p className="text-gray-600 text-[16px] leading-6 font-semibold text-left mt-1">
                Technology innovation, product architecture, and R&D leadership.
              </p>
            </div>

            {/* 4 */}
            <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-[rgb(31_166_160)] text-center py-2">
                Chief Digital Officers
              </h3>
              <p className="text-gray-600 text-[16px] leading-6 font-semibold text-left mt-1">
                Digital strategy, customer experience transformation, and
                data-driven growth.
              </p>
            </div>

            {/* 5 */}
            <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-[rgb(31_166_160)] text-center py-2">
                Senior business leaders
              </h3>
              <p className="text-gray-600 text-[16px] leading-6 font-semibold text-left mt-1">
                C-suite executives across functions navigating enterprise
                transformation.
              </p>
            </div>

            {/* 6 */}
            <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-[rgb(31_166_160)] text-center py-2">
                Board & advisory members
              </h3>
              <p className="text-gray-600 text-[16px] leading-6 font-semibold text-left mt-1">
                Governance leaders and advisors shaping organisational strategy
                and oversight.
              </p>
            </div>
          </div>
        </section>
        {/* =========================  Why Join Us ========================= */}
        <section className="max-w-4xl mx-auto text-center mb-4 px-4">
          {/* TITLE (same as Advisory / About style) */}
          <div className="text-center mb-2">
            <h2 className="text-3xl font-bold text-[#0B2C4D]">WHY JOIN US</h2>
            <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
          </div>

          {/* SUBTITLE (same as About subtitle style) */}
          <p className="section-subtitle mb-1">
            What sets <span className="font-semibold">CXO Orbit Global</span>{" "}
            apart Built exclusively for C-suite and senior executive leaders
          </p>

          {/* DESCRIPTION (same as Driving paragraph style) */}
          <p className="text-[#0B2C4D] text-[18px] leading-7 text-center">
            Membership in{" "}
            <span className="font-semibold">CXO Orbit Global</span> is not
            simply access to events — it is entry into a curated, high-trust
            professional community that delivers measurable value across your
            leadership journey.
          </p>
        </section>
        {/* ========================= WHY JOIN US - CARDS ========================= */}
        <section className="max-w-6xl mx-auto mb-6 px-4">
          <div className="flex flex-col gap-4">
            {/* 01 */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <div className="flex gap-4 items-start">
                {/* NUMBER */}
                <div className="min-w-[45px] h-[45px] flex items-center justify-center rounded-full border-2 border-[rgb(31_166_160)] text-[rgb(31_166_160)] font-semibold shadow-sm bg-white">
                  01
                </div>

                <div>
                  <h3 className="font-semibold text-black">
                    A rigorously curated peer community
                  </h3>
                  <p className="text-gray-600 text-[16px] leading-6 font-semibold text-left mt-1">
                    Every member is vetted to ensure relevance, seniority, and
                    alignment. You engage exclusively with leaders who operate
                    at your level and understand your challenges.
                  </p>
                </div>
              </div>
            </div>

            {/* 02 */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="min-w-[45px] h-[45px] flex items-center justify-center rounded-full border-2 border-[rgb(31_166_160)] text-[rgb(31_166_160)] font-semibold">
                  02
                </div>

                <div>
                  <h3 className="font-semibold text-black">
                    Confidential, high-trust environments
                  </h3>
                  <p className="text-gray-600 text-[16px] leading-6 font-semibold text-left mt-1">
                    Our forums operate under strict protocols that encourage
                    candid dialogue — the kind of open conversation that rarely
                    happens in public-facing industry events.
                  </p>
                </div>
              </div>
            </div>

            {/* 03 */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="min-w-[45px] h-[45px] flex items-center justify-center rounded-full border-2 border-[rgb(31_166_160)] text-[rgb(31_166_160)] font-semibold">
                  03
                </div>

                <div>
                  <h3 className="font-semibold text-black">
                    Global reach, local relevance
                  </h3>
                  <p className="text-gray-600 text-[16px] leading-6 font-semibold text-left mt-1">
                    With members and programmes spanning multiple industries and
                    geographies, CXO Orbit Global bridges the global and the
                    contextually relevant.
                  </p>
                </div>
              </div>
            </div>

            {/* 04 */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="min-w-[45px] h-[45px] flex items-center justify-center rounded-full border-2 border-[rgb(31_166_160)] text-[rgb(31_166_160)] font-semibold">
                  04
                </div>

                <div>
                  <h3 className="font-semibold text-black">
                    Long-term strategic value
                  </h3>
                  <p className="text-gray-600 text-[16px] leading-6 font-semibold text-left mt-1">
                    This is not a transactional networking platform.
                    Relationships forged within CXO Orbit Global are designed to
                    support you across career transitions, strategic pivots, and
                    organisational challenges.
                  </p>
                </div>
              </div>
            </div>

            {/* 05 */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="min-w-[45px] h-[45px] flex items-center justify-center rounded-full border-2 border-[rgb(31_166_160)] text-[rgb(31_166_160)] font-semibold">
                  05
                </div>

                <div>
                  <h3 className="font-semibold text-black">
                    Exclusive access to intelligence and insights
                  </h3>
                  <p className="text-gray-600 text-[16px] leading-6 font-semibold text-left mt-1">
                    Members receive priority access to research, briefings, and
                    subject-matter expertise that informs better decision-making
                    at the executive level.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* =========================  Testimonials ========================= */}
        <section className="max-w-4xl mx-auto text-center mb-4 px-4">
          {/* TITLE (same as Advisory / About style) */}
          <div className="text-center mb-2">
            <h2 className="text-3xl font-bold text-[#0B2C4D]">TESTIMONIALS</h2>
            <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
          </div>

          {/* SUBTITLE (same as About subtitle style) */}
          <p className="section-subtitle mb-1">
            Trusted by leaders across the C-suite
          </p>

          {/* DESCRIPTION (same as Driving paragraph style) */}
          <p className="text-[#0B2C4D] text-[18px] leading-7 text-center">
            Hear from the executives who have experienced the{" "}
            <span className="font-semibold">CXO Orbit Global </span>
            difference firsthand.
          </p>
        </section>
        {/* =========================
    TESTIMONIAL CARDS
========================= */}
        <section className="max-w-8xl mx-auto mb-6 px-4">
          <div className="grid md:grid-cols-3 gap-4">
            {/* 1 */}
            <div className="bg-white border rounded-xl p-6 shadow-sm">
              {/* QUOTE ICON */}
              <div className="text-[rgb(31_166_160)] text-3xl font-bold mb-3">
                “
              </div>

              {/* TEXT */}
              <p className="text-gray-700 text-[16px] leading-6 font-medium mb-5">
                CXO Orbit Global gave me access to a calibre of peer dialogue I
                simply had not encountered elsewhere. The roundtables are
                substantive, confidential, and genuinely useful.
              </p>

              {/* PROFILE */}
              <div className="flex items-center gap-3">
                {/* INITIAL */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#E6F1FB] text-[#194D83] font-semibold shadow-sm">
                  RK
                </div>

                {/* NAME + ROLE */}
                <div>
                  <p className="font-bold text-black">Rajiv K.</p>
                  <p className="text-gray-500 text-sm italic">
                    CIO, Global Financial Services Group
                  </p>
                </div>
              </div>
            </div>

            {/* 2 */}
            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <div className="text-[rgb(31_166_160)] text-3xl font-bold mb-3">
                “
              </div>

              <p className="text-gray-700 text-[16px] leading-6 font-medium mb-5">
                As a CISO, it is rare to find a forum where I can speak candidly
                about real threats and real failures. This platform provides
                that environment with discretion and professionalism.
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#E6F1FB] text-[#194D83] font-semibold shadow-sm">
                  SM
                </div>

                <div>
                  <p className="font-bold text-black">Sonia M.</p>
                  <p className="text-gray-500 text-sm italic">
                    CISO, Multinational Technology Enterprise
                  </p>
                </div>
              </div>
            </div>

            {/* 3 */}
            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <div className="text-[rgb(31_166_160)] text-3xl font-bold mb-3">
                “
              </div>

              <p className="text-gray-700 text-[16px] leading-6 font-medium mb-5">
                The connections I have built through CXO Orbit Global have
                directly shaped my organisation's technology strategy. The value
                extends well beyond any single event.
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#E6F1FB] text-[#194D83] font-semibold shadow-sm">
                  AP
                </div>

                <div>
                  <p className="font-bold text-black">Arjun P.</p>
                  <p className="text-gray-500 text-sm italic">
                    {/* CTO, Enterprise Technology Organisation */}
                  </p>
                </div>
              </div>
            </div>
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
