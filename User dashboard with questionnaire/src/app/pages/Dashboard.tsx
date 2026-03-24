import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { TreeDeciduous, BarChart3, DollarSign, Sprout } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { OrchardResource } from '../components/dashboard/OrchardResource';
import { FinancialPerformance } from '../components/dashboard/FinancialPerformance';
import { FarmPractices } from '../components/dashboard/FarmPractices';

export function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('ideal');
  const pageParam = searchParams.get('page');

  // Map page params to dashboard views
  const getActivePage = () => {
    if (pageParam === 'yield') return 'orchard';
    if (pageParam === 'cost') return 'financial';
    if (pageParam === 'practice') return 'practices';
    return 'orchard';
  };

  const [activePage, setActivePage] = useState(() => getActivePage());

  useEffect(() => {
    const page = getActivePage();
    setActivePage(page);
  }, [pageParam]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getPageTitle = () => {
    if (activePage === 'financial') return 'Financial Performance';
    if (activePage === 'practices') return 'Farm Practices';
    return 'Orchard Resource Management';
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex relative">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 relative">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <TreeDeciduous className="w-6 h-6 text-[#10B981]" />
            <span className="font-semibold text-lg">Truffle Dashboard</span>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <button
            onClick={() => setActivePage('orchard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activePage === 'orchard'
                ? 'bg-[#10B981] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="font-medium">Orchard Resource M...</span>
          </button>

          <button
            onClick={() => setActivePage('financial')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activePage === 'financial'
                ? 'bg-[#10B981] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <DollarSign className="w-5 h-5" />
            <span className="font-medium">Financial Performance</span>
          </button>

          <button
            onClick={() => setActivePage('practices')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activePage === 'practices'
                ? 'bg-[#10B981] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Sprout className="w-5 h-5" />
            <span className="font-medium">Farm Practices</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <TreeDeciduous className="w-4 h-4" />
                <span>{getPageTitle()}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <TreeDeciduous className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600">AgriFutures</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-auto">
          {/* Tabs */}
          <div className="mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-white border border-gray-200">
                <TabsTrigger
                  value="ideal"
                  className="data-[state=active]:bg-[#10B981] data-[state=active]:text-white px-6"
                >
                  Ideal
                </TabsTrigger>
                <TabsTrigger
                  value="average"
                  className="data-[state=active]:bg-[#10B981] data-[state=active]:text-white px-6"
                >
                  Average
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Dynamic Content Based on Active Page */}
          {activePage === 'orchard' && <OrchardResource />}
          {activePage === 'financial' && <FinancialPerformance />}
          {activePage === 'practices' && <FarmPractices />}
        </main>
      </div>
    </div>
  );
}