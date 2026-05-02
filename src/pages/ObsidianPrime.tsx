import { motion } from "motion/react";
import { 
  Zap, 
  Shield, 
  Crown, 
  Star, 
  ArrowRight,
  CheckCircle2,
  Gem
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ObsidianPrime() {
  return (
    <div className="pb-20">
      {/* Hero */}
      <div className="relative py-12 md:py-24 px-6 md:px-8 rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-950 to-black border border-white/10 shadow-2xl mb-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 blur-[100px] rounded-full -ml-32 -mb-32" />
        
        <div className="relative z-10 max-w-2xl">
          <Badge className="bg-indigo-500/20 text-indigo-300 border-none px-4 py-1 mb-6 text-xs font-bold uppercase tracking-[0.2em] rounded-full">
            The Elite Tier
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
            Obsidian <span className="text-indigo-400">Prime</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-10 max-w-lg">
            A membership designed for the culinary high-flyer. 
            Unlimited white-glove delivery and priority kitchen booking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="h-14 px-10 rounded-2xl bg-white text-black font-bold uppercase tracking-widest hover:bg-indigo-400 transition-all w-full sm:w-auto">
              Initialize Membership
            </Button>
            <Button variant="outline" className="h-14 px-10 rounded-2xl border-white/10 bg-white/5 text-white font-bold uppercase tracking-widest hover:bg-white/10 w-full sm:w-auto">
              View Benefits
            </Button>
          </div>
        </div>
      </div>

      {/* Perks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="glass border-white/5 p-8 space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <Zap className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">Hyper-Priority</h3>
            <p className="text-white/40 font-medium">Your orders are instantly boosted to the front of the preparation queue at every venue.</p>
          </div>
          <ul className="space-y-3 pt-4">
            {['No surge pricing', 'Reserved couriers', 'Instant refunds'].map(benefit => (
              <li key={benefit} className="flex items-center gap-3 text-sm text-white/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {benefit}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="glass border-white/5 p-8 space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <Shield className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">White-Glove</h3>
            <p className="text-white/40 font-medium">Certified concierge handling for every transit. Temperature-lock guarantee on all items.</p>
          </div>
          <ul className="space-y-3 pt-4">
            {['Insulated transport', 'Face-to-face handoff', 'Scent-free service'].map(benefit => (
              <li key={benefit} className="flex items-center gap-3 text-sm text-white/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {benefit}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="glass border-white/5 p-8 space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <Crown className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">Rare Access</h3>
            <p className="text-white/40 font-medium">Bookings at restaurants with month-long waitlists and exclusive secret menus.</p>
          </div>
          <ul className="space-y-3 pt-4">
            {['Secret menus', 'Event invitations', 'Tasting boxes'].map(benefit => (
              <li key={benefit} className="flex items-center gap-3 text-sm text-white/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {benefit}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Comparison CTA */}
      <div className="mt-20 p-8 md:p-12 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20 text-center space-y-6 md:space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-indigo-400 text-xs font-bold uppercase tracking-widest">
          <Gem className="w-4 h-4" /> Limited Edition
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Ready to transcend the standard?</h2>
        <div className="flex flex-col items-center gap-4">
          <p className="text-white/40 max-w-xl text-base md:text-lg font-light leading-relaxed">Join the ranks of the city's most discerning palates. Membership slots are limited.</p>
          <div className="pt-4">
            <p className="text-3xl font-bold text-white mb-4">$49.99<span className="text-white/40 text-sm font-normal uppercase tracking-widest ml-2">/ month</span></p>
            <Button className="h-14 px-12 rounded-2xl bg-white text-black font-bold uppercase tracking-widest hover:bg-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.2)] w-full sm:w-auto">
              Claim Obsidian Slot
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
