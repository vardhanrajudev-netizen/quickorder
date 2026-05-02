import { motion } from "motion/react";
import { 
  TrendingUp, 
  Clock, 
  Star, 
  MapPin, 
  Search,
  Filter,
  ArrowUpRight,
  Utensils
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { MOCK_ORDERS, MOCK_RESTAURANTS } from "@/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useState } from "react";

const data = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 600 },
  { name: 'Thu', value: 800 },
  { name: 'Fri', value: 500 },
  { name: 'Sat', value: 900 },
  { name: 'Sun', value: 1100 },
];

const StatCard = ({ label, value, trend, icon: Icon }: any) => (
  <Card className="glass border-white/5 overflow-hidden group">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 shadow-inner">
          <Icon className="w-6 h-6" />
        </div>
        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-none">
          {trend}
        </Badge>
      </div>
      <div>
        <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-1">{label}</p>
        <p className="text-2xl font-bold tracking-tight text-white">{value}</p>
      </div>
      <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-500 w-[72%] group-hover:shadow-[0_0_8px_rgba(99,102,241,0.8)] transition-all"></div>
      </div>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = MOCK_ORDERS.filter(order => 
    order.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.items.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredRestaurants = MOCK_RESTAURANTS.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSpend = MOCK_ORDERS.reduce((acc, order) => acc + order.total, 0);

  return (
    <div className="space-y-8 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-2"
          >
            Welcome, Mr. Vance
          </motion.h1>
          <div className="flex items-center gap-3">
             <span className="text-[10px] md:text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> System Online
            </span>
            <p className="text-xs md:text-sm text-white/40 font-medium tracking-tight">Your premium logistics suite is ready.</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <Input 
              placeholder="Search orders..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 h-10 w-full focus:border-indigo-500/50 transition-all text-white"
            />
          </div>
          <Button className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 h-10 font-bold text-xs uppercase tracking-wider px-6">
            <Filter className="w-3 h-3 mr-2" />
            Control Panel
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Spend" value={`$${totalSpend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} trend="+12.5%" icon={TrendingUp} />
        <StatCard label="Active Orders" value={MOCK_ORDERS.length.toString()} trend="Live" icon={Clock} />
        <StatCard label="Average Rating" value="4.9" trend="+0.2" icon={Star} />
        <StatCard label="Reward Points" value={(totalSpend * 10).toLocaleString()} trend="+800" icon={ArrowUpRight} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Orders */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass border-white/10 overflow-hidden shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-white/[0.02] p-6">
              <CardTitle className="text-sm font-bold tracking-widest uppercase text-white/60 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-500" />
                Active Orders Pipeline
              </CardTitle>
              <Button variant="link" className="text-indigo-400 p-0 h-auto font-semibold text-xs uppercase tracking-wider hover:text-indigo-300">View History</Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] text-white/30 uppercase tracking-widest border-b border-white/5">
                      <th className="px-6 py-4 font-semibold">Venue</th>
                      <th className="px-6 py-4 font-semibold">Entrée</th>
                      <th className="px-6 py-4 font-semibold">Total</th>
                      <th className="px-6 py-4 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredOrders.map((order, index) => (
                      <motion.tr
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={order.id}
                        className="hover:bg-white/5 transition-colors cursor-pointer group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white group-hover:text-indigo-400 transition-colors">{order.restaurantName}</span>
                            {order.priority === 'vip' && <Badge className="bg-indigo-500/20 text-indigo-400 border-none text-[8px] h-3 px-1">VIP</Badge>}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-white/50">{order.items[0]}</td>
                        <td className="px-6 py-4 font-mono text-xs text-white">${order.total.toFixed(2)}</td>
                        <td className="px-6 py-4 text-right">
                          <span className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded-full border",
                            order.status === 'dispatched' 
                              ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" 
                              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          )}>
                            {order.status.toUpperCase()}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Activity Chart */}
          <Card className="glass border-white/10 h-[380px] overflow-hidden">
            <CardHeader className="p-6">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-white/60">Revenue Stream Analysis</CardTitle>
            </CardHeader>
            <CardContent className="h-[280px] w-full px-6 pb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(5,5,5,0.9)', 
                      borderColor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px'
                    }}
                  />
                  <XAxis dataKey="name" hide />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#6366f1" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Featured */}
        <div className="space-y-6">
           <Card className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 shadow-xl relative overflow-hidden border-none">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            <h4 className="text-white font-bold text-base mb-1">Platinum concierge</h4>
            <p className="text-white/70 text-xs leading-relaxed mb-6">You've unlocked 24/7 priority handling for all orders this month.</p>
            <Button className="w-full py-2 bg-black/20 backdrop-blur-md border border-white/20 rounded-xl text-white text-[10px] font-bold hover:bg-black/30 transition-all uppercase tracking-widest h-10">
              Upgrade Subscription
            </Button>
          </Card>

          <Card className="glass border-white/5 overflow-hidden h-fit">
            <CardHeader p-6>
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-white/40">Signature List</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-6">
              {filteredRestaurants.map((restaurant) => (
                <div key={restaurant.id} className="group cursor-pointer flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="font-bold text-sm text-white group-hover:text-indigo-400 transition-colors truncate">{restaurant.name}</h4>
                      <div className="flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-indigo-400 text-indigo-400" />
                        <span className="text-[10px] font-bold">{restaurant.rating}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-white/40 uppercase tracking-tighter">{restaurant.cuisine} • {restaurant.deliveryTime}</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-xs text-indigo-400 hover:text-indigo-300 h-8 font-bold uppercase tracking-widest">
                Discover More
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
