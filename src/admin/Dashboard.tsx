import React from "react";
import { motion } from "motion/react";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight,
  Zap,
  Globe,
  Clock
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { MOCK_ORDERS } from "@/data";

const data = [
  { time: '00:00', sales: 4000, orders: 240 },
  { time: '04:00', sales: 3000, orders: 139 },
  { time: '08:00', sales: 2000, orders: 980 },
  { time: '12:00', sales: 2780, orders: 390 },
  { time: '16:00', sales: 1890, orders: 480 },
  { time: '20:00', sales: 2390, orders: 380 },
];

export default function AdminDashboard() {
  const totalRev = MOCK_ORDERS.reduce((acc, o) => acc + o.total, 0) * 1250; // Mock scaling for overview
  
  const stats = [
    { label: "Total Gross Revenue", value: `$${totalRev.toLocaleString()}`, trend: "+12.5%", positive: true, icon: CreditCard },
    { label: "Active User Base", value: (MOCK_ORDERS.length * 280000).toLocaleString(), trend: "+8.1%", positive: true, icon: Users },
    { label: "Fleet Throughput", value: "12,401/hr", trend: "-2.4%", positive: false, icon: Zap },
    { label: "Order Velocity", value: "1.4s", trend: "+0.2s", positive: true, icon: Clock },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter text-white">Macro Overview</h1>
        <p className="text-sm text-zinc-500 font-medium">Real-time global logistics and revenue stream telemetry.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 group hover:border-indigo-500/50 transition-all shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg",
                stat.positive ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
              )}>
                {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-white tracking-tighter">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-zinc-950 border border-zinc-900 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Global Sales Volume (24h)</h3>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-500" />
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Traffic</span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#3f3f46" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{fontWeight: 'bold'}}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Insights */}
        <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-900 shadow-2xl">
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-8">System Health</h3>
          <div className="space-y-6">
            {[
              { label: "API Latency", value: "14ms", status: "Optimal", color: "text-emerald-500" },
              { label: "DB Throughput", value: "84k IOPS", status: "Nominal", color: "text-emerald-500" },
              { label: "CDN Cache Hit", value: "98.2%", status: "Optimal", color: "text-emerald-500" },
              { label: "Memory Load", value: "42%", status: "Nominal", color: "text-emerald-500" },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/50 border border-zinc-900">
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-xl font-bold text-white tracking-tight">{item.value}</p>
                </div>
                <div className={cn("text-[10px] font-bold uppercase tracking-widest", item.color)}>
                  • {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
