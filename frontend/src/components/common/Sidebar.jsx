import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const navGroups = [
  {
    label: 'Overview',
    items: [{ to: '/', label: '📊 Dashboard' }],
  },
  {
    label: 'Organization',
    items: [
      { to: '/companies', label: '🏢 Companies' },
      { to: '/locations', label: '📍 Locations' },
      { to: '/business-groups', label: '🌐 Business Groups' },
      { to: '/legal-entities', label: '⚖️ Legal Entities' },
      { to: '/operating-units', label: '🏭 Operating Units' },
      { to: '/hr-organizations', label: '🏗️ HR Organizations' },
    ],
  },
  {
    label: 'HR Core',
    items: [
      { to: '/persons', label: '👤 Employees' },
      { to: '/assignments', label: '📋 Assignments' },
      { to: '/positions', label: '💼 Positions' },
      { to: '/jobs', label: '🔖 Jobs' },
      { to: '/grades', label: '🎓 Grades' },
      { to: '/supervisors', label: '👥 Supervisors' },
    ],
  },
  {
    label: 'Payroll',
    items: [
      { to: '/payroll-periods', label: '📅 Pay Periods' },
      { to: '/element-types', label: '💲 Elements' },
      { to: '/element-entries', label: '📝 Element Entries' },
      { to: '/salaries', label: '💵 Salaries' },
      { to: '/payroll-runs', label: '⚙️ Payroll Runs' },
      { to: '/payslips', label: '🧾 Payslips' },
      { to: '/tax-declarations', label: '🧮 Tax Declarations' },
    ],
  },
  {
    label: 'Leave & Time',
    items: [
      { to: '/absence-types', label: '📋 Leave Types' },
      { to: '/absences', label: '🏖️ Leave Requests' },
      { to: '/timecards', label: '🕐 Timecards' },
      { to: '/work-schedules', label: '📆 Work Schedules' },
      { to: '/holiday-calendars', label: '🗓️ Holidays' },
    ],
  },
  {
    label: 'Recruitment',
    items: [
      { to: '/requisitions', label: '📣 Requisitions' },
      { to: '/job-postings', label: '📢 Job Postings' },
      { to: '/applicants', label: '🙋 Applicants' },
      { to: '/applications', label: '📨 Applications' },
      { to: '/interviews', label: '🎙️ Interviews' },
      { to: '/offer-letters', label: '📜 Offers' },
    ],
  },
  {
    label: 'Benefits & Loans',
    items: [
      { to: '/benefit-plans', label: '🛡️ Benefit Plans' },
      { to: '/benefit-enrollments', label: '✅ Enrollments' },
      { to: '/loans', label: '💳 Loans' },
    ],
  },
  {
    label: 'Learning',
    items: [
      { to: '/training-programs', label: '📚 Training' },
      { to: '/training-enrollments', label: '🎒 Enrollments' },
      { to: '/competences', label: '⭐ Competences' },
    ],
  },
  {
    label: 'Performance',
    items: [
      { to: '/appraisals', label: '📈 Appraisals' },
    ],
  },
  {
    label: 'Separation',
    items: [
      { to: '/separations', label: '🚪 Separations' },
      { to: '/exit-checklists', label: '✔️ Exit Checklist' },
      { to: '/final-settlements', label: '💰 Settlements' },
    ],
  },
  {
    label: 'Admin',
    items: [
      { to: '/security-roles', label: '🔐 Roles' },
      { to: '/users', label: '👨‍💻 Users' },
      { to: '/audit-logs', label: '📓 Audit Logs' },
    ],
  },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState({});

  const toggle = (label) => setCollapsed((c) => ({ ...c, [label]: !c[label] }));

  return (
    <aside className="w-64 bg-gray-900 text-gray-200 flex flex-col h-screen fixed left-0 top-0 z-40 overflow-y-auto">
      <div className="px-5 py-5 border-b border-gray-700">
        <div className="text-xl font-bold text-white">🏢 HRMS</div>
        <div className="text-xs text-gray-400 mt-1">{user?.email}</div>
        <div className="text-xs text-indigo-400 font-medium">{user?.role}</div>
      </div>

      <nav className="flex-1 py-4 space-y-1 px-2">
        {navGroups.map((group) => (
          <div key={group.label}>
            <button
              onClick={() => toggle(group.label)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-gray-300 transition"
            >
              {group.label}
              <span>{collapsed[group.label] ? '▸' : '▾'}</span>
            </button>
            {!collapsed[group.label] && (
              <div className="space-y-0.5 pl-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `block px-3 py-1.5 rounded-lg text-sm transition ${
                        isActive
                          ? 'bg-indigo-600 text-white font-medium'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`
                    }
                    end={item.to === '/'}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full text-sm text-red-400 hover:text-red-300 hover:bg-gray-800 px-3 py-2 rounded-lg transition text-left"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
