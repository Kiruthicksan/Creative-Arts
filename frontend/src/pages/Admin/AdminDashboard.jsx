import {
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react";
import { motion } from "framer-motion";
import useDashboardStore from "../../store/useDashboardStore";
import { useEffect } from "react";

const StatCard = ({ title, value, change, isPositive, icon: Icon, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
        <Icon size={24} className={color.replace("bg-", "text-")} />
      </div>
      <div
        className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-green-600" : "text-red-500"}`}
      >
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {change}
      </div>
    </div>
    <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
    <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
  </motion.div>
);

const AdminDashboard = () => {
  const {totalUsers, getTotalUsers} = useDashboardStore();
  useEffect(() => {
    getTotalUsers();
  }, []);
  const stats = [
    {
      title: "Total Users",
      value: totalUsers + 10333,
      change: "+12%",
      isPositive: true,
      icon: Users,
      color: "bg-blue-500 text-blue-600",
    },
    {
      title: "Total Sales",
      value: "$45,231",
      change: "+8.5%",
      isPositive: true,
      icon: DollarSign,
      color: "bg-green-500 text-green-600",
    },
    {
      title: "Active Orders",
      value: "573",
      change: "-2.1%",
      isPositive: false,
      icon: ShoppingBag,
      color: "bg-purple-500 text-purple-600",
    },
    {
      title: "Growth",
      value: "24.8%",
      change: "+4.3%",
      isPositive: true,
      icon: TrendingUp,
      color: "bg-orange-500 text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back, here's what's happening today.
          </p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
          Download Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity / Chart Area Placeholder */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">
              Revenue Analytics
            </h3>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal />
            </button>
          </div>
          <div className="w-full h-80 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200 text-gray-400">
            Chart Placeholder
          </div>
        </div>

        {/* Recent Orders / List */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Users</h3>
            <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">
                    User Name {i}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">
                    user{i}@example.com
                  </p>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
