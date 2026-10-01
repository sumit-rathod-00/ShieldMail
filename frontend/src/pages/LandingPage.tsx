import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Zap, Brain, Lock, ArrowRight,
  CheckCircle, Mail, Link2, BarChart3, Server,
} from 'lucide-react';
import { supabaseConfig } from '../services/authService';

const ML_SERVICE_URL = import.meta.env.VITE_ML_SERVICE_URL ?? 'http://localhost:8000';

type ServiceStatus = 'checking' | 'online' | 'offline';

function StatusPill({ status, label }: { status: ServiceStatus; label: string }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border
      ${status === 'online'  ? 'bg-[#00ff8810] border-[#00ff8830] text-[#00ff88]' :
        status === 'offline' ? 'bg-[#ff336610] border-[#ff336630] text-[#ff3366]' :
                               'bg-[#ff8c0010] border-[#ff8c0030] text-[#ff8c00]'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full inline-block
        ${status === 'online'    ? 'bg-[#00ff88] shadow-[0_0_6px_#00ff88]' :
          status === 'offline'   ? 'bg-[#ff3366] shadow-[0_0_6px_#ff3366]' :
                                   'bg-[#ff8c00] animate-pulse'
        }`}
      />
      {label}:{' '}
      {status === 'online' ? 'Online' : status === 'offline' ? 'Offline' : 'Checking…'}
    </div>
  );
}

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    desc: 'Advanced ML models trained on millions of phishing samples detect threats with 97%+ accuracy.',
    color: 'text-[#8b5cf6]',
    bg:    'bg-[#8b5cf610] border-[#8b5cf630]',
  },
  {
    icon: Zap,
    title: 'Real-Time Detection',
    desc: 'Sub-200ms response time for instant threat identification before you click or reply.',
    color: 'text-[#00d4ff]',
    bg:    'bg-[#00d4ff10] border-[#00d4ff30]',
  },
  {
    icon: Lock,
    title: 'Explainable Results',
    desc: 'Every verdict comes with a plain-language breakdown of why the content is suspicious.',
    color: 'text-[#00ff88]',
    bg:    'bg-[#00ff8810] border-[#00ff8830]',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    desc: 'Track scan history, threat trends, and model performance across your organisation.',
    color: 'text-[#ff8c00]',
    bg:    'bg-[#ff8c0010] border-[#ff8c0030]',
  },
];

const stats = [
  { value: '97.3%',  label: 'Detection Accuracy' },
  { value: '<200ms', label: 'Avg Response Time'  },
  { value: '12M+',   label: 'Threats Blocked'    },
  { value: '99.98%', label: 'Uptime'             },
];

export function LandingPage() {
  const [mlStatus, setMlStatus] = useState<ServiceStatus>('checking');
  const supabaseStatus: ServiceStatus = supabaseConfig.isConfigured ? 'online' : 'offline';

  useEffect(() => {
    let cancelled = false;
    async function checkMl() {
      try {
        const res = await fetch(`${ML_SERVICE_URL}/health`, { signal: AbortSignal.timeout(4000) });
        if (!cancelled) setMlStatus(res.ok ? 'online' : 'offline');
      } catch {
        if (!cancelled) setMlStatus('offline');
      }
    }
    void checkMl();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col overflow-x-hidden">
      {/* Animated grid background */}
      <div className="fixed inset-0 grid-lines pointer-events-none opacity-40" />
      <div className="scan-line" />

      {/* ── NAV ────────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-[#1e2d4a] bg-[#030712]/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 font-bold text-white group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0066ff] flex items-center justify-center shadow-cyber-sm">
              <ShieldCheck size={15} className="text-white" />
            </div>
            Shield<span className="text-[#00d4ff]">Mail</span>
          </Link>

          <div className="flex-1" />

          <div className="hidden sm:flex items-center gap-1">
            <Link to="/dashboard" className="px-3 py-1.5 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">Dashboard</Link>
            <Link to="/scan-email" className="px-3 py-1.5 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">Email Scanner</Link>
            <Link to="/scan-url" className="px-3 py-1.5 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">URL Scanner</Link>
          </div>

          <Link
            to="/admin/login"
            className="btn-cyber text-xs px-3 py-1.5"
          >
            Admin
          </Link>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <main className="flex-1">
        <section className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
          {/* Glow orb */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#00d4ff08] blur-3xl pointer-events-none" />

          <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00d4ff30] bg-[#00d4ff08] text-[#00d4ff] text-xs font-mono uppercase tracking-widest mb-8 animate-fadeIn">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff] animate-pulse" />
            AI-Powered Threat Detection
          </div>

          <h1 className="relative text-6xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fadeIn">
            <span className="text-white">Shield</span>
            <span className="text-[#00d4ff] glow-cyan">Mail</span>
          </h1>

          <p className="relative text-xl text-gray-400 max-w-2xl mx-auto mb-4 animate-slideUp">
            AI-Powered Phishing Detection for Email & URLs
          </p>
          <p className="relative text-sm text-gray-600 mb-10 font-mono animate-slideUp">
            DETECT&nbsp;·&nbsp;EXPLAIN&nbsp;·&nbsp;PROTECT&nbsp;·&nbsp;LEARN
          </p>

          <div className="relative flex flex-col sm:flex-row gap-4 justify-center animate-slideUp">
            <Link to="/scan-email" className="btn-solid gap-2 text-base px-7 py-3.5">
              <Mail size={18} />
              Analyze Email
              <ArrowRight size={16} />
            </Link>
            <Link to="/scan-url" className="btn-cyber text-base px-7 py-3.5">
              <Link2 size={18} />
              Analyze URL
            </Link>
          </div>
        </section>

        {/* ── STATS STRIP ────────────────────────────────────────────────── */}
        <section className="border-y border-[#1e2d4a] bg-[#0a0f1e]/60 py-8">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-[#00d4ff] glow-cyan mono">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1 font-mono uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ───────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">
              Enterprise-Grade <span className="text-[#00d4ff]">Security</span>
            </h2>
            <p className="text-gray-500 text-sm">Built for researchers, used by defenders.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => (
              <div key={f.title} className="cyber-card-hover p-6 group">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${f.bg} ${f.color}`}>
                  <f.icon size={20} />
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ───────────────────────────────────────────────── */}
        <section className="border-t border-[#1e2d4a] bg-[#0a0f1e]/40 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-12">
              How It <span className="text-[#00d4ff]">Works</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', icon: Mail,        title: 'Submit Content',  desc: 'Paste an email or URL into the scanner. No login required.' },
                { step: '02', icon: Brain,       title: 'ML Analysis',     desc: 'Our model extracts 50+ features and scores the threat level.' },
                { step: '03', icon: CheckCircle, title: 'Instant Verdict', desc: 'Receive a clear verdict with confidence score and explanation.' },
              ].map((step) => (
                <div key={step.step} className="relative">
                  <div className="text-5xl font-black text-[#1e2d4a] mb-4 font-mono">{step.step}</div>
                  <div className="w-10 h-10 rounded-xl bg-[#00d4ff10] border border-[#00d4ff30] flex items-center justify-center mx-auto mb-3">
                    <step.icon size={18} className="text-[#00d4ff]" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#1e2d4a] bg-[#0a0f1e]/50 py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-600 font-mono">
            <ShieldCheck size={13} className="text-[#00d4ff]" />
            ShieldMail ML Research Platform
          </div>
          <div className="sm:flex-1" />
          <div className="flex flex-wrap items-center gap-3">
            <StatusPill status={mlStatus} label="ML Service" />
            <StatusPill status={supabaseStatus} label="Database" />
            {mlStatus === 'online' && (
              <a href={`${ML_SERVICE_URL}/docs`} target="_blank" rel="noreferrer"
                className="flex items-center gap-1 text-xs text-[#00d4ff]/60 hover:text-[#00d4ff] transition-colors font-mono">
                <Server size={11} /> API Docs ↗
              </a>
            )}
          </div>
          <p className="text-xs text-gray-700 font-mono sm:ml-4">v2.4.1 © 2026</p>
        </div>
      </footer>
    </div>
  );
}
