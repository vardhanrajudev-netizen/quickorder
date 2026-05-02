import { motion, AnimatePresence } from "motion/react";
import { 
  Navigation, 
  ShieldCheck, 
  Zap, 
  MapPin, 
  Clock, 
  Phone,
  MessageSquare,
  ChevronRight,
  Info
} from "lucide-react";
import { MOCK_ORDERS } from "@/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { cn } from "@/lib/utils";

const FLEET_STATUS = [
  { id: 'C-01', name: 'Marco S.', status: 'en_route', lat: 40, lng: 30 },
  { id: 'C-02', name: 'Luca D.', status: 'at_pickup', lat: 60, lng: 45 },
  { id: 'C-03', name: 'Sofia V.', status: 'completed', lat: 20, lng: 70 },
];

export default function LiveTracking() {
  const [selectedCourier, setSelectedCourier] = useState(FLEET_STATUS[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-auto lg:h-[calc(100vh-180px)] pb-12 lg:pb-0">
      {/* Map Section */}
      <div className="lg:col-span-3 relative h-[400px] lg:h-full rounded-3xl overflow-hidden glass shadow-2xl">
        {/* Stylized Map Backdrop */}
        <div className="absolute inset-0 bg-[#0A0A0A] overflow-hidden">
          <svg className="w-full h-full opacity-20" viewBox="0 0 1000 1000">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Some decor paths for "roads" */}
            <path d="M0 500 Q 250 550 500 500 T 1000 500" fill="none" stroke="white" strokeWidth="2" opacity="0.3" />
            <path d="M500 0 V 1000" fill="none" stroke="white" strokeWidth="2" opacity="0.1" />
          </svg>
          
          {/* Pulse Indicators */}
          <div className="absolute top-1/4 left-1/3 group cursor-pointer" onClick={() => setSelectedCourier(FLEET_STATUS[0])}>
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-75 shadow-[0_0_20px_rgba(99,102,241,0.5)]" />
              <div className="relative w-4 h-4 rounded-full bg-indigo-500 border-2 border-black" />
            </div>
          </div>
          
          <div className="absolute top-2/3 left-1/2 group cursor-pointer" onClick={() => setSelectedCourier(FLEET_STATUS[1])}>
             <div className="relative">
              <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
              <div className="relative w-4 h-4 rounded-full bg-white border-2 border-black" />
            </div>
          </div>
        </div>

        {/* Floating Controls */}
        <div className="absolute bottom-8 left-8 flex items-center gap-4">
          <div className="glass-dark px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">Live Connection Stable</span>
          </div>
        </div>

        <div className="absolute top-8 right-8 space-y-4">
          <div className="glass-dark p-2 rounded-2xl border border-white/10 flex flex-col gap-2">
            <Button size="icon" variant="ghost" className="hover:bg-indigo-500/10 hover:text-indigo-400 text-white/40 transition-all"><Navigation className="w-5 h-5" /></Button>
            <Button size="icon" variant="ghost" className="hover:bg-indigo-500/10 hover:text-indigo-400 text-white/40 transition-all"><Info className="w-5 h-5" /></Button>
          </div>
        </div>
      </div>

      {/* Detail Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCourier.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            <Card className="glass border-white/5 overflow-hidden shadow-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-indigo-500/20 text-indigo-400 border-none uppercase tracking-widest text-[9px] font-bold px-2 py-0.5 rounded-full">En Route</Badge>
                  <span className="text-[10px] text-white/30 font-mono tracking-tighter">{selectedCourier.id} / FLEET-01</span>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-indigo-500/20 glow-indigo">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedCourier.name}`} />
                    <AvatarFallback>{selectedCourier.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl font-bold tracking-tight text-white">{selectedCourier.name}</CardTitle>
                    <div className="flex items-center gap-2 text-[10px] text-white/40 mt-1 uppercase font-bold tracking-widest">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      Vetted Elite Courier
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-4 border-t border-white/5">
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest">
                    <span className="text-white/40">Delivery Progress</span>
                    <span className="text-indigo-400">65%</span>
                  </div>
                  <Progress value={65} className="h-1 bg-white/5" indicatorClassName="bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                    <Clock className="w-4 h-4 text-indigo-500 mb-2" />
                    <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">ETA</p>
                    <p className="text-lg font-bold text-white">12 Min</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                    <Zap className="w-4 h-4 text-indigo-400 mb-2" />
                    <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Distance</p>
                    <p className="text-lg font-bold text-white">2.4 km</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-zinc-200">
                    <MessageSquare className="w-3.5 h-3.5 mr-2" />
                    Secure Chat
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-xl bg-white/5 border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10">
                    <Phone className="w-3.5 h-3.5 mr-2" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/5 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-white/30">Protocol Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Drop-off Point</p>
                    <p className="text-sm font-bold text-white mt-0.5">Pendleton Residences, PH 2</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/5">
                   <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-3">Safety Directives</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-white/5 text-[9px] uppercase tracking-tighter border-none text-white/60">Insulated Transport</Badge>
                    <Badge variant="secondary" className="bg-white/5 text-[9px] uppercase tracking-tighter border-none text-white/60">Non-Contact</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
