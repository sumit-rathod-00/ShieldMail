// Reusable UI primitives for the cybersecurity theme

import { cn } from '../../utils/cn';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

// ── Stat Card ───────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  variant?: 'safe' | 'danger' | 'warn' | 'info' | 'default';
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

const variantClasses = {
  safe:    'stat-safe',
  danger:  'stat-danger',
  warn:    'stat-warn',
  info:    'stat-info',
  default: 'bg-[#0d1424] border-[#1e2d4a]',
};
const variantValue = {
  safe:    'text-[#00ff88]',
  danger:  'text-[#ff3366]',
  warn:    'text-[#ff8c00]',
  info:    'text-[#00d4ff]',
  default: 'text-white',
};

export function StatCard({ label, value, sub, variant = 'default', icon: Icon }: StatCardProps) {
  return (
    <div className={cn('cyber-card p-5 animate-slideUp', variantClasses[variant])}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-2">{label}</p>
          <p className={cn('text-3xl font-bold tabular-nums', variantValue[variant])}>{value}</p>
          {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
        </div>
        {Icon && (
          <div className={cn(
            'p-2.5 rounded-lg border',
            variant === 'safe'    ? 'bg-[#00ff8810] border-[#00ff8825] text-[#00ff88]' :
            variant === 'danger'  ? 'bg-[#ff336610] border-[#ff336625] text-[#ff3366]' :
            variant === 'warn'    ? 'bg-[#ff8c0010] border-[#ff8c0025] text-[#ff8c00]' :
            variant === 'info'    ? 'bg-[#00d4ff10] border-[#00d4ff25] text-[#00d4ff]' :
            'bg-white/5 border-white/10 text-gray-400'
          )}>
            <Icon size={18} />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Threat Probability Bar ───────────────────────────────────────────────────
interface ThreatBarProps {
  value: number; // 0-1
  size?: 'sm' | 'md';
}

export function ThreatBar({ value, size = 'md' }: ThreatBarProps) {
  const pct = Math.round(value * 100);
  const variant = value >= 0.7 ? 'fill-danger' : value >= 0.4 ? 'fill-warn' : 'fill-safe';
  return (
    <div className="space-y-1">
      <div className={cn('threat-bar-track', size === 'sm' ? 'h-1.5' : 'h-2')}>
        <div
          className={`threat-bar-${variant} h-full rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {size === 'md' && (
        <div className="text-right text-xs font-mono text-gray-400">{pct}%</div>
      )}
    </div>
  );
}

// ── Alert Banner ─────────────────────────────────────────────────────────────
interface AlertProps {
  type: 'success' | 'danger' | 'warn' | 'info';
  message: string;
  onClose?: () => void;
}

const alertConfig = {
  success: { icon: CheckCircle, cls: 'bg-[#00ff8810] border-[#00ff8830] text-[#00ff88]' },
  danger:  { icon: XCircle,     cls: 'bg-[#ff336610] border-[#ff336630] text-[#ff3366]' },
  warn:    { icon: AlertTriangle,cls: 'bg-[#ff8c0010] border-[#ff8c0030] text-[#ff8c00]' },
  info:    { icon: Info,         cls: 'bg-[#00d4ff10] border-[#00d4ff30] text-[#00d4ff]' },
};

export function AlertBanner({ type, message, onClose }: AlertProps) {
  const { icon: Icon, cls } = alertConfig[type];
  return (
    <div className={cn('flex items-center gap-3 px-4 py-3 rounded-lg border text-sm animate-slideUp', cls)}>
      <Icon size={16} className="shrink-0" />
      <span className="flex-1">{message}</span>
      {onClose && (
        <button onClick={onClose} className="opacity-60 hover:opacity-100 transition-opacity">×</button>
      )}
    </div>
  );
}

// ── Badge ────────────────────────────────────────────────────────────────────
interface BadgeProps {
  variant: 'safe' | 'danger' | 'warn' | 'info';
  children: React.ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  return <span className={`badge-${variant}`}>{children}</span>;
}

// ── Skeleton loader ──────────────────────────────────────────────────────────
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('skeleton', className)} />;
}

// ── Section header ────────────────────────────────────────────────────────────
export function SectionHeader({ title, subtitle, children }: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-5">
      <div>
        <h2 className="text-base font-semibold text-white">{title}</h2>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
