import { useState, } from "react";
import {
    Menu,
    ShoppingCart,
    Users,
    FileText,
    Settings,
    FlaskConical,
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const admin = useSelector(state => state.auth.admin);

    // Dummy data for charts
    const revenueData = [
        { month: "Jan", revenue: 10000 },
        { month: "Feb", revenue: 15000 },
        { month: "Mar", revenue: 12000 },
        { month: "Apr", revenue: 18000 },
        { month: "May", revenue: 22000 },
        { month: "Jun", revenue: 19500 },
    ];

    const ordersData = [
        { name: "Completed", value: 65 },
        { name: "Pending", value: 25 },
        { name: "Cancelled", value: 10 },
    ];

    const COLORS = ["#22c55e", "#eab308", "#ef4444"];

    if (!admin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gray-100 dark:bg-gray-900">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    You must be logged in as an administrator to view this page.
                </p>
                <Link
                    to={"/login"}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    Go to Admin Login
                </Link>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? "w-64" : "w-20"
                    } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300`}
            >
                <div className="flex items-center justify-between p-4">
                    <h1
                        className={`font-bold text-lg text-blue-600 dark:text-blue-400 ${sidebarOpen ? "block" : "hidden"
                            }`}
                    >
                        Admin
                    </h1>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>
                </div>
                <nav className="mt-6 space-y-2">
                    <Link
                        to={admin ? "/tests" : "/login"}
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg cursor-pointer">
                        <FlaskConical className="w-5 h-5" />
                        {sidebarOpen && <span>Tests</span>}
                    </Link>
                    <Link 
                    to={"/orders"}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg cursor-pointer">
                        <ShoppingCart className="w-5 h-5" />
                        {sidebarOpen && <span>Orders</span>}
                    </Link>
                    <Link 
                    to="/users"
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg cursor-pointer">
                        <Users className="w-5 h-5" />
                        {sidebarOpen && <span>Users</span>}
                    </Link>
                    <Link className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg cursor-pointer">
                        <FileText className="w-5 h-5" />
                        {sidebarOpen && <span>Reports</span>}
                    </Link>
                    <Link className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg cursor-pointer">
                        <Settings className="w-5 h-5" />
                        {sidebarOpen && <span>Settings</span>}
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
                {/* Stats Cards */}
                <section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">1,245</h3>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Active Users</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">320</h3>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Pending Tests</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">56</h3>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">₹85,000</h3>
                    </div>
                </section>

                {/* Analytics Section */}
                <section className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Revenue Line Chart */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                            Monthly Revenue
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#2563eb"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Orders Pie Chart */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                            Orders Breakdown
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={ordersData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={90}
                                    label
                                >
                                    {ordersData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Legend />
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                {/* Recent Orders */}
                <section className="p-6">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                            Recent Orders
                        </h3>
                        <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
                            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm">
                                <tr>
                                    <th className="px-4 py-2">Order ID</th>
                                    <th className="px-4 py-2">Test</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-gray-200 dark:border-gray-600">
                                    <td className="px-4 py-2">#12345</td>
                                    <td className="px-4 py-2">Blood Test</td>
                                    <td className="px-4 py-2 text-green-600 dark:text-green-400 font-medium">
                                        Completed
                                    </td>
                                    <td className="px-4 py-2">₹500</td>
                                </tr>
                                <tr className="border-t border-gray-200 dark:border-gray-600">
                                    <td className="px-4 py-2">#12346</td>
                                    <td className="px-4 py-2">X-Ray</td>
                                    <td className="px-4 py-2 text-yellow-600 dark:text-yellow-400 font-medium">
                                        Pending
                                    </td>
                                    <td className="px-4 py-2">₹800</td>
                                </tr>
                                <tr className="border-t border-gray-200 dark:border-gray-600">
                                    <td className="px-4 py-2">#12347</td>
                                    <td className="px-4 py-2">MRI</td>
                                    <td className="px-4 py-2 text-red-600 dark:text-red-400 font-medium">
                                        Cancelled
                                    </td>
                                    <td className="px-4 py-2">₹2500</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}