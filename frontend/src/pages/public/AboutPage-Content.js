import React, { useState } from "react";
import Rahul from "../../assets/advisory/Subodh.jpeg";
import Priyanka from "../../assets/advisory/Priyanka.jpeg";
import Sudesh from "../../assets/advisory/sandesh.jpg";
import bhushan from "../../assets/advisory/bhushan01.jpg";
import randhir from "../../assets/advisory/randhir.jpeg";
import Subodh from "../../assets/advisory/Rahul.jpeg";
import PrasadT from "../../assets/advisory/PrasadT.jpeg";
import Purvi from "../../assets/advisory/Purvi.jpeg";
import Neha from "../../assets/advisory/Neha.jpeg";
export default function AboutPage() {
  const teamMembers = [
    {
      name: "Subodh Naik",
      role: "Head Operations",
      image: Subodh,
      desc: `Subodh Naik is an experienced operations professional with over 20 years of expertise across cinemas, real estate, hospitality, and conference management. He brings a strong foundation in operational excellence, customer experience, and business coordination.

Throughout his career, Subodh has successfully managed high-footfall environments, ensuring smooth operations and consistent service quality. His diverse industry exposure enables him to adapt quickly and deliver efficient, result-oriented outcomes.

He is highly skilled in networking and relationship building, fostering strong collaborations and long-term professional connections. His ability to engage with stakeholders adds significant value to business growth and partnerships.

With a strong focus on people management, Subodh excels in leading teams, enhancing performance, and creating a positive work culture.

He is known for his practical approach, attention to detail, and commitment to continuous improvement. Subodh continues to drive operational efficiency while building meaningful relationships across industries.`,
    },
    {
      name: "Neha Kanojia",
      role: "AVP Operations",
      image: Neha,
      desc: `With 18+ years of diverse experience, I bring a blend of strategic thinking, relationship building, and continuous learning across networking, business management, training, branding, and emerging financial ecosystems.

I focus on building meaningful connections, enabling business growth, and staying aligned with evolving trends—especially in the future of finance. My approach is practical, people-first, and driven by long-term value creation.

Core Expertise
Networking & Relationship Building
Business Strategy & Execution
Training & Development
Personal & Product Branding
Content & Thought Leadership
Future of Finance (Blockchain & Digital Assets)
Professional Approach
Relationship-driven with integrity
Growth mindset & adaptability
Focus on clarity, consistency, and execution`,
    },
    {
      name: "Priyanka Gundu",
      role: "Manager Operations",
      image: Priyanka,
      desc: `Priyanka Gundu is an emerging Operations Manager with over 2 years of experience across multiple industries, with a strong focus on conference and event management. She brings hands-on expertise in planning, coordination, and execution of professional events.
Her ability to manage operations efficiently ensures smooth event delivery and enhanced participant experience. Priyanka is known for her attention to detail, adaptability, and proactive approach.
She also excels in coordination and stakeholder interaction, contributing to seamless execution and team collaboration.
With a growing passion for operations and conferencing, she continues to build her capabilities and deliver value-driven outcomes.`,
    },
  ];

  const advisoryMembers = [
    {
      name: "Dr. Randhir Padwal",
      image: randhir,
      role: "Mumbai",
      desc: `Architecting resilient digital futures at the intersection of strategy, security, and regulated innovation.

Brief Profile
Dr. Randhir Padwal is a transformative technology executive with over two decades of experience shaping enterprise digital strategy across highly regulated industries including Pharma, Healthcare, Chemicals, and Manufacturing. He is recognized for balancing rapid innovation with mission‑critical digital transformation, cybersecurity, and regulatory compliance. His expertise spans cloud‑first architectures, ERP modernization, data privacy, and resilient IT operating models. He brings a strong thought‑leadership perspective rooted in compliance‑by‑design and sustainable digital scale. Bridging academic rigor with pragmatic, board‑level execution, he enables leadership teams to position technology as a strategic catalyst for long‑term competitive advantage. He also serve on the Technical advisory board of the National Cyber Defence Research Centre (NCSS). He is an Merit holder IIM Vi`,
    },
    {
      name: "Sandesh Yadav",
      image: Sudesh,
      role: "Pune",
      desc: `Sandesh Yadav is a distinguished cybersecurity expert with over two decades of experience architecting enterprise-grade security programs for global organizations. Specializing in Cloud Security Architecture, Application Defense, and Enterprise Compliance, he excels at translating complex technical requirements into agile business solutions.
As a board advisor, Sandesh provides strategic oversight for scaling secure technology infrastructures and navigating the evolving global threat landscape. He brings a disciplined, risk-based approach to the board, ensuring that security remains a core enabler of organizational growth and resilience in a digital-first economy.`,
    },
    {
      name: "Rahul Mergu",
      image: Rahul,
      role: "Pune",
      desc: `Rahul Shivram Mergu is a seasoned professional with expertise in cybersecurity, cloud computing, and strategic IT leadership. Holding prestigious certifications like CISM (Certified Information Security Manager) and CCISO (Certified Chief Information Security Officer), he is well-versed in managing and securing enterprise IT environments. Rahul has significant experience working with cloud platforms such as AWS and Azure, making him adept at designing, implementing, and securing complex cloud solutions.

With a strong background as a CISO (Chief Information Security Officer), CIO (Chief Information Officer), or similar CXO roles, Rahul brings a strategic perspective to technology and security leadership. His approach combines technical expertise with business acumen, enabling organizations to align IT and security strategies with business goals effectively.

Known for his ability to lead teams, drive innovation, and enhance organizational resilience, Rahul continues to excel in managing IT and cybersecurity challenges in today’s fast-evolving digital landscape.

Total 23 Years Experience in IT Infrastructure with various Industries, Like, Manufacturing, Media and Entertainment, Software and Service Industry.

Currently working as Vice President IT with MarketsandMarkets Research Pvt Ltd.`,
    },
    {
      name: "Bhushan Patil",
      image: bhushan,
      role: "Pune",
      desc: `Strategy & Finance Director
Bhushan brings over 22 years of experience across strategy,
finance, human capital, and organisational development. He
leads financial controls, risk management, and corporate
governance - architecting the capital strategies and
compliance frameworks that underpin our institutional
partnerships.`,
    },
    {
      name: "Prasad Tripurari",
      image: PrasadT,
      role: "Hyderabad",
      desc: `Prasad Tripurari is a Transformational CTO and has over 25 years of experience as the driving force behind large-scale technology innovation and business transformation. Currently, he is leading the technology and digital strategy at the Ramoji Group of Companies. He is the recipient of numerous prestigious awards and recognition, such as the Cyber Security Award, AI Award, Top 25 Digital Star Award, and CIO 100 Award and is also a Certified Independent Director.

His skills and experience cover technology strategy, artificial intelligence, cybersecurity, cloud computing, and emerging technology, and he also has strong experience working and mentoring cross-functional and high-performing teams. Prasad has a proven record of designing and implementing enterprise-level solutions that bring business impact.`,
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
    {
      name: "Gaurav Mishra",
      image: null,
      role: "Bengaluru",
      desc: "CTO",
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

      <div className="p-4 text-center">
        <h3 className="text-[#0B2C4D] font-bold text-lg">{member.name}</h3>
        <p className="section-subtitle text-md font-semibold mt-1 mb-0 pb-0">
          {role}
        </p>
        <p className="text-gray-800 text-base mt-1 leading-6 line-clamp-2">
          {member.desc}
        </p>

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
          <span className="font-semibold">CXO Orbit Global</span> was founded on
          a singular conviction: that the most consequential decisions in
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
            <p className="text-gray-600 text-[16px] leading-6 font-semibold text-justified text-left mt-1 text-center">
              To connect, empower, and enable CXO leaders across industries and
              geographies by providing a premium platform for strategic
              collaboration, peer exchange, and executive development.
            </p>
          </div>

          {/* OUR VISION */}
          <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-[rgb(31_166_160)] text-center py-2">
              OUR VISION
            </h3>
            <p className="text-gray-600 text-[16px] leading-6 font-semibold text-justified text-left mt-1 text-center">
              To be the world's most trusted executive ecosystem — where global
              C-suite leaders convene to exchange insight, forge strategic
              alliances, and collectively shape the future of enterprise
              technology and leadership.
            </p>
          </div>
        </div>
      </section>
      <div className="container-main">
        {/* OUR TEAM */}
        <section className="py-4">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-[#0B2C4D]">
              Our Leadership Team
            </h2>
            <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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

              {selectedMember.image ? (
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full max-h-64 object-contain mb-4"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#0B2C4D] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {selectedMember.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
              )}

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
