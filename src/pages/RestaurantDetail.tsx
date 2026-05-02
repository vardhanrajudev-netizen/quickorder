import { motion, AnimatePresence } from "motion/react";
import { 
  Star, 
  MapPin, 
  Clock, 
  ArrowLeft,
  ShoppingBag,
  Plus,
  Minus,
  Navigation2,
  Info,
  ChefHat,
  Search,
  ChevronRight
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { MOCK_RESTAURANTS } from "@/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { CheckoutSheet } from "@/components/CheckoutSheet";

const MENU_ITEMS = [
  { id: 1, name: 'Glazed Wagyu Short Rib', description: '48-hour slow cooked, truffle mash, charred leeks.', price: 145, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=300' },
  { id: 2, name: 'Hand-Dived Scallops', description: 'Yuzu butter, seaweed crumble, micro-herbs.', price: 65, image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=300' },
  { id: 3, name: 'Obsidian Chocolate Sphere', description: 'Gold leaf, salted caramel, liquid nitrogen.', price: 42, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=300' },
];

export default function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const restaurant = MOCK_RESTAURANTS.find(r => r.id === id) || MOCK_RESTAURANTS[0];

  const updateQuantity = (itemId: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + delta)
    }));
  };

  const filteredMenuItems = MENU_ITEMS.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cartItems = MENU_ITEMS
    .filter(item => quantities[item.id] > 0)
    .map(item => ({
      ...item,
      quantity: quantities[item.id]
    }));

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="space-y-8 pb-32">
      {/* Back & Title */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="rounded-xl border border-white/5 hover:bg-white/5 text-white/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to list
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-xl border border-white/5 hover:bg-white/5"><Navigation2 className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon" className="rounded-xl border border-white/5 hover:bg-white/5"><Info className="w-4 h-4" /></Button>
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-[300px] md:h-[450px] rounded-[2rem] md:rounded-[3rem] overflow-hidden glass border-white/10 shadow-2xl">
        <img 
          src={restaurant.image} 
          className="w-full h-full object-cover transform scale-110 blur-[1px] opacity-60"
          alt={restaurant.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <div className="space-y-3 md:space-y-4 max-w-xl">
            <Badge className="bg-indigo-500/20 text-indigo-400 border-none uppercase tracking-widest px-3 py-1 font-bold text-[10px]">
              {restaurant.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-none">
              {restaurant.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/60 font-medium tracking-tight text-sm">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-indigo-400 text-indigo-400" />
                <span className="text-white">{restaurant.rating}</span> (2k+)
              </div>
              <div className="flex items-center gap-1.5 md:border-l md:border-white/10 md:pl-6">
                <MapPin className="w-4 h-4" />
                Midtown
              </div>
              <div className="hidden md:flex items-center gap-1.5 border-l border-white/10 pl-6">
                <ChefHat className="w-4 h-4" />
                Signature Cuisine
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-black/40 backdrop-blur-2xl p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/5 w-fit">
            <div className="text-center">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Transit</p>
              <p className="text-sm md:text-lg font-bold text-white">{restaurant.deliveryTime}</p>
            </div>
            <Separator orientation="vertical" className="h-8 md:h-10 bg-white/10" />
            <div className="text-center">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Fee</p>
              <p className="text-sm md:text-lg font-bold text-indigo-400">$25.00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-6 gap-4">
             <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
               Curation
               <Badge variant="outline" className="text-[10px] border-white/10 font-bold text-white/30 tracking-widest uppercase">Signature Menu</Badge>
             </h2>
             <div className="relative w-full sm:w-72">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
               <input 
                 placeholder="Search curation..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full h-10 bg-white/5 border border-white/10 rounded-full pl-10 text-sm focus:outline-none focus:border-indigo-500/50 transition-all text-white"
               />
             </div>
          </div>

          <div className="space-y-4">
            {filteredMenuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 rounded-2xl md:rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all"
              >
                <div className="w-full md:w-32 h-48 md:h-32 rounded-xl md:rounded-2xl overflow-hidden shrink-0 border border-white/5">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                </div>
                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
                  <div className="space-y-2">
                    <h4 className="text-lg md:text-xl font-bold text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{item.name}</h4>
                    <p className="text-xs md:text-sm text-white/40 leading-relaxed max-w-md">{item.description}</p>
                    <p className="text-base md:text-lg font-bold text-white mt-2 md:mt-4">${item.price}</p>
                  </div>
                  <div className="flex items-center justify-between md:justify-start gap-4 bg-black/20 rounded-full p-1.5 md:p-2 border border-white/5">
                    <Button 
                      variant="ghost" 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="h-8 w-8 md:h-10 md:w-10 rounded-full hover:bg-white/10 text-white/50"
                    >
                      <Minus className="w-3 md:w-4 h-3 md:h-4" />
                    </Button>
                    <span className="text-sm font-bold w-6 text-center text-white">{quantities[item.id] || 0}</span>
                    <Button 
                      variant="ghost"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-indigo-500 text-white hover:bg-indigo-400 hover:text-white"
                    >
                      <Plus className="w-3 md:w-4 h-3 md:h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 hidden lg:block">
          <Card className="glass border-white/10 p-8 space-y-6 sticky top-8">
             <div className="flex items-center justify-between mb-4">
               <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Selection Summary</h4>
               <ShoppingBag className="w-4 h-4 text-indigo-400" />
             </div>
             
             {cartCount === 0 ? (
               <div className="py-12 text-center space-y-4">
                 <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-white/20">
                   <ShoppingBag className="w-8 h-8" />
                 </div>
                 <p className="text-xs text-white/20 font-bold uppercase tracking-widest">Select items to begin</p>
               </div>
             ) : (
               <div className="space-y-6">
                 <div className="space-y-4">
                   {MENU_ITEMS.filter(i => quantities[i.id]).map(item => (
                     <div key={item.id} className="flex justify-between text-sm">
                       <span className="text-white/60 font-medium">{quantities[item.id]}x {item.name}</span>
                       <span className="text-white font-bold">${item.price * quantities[item.id]}</span>
                     </div>
                   ))}
                 </div>
                 <Separator className="bg-white/5" />
                 <div className="space-y-2">
                   <div className="flex justify-between text-xs">
                     <span className="text-white/30 uppercase tracking-widest font-bold">Subtotal</span>
                     <span className="text-white font-bold">${cartTotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-xs">
                     <span className="text-white/30 uppercase tracking-widest font-bold">Delivery Fee</span>
                     <span className="text-indigo-400 font-bold">$25.00</span>
                   </div>
                   <div className="flex justify-between items-center pt-4">
                     <span className="text-xl font-bold tracking-tighter text-white">Grand Total</span>
                     <span className="text-2xl font-bold text-indigo-400 glow-indigo">${(cartTotal + 25).toFixed(2)}</span>
                   </div>
                 </div>
                 <Button 
                   onClick={() => setIsCheckoutOpen(true)}
                   className="w-full h-14 rounded-2xl bg-white text-black font-bold uppercase tracking-widest hover:bg-indigo-400 transition-all shadow-2xl"
                 >
                   Checkout Order
                   <ChevronRight className="w-4 h-4 ml-2" />
                 </Button>
               </div>
             )}
          </Card>
        </div>

        {/* Mobile Floating Cart Summary */}
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="fixed bottom-6 left-6 right-6 z-40 lg:hidden"
            >
              <Button 
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full h-16 rounded-[1.5rem] primary-gradient text-white flex items-center justify-between px-8 shadow-[0_20px_50px_rgba(79,70,229,0.3)] border border-indigo-400/30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                    {cartCount}
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">View Cart</p>
                    <p className="font-bold">Checkout Order</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Total</p>
                  <p className="text-lg font-bold">${(cartTotal + 25).toFixed(2)}</p>
                </div>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CheckoutSheet 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        restaurant={restaurant}
        cartItems={cartItems}
      />
    </div>
  );
}
