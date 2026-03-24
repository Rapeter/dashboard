import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation, Link, Outlet } from 'react-router';
import { TreeDeciduous, BarChart3, DollarSign, Sprout, LogOut, User } from 'lucide-react';

export function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // 根据当前路径获取 Title
  const getPageTitle = () => {
    if (location.pathname.includes('cost-analysis')) return 'Cost Analysis';
    if (location.pathname.includes('farm-practice')) return 'Farm Practice';
    return 'Yield Benchmarking';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex relative">
      {/* Sidebar Layout */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 relative">
        <div className="p-6 border-b border-gray-200 flex items-center gap-2">
          <TreeDeciduous className="w-6 h-6 text-[#10B981]" />
          <span className="font-bold text-lg text-gray-800">Truffle Dashboard</span>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          <Link
            to="/dashboard/yield-benchmarking"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname.includes('yield-benchmarking')
                ? 'bg-[#10B981] text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="font-medium">Yield Benchmarking</span>
          </Link>

          <Link
            to="/dashboard/cost-analysis"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname.includes('cost-analysis')
                ? 'bg-[#10B981] text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <DollarSign className="w-5 h-5" />
            <span className="font-medium">Cost Analysis</span>
          </Link>

          <Link
            to="/dashboard/farm-practice"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname.includes('farm-practice')
                ? 'bg-[#10B981] text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Sprout className="w-5 h-5" />
            <span className="font-medium">Farm Practice</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
           <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-red-600 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Log out</span>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
             <span>Home</span>
             <span>/</span>
             <span className="text-[#10B981]">{getPageTitle()}</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
               <User className="w-4 h-4 text-gray-600" />
               <span className="text-sm font-medium text-gray-700">Test User</span>
             </div>
          </div>
        </header>

        {/* Dynamic Outlet for Nested Pages */}
        <main className="flex-1 overflow-auto p-8">
           <Outlet />
        </main>
      </div>
    </div>
  );
}