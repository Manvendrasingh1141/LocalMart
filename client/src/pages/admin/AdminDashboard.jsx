import { Users, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const AdminDashboard = () => {
  const { user } = useAuthStore();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Control Panel</h1>
        <p className="text-gray-500 mt-2">Platform overview and management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="card p-6 bg-gradient-to-br from-charcoal to-charcoal-light text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-300 font-medium">Total Users</p>
              <h3 className="text-2xl font-bold mt-1">12,450</h3>
            </div>
            <div className="bg-white/10 p-2 rounded-lg">
              <Users size={20} />
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500 font-medium">Active Vendors</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">842</h3>
            </div>
            <div className="bg-green-50 p-2 rounded-lg text-green-600">
              <ShieldCheck size={20} />
            </div>
          </div>
        </div>

        <div className="card p-6 border-l-4 border-l-orange-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500 font-medium">Pending Approvals</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">15</h3>
            </div>
            <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
              <AlertTriangle size={20} />
            </div>
          </div>
          <button className="text-sm text-primary font-semibold hover:underline">Review Now &rarr;</button>
        </div>

        <div className="card p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500 font-medium">System Status</p>
              <h3 className="text-2xl font-bold text-green-500 mt-1">Healthy</h3>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg text-gray-400">
              <Activity size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
