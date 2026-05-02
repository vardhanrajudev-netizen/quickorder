import { motion } from "motion/react";
import { 
  Star, 
  MapPin, 
  Clock, 
  Filter,
  Search,
  ArrowRight,
  TrendingUp,
  Award
} from "lucide-react";
import { MOCK_RESTAURANTS } from "@/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const CATEGORIES = ['All', 'Michelin Star', 'Signature', 'Boutique', 'Experimental'];

export default function Restaurants() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRestaurants = MOCK_RESTAURANTS.filter(r => {
    const matchesCategory = activeCategory === 'All' || r.category === activeCategory;
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         r.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelect = (restaurant: any) => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden glass shadow-2xl flex flex-col justify-end p-6 md:p-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover transform scale-105"
            alt="Hero Cuisine"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-2xl space-y-3 md:space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="gold-gradient text-black font-bold tracking-widest px-3 mb-2 md:mb-4 uppercase text-[9px] md:text-[10px]">
              Signature Selection
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-2 md:mb-4 leading-none">
              A Symphony of <span className="text-primary italic">Flavors</span>
            </h1>
            <p className="text-sm md:text-lg text-white/70 font-light leading-relaxed max-w-md">
              Curated access to the city's most exclusive culinary destinations, 
              delivered with precision.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 border-b border-white/5 pb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full px-5 md:px-6 transition-all duration-500 text-[10px] md:text-xs font-bold uppercase tracking-widest h-9 md:h-10 whitespace-nowrap",
                activeCategory === cat 
                  ? "bg-indigo-500 text-white border-none shadow-[0_0_15px_rgba(99,102,241,0.4)]" 
                  : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white"
              )}
            >
              {cat}
            </Button>
          ))}
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <Input 
            placeholder="Search venue or cuisine..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/5 border-white/10 pl-11 h-12 rounded-full focus:border-indigo-500/50 transition-all text-sm text-white"
          />
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRestaurants.map((restaurant, index) => (
          <motion.div
            key={restaurant.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleSelect(restaurant)}
          >
            <Card className="glass-dark border-white/5 group cursor-pointer overflow-hidden rounded-3xl active:scale-[0.98] transition-all hover:border-indigo-500/30">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-indigo-500/20 backdrop-blur-md border border-indigo-500/30 text-indigo-300 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 px-3 py-1 rounded-full">
                    <Award className="w-3 h-3" />
                    {restaurant.category}
                  </Badge>
                </div>

                <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white">
                  <Star className="w-4 h-4 fill-indigo-400 text-indigo-400" />
                  <span className="font-bold text-sm tracking-tighter">{restaurant.rating}</span>
                </div>
              </div>

              <CardContent className="p-8 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                      {restaurant.name}
                    </h3>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-medium mt-1">{restaurant.cuisine}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-inner">
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-white/30" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Peak Performance</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
