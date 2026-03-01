import { motion } from "framer-motion";
import { Link } from "wouter";
import { ScanLine, AlertCircle, ChevronRight, ShieldCheck } from "lucide-react";
import { useLocalUser } from "@/hooks/use-local-user";
import { useUser } from "@/hooks/use-users";

export default function Home() {
  const { userId } = useLocalUser();
  const { data: user, isLoading } = useUser(userId);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col h-full justify-center pt-8 pb-12"
    >
      <motion.div variants={item} className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-3xl mb-6 shadow-inner">
          <ShieldCheck className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4">
          Eat with <span className="text-gradient">Confidence</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-[280px] mx-auto">
          Scan food labels instantly to detect hidden allergens and stay safe.
        </p>
      </motion.div>

      {/* Greeting Card */}
      {!isLoading && (
        <motion.div variants={item} className="mb-8 px-2">
          {user ? (
            <div className="glass-card p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Welcome back,</p>
                <p className="font-bold text-lg">{user.name}</p>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {user.allergies.slice(0, 3).map(a => (
                    <span key={a} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">
                      {a}
                    </span>
                  ))}
                  {user.allergies.length > 3 && (
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md font-medium">
                      +{user.allergies.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              <Link href="/profile" className="p-2 bg-secondary rounded-full hover:bg-secondary/80 transition-colors">
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Link>
            </div>
          ) : (
            <Link href="/profile" className="block w-full">
              <div className="glass-card p-5 rounded-2xl border-dashed border-2 border-primary/30 flex items-center justify-between hover:bg-primary/5 transition-colors">
                <div>
                  <p className="font-bold text-foreground">Complete Setup</p>
                  <p className="text-sm text-muted-foreground">Add your allergies to start</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          )}
        </motion.div>
      )}

      {/* Main Actions */}
      <motion.div variants={item} className="space-y-4 px-2">
        <Link 
          href="/scan"
          className="group relative overflow-hidden flex items-center justify-between p-6 bg-gradient-to-r from-primary to-blue-500 rounded-3xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-1">Scan Food Label</h3>
            <p className="text-primary-foreground/80 text-sm font-medium">Use AI to check ingredients</p>
          </div>
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
            <ScanLine className="w-7 h-7 text-white" />
          </div>
          {/* Decorative background element */}
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
        </Link>

        <Link 
          href="/emergency"
          className="group relative flex items-center justify-between p-6 bg-white dark:bg-gray-900 border-2 border-destructive/20 rounded-3xl shadow-lg hover:border-destructive/50 hover:shadow-destructive/20 hover:-translate-y-1 transition-all duration-300"
        >
          <div>
            <h3 className="text-xl font-bold text-destructive mb-1">Emergency Mode</h3>
            <p className="text-muted-foreground text-sm font-medium">Get immediate help</p>
          </div>
          <div className="w-14 h-14 bg-destructive/10 rounded-2xl flex items-center justify-center group-hover:bg-destructive group-hover:text-white transition-colors text-destructive">
            <AlertCircle className="w-7 h-7" />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
