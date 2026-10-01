import { ShieldCheck, Wifi, WifiOff, Clock } from 'lucide-react';

interface TopBarProps {
  title: string;
  subtitle?: string;
  mlOnline?: boolean;
}

export function TopBar({ title, subtitle, mlOnline }: TopBarProps) {
  const now = new Date().toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <header className="h-14 border-b border-[#1e2d4a] bg-[#0a0f1e]/80 backdrop-blur flex items-center px-6 gap-4 shrink-0">
      {/* Breadcrumb / title */}
      <div className="flex items-center gap-2 min-w-0">
        <ShieldCheck size={16} className="text-[#00d4ff] shrink-0" />
        <h1 className="text-sm font-semibold text-white truncate">{title}</h1>
        {subtitle && (
          <>
            <span className="text-gray-600">/</span>
            <span className="text-xs text-gray-400 truncate">{subtitle}</span>
          </>
        )}
      </div>

      <div className="flex-1" />

      {/* ML status */}
      {mlOnline !== undefined && (
        <div className={`flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border
          ${mlOnline
            ? 'text-[#00ff88] border-[#00ff8830] bg-[#00ff8808]'
            : 'text-red-400 border-red-900 bg-red-950/30'
          }`}
        >
          {mlOnline ? <Wifi size={11} /> : <WifiOff size={11} />}
          ML {mlOnline ? 'Online' : 'Offline'}
        </div>
      )}

      {/* Time */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
        <Clock size={11} />
        {now}
      </div>
    </header>
  );
}
