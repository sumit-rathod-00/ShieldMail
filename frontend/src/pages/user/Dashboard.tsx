export function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">ShieldMail Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-6 bg-gray-900 rounded-lg border border-gray-800">
          <h2 className="text-gray-400">Total Scans</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="p-6 bg-gray-900 rounded-lg border border-gray-800">
          <h2 className="text-gray-400">Threats Detected</h2>
          <p className="text-3xl font-bold text-red-500">0</p>
        </div>
      </div>
    </div>
  );
}
