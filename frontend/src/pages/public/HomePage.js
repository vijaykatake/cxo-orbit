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
export default function HomePage() {
  const [openPartnerModal, setOpenPartnerModal] = useState(false);
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
            Invite-Only • Executive Excellence
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
            <Link to="/community" className="btn-primary px-6 py-2 text-sm">
              Join as CXO Member
            </Link>

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
      <div className="py-2">
        <LatestNews />
      </div>
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
            <h2 className="text-3xl font-bold text-soft-gold">
              Why CXO Orbit Global?
            </h2>
            <div className="w-24 h-[2px] bg-soft-gold mx-auto mt-2"></div>
          </div>

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
                desc: "From Pune to global forums.",
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
          <Link to="/contact" className="btn-primary px-6 py-2 text-sm">
            Request Invitation
          </Link>

          <Link to="/sponsors" className="btn-outline px-6 py-2 text-sm">
            Sponsorship
          </Link>
        </div>
      </section>
      <PartnerRegistrationModal
        isOpen={openPartnerModal}
        onClose={() => setOpenPartnerModal(false)}
      />
    </div>
  );
}
