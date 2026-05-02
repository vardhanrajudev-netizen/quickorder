import { motion } from "motion/react";
import { ArrowLeft, Mail, Lock, User, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Form Side */}
      <div className="flex items-center justify-center p-8 bg-black order-2 lg:order-1">
        <div className="w-full max-w-md space-y-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Return Home</span>
            </Link>
            <h1 className="text-3xl font-bold text-white tracking-tight">Request Onboarding</h1>
            <p className="text-white/40 text-sm">Join the city's most exclusive logistics circuit.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Full Identity</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <Input placeholder="John Wick" className="bg-white/5 border-white/10 h-12 pl-12 rounded-xl focus:border-indigo-500/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Communication Channel</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <Input placeholder="name@domain.com" className="bg-white/5 border-white/10 h-12 pl-12 rounded-xl focus:border-indigo-500/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Access Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <Input type="password" placeholder="••••••••" className="bg-white/5 border-white/10 h-12 pl-12 rounded-xl focus:border-indigo-500/50" />
              </div>
            </div>

            <Button onClick={() => navigate('/dashboard')} className="w-full h-14 rounded-xl bg-white text-black font-bold uppercase tracking-widest hover:bg-indigo-400">
              Initialize Onboarding
            </Button>
          </div>

          <p className="text-center text-xs text-white/40">
            Already have an active slot? <Link to="/signin" className="text-indigo-400 font-bold hover:underline">Secure Login</Link>
          </p>
        </div>
      </div>

      {/* Visual Side */}
      <div className="hidden lg:block relative overflow-hidden bg-zinc-900 order-1 lg:order-2">
        <img 
          src="https://images.unsplash.com/photo-1574937753447-3f562473950a?auto=format&fit=crop&q=80&w=1500" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
          alt="Technical desk"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/40 to-transparent" />
        <div className="absolute inset-x-12 bottom-12 space-y-12">
          <div className="space-y-4">
             <h2 className="text-4xl font-bold text-white tracking-tighter">Your culinary dashboard awaits.</h2>
             <p className="text-white/40 font-medium max-w-sm">Experience logistics re-engineered for the modern epicurean.</p>
          </div>

          <div className="space-y-6">
            {[
              "Hyper-local logistics under 20 mins",
              "Direct connection to Michelin kitchens",
              "Real-time atomic tracking",
              "Exclusive Obsidian Prime benefits"
            ].map(perk => (
              <div key={perk} className="flex items-center gap-3 text-sm text-white/60">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                {perk}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
