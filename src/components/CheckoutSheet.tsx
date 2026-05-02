import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  CreditCard, 
  Truck, 
  Clock, 
  CheckCircle2,
  X,
  Plus,
  Minus,
  ChevronRight
} from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutSheetProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: any;
  cartItems: CartItem[];
}

export function CheckoutSheet({ isOpen, onClose, restaurant, cartItems }: CheckoutSheetProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [items, setItems] = useState<CartItem[]>(cartItems);

  // Use useEffect to sync items from props if they change while in step 1
  useEffect(() => {
    if (step === 1) {
      setItems(cartItems);
    }
  }, [cartItems, step]);

  const updateQuantity = (itemId: number, delta: number) => {
    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 25;
  const total = subtotal + deliveryFee;

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onClose();
      navigate('/tracking');
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md glass-dark border-l border-white/10 p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-8 pb-4">
            <div className="flex items-center justify-between mb-4">
              <Badge className="bg-indigo-500/20 text-indigo-400 border-none uppercase tracking-widest text-[10px] font-bold">Step {step} of 3</Badge>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white/10 text-white/50">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <SheetTitle className="text-3xl font-bold tracking-tighter text-white">
              {step === 1 ? 'Your Selection' : step === 2 ? 'Logistics' : 'Payment'}
            </SheetTitle>
            <p className="text-xs text-white/40 uppercase tracking-widest font-bold">From {restaurant?.name}</p>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-8 py-4 space-y-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between group">
                      <div className="space-y-1">
                        <h4 className="font-bold text-white text-sm">{item.name}</h4>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold italic">Signature Pairing</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-white/5 bg-white/[0.02] rounded-full px-2 py-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 rounded-full text-white/30 hover:text-white"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-xs font-bold w-8 text-center text-white">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 rounded-full text-white/30 hover:text-white"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <span className="font-bold text-sm text-white">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 space-y-2">
                    <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Membership Perk</p>
                    <p className="text-xs text-white/60 leading-relaxed font-medium">Complementary Petit Fours included with this signature order.</p>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/30 glow-indigo group cursor-pointer transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white shadow-lg">
                          <Truck className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-white">White Glove Delivery</h4>
                      </div>
                      <p className="text-xs text-white/40 leading-relaxed font-medium">Temperature controlled transport, direct-to-door concierge handling.</p>
                    </div>
                    <div className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 opacity-40 grayscale group cursor-not-allowed">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-white/40" />
                        <h4 className="font-bold text-white/40 italic">Standard Arrival</h4>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="p-8 rounded-3xl primary-gradient text-white space-y-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="flex justify-between items-start relative z-10">
                      <CreditCard className="w-8 h-8" />
                      <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase font-bold">ORDEROS TITANIUM</span>
                    </div>
                    <div className="space-y-2 relative z-10">
                      <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold italic">Exclusive Line</p>
                      <p className="text-2xl font-bold tracking-[0.2em]">**** **** **** 8820</p>
                    </div>
                    <div className="flex justify-between items-end relative z-10">
                      <p className="font-bold text-sm tracking-widest">ALESSANDRO V.</p>
                      <div className="px-3 py-1 bg-black/20 backdrop-blur-md rounded-full border border-white/10 font-bold tracking-widest italic text-[9px]">OBSIDIAN</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-8 space-y-6 bg-black/40 backdrop-blur-xl border-t border-white/10">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Subtotal</span>
                <span className="text-xs font-bold text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Concierge fee</span>
                <span className="text-xs font-bold text-indigo-400">${deliveryFee.toFixed(2)}</span>
              </div>
              <Separator className="bg-white/5 my-2" />
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold tracking-tighter text-white">Grand Total</span>
                <span className="text-2xl font-bold text-indigo-400 glow-indigo shadow-none">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button 
              className="w-full h-14 rounded-2xl bg-white text-black font-bold text-xs uppercase tracking-widest group transition-all hover:bg-zinc-200"
              onClick={handleNext}
            >
              {step === 3 ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-3 group-hover:scale-125 transition-transform" />
                  Finalize Reservation
                </>
              ) : (
                <>
                  Proceed to {step === 1 ? 'Dispatch' : 'Payment'}
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

import { cn } from "@/lib/utils";
