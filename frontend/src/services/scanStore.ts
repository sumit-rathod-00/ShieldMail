// Mock scan history & stats — simulates what the backend would return
export interface ScanRecord {
  id: string;
  type: 'email' | 'url';
  input: string;
  prediction: 'phishing' | 'legitimate';
  probability: number;
  timestamp: string;
  ip?: string;
}

export interface SystemStats {
  totalScans: number;
  threatsDetected: number;
  accuracy: number;
  avgResponseMs: number;
  uptime: string;
  modelVersion: string;
}

let _history: ScanRecord[] = [
  { id: '1', type: 'email', input: 'verify-account@secure-bank.net', prediction: 'phishing', probability: 0.94, timestamp: '2026-10-01T08:12:44Z' },
  { id: '2', type: 'url',   input: 'http://paypa1-login.tk/verify', prediction: 'phishing', probability: 0.97, timestamp: '2026-10-01T07:58:01Z' },
  { id: '3', type: 'email', input: 'newsletter@github.com',          prediction: 'legitimate', probability: 0.02, timestamp: '2026-10-01T07:44:15Z' },
  { id: '4', type: 'url',   input: 'https://docs.google.com/sheet',  prediction: 'legitimate', probability: 0.01, timestamp: '2026-10-01T07:30:00Z' },
  { id: '5', type: 'email', input: 'support@micros0ft-help.com',     prediction: 'phishing', probability: 0.89, timestamp: '2026-10-01T07:15:33Z' },
  { id: '6', type: 'url',   input: 'http://amazon-security-alert.xyz', prediction: 'phishing', probability: 0.96, timestamp: '2026-10-01T06:55:12Z' },
  { id: '7', type: 'email', input: 'no-reply@linkedin.com',          prediction: 'legitimate', probability: 0.03, timestamp: '2026-10-01T06:30:00Z' },
  { id: '8', type: 'url',   input: 'https://stackoverflow.com/q/123', prediction: 'legitimate', probability: 0.01, timestamp: '2026-10-01T06:05:44Z' },
];

let _stats: SystemStats = {
  totalScans: 1284,
  threatsDetected: 387,
  accuracy: 97.3,
  avgResponseMs: 142,
  uptime: '99.98%',
  modelVersion: 'v2.4.1',
};

export const scanStore = {
  getHistory: (): ScanRecord[] => [..._history].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ),

  addRecord(r: Omit<ScanRecord, 'id' | 'timestamp'>): ScanRecord {
    const record: ScanRecord = {
      ...r,
      id: Math.random().toString(36).slice(2, 9),
      timestamp: new Date().toISOString(),
    };
    _history.unshift(record);
    _stats.totalScans += 1;
    if (record.prediction === 'phishing') _stats.threatsDetected += 1;
    return record;
  },

  getStats: (): SystemStats => ({ ..._stats }),

  deleteRecord(id: string) {
    _history = _history.filter((r) => r.id !== id);
  },

  clearHistory() {
    _history = [];
  },

  updateModelVersion(v: string) {
    _stats.modelVersion = v;
  },
};
