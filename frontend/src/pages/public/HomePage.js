import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";
import { format } from "date-fns";
import { FiCalendar, FiMapPin, FiArrowRight } from "react-icons/fi";
import LatestNews from "../../components/home/LatestNews";

export default function HomePage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api
      .get("/events?status=published")
      .then((res) => setEvents(res.data.data?.slice(0, 3) || []))
      .catch(() => {});
  }, []);

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

            <Link to="/sponsors" className="btn-secondary px-6 py-2 text-sm">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── Latest News (MATCHED STYLE) ───────────────── */}
      <div className="py-2">
        <LatestNews />
      </div>

      {/* ── Upcoming Events ───────────────── */}
      <section className="py-2 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-[#0B2C4D]">Upcoming Events</h2>
          <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
        </div>

        {events.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white shadow-md p-4">
                <span className="text-red-600 text-xs font-semibold uppercase">
                  {event.eventType}
                </span>

                <h3 className="text-[#0B2C4D] font-bold text-lg mt-2 mb-2">
                  {event.title}
                </h3>

                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <FiCalendar size={14} />
                  <span>
                    {event.startDate
                      ? format(new Date(event.startDate), "MMM dd, yyyy")
                      : "TBA"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <FiMapPin size={14} />
                  <span>{event.city || "TBA"}</span>
                </div>

                <Link
                  to={`/events/${event.slug}`}
                  className="text-teal-accent text-sm flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Learn More <FiArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-sm">
            No upcoming events.
          </p>
        )}

        <div className="text-center mt-4">
          <Link to="/events" className="btn-outline px-6 py-2 text-sm">
            View All Events
          </Link>
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
    </div>
  );
}
