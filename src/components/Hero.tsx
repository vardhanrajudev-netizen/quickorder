import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, UtensilsCrossed, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const RESTAURANT_CARDS = [
    { id: 'pizza-hub', emoji: '🍕', name: 'Pizza Hub', time: '25 min', rating: '4.9', badge: 'Popular', badgeColor: 'bg-orange-500/20 text-orange-400' },
    { id: 'burger-house', emoji: '🍔', name: 'Burger House', time: '18 min', rating: '4.8', mt: 'mt-12' },
    { id: 'asian-bowl', emoji: '🍜', name: 'Asian Bowl', time: '22 min', rating: '4.7' },
    { id: 'healthy-eats', emoji: '🥗', name: 'Healthy Eats', time: '15 min', rating: '5.0', mt: 'mt-12', badge: 'Healthy Choice', badgeColor: 'bg-emerald-500/20 text-emerald-400' },
  ];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-zinc-950">
      {/* Navbar */}
      <nav className="relative z-50 px-6 py-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 primary-gradient rounded-xl flex items-center justify-center glow-indigo shadow-indigo-500/40">
            <UtensilsCrossed className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">OrderOS</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {["Home", "Restaurants", "Pricing", "Dashboard"].map((item) => (
            <Link 
              key={item} 
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-sm font-bold text-white/50 hover:text-white transition-colors uppercase tracking-widest"
            >
              {item}
            </Link>
          ))}
          <div className="h-4 w-px bg-white/10" />
          <Link to="/signin" className="text-sm font-bold text-white/50 hover:text-white transition-colors uppercase tracking-widest">Sign In</Link>
          <Button onClick={() => navigate('/signup')} className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 font-bold text-xs uppercase tracking-widest h-11">
            Get Started
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-white">
          <Menu className="w-6 h-6" />
        </button>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="fixed inset-0 z-40 bg-zinc-950 flex flex-col p-8 md:hidden"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 primary-gradient rounded-xl flex items-center justify-center">
                    <UtensilsCrossed className="text-white w-6 h-6" />
                  </div>
                  <span className="text-xl font-bold tracking-tighter text-white">OrderOS</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-8">
                {["Home", "Restaurants", "Pricing", "Dashboard"].map((item) => (
                  <Link 
                    key={item} 
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-3xl font-bold text-white tracking-widest uppercase"
                  >
                    {item}
                  </Link>
                ))}
                <div className="h-px w-full bg-white/5 my-4" />
                <Link to="/signin" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white/50 tracking-widest uppercase">Sign In</Link>
                <Button onClick={() => { setIsMenuOpen(false); navigate('/signup'); }} className="h-16 rounded-2xl bg-white text-black font-bold uppercase tracking-widest text-sm">
                  Get Started
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1565299623644-9c2b8e8e5e3e?q=80&w=2070&auto=format&fit=crop')`,
        }}
      />
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950/80" />

      <div className="relative flex-1 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center z-10 py-12">
        
        {/* Left Content */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-sm font-medium"
          >
            🚀 Food Delivery Reimagined
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-8xl font-bold leading-none tracking-tighter text-white"
          >
            Order food.<br />
            <span className="gradient-text">Faster than ever.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md text-xl text-gray-300 font-light"
          >
            Premium delivery with real-time tracking, live ETA, and zero hassle. 
            Get your favorite meals in under 20 minutes.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-5"
          >
            <button 
              onClick={() => navigate('/restaurants')}
              className="group px-10 py-5 bg-white hover:bg-gray-200 text-black font-bold text-sm uppercase tracking-widest rounded-2xl flex items-center gap-3 shadow-[0_20px_50px_rgba(255,255,255,0.1)] active:scale-95 transition-all"
            >
              Start Ordering Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform w-5 h-5" />
            </button>

            <button 
              onClick={() => navigate('/demo')}
              className="px-10 py-5 border border-white/20 hover:border-white/40 text-white font-bold text-sm uppercase tracking-widest rounded-2xl backdrop-blur-xl hover:bg-white/10 transition-all"
            >
              Watch 45s Demo
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-8 pt-6 text-xs text-gray-500 font-bold uppercase tracking-widest"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">⭐</span>
              <div>
                <div className="text-white text-lg font-bold">4.98</div>
                <div>28,491 reviews</div>
              </div>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div>30,000+ meals delivered today</div>
          </motion.div>
        </div>

        {/* Right Side - Interactive Restaurant Cards */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 hidden md:grid">
          {RESTAURANT_CARDS.map((card, i) => (
            <motion.div 
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => navigate(`/restaurant/${card.id}`)}
              className={`glass p-7 rounded-3xl border border-white/10 backdrop-blur-2xl cursor-pointer group active:scale-[0.98] transition-all shadow-xl ${card.mt || ''}`}
            >
              <div className="text-5xl mb-5 group-hover:scale-110 transition-transform">{card.emoji}</div>
              <h3 className="font-bold text-2xl mb-1 text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{card.name}</h3>
              <p className="text-white/40 text-sm font-bold uppercase tracking-widest">{card.time} • {card.rating} ★</p>
              {card.badge && (
                <div className={`mt-6 inline-flex items-center gap-2 px-4 py-1.5 ${card.badgeColor} text-[10px] uppercase font-bold tracking-widest rounded-full border border-current opacity-60`}>
                  {card.badge}
                </div>
              )}
            </motion.div>
          ))}

          {/* Glow Accents */}
          <div className="absolute -top-12 -right-12 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full -z-10" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-violet-500/10 blur-[100px] rounded-full -z-10" />
        </div>
      </div>

      {/* Scroll Prompt */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 text-[10px] uppercase font-bold tracking-[0.3em] flex flex-col items-center gap-3">
        Scroll to explore
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
}

