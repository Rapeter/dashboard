import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const incomeBreakdownData = [
  { category: 'Consultation to other farmers', value: 45, color: '#047857' },
  { category: 'Equipment rental', value: 35, color: '#10B981' },
  { category: 'Extra electricity from solar panel', value: 28, color: '#34D399' },
  { category: 'Farmer service to other farmers', value: 15, color: '#FCA5A5' },
  { category: 'Financial income if you save the money in bank', value: 55, color: '#FCD34D' },
  { category: 'Nuts processing for other farmers', value: 22, color: '#93C5FD' },
  { category: 'Nursery income', value: 10, color: '#FCA5A5' },
  { category: 'Orchard tour', value: 8, color: '#D1D5DB' },
  { category: 'Other', value: 5, color: '#E5E7EB' },
];

const annualIncomeData = [
  { year: '2025', allSources: 750, otherSources: 450 },
  { year: '2026', allSources: 1900, otherSources: 900 },
];

const grossProfitData = [
  { year: '2025', value: 0 },
  { year: '2026', value: 250 },
];

const salesChannelData = [
  { year: '2025', exporters: 750, markets: 650, onFarm: 750, other: 250, retailers: 350 },
  { year: '2026', exporters: 820, markets: 720, onFarm: 820, other: 270, retailers: 380 },
];

export function FinancialPerformance() {
  return (
    <div className="space-y-6">
      {/* Income Breakdown */}
      <Card className="border border-gray-200">
        <CardHeader>
          <div>
            <CardTitle className="text-base font-medium mb-1">Income breakdown</CardTitle>
            <div className="text-sm text-gray-500">2025 - 2026</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[{ name: '2026', ...Object.fromEntries(incomeBreakdownData.map(item => [item.category, item.value])) }]}
                layout="vertical"
                margin={{ left: 20, right: 20 }}
              >
                <XAxis type="number" domain={[0, 500]} hide />
                <YAxis type="category" dataKey="name" hide />
                <Bar dataKey="Consultation to other farmers" stackId="a" fill="#047857" />
                <Bar dataKey="Equipment rental" stackId="a" fill="#10B981" />
                <Bar dataKey="Extra electricity from solar panel" stackId="a" fill="#34D399" />
                <Bar dataKey="Farmer service to other farmers" stackId="a" fill="#FCA5A5" />
                <Bar dataKey="Financial income if you save the money in bank" stackId="a" fill="#FCD34D" />
                <Bar dataKey="Nuts processing for other farmers" stackId="a" fill="#93C5FD" />
                <Bar dataKey="Nursery income" stackId="a" fill="#FCA5A5" />
                <Bar dataKey="Orchard tour" stackId="a" fill="#D1D5DB" />
                <Bar dataKey="Other" stackId="a" fill="#E5E7EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-x-6 gap-y-2 mt-6 text-xs">
            {incomeBreakdownData.map((item) => (
              <div key={item.category} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-gray-700 truncate">{item.category}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Annual Income */}
        <Card className="border border-gray-200">
          <CardHeader>
            <div>
              <CardTitle className="text-base font-medium mb-1">Annual income</CardTitle>
              <div className="text-sm text-gray-500">2025 - 2026</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={annualIncomeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="year" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} domain={[0, 2000]} ticks={[0, 500, 1000, 1500, 2000]} />
                  <Bar dataKey="allSources" fill="#10B981" name="Annual income from all sources" />
                  <Bar dataKey="otherSources" fill="#34D399" name="Annual income from in other sources" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                <span className="text-gray-700">Annual income from all sources</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#34D399]" />
                <span className="text-gray-700">Annual income from in other sources</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gross Profit */}
        <Card className="border border-gray-200">
          <CardHeader>
            <div>
              <CardTitle className="text-base font-medium mb-1">Gross profit (AUD)</CardTitle>
              <div className="text-sm text-gray-500">2025 - 2026</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={grossProfitData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="year" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} domain={[-250, 750]} ticks={[-250, 0, 250, 500, 750]} />
                  <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} name="gross profit" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                <span className="text-gray-700">gross profit</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Sales Channel */}
        <Card className="border border-gray-200">
          <CardHeader>
            <div>
              <CardTitle className="text-base font-medium mb-1">Key sales channel</CardTitle>
              <div className="text-sm text-gray-500">2025 - 2026</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesChannelData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="year" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} domain={[0, 1600]} ticks={[0, 400, 800, 1200, 1600]} />
                  <Area type="monotone" dataKey="exporters" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="markets" stackId="1" stroke="#34D399" fill="#34D399" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="onFarm" stackId="1" stroke="#6EE7B7" fill="#6EE7B7" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="other" stackId="1" stroke="#A7F3D0" fill="#A7F3D0" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="retailers" stackId="1" stroke="#D1FAE5" fill="#D1FAE5" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#10B981]" />
                <span className="text-gray-700">Exporters</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#34D399]" />
                <span className="text-gray-700">Markets</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#6EE7B7]" />
                <span className="text-gray-700">On farm sales</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#A7F3D0]" />
                <span className="text-gray-700">Other</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#D1FAE5]" />
                <span className="text-gray-700">Small retailers / supermarkets</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
