import { useState } from 'react';
import { mlService } from '../../services/mlService';
import { ThreatBar } from '../ui/CyberUI';

export function URLScanner() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const scan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const data = { url: (form[0] as HTMLInputElement).value };
    try {
        const res = await mlService.predictURL(data);
        setResult(res);
    } catch {
        setResult({ prediction: 'error' });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto cyber-card p-6 animate-slideUp">
      <h2 className="text-xl font-semibold text-white mb-6">URL Scanner</h2>
      <form onSubmit={scan} className="space-y-4">
        <input type="url" placeholder="URL (e.g., https://example.com)" className="cyber-input" required />
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
