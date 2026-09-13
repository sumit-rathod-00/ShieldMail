import { useState } from 'react';

export function EmailScanner() {
  const [result, setResult] = useState<any>(null);

  const scan = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend
    setResult({ prediction: 'legitimate', phishing_probability: 0.05 });
  };

  return (
    <div className="p-4 bg-gray-900 rounded-lg">
      <h2 className="text-xl text-white mb-4">Email Scanner</h2>
      <form onSubmit={scan} className="space-y-4">
        <input type="text" placeholder="Sender" className="w-full p-2 bg-gray-800 text-white rounded" />
        <input type="text" placeholder="Subject" className="w-full p-2 bg-gray-800 text-white rounded" />
        <textarea placeholder="Body" className="w-full p-2 bg-gray-800 text-white rounded" rows={4} />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Scan</button>
      </form>
      {result && (
        <div className="mt-4 p-2 bg-gray-800 text-green-400">
          Result: {result.prediction} ({result.phishing_probability * 100}% phishing risk)
        </div>
      )}
    </div>
  );
}
