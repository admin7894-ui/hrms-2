import React, { useEffect, useState } from 'react';
import { dashboardService } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const StatCard = ({ label, value, icon, color }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4`}>
    <div className={`text-3xl w-14 h-14 flex items-center justify-center rounded-xl ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value?.toLocaleString() ?? '—'}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardService.get()
      .then((r) => setStats(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome back 👋</h1>
        <p className="text-gray-500 mt-1">{user?.email} · {user?.role?.roleName || user?.role || 'Guest'}</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Employees" value={stats?.totalEmployees} icon="👤" color="bg-indigo-50 text-indigo-600" />
          <StatCard label="Active Assignments" value={stats?.activeAssignments} icon="📋" color="bg-green-50 text-green-600" />
          <StatCard label="Open Requisitions" value={stats?.openRequisitions} icon="📣" color="bg-yellow-50 text-yellow-600" />
          <StatCard label="Pending Leaves" value={stats?.pendingAbsences} icon="🏖️" color="bg-red-50 text-red-600" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Hires */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Hires</h2>
          <div className="space-y-3">
            {stats?.recentHires?.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="w-9 h-9 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold">
                  {p.firstName?.[0]}{p.lastName?.[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{p.firstName} {p.lastName}</p>
                  <p className="text-xs text-gray-400">{p.email}</p>
                </div>
                <span className="ml-auto text-xs text-gray-400">
                  {p.hireDate ? new Date(p.hireDate).toLocaleDateString() : new Date(p.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
            {!stats?.recentHires?.length && <p className="text-sm text-gray-400">No recent hires</p>}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add Employee', href: '/persons', icon: '👤' },
              { label: 'Run Payroll', href: '/payroll-runs', icon: '⚙️' },
              { label: 'Leave Requests', href: '/absences', icon: '🏖️' },
              { label: 'Recruitment', href: '/requisitions', icon: '📣' },
              { label: 'Appraisals', href: '/appraisals', icon: '📈' },
              { label: 'Training', href: '/training-programs', icon: '📚' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-indigo-50 rounded-lg transition text-sm text-gray-700 font-medium hover:text-indigo-700 border border-gray-100 hover:border-indigo-200"
              >
                <span className="text-lg">{link.icon}</span> {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
