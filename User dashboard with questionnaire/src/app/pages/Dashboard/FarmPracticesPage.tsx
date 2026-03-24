import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock Data for Bar Chart
const irrigationData = [
  { region: 'Region A', myData: 80, peerAverage: 65, globalAverage: 55 },
  { region: 'Region B', myData: 45, peerAverage: 50, globalAverage: 48 },
  { region: 'Region C', myData: 90, peerAverage: 75, globalAverage: 70 },
  { region: 'Region D', myData: 60, peerAverage: 60, globalAverage: 65 },
];

// Reusable Metric Card Component
const MetricCard = ({ title, myData, peerAverage, globalAverage }: any) => (
  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3">
    <h3 className="font-semibold text-gray-800">{title}</h3>
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#10B981]"></div>My Data</span>
        <span className="font-bold text-gray-900">{myData}</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-400"></div>Peer Group Average</span>
        <span className="font-medium text-gray-600">{peerAverage}</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-400"></div>Global Average</span>
        <span className="font-medium text-gray-600">{globalAverage}</span>
      </div>
    </div>
  </div>
);

export function FarmPracticesPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Page Title section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Farm Practice Benchmarking</h1>
        <p className="text-gray-500">Compare your Agrifuture Truffle operational practices against peers and global standards.</p>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard title="Pre-planting decisions" myData="Active" peerAverage="75% Active" globalAverage="60% Active" />
        <MetricCard title="Soil test frequency" myData="Annually" peerAverage="Every 2 Years" globalAverage="Every 3 Years" />
        <MetricCard title="Irrigation system" myData="Drip" peerAverage="Sprinkler" globalAverage="Mixed" />
        <MetricCard title="Irrigation scheduling" myData="Sensor-based" peerAverage="Manual" globalAverage="Manual" />
      </div>

      {/* Main Chart Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-6">Irrigation system by region (My Data vs Regions)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={irrigationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
              <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
              <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}}/>
              <Bar dataKey="myData" name="My Data" fill="#10B981" radius={[4, 4, 0, 0]} barSize={32} />
              <Bar dataKey="peerAverage" name="Peer Group Average" fill="#60A5FA" radius={[4, 4, 0, 0]} barSize={32} />
              <Bar dataKey="globalAverage" name="Global Average" fill="#C084FC" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Scroll Down: Bottom Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pt-4">
        <MetricCard title="Pest management strategies" myData="Integrated" peerAverage="Chemical" globalAverage="Mixed" />
        <MetricCard title="Disease control" myData="Preventative" peerAverage="Reactive" globalAverage="Reactive" />
        <MetricCard title="Fertilizer program" myData="Custom Blend" peerAverage="Standard" globalAverage="Standard" />
        <MetricCard title="Pruning method" myData="Mechanical" peerAverage="Manual" globalAverage="Manual" />
      </div>

    </div>
  );
}