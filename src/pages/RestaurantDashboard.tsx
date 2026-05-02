import { motion } from "motion/react";
import { 
  ClipboardList, 
  Package, 
  ChefHat, 
  BarChart3, 
  Settings2,
  Users,
  Bell,
  MessageCircle,
  MoreVertical,
  Star
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const RECENT_REVIEWS = [
  { id: 1, name: 'Alex V.', rating: 5, comment: 'Exceptional Wagyu, arrived perfectly temped.', time: '12m ago' },
  { id: 2, name: 'Elena R.', rating: 5, comment: 'Concierge was very professional.', time: '45m ago' },
];

export default function RestaurantDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Prep', value: '14', trend: '+2', icon: ChefHat },
          { label: 'Today Rev', value: '$4,282', trend: '+12%', icon: BarChart3 },
          { label: 'Avg Prep', value: '18m', trend: '-2m', icon: BarChart3 },
          { label: 'Ready for PKUP', value: '3', trend: 'Live', icon: Package },
        ].map((stat, i) => (
          <Card key={i} className="glass border-white/5 p-6 group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                <stat.icon className="w-5 h-5" />
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-none text-[10px] uppercase">{stat.trend}</Badge>
            </div>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Orders Feed */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass border-white/10 overflow-hidden">
            <CardHeader className="p-6 border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-white/60">Live Kitchen Queue</CardTitle>
              <div className="flex gap-2">
                <Badge className="bg-indigo-500/20 text-indigo-400 border-none">14 Orders</Badge>
                <Badge className="bg-white/5 text-white/40 border-none ring-1 ring-white/10">3 Priority</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-white/5">
                {[
                  { id: '#ORD-9024', item: '2x Wagyu Burger, 1x Truffle Fries', time: '8m total', status: 'In Prep', priority: true },
                  { id: '#ORD-9025', item: '1x Garden Bowl, 1x Kombucha', time: '12m total', status: 'Queued', priority: false },
                  { id: '#ORD-9026', item: '3x Pepperoni Pizza, 1x Tiramisu', time: '4m total', status: 'Assembling', priority: false },
                ].map((order, i) => (
                  <div key={i} className="p-6 hover:bg-white/5 transition-all flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-mono text-[10px] text-white/40 px-2">
                        {order.id.split('-')[1]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{order.id}</h4>
                          {order.priority && <Badge className="bg-amber-500/20 text-amber-500 border-none text-[8px] h-3 px-1">PRIME</Badge>}
                        </div>
                        <p className="text-xs text-white/40 line-clamp-1">{order.item}</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-bold text-indigo-400 mb-1">{order.status}</p>
                       <p className="text-[10px] text-white/20 uppercase tracking-tighter">{order.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Feed */}
        <div className="space-y-6">
          <Card className="glass border-white/5 overflow-hidden">
            <CardHeader p-5 className="border-b border-white/5 bg-white/[0.02]">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-white/40">Market Feedback</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-6">
              {RECENT_REVIEWS.map(review => (
                <div key={review.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6 border border-white/10">
                        <AvatarFallback className="text-[10px] bg-indigo-500/20 text-indigo-400">{review.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-bold text-white">{review.name}</span>
                    </div>
                    <span className="text-[10px] text-white/20 font-bold uppercase">{review.time}</span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-indigo-400 text-indigo-400" />
                    ))}
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed italic">{review.comment}</p>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-xs text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-widest h-8 bg-indigo-500/5">
                Full Reputation Report
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/10 overflow-hidden relative group">
            <div className="absolute inset-0 bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors" />
            <CardContent className="p-6 relative z-10 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-lg">
                  <Settings2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Menu Optimizer</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">AI Recommendations</p>
                </div>
              </div>
              <p className="text-xs text-white/40 font-medium leading-relaxed">Consider increasing preparation for <span className="text-indigo-400">Truffle Polenta</span> tonight — trend analysis indicates 15% higher demand.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
