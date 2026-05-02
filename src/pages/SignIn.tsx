import { motion } from "motion/react";
import { ArrowLeft, Mail, Lock, Github, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Visual Side */}
      <div className="hidden lg:block relative overflow-hidden bg-zinc-900">
        <img 
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1500" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
          alt="Atmospheric kitchen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-x-12 bottom-12 space-y-6">
          <div className="w-12 h-12 primary-gradient rounded-xl flex items-center justify-center text-white">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-4xl font-bold text-white tracking-tighter">Your culinary dashboard awaits.</h2>
          <p className="text-white/40 font-medium max-w-md">Securely access your OrderOS profile to manage subscriptions, tracking, and preferences.</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex items-center justify-center p-8 bg-black">
        <div className="w-full max-w-md space-y-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Return Home</span>
            </Link>
            <h1 className="text-3xl font-bold text-white tracking-tight">Sign In</h1>
            <p className="text-white/40 text-sm">Welcome back to the Obsidian network.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Identity</label>
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
              Initialize Session
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest"><span className="bg-black px-4 text-white/20">or authenticate with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 border-white/10 bg-white/5 text-white hover:bg-white/10 gap-2">
              <Chrome className="w-4 h-4" /> Google
            </Button>
            <Button variant="outline" className="h-12 border-white/10 bg-white/5 text-white hover:bg-white/10 gap-2">
              <Github className="w-4 h-4" /> GitHub
            </Button>
          </div>

          <p className="text-center text-xs text-white/40">
            Don't have an access slot yet? <Link to="/signup" className="text-indigo-400 font-bold hover:underline">Request Onboarding</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
