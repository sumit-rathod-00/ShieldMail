import { useState } from 'react';
import { mlService } from '../../services/mlService';
import { ThreatBar } from '../ui/CyberUI';

export function EmailScanner() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const scan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const data = {
        sender: (form[0] as HTMLInputElement).value,
        subject: (form[1] as HTMLInputElement).value,
        body: (form[2] as HTMLTextAreaElement).value
    };
    try {
        const res = await mlService.predictEmail(data);
        setResult(res);
    } catch {
        setResult({ prediction: 'error' });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto cyber-card p-6 animate-slideUp">
      <h2 className="text-xl font-semibold text-white mb-6">Email Scanner</h2>
      <form onSubmit={scan} className="space-y-4">
        <input type="text" placeholder="Sender" className="cyber-input" required />
        <input type="text" placeholder="Subject" className="cyber-input" required />
        <textarea placeholder="Body" className="cyber-input" rows={4} required />
        <button type="submit" className="btn-solid w-full" disabled={loading}>
          {loading ? 'Analyzing...' : 'Scan'}
        </button>
      </form>
      {result && (
        <div className="mt-6 p-4 rounded-lg bg-[#0a0f1e] border border-[#1e2d4a]">
           <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">Result:</span>
            <span className={result.prediction === 'phishing' ? 'badge-danger' : 'badge-safe'}>
              {result.prediction.toUpperCase()}
            </span>
           </div>
           <ThreatBar value={result.phishing_probability} />
        </div>
      )}
    </div>
  );
}
