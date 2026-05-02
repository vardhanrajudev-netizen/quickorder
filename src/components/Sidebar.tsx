import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  MapPin, 
  Settings, 
  Bell, 
  User,
  LogOut,
  ChevronRight,
  Star,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: UtensilsCrossed, label: "Marketplace", path: "/restaurants" },
  { icon: MapPin, label: "Live Tracking", path: "/tracking" },
  { icon: Star, label: "Obsidian Prime", path: "/obsidian-prime" },
  { icon: Settings, label: "Restaurant Admin", path: "/merchant" },
];

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (open: boolean) => void }) {
  const location = useLocation();

  return (
    <aside className={cn(
      "w-64 h-screen border-r border-white/5 bg-black/40 backdrop-blur-2xl flex flex-col z-50 fixed top-0 transition-all duration-500 ease-in-out md:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="p-8 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 primary-gradient rounded-xl flex items-center justify-center glow-indigo shadow-indigo-500/40">
            <UtensilsCrossed className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">OrderOS</span>
        </motion.div>
        <button onClick={() => setIsOpen(false)} className="md:hidden text-white/50 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative cursor-pointer",
                  isActive 
                    ? "bg-white/5 text-white shadow-lg" 
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute left-0 w-1 h-5 bg-indigo-500 rounded-r-full shadow-[0_0_8px_rgba(99,102,241,1)]"
                  />
                )}
                <item.icon className={cn("w-5 h-5 transition-all text-current", isActive ? "text-indigo-400" : "group-hover:text-indigo-400")} />
                <span className="font-medium text-sm tracking-tight">{item.label}</span>
                {isActive && (
                  <motion.div layoutId="nav-active" className="ml-auto">
                    <ChevronRight className="w-4 h-4 text-indigo-400" />
                  </motion.div>
                )}
              </motion.div>
            </Link>
          );
        })}
        
        <Link to="/landing">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group text-white/30 hover:text-indigo-400 mt-8 cursor-pointer">
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Public Landing</span>
          </div>
        </Link>
      </nav>

      <div className="p-6 mt-auto border-t border-white/5 space-y-4">
        <div className="flex items-center gap-3 px-2 py-3 rounded-2xl bg-indigo-600/5 border border-indigo-500/10 mb-4">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
            <Star className="w-4 h-4 text-indigo-400 fill-indigo-400" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400/80">Membership</p>
            <p className="text-xs font-bold text-white">Obsidian Black</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 px-2">
          <Avatar className="h-10 w-10 border border-indigo-500/30">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">James Drummond</p>
            <p className="text-xs text-muted-foreground truncate">VIP Gold Member</p>
          </div>
          <Button variant="ghost" size="icon" className="hover:bg-red-500/10 hover:text-red-500 transition-colors">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
