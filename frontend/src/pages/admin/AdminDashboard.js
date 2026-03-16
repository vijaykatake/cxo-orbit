import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ events: 0, users: 0, sponsors: 0, emails: 0 });

  useEffect(() => {
    Promise.all([
      api.get('/events/admin/all').catch(() => ({ data: { data: [] } })),
      api.get('/admin/users').catch(() => ({ data: { data: [] } })),
      api.get('/sponsors').catch(() => ({ data: { data: [] } })),
      api.get('/admin/email-logs').catch(() => ({ data: { data: [] } })),
    ]).then(([events, users, sponsors, emails]) => {
      setStats({
        events: events.data.data?.length || 0,
        users: users.data.data?.length || 0,
        sponsors: sponsors.data.data?.length || 0,
        emails: emails.data.data?.length || 0,
      });
    });
  }, []);

  const tiles = [
    { label: 'Total Events', value: stats.events, link: '/admin/events', color: 'bg-royal-blue', icon: '📅' },
    { label: 'Members & Users', value: stats.users, link: '/admin/users', color: 'bg-teal-accent', icon: '👥' },
    { label: 'Sponsors', value: stats.sponsors, link: '/admin/sponsors', color: 'bg-soft-gold', icon: '🤝' },
    { label: 'Emails Sent', value: stats.emails, link: '/admin/emails', color: 'bg-charcoal', icon: '✉️' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-royal-blue">Welcome back, {user?.firstName} 👋</h1>
        <p className="text-gray-500 text-sm mt-1">Here's an overview of CXO Orbit Global</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {tiles.map(t => (
          <Link key={t.label} to={t.link}
            className={`${t.color} text-white rounded-xl p-5 hover:brightness-110 transition-all`}>
            <div className="text-3xl mb-2">{t.icon}</div>
            <div className="text-3xl font-bold">{t.value}</div>
            <div className="text-sm opacity-80 mt-1">{t.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="font-bold text-lg text-royal-blue mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: 'Create Event', to: '/admin/events/new', icon: '➕' },
          { label: 'Invite Member', to: '/admin/users/invite', icon: '📨' },
          { label: 'View Sponsors', to: '/admin/sponsors', icon: '💼' },
          { label: 'Manage CMS Pages', to: '/admin/cms', icon: '📄' },
          { label: 'Email Logs', to: '/admin/emails', icon: '📬' },
          { label: 'All Users', to: '/admin/users', icon: '👤' },
        ].map(a => (
          <Link key={a.label} to={a.to}
            className="card flex items-center gap-3 hover:border-royal-blue border border-transparent">
            <span className="text-2xl">{a.icon}</span>
            <span className="font-medium text-charcoal">{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
