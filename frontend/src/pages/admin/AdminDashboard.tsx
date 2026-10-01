import { Sidebar } from '../../components/layout/Sidebar';
import { TopBar } from '../../components/layout/TopBar';
import { StatCard, SectionHeader, ThreatBar } from '../../components/ui/CyberUI';
import { scanStore } from '../../services/scanStore';
import { Activity, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';

export function AdminDashboard() {
  const stats = scanStore.getStats();
  const history = scanStore.getHistory().slice(0, 5);

  return (
    <div className="flex min-h-screen bg-[#030712]">
      <Sidebar mode="admin" />
      <div className="flex-1 flex flex-col pl-60">
        <TopBar title="Admin Overview" subtitle="System Health" mlOnline={true} />

        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Scans" value={stats.totalScans} icon={Activity} />
            <StatCard label="Threats Detected" value={stats.threatsDetected} icon={ShieldAlert} variant="danger" />
            <StatCard label="Accuracy" value={stats.accuracy + '%'} icon={CheckCircle} variant="safe" />
            <StatCard label="ML Model" value={stats.modelVersion} icon={Cpu} variant="info" />
          </div>

          <SectionHeader title="Recent Activity" subtitle="Latest ML inference logs">
            <button className="btn-cyber text-xs">Export Logs</button>
          </SectionHeader>

          <div className="cyber-card">
            <table className="cyber-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Type</th>
                  <th>Input</th>
                  <th>Verdict</th>
                  <th>Probability</th>
                </tr>
              </thead>
              <tbody>
                {history.map(r => (
                  <tr key={r.id}>
                    <td className="font-mono text-gray-500">{new Date(r.timestamp).toLocaleTimeString()}</td>
                    <td>{r.type.toUpperCase()}</td>
                    <td className="font-mono text-xs">{r.input}</td>
                    <td>
                      <span className={r.prediction === 'phishing' ? 'badge-danger' : 'badge-safe'}>
                        {r.prediction.toUpperCase()}
                      </span>
                    </td>
                    <td className="w-40"><ThreatBar value={r.probability} size="sm" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
