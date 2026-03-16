import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { format } from 'date-fns';
import { FiCalendar, FiMapPin, FiFilter } from 'react-icons/fi';

const EVENT_TYPES = ['all', 'conference', 'roundtable', 'webinar', 'hybrid', 'micro-conference'];

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setLoading(true);
    const params = filter !== 'all' ? `?type=${filter}` : '';
    api.get(`/events${params}`)
      .then(res => setEvents(res.data.data || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="section-title">Events & Conferences</h1>
        <p className="section-subtitle">Exclusive CXO gatherings, forums, and roundtables</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {EVENT_TYPES.map(type => (
          <button key={type} onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all capitalize
              ${filter === type ? 'bg-royal-blue text-white border-royal-blue' : 'border-gray-300 text-gray-600 hover:border-royal-blue'}`}>
            {type === 'all' ? 'All Events' : type}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <p className="text-center text-gray-500 py-16">Loading events...</p>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event.id} className="card border-t-4 border-soft-gold flex flex-col">
              {event.bannerImage && (
                <img src={event.bannerImage} alt={event.title} className="w-full h-40 object-cover rounded-t-lg -mt-6 -mx-6 mb-4 w-[calc(100%+3rem)]" />
              )}
              <span className="text-xs text-teal-accent font-semibold uppercase tracking-wider">{event.eventType}</span>
              <h3 className="text-royal-blue font-bold text-lg mt-2 mb-3 flex-1">{event.title}</h3>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <FiCalendar size={13} />
                <span>{event.startDate ? format(new Date(event.startDate), 'MMM dd, yyyy') : 'Date TBA'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                <FiMapPin size={13} />
                <span>{event.city || 'TBA'}</span>
              </div>
              {event.isInviteOnly && (
                <span className="text-xs bg-soft-gold text-royal-blue px-2 py-0.5 rounded font-semibold w-fit mb-3">Invite Only</span>
              )}
              <Link to={`/events/${event.slug}`} className="btn-outline text-center text-sm py-2 rounded mt-auto">
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No events found.</p>
          <p className="text-gray-400 text-sm mt-2">Check back soon for upcoming events.</p>
        </div>
      )}
    </div>
  );
}
