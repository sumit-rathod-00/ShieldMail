import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck, Activity, Mail, Link2, LayoutDashboard,
  Settings, LogOut, ChevronRight, Cpu, AlertTriangle,
} from 'lucide-react';
import { adminAuth } from '../../services/adminAuth';
import { cn } from '../../utils/cn';

interface NavItem {
  to: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  badge?: string;
}

const userNav: NavItem[] = [
  { to: '/dashboard',  icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/scan-email', icon: Mail,            label: 'Email Scanner' },
  { to: '/scan-url',   icon: Link2,           label: 'URL Scanner' },
  { to: '/activity',   icon: Activity,        label: 'Scan History' },
];

const adminNav: NavItem[] = [
  { to: '/admin',          icon: LayoutDashboard, label: 'Overview' },
  { to: '/admin/scans',    icon: Activity,        label: 'Scan Logs' },
  { to: '/admin/threats',  icon: AlertTriangle,   label: 'Threats', badge: 'NEW' },
  { to: '/admin/models',   icon: Cpu,             label: 'ML Models' },
  { to: '/admin/settings', icon: Settings,        label: 'Settings' },
];

function SideNavItem({ item }: { item: NavItem }) {
  return (
    <NavLink
      to={item.to}
      end={item.to === '/admin' || item.to === '/dashboard'}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group border',
          isActive
            ? 'nav-active'
            : 'text-gray-400 hover:text-white border-transparent hover:bg-white/5',
        )
      }
    >
      <item.icon size={16} className="shrink-0" />
      <span className="flex-1">{item.label}</span>
      {item.badge && (
        <span className="badge-danger text-[10px] px-1.5 py-0">{item.badge}</span>
      )}
      <ChevronRight size={12} className="opacity-0 group-hover:opacity-40 -mr-1 transition-opacity" />
    </NavLink>
  );
}

interface SidebarProps {
  mode: 'user' | 'admin';
}

export function Sidebar({ mode }: SidebarProps) {
  const navigate = useNavigate();
  const session = adminAuth.getSession();

  const handleLogout = () => {
    adminAuth.logout();
    navigate('/');
  };

  const nav = mode === 'admin' ? adminNav : userNav;

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-60 bg-[#0a0f1e] border-r border-[#1e2d4a] flex flex-col z-40 overflow-hidden">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#1e2d4a] shrink-0">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0066ff] flex items-center justify-center shrink-0 shadow-cyber-sm">
            <ShieldCheck size={18} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-white text-sm leading-none">
              Shield<span className="text-[#00d4ff]">Mail</span>
            </div>
            <div className="text-[10px] text-gray-500 font-mono mt-0.5 uppercase tracking-wide">
              {mode === 'admin' ? 'Admin Panel' : 'Security Platform'}
            </div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <div className="text-[10px] text-gray-600 uppercase tracking-widest px-3 mb-2 font-mono">
          {mode === 'admin' ? 'Admin' : 'Navigation'}
        </div>
        {nav.map((item) => <SideNavItem key={item.to} item={item} />)}

        {mode === 'user' && (
          <>
            <div className="h-px bg-[#1e2d4a] my-3" />
            <div className="text-[10px] text-gray-600 uppercase tracking-widest px-3 mb-2 font-mono">Admin</div>
            <NavLink
              to="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-gray-400 hover:text-white border border-transparent hover:bg-white/5"
            >
              <Settings size={16} />
              Admin Panel
            </NavLink>
          </>
        )}
      </nav>

      {/* User footer */}
      <div className="px-3 py-3 border-t border-[#1e2d4a] shrink-0">
        {session ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4ff33] to-[#8b5cf633] border border-[#00d4ff30] flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-[#00d4ff]">
                {session.username[0].toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate">{session.username}</div>
              <div className="text-[10px] text-[#00d4ff] font-mono">{session.role}</div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors"
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <Link
            to="/admin/login"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-[#00d4ff] hover:bg-[#00d4ff0a] transition-all border border-transparent hover:border-[#00d4ff20]"
          >
            <Settings size={13} />
            Admin Login
          </Link>
        )}
      </div>
    </aside>
  );
}
