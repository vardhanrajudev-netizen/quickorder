import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Package, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  ArrowRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ORDERS = [
  { id: 'ORD-8921', customer: 'John Wick', restaurant: 'Pizza Hub', amount: '$142.50', status: 'In Transit', ETA: '8m', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  { id: 'ORD-8922', customer: 'Sarah Connor', restaurant: 'Burger House', amount: '$64.20', status: 'Delivered', ETA: '--', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { id: 'ORD-8923', customer: 'Bruce Wayne', restaurant: 'Asian Bowl', amount: '$891.00', status: 'Pending', ETA: '24m', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { id: 'ORD-8924', customer: 'Ellen Ripley', restaurant: 'Healthy Eats', amount: '$32.10', status: 'Delayed', ETA: '45m', color: 'text-red-400', bg: 'bg-red-500/10' },
];

export default function OrderIntelligence() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = ORDERS.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeDeliveries = ORDERS.filter(o => o.status === 'In Transit').length * 412; // Mock scaling
  const fulfillmentRate = 99.8;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tighter text-white">Order Intelligence</h1>
          <p className="text-sm text-zinc-500 font-medium">Real-time oversight of the city's logistics pulse.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
            <Input 
              placeholder="Batch ID or Reference..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-zinc-950 border-zinc-900 h-11 pl-10 rounded-xl text-xs text-white" 
            />
          </div>
          <Button className="bg-zinc-900 border border-zinc-800 text-white h-11 px-6 rounded-xl hover:bg-zinc-800">
            Export Manifest
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Active Deliveries", value: activeDeliveries.toLocaleString(), detail: "84% on time", icon: Truck },
          { label: "Daily Peak", value: (ORDERS.length * 3725).toLocaleString(), detail: "Last sync 2m ago", icon: Activity },
          { label: "Fulfillment Rate", value: `${fulfillmentRate}%`, detail: "Zero critical fails", icon: CheckCircle2 },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <h4 className="text-3xl font-bold text-white tracking-tighter">{stat.value}</h4>
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-2">{stat.detail}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-400">
              <stat.icon className="w-6 h-6" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-3xl bg-zinc-950 border border-zinc-900 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
           <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active Dispatch Log</h3>
           <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
             <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Transiting</div>
             <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Complete</div>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-900 bg-zinc-900/10">
                <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Batch ID</th>
                <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Client & Venue</th>
                <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Valuation</th>
                <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Status Feed</th>
                <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {filteredOrders.map((order, i) => (
                <motion.tr 
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-zinc-900/30 transition-colors"
                >
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold text-white font-mono tracking-widest">{order.id}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-white">{order.customer}</p>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{order.restaurant}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-white">{order.amount}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                       <Badge variant="outline" className={cn("text-[10px] font-bold uppercase tracking-widest border-none px-0", order.color)}>
                         {order.status}
                       </Badge>
                       {order.ETA !== '--' && (
                         <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-1.5 border-l border-zinc-800 pl-3">
                           <Clock className="w-3 h-3" /> ETA {order.ETA}
                         </span>
                       )}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <Button variant="ghost" className="h-8 group hover:bg-white/5 gap-2">
                       <span className="text-[10px] font-bold text-white transition-all">Details</span>
                       <ArrowRight className="w-3 h-3 text-zinc-600 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
function Activity(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>; }
