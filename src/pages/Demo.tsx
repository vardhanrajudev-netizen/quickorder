import { motion } from "motion/react";
import { Play, Shield, Zap, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Demo() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-4xl w-full space-y-16 relative z-10">
        <div className="text-center space-y-6">
          <Link to="/" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-white transition-colors mb-4">
             Close Walkthrough
          </Link>
          <h1 className="text-5xl font-bold text-white tracking-tighter">Experience <span className="text-indigo-400">OrderOS</span> in 8 Seconds.</h1>
          <p className="text-white/40 text-lg font-medium max-w-2xl mx-auto">See how our atomic logistics engine and premium interface redefine the standard for luxury food delivery.</p>
        </div>

        {/* Video Container */}
        <div className="aspect-video w-full rounded-[3rem] glass border-white/10 relative overflow-hidden group shadow-2xl">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
          >
            <source src="/assets/videos/AD.mp4" type="video/mp4" />
          </video>
          
          
          <div className="absolute bottom-12 left-12 right-12 flex items-center justify-between">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white"><Shield className="w-4 h-4" /></div>
              <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white"><Zap className="w-4 h-4" /></div>
            </div>
            <div className="text-[10px] font-bold text-white uppercase tracking-widest bg-indigo-500 px-4 py-2 rounded-full shadow-lg glow-indigo">LIVE RENDER</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "Atomic Prep", desc: "Kitchen sync under 2ms latency." },
            { icon: MapPin, title: "Live Vector", desc: "Millimeter-precise courier tracking." },
            { icon: Shield, title: "Encrypted", desc: "Private delivery lanes and protocols." },
          ].map((item, i) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-center space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 mx-auto flex items-center justify-center text-indigo-400">
                <item.icon className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold tracking-tight">{item.title}</h4>
              <p className="text-white/20 text-xs font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
           <Button className="h-14 px-12 rounded-2xl bg-white text-black font-bold uppercase tracking-widest hover:bg-indigo-400 shadow-2xl transition-all">
             Start Your Experience
             <ArrowRight className="w-4 h-4 ml-3" />
           </Button>
        </div>
      </div>
    </div>
  );
}
