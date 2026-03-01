import { motion } from "framer-motion";
import { PhoneCall, AlertTriangle, ShieldAlert, HeartPulse } from "lucide-react";
import { useLocalUser } from "@/hooks/use-local-user";
import { useUser } from "@/hooks/use-users";

export default function Emergency() {
  const { userId } = useLocalUser();
  const { data: user } = useUser(userId);

  const emergencyNumber = user?.emergencyContact || "112";

  const handleCall = () => {
    window.open(`tel:${emergencyNumber}`);
  };

  return (
    <div className="pt-6 pb-12 flex flex-col min-h-full">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center px-4 py-1.5 bg-destructive/10 text-destructive rounded-full font-bold text-sm mb-4 border border-destructive/20">
          <ShieldAlert className="w-4 h-4 mr-2" />
          EMERGENCY MODE
        </div>
        <h1 className="text-3xl font-extrabold text-foreground">Need Help?</h1>
      </motion.div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="flex-1 flex items-center justify-center py-8"
      >
        <button 
          onClick={handleCall}
          className="relative group focus:outline-none"
        >
          <div className="absolute inset-0 rounded-full emergency-pulse" />
          <div className="relative w-64 h-64 bg-gradient-to-br from-red-500 to-destructive rounded-full flex flex-col items-center justify-center shadow-2xl text-white border-4 border-white/20 group-hover:scale-95 transition-transform duration-200">
            <PhoneCall className="w-16 h-16 mb-2 animate-bounce" />
            <span className="text-2xl font-extrabold uppercase tracking-widest">Call SOS</span>
            <span className="text-sm font-medium opacity-80 mt-1">{emergencyNumber}</span>
          </div>
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-3xl p-6 mt-8 border-l-4 border-l-destructive"
      >
        <div className="flex items-center gap-3 mb-4">
          <HeartPulse className="w-6 h-6 text-destructive" />
          <h2 className="text-xl font-bold">First Aid Steps</h2>
        </div>
        
        <ul className="space-y-4">
          <li className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center font-bold text-sm shrink-0">1</div>
            <p className="text-foreground font-medium">Inject Epinephrine (EpiPen) immediately if available and prescribed.</p>
          </li>
          <li className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center font-bold text-sm shrink-0">2</div>
            <p className="text-foreground font-medium">Call emergency services ({emergencyNumber}) right away.</p>
          </li>
          <li className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center font-bold text-sm shrink-0">3</div>
            <p className="text-foreground font-medium">Lie flat on back with legs elevated. Do not stand up.</p>
          </li>
          <li className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center font-bold text-sm shrink-0">4</div>
            <p className="text-foreground font-medium">If breathing is difficult, sit up slightly. Use inhaler if prescribed.</p>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
