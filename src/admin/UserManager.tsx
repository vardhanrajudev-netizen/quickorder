import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  ShieldCheck, 
  Ban, 
  MapPin,
  Clock,
  ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const USERS = [
  { id: 'usr-1', name: 'John Wick', email: 'baba.yaga@continental.com', status: 'Verified', role: 'Obsidian Prime', lastLogin: '2 mins ago', location: 'New York, USA', color: 'bg-indigo-500' },
  { id: 'usr-2', name: 'Sarah Connor', email: 's.connor@sky.net', status: 'Standard', role: 'Customer', lastLogin: '14 mins ago', location: 'Los Angeles, USA', color: 'bg-orange-500' },
  { id: 'usr-3', name: 'Bruce Wayne', email: 'b.wayne@wayne.com', status: 'Verified', role: 'Obsidian Prime', lastLogin: '1 hour ago', location: 'Gotham City', color: 'bg-zinc-600' },
  { id: 'usr-4', name: 'Ellen Ripley', email: 'ripley@wey-yu.com', status: 'Banned', role: 'Customer', lastLogin: '3 days ago', location: 'Orbit Station', color: 'bg-red-500' },
];

export default function UserManager() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = USERS.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCustody = USERS.length * 10725; // Mock scaling
  const verifiedCount = USERS.filter(u => u.status === 'Verified').length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tighter text-white">Identity & Access</h1>
          <p className="text-sm text-zinc-500 font-medium">Monitoring all registered user entities and authentication nodes.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
            <Input 
              placeholder="Search identity..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-zinc-950 border-zinc-900 h-11 pl-10 rounded-xl text-xs text-white" 
            />
          </div>
          <Button className="bg-zinc-900 border border-zinc-800 text-white h-11 px-6 rounded-xl hover:bg-zinc-800">
            <Filter className="w-4 h-4 mr-2" />
            Segment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Custody', value: totalCustody.toLocaleString(), trend: '+12%', icon: Users },
          { label: 'Verified Entities', value: verifiedCount.toString(), trend: 'Live', icon: ShieldCheck },
          { label: 'Identity Score', value: '98.2', trend: 'Optimal', icon: ShieldCheck },
        ].map((stat, i) => (
          <Card key={i} className="bg-zinc-950 border-zinc-900 p-6 group hover:border-indigo-500/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-500 group-hover:text-indigo-400 transition-all">
                <stat.icon className="w-5 h-5" />
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-none text-[10px]">{stat.trend}</Badge>
            </div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-1 tracking-tight">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="rounded-3xl bg-zinc-950 border border-zinc-900 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-900 bg-zinc-900/20">
                <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Entity</th>
                <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Permission Level</th>
                <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Last Activity</th>
                <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {filteredUsers.map((user, i) => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-zinc-900/30 transition-colors"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 rounded-xl border border-zinc-800">
                        <AvatarFallback className={cn("text-xs font-bold text-white", user.color)}>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold text-white mb-0.5 group-hover:text-indigo-400 transition-colors">{user.name}</p>
                        <div className="flex items-center gap-3">
                           <p className="text-[10px] text-zinc-500 font-medium flex items-center gap-1.5"><Mail className="w-3 h-3" /> {user.email}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <Badge variant="outline" className={cn(
                      "text-[10px] font-bold uppercase tracking-widest px-3 py-1 border-zinc-800",
                      user.role === 'Obsidian Prime' ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" : "bg-zinc-900 text-zinc-400"
                    )}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       {user.status === 'Verified' ? (
                         <div className="flex items-center gap-1.5">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                           <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Active</span>
                         </div>
                       ) : user.status === 'Banned' ? (
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Banned</span>
                        </div>
                       ) : (
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Inactive</span>
                        </div>
                       )}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5"><Clock className="w-3 h-3" /> {user.lastLogin}</p>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {user.location}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" className="h-8 w-8 rounded-lg p-0 text-zinc-500 hover:text-white hover:bg-zinc-800">
                        <ShieldCheck className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" className="h-8 w-8 rounded-lg p-0 text-zinc-500 hover:text-white hover:bg-zinc-800">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-5 bg-zinc-900/20 border-t border-zinc-900 flex items-center justify-between">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Displaying 4 active entities</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-8 border-zinc-900 bg-zinc-950 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-900">Prev</Button>
            <Button variant="outline" className="h-8 border-zinc-900 bg-zinc-950 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-900">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
