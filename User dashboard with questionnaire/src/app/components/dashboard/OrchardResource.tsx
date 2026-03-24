import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const yieldData = [
  { year: '2025', value: 95 },
  { year: '2026', value: 210 },
];

export function OrchardResource() {
  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-gray-200">
          <CardHeader className="pb-2">
            <div className="text-sm text-gray-500 mb-1">2025 - 2026</div>
            <CardTitle className="text-base font-medium">Farm size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">153</span>
              <span className="text-gray-500">ha</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader className="pb-2">
            <div className="text-sm text-gray-500 mb-1">2025 - 2026</div>
            <CardTitle className="text-base font-medium">Orchard size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">117</span>
              <span className="text-gray-500">ha</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader className="pb-2">
            <div className="text-sm text-gray-500 mb-1">2025 - 2026</div>
            <CardTitle className="text-base font-medium">Number of trees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">5万</span>
              <span className="text-gray-500">ha</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="border border-gray-200">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-base font-medium mb-1">
                Annual truffle yield <span className="text-gray-500 font-normal">(tonnes)</span>
              </CardTitle>
              <div className="text-sm text-gray-500">2025 - 2026</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="year"
                  stroke="#9CA3AF"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#9CA3AF"
                  style={{ fontSize: '12px' }}
                  domain={[0, 220]}
                  ticks={[0, 55, 110, 165, 220]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="annual truffle yield"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                <span className="text-sm text-gray-600">annual truffle yield</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
