import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";
import { format } from "date-fns";
import { FiCalendar, FiMapPin, FiArrowRight } from "react-icons/fi";
import LatestNews from "../../components/home/LatestNews";
// ✅ Import Upcoming Images
import Upcomming01 from "../../assets/Tables/Upcomming/Beyond Cost Savings.jpg";
import Upcomming02 from "../../assets/Tables/Upcomming/Infrastructure2026.png";
import Upcomming03 from "../../assets/Tables/Upcomming/ScallingWorkload.png";
import Upcomming04 from "../../assets/Tables/Upcomming/Cybersecurity01.jpg";
import Upcomming05 from "../../assets/Tables/Upcomming/Overseas.png";
import Upcomming06 from "../../assets/Tables/Upcomming/ModernIT.jpg";
import Upcomming07 from "../../assets/Tables/Upcomming/WareFare.png";
import Upcomming08 from "../../assets/Tables/Upcomming/Balancing.jpg";
import PartnerRegistrationModal from "../../components/modal/PartnerRegistrationModal";
import RegisterMemberModal from "../../components/modal/RegisterMemberModal";
import SponsorsScroller from "../../components/home/SponsorsScroller";
export default function HomePage() {
  const [openPartnerModal, setOpenPartnerModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  // const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   api
  //     .get("/events?status=published")
  //     .then((res) => setEvents(res.data.data?.slice(0, 3) || []))
  //     .catch(() => {});
  // }, []);
  /* =========================
     ROUND TABLE DATA (Imported)
  ========================= */
  const upcomingEvents = [
    {
      title: "Round Table",
      image: Upcomming01,
      topic: "Beyond Cost Savings: Driving ROI from Cloud Investments",
      date: "April",
      location: "Pune",
      partner: "Teleglobal Internationals",
      url: "https://forms.gle/XMLEA6XPex11ReWV7",
    },
    {
      title: "Round Table",
      image: Upcomming02,
      topic: "Infrastructure 2026: From Cost Center to Business Enabler",
      date: "June",
      location: "Hyderabad",
      partner: "To Be decide",
      url: "https://forms.gle/Saq6sbivNtkJoVdv9",
    },
    {
      title: "Round Table",
      image: Upcomming03,
      topic: "Scaling AI Workloads Without Breaking Infra Budgets",
      date: "May",
      location: "Bangalore",
      partner: "To Be decide",
      url: "https://forms.gle/boK26QnpQbd1E8FQA",
    },
    {
      title: "Round Table",
      image: Upcomming04,
      topic: "Cybersecurity as a Business Risk: Boardroom Conversations",
      date: "May",
      location: "Mumbai",
      partner: "To Be decide",
      url: "https://forms.gle/7iFu2QVGrhGfPGPy8",
    },
    {
      title: "Mini Conference",
      image: Upcomming05,
      topic: "Overseas CIO Meet",
      date: "September",
      location: "Phuket, Krabi",
      partner: "To be decide",
      url: "https://forms.gle/8CfhvzmUPqQup6TE8",
    },
    {
      title: "Round Table",
      image: Upcomming06,
      topic: "Zero Trust 2.0: Beyond ‘Never Trust, Always Verify’",
      date: "July",
      location: "Chennai",
      partner: "To Be decide",
      url: "https://forms.gle/3G4Qba3Fk6NZYcTG9",
    },
    {
      title: "Round Table",
      image: Upcomming07,
      topic: "Cyber Warfare & Enterprise Security: Are We Prepared?",
      date: "June",
      location: "Mumbai",
      partner: "To Be decide",
      url: "https://forms.gle/4zxCJbGYJFtLysm97",
    },
    {
      title: "Round Table",
      image: Upcomming08,
      topic: "Balancing Cost, Risk & Performance in Modern IT",
      date: "May",
      location: "Pune",
      partner: "To Be decide",
      url: "https://forms.gle/CFTWUnhL4ZDCgu6R6",
    },
  ];
  return (
    <div>
      {/* ── Hero ───────────────── */}
      <section className="bg-royal-blue text-white min-h-[28vh] flex items-center px-4 py-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-soft-gold font-semibold tracking-widest text-xs uppercase mb-2">
            • Executive Excellence
          </p>

          <h1 className="text-3xl md:text-4xl font-bold leading-snug mb-3">
            <span className="text-white">Where World-Class </span>
            <span className="text-soft-gold">CXO Leaders</span>
            <span className="text-white"> Connect</span>
          </h1>

          <p className="text-gray-300 text-sm mb-4 max-w-xl mx-auto">
            Premium platform for executive roundtables, leadership forums and
            high-impact conferences.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setOpenRegisterModal(true)}
              className="btn-primary px-6 py-2 text-sm"
            >
              Join as CXO Member
            </button>

            <button
              onClick={() => setOpenPartnerModal(true)}
              className="bg-soft-gold text-royal-blue text-sm px-4 py-2 rounded font-medium hover:opacity-90"
            >
              Partner With Us
            </button>
          </div>
        </div>
      </section>

      {/* ── Latest News (MATCHED STYLE) ───────────────── */}
      {/* <div className="py-2">
        <LatestNews />
      </div> */}
      {/* =========================    EXECUTIVE PLATFORM SECTION ========================= */}

      {/* TITLE */}
      <div className="text-center mb-2">
        <div className="text-center mb-2">
          <h2 className="text-3xl font-bold text-[#0B2C4D]">
            About CXO Orbit Global
          </h2>
          <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
        </div>
        <p className="section-subtitle mb-1">
          CXO Orbit Global is a premium executive engagement platform built for
          the leaders
        </p>
      </div>

      {/* DESCRIPTION (TIGHT + CENTER + STYLED) */}
      <section className="max-w-4xl mx-auto text-center mb-2 px-4">
        <p className="text-[#0B2C4D] text-[18px] leading-7 text-center">
          <span className="font-semibold">Driving</span> the future of
          enterprise technology and business. We bring together the world's most
          forward-thinking{" "}
          <span className="text-[#0B2C4D] font-bold">CIOs, CISOs, CTOs</span>,
          and senior business leaders in trusted environments designed for real
          dialogue and strategic impact.
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
                  Intimate, moderated discussions on the most pressing issues in
                  enterprise technology, cybersecurity, and digital
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
                  Exclusive, ongoing access to a community of C-suite peers for
                  confidential guidance, strategic input, and collaborative
                  problem-solving.
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

      {/* ── Upcoming Round Tables (NEW) ───────────────── */}
      <section className="py-6 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-[#0B2C4D]">
              Upcoming Round Tables
            </h2>
            <div className="w-20 h-[3px] mx-auto bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 mt-2 rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.slice(0, 4).map((ev, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
              >
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-40 object-cover"
                />

                <div className="p-4 text-sm flex flex-col flex-grow">
                  <p className="font-semibold text-[rgb(31_166_160)] text-[14px] mb-2 text-center">
                    {ev.topic}
                  </p>

                  <p className="text-gray-600 text-center mb-1">📅 {ev.date}</p>

                  <p className="text-gray-600 text-center mb-1">
                    📍 {ev.location}
                  </p>

                  <p className="text-gray-600 text-center mb-3">
                    👥 {ev.partner}
                  </p>

                  <a
                    href={ev.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto bg-[rgb(31_166_160)] text-white py-2 rounded text-center text-sm font-medium hover:opacity-90"
                  >
                    Register
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* View All */}
          <div className="text-center mt-6">
            <Link to="/events" className="btn-outline px-6 py-2 text-sm">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why CXO Orbit ───────────────── */}
      <section className="bg-royal-blue text-white py-4 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-soft-gold">WHY JOIN US?</h2>
            <div className="w-24 h-[2px] bg-soft-gold mx-auto mt-2"></div>
          </div>
          {/* =========================  Why Join Us ========================= */}
          <section className="max-w-4xl mx-auto text-center mb-4 px-4">
            <p className="section-subtitle mb-1">
              What sets <span className="font-semibold">CXO Orbit Global</span>{" "}
              apart Built exclusively for C-suite and senior executive leaders
            </p>

            {/* DESCRIPTION (same as Driving paragraph style) */}
            <p className="text-white text-[18px] leading-7 text-center">
              Membership in{" "}
              <span className="font-semibold">CXO Orbit Global</span> is not
              simply access to events — it is entry into a curated, high-trust
              professional community that delivers measurable value across your
              leadership journey.
            </p>
          </section>
          {/* ========================= WHY JOIN US - CARDS ========================= */}
          <section className="max-w-6xl mx-auto mb-6 px-2">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {/* 01 */}
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                  <div className="ml-[60px]">
                    <h3 className="section-subtitle mb-0 leading-tight">
                      A rigorously curated peer community
                    </h3>
                  </div>

                  <div className="flex gap-4 items-start mt-[2px]">
                    <div className="min-w-[45px] h-[45px] flex items-center justify-center rounded-full border-2 border-[rgb(31_166_160)] text-[rgb(31_166_160)] font-semibold shadow-sm bg-white">
                      01
                    </div>

                    <p className="text-gray-600 text-[16px] leading-6 font-semibold text-left m-0 text-center">
                      Every member is vetted to ensure relevance, seniority, and
                      alignment. You engage exclusively with leaders who operate
                      at your level and understand your challenges.
                    </p>
                  </div>
                </div>

                {/* 02 */}
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                  <div className="ml-[60px]">
                    <h3 className="section-subtitle mb-0 leading-tight">
                      Confidential, high-trust environments
                    </h3>
                  </div>

                  <div className="flex gap-4 items-start mt-[2px]">
                    <div className="min-w-[45px] h-[45px] flex items-center justify-center rounded-full border-2 border-[rgb(31_166_160)] text-[rgb(31_166_160)] font-semibold shadow-sm bg-white">
                      02
                    </div>

                    <p className="text-gray-600 text-[16px] leading-6 font-semibold text-left m-0 text-center">
                      Our forums operate under strict protocols that encourage
                      candid dialogue — the kind of open conversation that
                      rarely happens in public-facing industry events.
                    </p>
                  </div>
                </div>

                {/* 03 */}
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                  <div className="ml-[60px]">
                    <h3 className="section-subtitle mb-0 leading-tight">
                      Global reach, local relevance
                    </h3>
                  </div>

                  <div className="flex gap-4 items-start mt-[2px]">
                    <div className="min-w-[45px] h-[45px] flex items-center justify-center rounded-full border-2 border-[rgb(31_166_160)] text-[rgb(31_166_160)] font-semibold shadow-sm bg-white">
                      03
                    </div>

                    <p className="text-gray-600 text-[16px] leading-6 font-semibold text-left m-0 text-center">
                      With members and programmes spanning multiple industries
                      and geographies, CXO Orbit Global bridges the global and
                      the contextually relevant.
                    </p>
                  </div>
                </div>

                {/* 04 */}
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                  <div className="ml-[60px]">
                    <h3 className="section-subtitle mb-0 leading-tight">
                      Long-term strategic value
                    </h3>
                  </div>

                  <div className="flex gap-4 items-start mt-[2px]">
                    <div className="min-w-[45px] h-[45px] flex items-center justify-center rounded-full border-2 border-[rgb(31_166_160)] text-[rgb(31_166_160)] font-semibold shadow-sm bg-white">
                      04
                    </div>

                    <p className="text-gray-600 text-[16px] leading-6 font-semibold text-left m-0 text-center">
                      This is not a transactional networking platform.
                      Relationships forged within CXO Orbit Global are designed
                      to support you across career transitions, strategic
                      pivots, and organisational challenges.
                    </p>
                  </div>
                </div>

                {/* 05 */}
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                  <div className="ml-[60px]">
                    <h3 className="section-subtitle mb-0 leading-tight">
                      Exclusive access to intelligence and insights
                    </h3>
                  </div>

                  <div className="flex gap-4 items-start mt-[2px]">
                    <div className="min-w-[45px] h-[45px] flex items-center justify-center rounded-full border-2 border-[rgb(31_166_160)] text-[rgb(31_166_160)] font-semibold shadow-sm bg-white">
                      05
                    </div>

                    <p className="text-gray-600 text-[16px] leading-6 font-semibold text-left m-0 text-center">
                      Members receive priority access to research, briefings,
                      and subject-matter expertise that informs better
                      decision-making at the executive level.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "Curated & Invite-Only",
                desc: "Every member is a verified C-suite leader.",
              },
              {
                icon: "🌐",
                title: "Global Reach",
                desc: "Global forums.",
              },
              {
                icon: "💡",
                title: "Strategic Insights",
                desc: "Thought leadership & CXO intelligence.",
              },
            ].map((item) => (
              <div key={item.title} className="p-3">
                <div className="text-3xl mb-2">{item.icon}</div>

                <h3 className="text-soft-gold font-bold text-lg mb-1">
                  {item.title}
                </h3>

                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────── */}
      <section className="py-4 px-4 text-center">
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-[#0B2C4D]">Ready to Join?</h2>
          <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
        </div>

        <p className="text-gray-600 mb-4 text-sm max-w-lg mx-auto">
          Become part of an exclusive network of CXOs shaping the future.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => setOpenRegisterModal(true)}
            className="btn-primary px-6 py-2 text-sm"
          >
            Request Invitation
          </button>

          <Link to="/sponsors" className="btn-outline px-6 py-2 text-sm">
            Partners
          </Link>
        </div>
        {/* ✅ SPONSORS SCROLLER */}
        <SponsorsScroller />
      </section>
      <PartnerRegistrationModal
        isOpen={openPartnerModal}
        onClose={() => setOpenPartnerModal(false)}
      />
      <RegisterMemberModal
        open={openRegisterModal}
        setOpen={setOpenRegisterModal}
      />
    </div>
  );
}
