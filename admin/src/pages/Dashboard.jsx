import {
  BarChart3,
  ShoppingCart,
  CreditCard,
  ArrowUpCircle,
  Wallet,
  TrendingUp,
  Receipt,
  IndianRupee,
  Calendar,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const salesData = [
    { month: "Jan", sales: 52000, purchase: 31000 },
    { month: "Feb", sales: 68000, purchase: 42000 },
    { month: "Mar", sales: 74000, purchase: 39000 },
    { month: "Apr", sales: 81000, purchase: 52000 },
  ];

  const dailyReport = [
    { day: "Mon", in: 5000, out: 3000 },
    { day: "Tue", in: 6000, out: 2000 },
    { day: "Wed", in: 4500, out: 2500 },
    { day: "Thu", in: 7000, out: 4000 },
    { day: "Fri", in: 8000, out: 3000 },
  ];

  const [cards] = useState([
    { title: "Monthly Sales", value: "₹1,50,000", icon: <ShoppingCart size={22} />, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Monthly Purchase", value: "₹82,000", icon: <CreditCard size={22} />, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Net Profit", value: "+ ₹68,000", icon: <TrendingUp size={22} />, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Daily Expenses", value: "₹4,200", icon: <Receipt size={22} />, color: "text-rose-600", bg: "bg-rose-50" },
    { title: "Cash Flow Today", value: "₹12.5k / ₹6k", icon: <ArrowUpCircle size={22} />, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Cash Balance", value: "₹3,85,000", icon: <Wallet size={22} />, color: "text-indigo-600", bg: "bg-indigo-50" },
  ]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-['Lexend'] text-slate-800">
      
      {/* --- HEADER --- */}
      <div className="max-w-[400] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Dashboard Overview</h1>
          <p className="text-slate-500 font-medium flex items-center gap-2">
            <Calendar size={16} /> Real-time analytics for your business status.
          </p>
        </div>
        <div className="flex gap-3">
            <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all">Download Report</button>
            <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-black transition-all active:scale-95">Settings</button>
        </div>
      </div>

      {/* --- STAT CARDS GRID --- */}
      <div className="max-w-[400] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-10">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:translate-y-[-4px] transition-all duration-300 group">
            <div className={`${card.bg} ${card.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] mb-1">{card.title}</p>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">{card.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}