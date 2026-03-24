import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

const coverCropData = [
  { year: '2025', grasses: 2.0, grasses_legumes: 1.2, mulch: 0.8, none: 0.3 },
  { year: '2026', grasses: 1.8, grasses_legumes: 1.0, mulch: 0.6, none: 0.2 },
];

const pestsData = [
  { year: '2025', birds: 3, insectPests: 2.5, rodents: 2, weeds: 1.5 },
  { year: '2026', birds: 2.5, insectPests: 2, rodents: 1.5, weeds: 1.2 },
];

const soilTestingData = [
  { year: '2025', no: 1.5, yes: 1.8 },
  { year: '2026', no: 1.3, yes: 1.9 },
];

const polliniserData = [
  { variety: 'Barcelona', '1-2': 0, '3-4': 0, '5-6': 2, '7-8': 0, '9-10': 0, '11-12': 0, 'NA': 0, 'other': 0 },
  { variety: 'Casina', '1-2': 0, '3-4': 0, '5-6': 0, '7-8': 0, '9-10': 1.5, '11-12': 0, 'NA': 0, 'other': 0 },
  { variety: 'Cosford', '1-2': 0, '3-4': 0, '5-6': 0, '7-8': 0, '9-10': 0, '11-12': 0, 'NA': 0.8, 'other': 0 },
  { variety: 'Emoa', '1-2': 0, '3-4': 0, '5-6': 0, '7-8': 0, '9-10': 0, '11-12': 0, 'NA': 0, 'other': 0 },
  { variety: 'Ennis', '1-2': 0, '3-4': 0, '5-6': 0, '7-8': 0, '9-10': 0, '11-12': 0.5, 'NA': 0, 'other': 0 },
  { variety: 'Hall\'s Giant', '1-2': 0, '3-4': 0, '5-6': 0, '7-8': 0, '9-10': 0, '11-12': 0, 'NA': 0, 'other': 0 },
  { variety: 'Iannusa A', '1-2': 0, '3-4': 0, '5-6': 2.5, '7-8': 0, '9-10': 0, '11-12': 0, 'NA': 0, 'other': 0 },
  { variety: 'Lewis', '1-2': 0, '3-4': 0, '5-6': 0, '7-8': 0, '9-10': 0, '11-12': 1.5, 'NA': 0, 'other': 0 },
  { variety: 'NA', '1-2': 0, '3-4': 0, '5-6': 0, '7-8': 0, '9-10': 0, '11-12': 0, 'NA': 0, 'other': 0 },
  { variety: 'Whiteheart', '1-2': 0, '3-4': 0, '5-6': 0, '7-8': 0, '9-10': 0, '11-12': 0, 'NA': 0, 'other': 1.2 },
];

const fertilizerData = [
  { name: '2026', liquidKg: 650, solidKg: 950 },
];

const colors = ['#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE', '#EFF6FF', '#F8FAFC'];

export function FarmPractices() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Cover Crop */}
        <Card className="border border-gray-200">
          <CardHeader>
            <div>
              <CardTitle className="text-base font-medium mb-1">Cover crop & mulch practices</CardTitle>
              <div className="text-sm text-gray-500">2025 - 2026</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={coverCropData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="year" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} domain={[0, 3]} ticks={[0, 0.5, 1, 1.5, 2, 2.5, 3]} />
                  <Area type="monotone" dataKey="grasses" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="grasses_legumes" stackId="1" stroke="#34D399" fill="#34D399" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="mulch" stackId="1" stroke="#6EE7B7" fill="#6EE7B7" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="none" stackId="1" stroke="#A7F3D0" fill="#A7F3D0" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#10B981]" />
                <span className="text-gray-700">Grasses</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#34D399]" />
                <span className="text-gray-700">Grasses+legumes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#6EE7B7]" />
                <span className="text-gray-700">Mulch or similar (eg compost)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#A7F3D0]" />
                <span className="text-gray-700">None</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pests */}
        <Card className="border border-gray-200">
          <CardHeader>
            <div>
              <CardTitle className="text-base font-medium mb-1">Major pests & birds impacting production</CardTitle>
              <div className="text-sm text-gray-500">2025 - 2026</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pestsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="year" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} domain={[0, 3]} ticks={[0, 0.8, 1.6, 2.4, 3.2]} />
                  <Area type="monotone" dataKey="birds" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="insectPests" stackId="1" stroke="#34D399" fill="#34D399" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="rodents" stackId="1" stroke="#6EE7B7" fill="#6EE7B7" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="weeds" stackId="1" stroke="#A7F3D0" fill="#A7F3D0" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#10B981]" />
                <span className="text-gray-700">Birds</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#34D399]" />
                <span className="text-gray-700">Insect Pests</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#6EE7B7]" />
                <span className="text-gray-700">Rodents</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#A7F3D0]" />
                <span className="text-gray-700">Weeds</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Soil Testing */}
        <Card className="border border-gray-200">
          <CardHeader>
            <div>
              <CardTitle className="text-base font-medium mb-1">Soil testing status</CardTitle>
              <div className="text-sm text-gray-500">2025 - 2026</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={soilTestingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="year" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} domain={[0, 2]} ticks={[0, 0.5, 1, 1.5, 2]} />
                  <Area type="monotone" dataKey="no" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="yes" stackId="1" stroke="#34D399" fill="#34D399" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#10B981]" />
                <span className="text-gray-700">No</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#34D399]" />
                <span className="text-gray-700">Yes</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Polliniser Varieties */}
        <Card className="border border-gray-200">
          <CardHeader>
            <div>
              <CardTitle className="text-base font-medium mb-1">Polliniser varieties</CardTitle>
              <div className="text-sm text-gray-500">2025 - 2026</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={polliniserData}
                  layout="horizontal"
                  margin={{ left: 80, right: 20, top: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
                  <XAxis type="number" domain={[0, 3]} ticks={[0, 0.5, 1, 1.5, 2, 2.5, 3]} stroke="#9CA3AF" style={{ fontSize: '11px' }} />
                  <YAxis type="category" dataKey="variety" stroke="#9CA3AF" style={{ fontSize: '10px' }} width={75} />
                  <Bar dataKey="1-2" stackId="a" fill={colors[0]} />
                  <Bar dataKey="3-4" stackId="a" fill={colors[1]} />
                  <Bar dataKey="5-6" stackId="a" fill={colors[2]} />
                  <Bar dataKey="7-8" stackId="a" fill={colors[3]} />
                  <Bar dataKey="9-10" stackId="a" fill={colors[4]} />
                  <Bar dataKey="11-12" stackId="a" fill={colors[5]} />
                  <Bar dataKey="NA" stackId="a" fill={colors[6]} />
                  <Bar dataKey="other" stackId="a" fill={colors[7]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-4 gap-x-3 gap-y-1 mt-4 text-xs">
              {['1-2%', '3-4%', '5-6%', '7-8%', '9-10%', '11-12%', 'NA', 'other'].map((label, idx) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: colors[idx] }} />
                  <span className="text-gray-700">{label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fertilizer Usage */}
        <Card className="border border-gray-200">
          <CardHeader>
            <div>
              <CardTitle className="text-base font-medium mb-1">Fertilizer usage per hectare</CardTitle>
              <div className="text-sm text-gray-500">2026</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fertilizerData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="name" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} domain={[0, 1200]} ticks={[0, 300, 600, 900, 1200]} />
                  <Bar dataKey="liquidKg" fill="#10B981" name="fertilizer usage per hectare (liquid, kg/ha)" />
                  <Bar dataKey="solidKg" fill="#34D399" name="fertilizer usage per hectare (solid, kg/ha)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#10B981]" />
                <span className="text-gray-700">fertilizer usage per hectare (liquid, kg/ha)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#34D399]" />
                <span className="text-gray-700">fertilizer usage per hectare (solid, kg/ha)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
