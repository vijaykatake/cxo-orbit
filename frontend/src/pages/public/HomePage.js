import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api';
import { format } from 'date-fns';
import { FiCalendar, FiMapPin, FiArrowRight } from 'react-icons/fi';

export default function HomePage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get('/events?status=published').then(res => setEvents(res.data.data?.slice(0, 3) || [])).catch(() => {});
  }, []);

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="bg-royal-blue text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-soft-gold font-semibold tracking-widest text-sm uppercase mb-4">Invite-Only • Executive Excellence</p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Where World-Class<br/>
            <span className="text-soft-gold">CXO Leaders</span> Connect
          </h1>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            CXO Orbit Global is a premium platform for curated executive roundtables, leadership forums, and high-impact conferences across India and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/community" className="btn-primary px-8 py-3 rounded text-base">Join as CXO Member</Link>
            <Link to="/sponsors" className="btn-secondary px-8 py-3 rounded text-base">Partner With Us</Link>
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ──────────────────────────── */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Upcoming Events</h2>
          <p className="section-subtitle">Exclusive experiences for verified CXO leaders</p>
        </div>
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map(event => (
              <div key={event.id} className="card border-t-4 border-soft-gold">
                <span className="text-xs text-teal-accent font-semibold uppercase tracking-wider">
                  {event.eventType}
                </span>
                <h3 className="text-royal-blue font-bold text-lg mt-2 mb-3">{event.title}</h3>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <FiCalendar size={14} />
                  <span>{event.startDate ? format(new Date(event.startDate), 'MMM dd, yyyy') : 'TBA'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                  <FiMapPin size={14} />
                  <span>{event.city || 'TBA'}</span>
                </div>
                <Link to={`/events/${event.slug}`}
                  className="text-teal-accent font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Learn More <FiArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No upcoming events. Check back soon.</p>
        )}
        <div className="text-center mt-10">
          <Link to="/events" className="btn-outline px-8 py-3 rounded">View All Events</Link>
        </div>
      </section>

      {/* ── Why CXO Orbit ────────────────────────────── */}
      <section className="bg-royal-blue text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-soft-gold mb-12">Why CXO Orbit Global?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Curated & Invite-Only', desc: 'Every member is a verified C-suite leader. No noise, pure signal.' },
              { icon: '🌐', title: 'Global Reach', desc: 'From Pune & Mumbai to international forums — we are scaling worldwide.' },
              { icon: '💡', title: 'Strategic Insights', desc: 'Knowledge hub, research reports, and thought leadership at your fingertips.' },
            ].map(item => (
              <div key={item.title} className="p-6">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-soft-gold font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-16 px-4 text-center">
        <h2 className="section-title">Ready to Join the Circle?</h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Become part of an exclusive network of CXOs shaping the future of business and leadership.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="btn-primary px-8 py-3 rounded text-base">Request an Invitation</Link>
          <Link to="/sponsors" className="btn-outline px-8 py-3 rounded text-base">Explore Sponsorship</Link>
        </div>
      </section>
    </div>
  );
}
