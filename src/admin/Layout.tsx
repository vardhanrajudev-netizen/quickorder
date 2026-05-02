import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  ShieldAlert, 
  Settings, 
  LogOut, 
  ChevronRight,
  ClipboardList,
  Activity,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

const adminNav = [
  { icon: Activity, label: "Macro Overview", path: "/admin" },
  { icon: Users, label: "Identity & Access", path: "/admin/users" },
  { icon: ShoppingBag, label: "Order Intelligence", path: "/admin/orders" },
  { icon: BarChart3, label: "Revenue Analytics", path: "/admin/analytics" },
  { icon: ShieldAlert, label: "System Firewall", path: "/admin/security" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="dark min-h-screen bg-[#020202] text-white flex">
      {/* Admin Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-zinc-950 border-r border-zinc-900 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tighter uppercase italic">OS Admin</span>
            </div>
            <button onClick={() => setIsMobileOpen(false)} className="lg:hidden text-zinc-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1">
            {adminNav.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl transition-all group",
                    isActive 
                      ? "bg-zinc-900 text-white border border-zinc-800 shadow-xl" 
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn("w-4 h-4", isActive ? "text-indigo-400" : "text-zinc-600")} />
                    <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3 h-3 text-indigo-400" />}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-8 border-t border-zinc-900">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-900 mb-4">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-indigo-400 border border-zinc-700">LV</div>
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Master Admin</p>
                <p className="text-sm font-bold truncate">Lord Vance</p>
              </div>
            </div>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Terminate Session</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <header className="h-16 border-b border-zinc-900 bg-black/50 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileOpen(true)} className="lg:hidden text-zinc-400">
              <Menu className="w-6 h-6" />
            </button>
            <div className="h-4 w-px bg-zinc-800 hidden lg:block" />
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest hidden md:block">
              Network Protocol: <span className="text-emerald-500">v4.0.2 Stable</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 rounded-lg text-[10px] font-bold text-zinc-400 uppercase tracking-widest border border-zinc-800">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Feed
            </div>
          </div>
        </header>
        
        <main className="p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
