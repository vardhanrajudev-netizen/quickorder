import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import LiveTracking from "./pages/LiveTracking";
import Restaurants from "./pages/Restaurants";
import Landing from "./pages/Landing";
import ObsidianPrime from "./pages/ObsidianPrime";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import RestaurantDetail from "./pages/RestaurantDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Demo from "./pages/Demo";
import { AdminLayout } from "./admin/Layout";
import AdminDashboard from "./admin/Dashboard";
import UserManager from "./admin/UserManager";
import OrderIntelligence from "./admin/OrderIntelligence";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isLanding = ["/", "/landing", "/signin", "/signup", "/pricing", "/demo"].includes(location.pathname);
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return (
    <div className="dark min-h-screen bg-[#050505] text-foreground flex relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.08)_0%,transparent_50%)] pointer-events-none" />
      
      {!isLanding && (
        <>
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          {/* Mobile Toggle Button */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-6 left-6 z-30 p-3 rounded-xl bg-white/5 border border-white/10 text-white md:hidden hover:bg-white/10 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </>
      )}

      <main className={cn(
        "flex-1 overflow-x-hidden relative z-10 w-full",
        !isLanding ? "md:ml-64 p-6 md:p-12" : "ml-0"
      )}>
        {!isLanding && (
          <div className="max-w-7xl mx-auto pt-16 md:pt-0">
            {children}
          </div>
        )}
        {isLanding && children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <TooltipProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            <Route path="/tracking" element={<LiveTracking />} />
            <Route path="/obsidian-prime" element={<ObsidianPrime />} />
            <Route path="/merchant" element={<RestaurantDashboard />} />
            <Route path="/pricing" element={<ObsidianPrime />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/settings" element={<div className="text-center py-20 text-muted-foreground uppercase tracking-widest font-bold opacity-20">Preference Suite (Encrypted)</div>} />
            
            {/* Admin Integrated Logic */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManager />} />
            <Route path="/admin/orders" element={<OrderIntelligence />} />
            <Route path="/admin/analytics" element={<div className="flex items-center justify-center min-h-[60vh] text-zinc-500 uppercase tracking-[0.3em] font-bold">Data Stream Inbound...</div>} />
            <Route path="/admin/security" element={<div className="flex items-center justify-center min-h-[60vh] text-zinc-500 uppercase tracking-[0.3em] font-bold">Secure Zone Protocol</div>} />
          </Routes>
        </Layout>
      </Router>
    </TooltipProvider>
  );
}

