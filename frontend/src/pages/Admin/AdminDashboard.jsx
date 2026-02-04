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
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
  const {
    totalUsers,
    userGrowth,
    totalRevenue,
    revenueGrowth,
    totalOrders,
    totalOrdersGrowth,
    activeOrders,
    activeOrdersGrowth,
    dailyStats,
    getTotalUsers,
  } = useDashboardStore();
  useEffect(() => {
    getTotalUsers();
  }, []);

  const { recentUsers } = useDashboardStore();

  const customers = recentUsers.filter((user) => user.role === "customer");

  const handleDownload = () => {
    const headers = ["Category", "Metric", "Value", "Growth"];
    const summaryRows = [
      ["Summary", "Total Users", totalUsers, `${userGrowth}%`],
      ["Summary", "Total Revenue", totalRevenue, `${revenueGrowth}%`],
      ["Summary", "Active Orders", activeOrders, `${activeOrdersGrowth}%`],
      ["Summary", "Total Orders", totalOrders, `${totalOrdersGrowth}%`],
    ];

    const revenueHeaders = ["Date", "Revenue", "Orders"];
    const revenueRows = dailyStats.map((stat) => [
      stat._id,
      stat.revenue,
      stat.orders,
    ]);

    const userHeaders = ["User Name", "Email", "Role", "Joined Date"];
    const userRows = recentUsers.map((u) => [
      u.userName,
      u.email,
      u.role,
      new Date(u.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...summaryRows.map((e) => e.join(",")),
      "",
      revenueHeaders.join(","),
      ...revenueRows.map((e) => e.join(",")),
      "",
      userHeaders.join(","),
      ...userRows.map((e) => e.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "admin_dashboard_report.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      change: `${userGrowth > 0 ? "+" : ""}${userGrowth}%`,
      isPositive: userGrowth >= 0,
      icon: Users,
      color: "bg-blue-500 text-blue-600",
    },
    {
      title: "Total Sales",
      value: `₹${totalRevenue.toLocaleString()}`,
      change: `${revenueGrowth > 0 ? "+" : ""}${revenueGrowth}%`,
      isPositive: revenueGrowth >= 0,
      icon: DollarSign,
      color: "bg-green-500 text-green-600",
    },
    {
      title: "Active Orders",
      value: activeOrders,
      change: `${activeOrdersGrowth > 0 ? "+" : ""}${activeOrdersGrowth}%`,
      isPositive: activeOrdersGrowth >= 0,
      icon: ShoppingBag,
      color: "bg-purple-500 text-purple-600",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      change: `${totalOrdersGrowth > 0 ? "+" : ""}${totalOrdersGrowth}%`,
      isPositive: totalOrdersGrowth >= 0,
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
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
        >
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
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={dailyStats}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="_id"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value) => [`₹${value}`, "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4F46E5"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
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
            {customers.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">
                    {user.userName}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
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
