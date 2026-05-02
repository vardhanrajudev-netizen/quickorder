import Hero from "@/components/Hero";
import { motion } from "motion/react";
import { Shield, Zap, Heart, Star } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Logistics",
    description: "Our fleet is optimized for hyper-local delivery under 20 minutes."
  },
  {
    icon: Shield,
    title: "Vetted Selection",
    description: "Only the highest rated restaurants make it into the Obsidian circuit."
  },
  {
    icon: Heart,
    title: "Tailored For You",
    description: "Smart AI recommendations based on your unique flavor profile."
  }
];

export default function Landing() {
  return (
    <div className="bg-[#050505]">
      <Hero />
      
      {/* Features Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:border-indigo-500/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-16 tracking-tight">Trusted by over <span className="text-indigo-400">50,000</span> food lovers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="font-bold text-2xl text-white">FORBES</div>
            <div className="font-bold text-2xl text-white">WIRED</div>
            <div className="font-bold text-2xl text-white">TECHCRUNCH</div>
            <div className="font-bold text-2xl text-white">VOGUE</div>
          </div>
        </div>
      </section>
    </div>
  );
}
