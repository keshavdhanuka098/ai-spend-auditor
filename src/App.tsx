/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Wallet, 
  ArrowRight, 
  ChevronRight, 
  TrendingDown, 
  PieChart, 
  Plus, 
  Trash2, 
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  Layers,
  Sparkles,
  Download,
  Copy,
  History,
  Info,
  ExternalLink,
  Target,
  ArrowUpRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell,
  PieChart as RePieChart,
  Pie,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { cn } from './lib/utils';
import { calculateAudit, ToolSubscription, AuditResult, Recommendation, SUPPORTED_TOOLS } from './lib/auditEngine';

// --- Types ---
// Interface is imported from auditEngine.ts

// --- Mock Data ---
const STATS = [
  { label: 'Avg. Savings', value: '32%', icon: TrendingDown },
  { label: 'Audits Completed', value: '14.8k+', icon: BarChart3 },
  { label: 'Total Optimized', value: '$12.4M', icon: Wallet },
];

const FEATURES = [
  {
    title: 'Subscription Discovery',
    description: 'Automatically scan and identify duplicate or overlapping AI tool subscriptions across your organization.',
    icon: Layers,
    color: 'text-blue-400'
  },
  {
    title: 'Usage Analytics',
    description: 'Deep dive into account activity to see which licenses are actually being used by your team members.',
    icon: BarChart3,
    color: 'text-purple-400'
  },
  {
    title: 'Security Compliance',
    description: 'Monitor shadow AI usage and ensure all tools meet your company\'s data governance standards.',
    icon: ShieldCheck,
    color: 'text-indigo-400'
  },
  {
    title: 'Cost Forecasting',
    description: 'Predict next year\'s AI spend based on current growth trends and recommended consolidation.',
    icon: Zap,
    color: 'text-amber-400'
  }
];

const AUDIT_RESULTS_CHART_DATA = [
  { month: 'Jan', current: 4000, optimized: 4000 },
  { month: 'Feb', current: 4500, optimized: 4200 },
  { month: 'Mar', current: 5200, optimized: 4100 },
  { month: 'Apr', current: 6100, optimized: 4300 },
  { month: 'May', current: 7200, optimized: 4500 },
  { month: 'Jun', current: 8500, optimized: 4800 },
];

const PIE_DATA = [
  { name: 'Redundant', value: 35, color: '#f43f5e' },
  { name: 'Optimized', value: 45, color: '#8b5cf6' },
  { name: 'Unused', value: 20, color: '#3b82f6' },
];

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'CTO at TechFlow',
    content: 'The AI Spend Auditor revealed $24k/year in redundant subscriptions we didn\'t even know existed. Pure magic.',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop'
  },
  {
    name: 'Marcus Thorne',
    role: 'Finance Director, InnovateX',
    content: 'We finally have a clear visibility into our AI tool stack. This is essential for any scaling SaaS company.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300",
      scrolled ? "bg-black/60 backdrop-blur-md" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 md:py-4 px-4 md:px-10 border-b border-white/5">
        <div className="flex items-center gap-2">
          <motion.div 
            whileHover={{ rotate: 90 }}
            className="w-6 h-6 rounded-md gradient-brand shadow-lg" 
          />
          <span className="font-sans font-bold text-lg md:text-xl tracking-tight">AI Spend Auditor</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-[14px] font-medium text-slate-subtle">
          <a href="#features" className="text-white hover:text-brand-300 transition-colors">Platform</a>
          <a href="#audit" className="hover:text-white transition-colors">Resources</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Pricing</a>
          <div className="w-px h-5 bg-slate-800" />
          <button className="text-white font-bold hover:text-brand-300 transition-colors cursor-pointer">
            Sign In
          </button>
        </div>

        <button 
          className="md:hidden text-white p-2" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 glass-dark p-6 rounded-2xl flex flex-col gap-4 text-center overflow-hidden"
          >
            <a href="#features" onClick={() => setIsOpen(false)} className="text-slate-300 py-2 border-b border-white/5">Platform</a>
            <a href="#audit" onClick={() => setIsOpen(false)} className="text-slate-300 py-2 border-b border-white/5">Resources</a>
            <a href="#testimonials" onClick={() => setIsOpen(false)} className="text-slate-300 py-2 border-b border-white/5">Pricing</a>
            <button className="w-full text-white font-bold py-3 bg-brand-600 rounded-xl">Sign In</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const PremiumBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate camera rotation based on mouse
  const camX = (mousePos.y / window.innerHeight - 0.5) * 10;
  const camY = (mousePos.x / window.innerWidth - 0.5) * -10;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#020617]">
      {/* Deep Space Base */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* Reactive 3D Stage */}
      <motion.div 
        style={{ 
          perspective: '1200px',
          rotateX: camX,
          rotateY: camY,
          transformStyle: 'preserve-3d'
        }}
        className="absolute inset-0"
      >
        {/* Connection Mesh (Plexus) */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                scale: [1, 1.5, 1],
              }}
              transition={{ duration: 10 + i, repeat: Infinity, ease: "linear" }}
              className="absolute w-1 h-1 bg-brand-400 rounded-full shadow-[0_0_10px_#6366f1]"
              style={{ transform: `translateZ(${Math.random() * 400}px)` }}
            />
          ))}
        </div>

        {/* 3D Perspective Grid */}
        <div 
          className="absolute inset-0 opacity-[0.15] pointer-events-none" 
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div 
            animate={{ 
              backgroundPositionY: ['0px', '200px']
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
            style={{ 
              backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
              backgroundSize: '100px 100px',
              transform: 'rotateX(75deg) translateY(-30%) scale(3)',
              transformOrigin: 'top',
              boxShadow: 'inset 0 0 100px #020617'
            }} 
          />
          {/* Vanishing Point Glow */}
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[600px] h-1 bg-brand-500 blur-[80px] opacity-40 shadow-[0_0_100px_40px_#6366f1]" />
        </div>

        {/* 3D Floating Entities */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: `${20 + i * 20}%`, 
              y: `${30 + (i % 2) * 20}%`,
              z: i * 100 - 200
            }}
            animate={{
              rotateX: 360,
              rotateY: 360,
              y: [`${30 + (i % 2) * 20}%`, `${30 + (i % 2) * 20 - 3}%`, `${30 + (i % 2) * 20}%`],
            }}
            transition={{
              rotateX: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" },
              rotateY: { duration: 25 + i * 4, repeat: Infinity, ease: "linear" },
              y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ transformStyle: 'preserve-3d' }}
            className="absolute w-16 h-16"
          >
            {[0, 90, 180, 270, 45, -45].map((rot, idx) => (
              <div 
                key={idx}
                className="absolute inset-0 border border-brand-500/30 bg-brand-500/5 backdrop-blur-[1px]"
                style={{ 
                  transform: `rotateY(${rot}deg) translateZ(32px)`,
                  boxShadow: 'inset 0 0 15px rgba(99,102,241,0.1)'
                }}
              />
            ))}
          </motion.div>
        ))}

        {/* Dynamic Parallax Starfield */}
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-30"
            style={{ 
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateZ(${Math.random() * 600 - 300}px)`
            }}
          />
        ))}
      </motion.div>

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_90%)] opacity-80" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#020617] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#020617] to-transparent" />
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 md:pt-48 pb-20 px-6 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-brand-300">
            <Sparkles className="w-3 h-3" />
            Empowering 200+ Orgs
          </div>
          <h1 className="font-sans text-[44px] md:text-[64px] font-extrabold leading-[1.05] tracking-[-0.04em] mb-6 gradient-text">
            Stop paying for <br />AI seats you <br className="hidden md:block" /> don't use.
          </h1>
          <p className="text-[18px] md:text-[20px] text-slate-subtle max-w-[500px] mb-10 leading-relaxed font-medium">
            The first automated audit tool for the modern AI stack. Connect your accounts and identify $1,000s in monthly waste instantly.
          </p>
          
          <div className="grid grid-cols-2 gap-5 mb-10 max-w-[500px]">
            <motion.div whileHover={{ y: -5 }} className="glass p-5 rounded-2xl border-white/5 hover:border-brand-500/20 transition-all cursor-default">
              <div className="text-[28px] font-bold text-accent-light tracking-tight">$12.4M</div>
              <div className="text-[10px] text-slate-700 uppercase font-bold tracking-wider mt-1">Total Waste Identified</div>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="glass p-5 rounded-2xl border-white/5 hover:border-brand-500/20 transition-all cursor-default">
              <div className="text-[28px] font-bold text-accent-light tracking-tight">28%</div>
              <div className="text-[10px] text-slate-700 uppercase font-bold tracking-wider mt-1">Avg. Annual Savings</div>
            </motion.div>
          </div>

          <div className="space-y-4">
             <div className="flex items-center gap-3 group">
               <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center text-accent-light text-[10px] group-hover:scale-110 transition-transform">✓</div>
               <span className="text-[14px] text-slate-300 font-medium">Identify overlapping seat licenses across 50+ tools</span>
             </div>
             <div className="flex items-center gap-3 group">
               <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center text-accent-light text-[10px] group-hover:scale-110 transition-transform">✓</div>
               <span className="text-[14px] text-slate-300 font-medium">Detect inactive users on expensive Pro plans</span>
             </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="glass-dark p-6 md:p-10 rounded-[32px] flex flex-col gap-6 border-white/10 relative z-10 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="text-[20px] font-bold text-white tracking-tight">Quick Savings Check</div>
              <div className="p-2 glass rounded-lg"><Zap className="w-4 h-4 text-brand-400" /></div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-widest pl-1" htmlFor="primary-tool">Primary Tool</label>
                <select id="primary-tool" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-[14px] outline-none appearance-none hover:border-white/20 transition-colors">
                  <option className="bg-slate-900">ChatGPT Enterprise</option>
                  <option className="bg-slate-900">Claude Team</option>
                  <option className="bg-slate-900">Cursor</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-widest pl-1" htmlFor="monthly-spend">Monthly Spend</label>
                  <input id="monthly-spend" type="text" defaultValue="$2,450" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-[14px] outline-none hover:border-white/20 transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-widest pl-1" htmlFor="team-size">Team Size</label>
                  <input id="team-size" type="text" defaultValue="42" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-[14px] outline-none hover:border-white/20 transition-colors" />
                </div>
              </div>
              <button 
                className="w-full py-4 rounded-xl font-bold gradient-brand text-white btn-shadow mt-4 hover:scale-[1.02] active:scale-95 transition-all text-[15px] cursor-pointer"
                onClick={() => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Audit My AI Spend
              </button>
            </div>

            {/* Results Preview Floating Card */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-10 -right-6 md:-bottom-12 md:-right-10 w-[240px] bg-[#0f172a] border border-[#334155] rounded-[24px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 hidden lg:block"
            >
              <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold inline-block mb-3 border border-emerald-500/20">
                POTENTIAL SAVINGS
              </div>
              <div className="text-[18px] font-bold mb-1">$840/mo</div>
              <p className="text-[11px] text-slate-subtle leading-normal mb-4">Based on 12 redundant users detected in your workspace.</p>
              <div className="h-2 w-full bg-[#334155] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="h-full bg-accent-light" 
                />
              </div>
            </motion.div>
          </div>
          
          <div className="mt-16 flex justify-center items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-slate-800" />
              ))}
            </div>
            <div className="text-slate-subtle text-[13px] font-medium italic">
              "Saved us $4k in the first month." — CTO, TechScale
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5, borderColor: 'rgba(99, 102, 241, 0.3)' }}
            className="glass p-8 md:p-10 rounded-[24px] text-center group border-white/5 transition-colors"
          >
            <div className="text-[36px] md:text-[40px] font-bold font-sans mb-1 text-accent-light tracking-tight">{stat.value}</div>
            <div className="text-slate-600 font-bold text-[10px] uppercase tracking-[3px]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

interface ToolInputProps {
  subscription: ToolSubscription;
  onUpdate: (id: string, updates: Partial<ToolSubscription>) => void;
  onRemove: (id: string) => void;
}

const ToolInput = ({ 
  subscription, 
  onUpdate, 
  onRemove 
}: ToolInputProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (field: string, value: any) => {
    const newErrors = { ...errors };
    if (field === 'name' && !value.trim()) {
      newErrors.name = 'Tool name required';
    } else if (field === 'name') {
      delete newErrors.name;
    }

    if (field === 'monthlyRate' && (isNaN(Number(value)) || Number(value) <= 0)) {
      newErrors.monthlyRate = 'Invalid rate';
    } else if (field === 'monthlyRate') {
      delete newErrors.monthlyRate;
    }

    if (field === 'teamSize' && (isNaN(Number(value)) || Number(value) < 1)) {
      newErrors.teamSize = 'Min 1';
    } else if (field === 'teamSize') {
      delete newErrors.teamSize;
    }

    setErrors(newErrors);
  };

  const filteredTools = SUPPORTED_TOOLS.filter(tool => 
    tool.toLowerCase().includes(subscription.name.toLowerCase()) && 
    tool.toLowerCase() !== subscription.name.toLowerCase()
  );

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="glass p-6 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-5 items-end mb-4 border-white/5 relative"
    >
      <div className="md:col-span-3 relative">
        <label className="block text-[11px] font-bold text-slate-subtle uppercase tracking-wider mb-2">Tool Name</label>
        <input 
          type="text" 
          value={subscription.name}
          onChange={(e) => {
            const val = e.target.value;
            onUpdate(subscription.id, { name: val });
            validate('name', val);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="e.g. Claude.ai"
          className={cn(
            "w-full bg-black/40 border rounded-lg p-3 text-[14px] outline-none text-white focus:border-brand-500 transition-colors",
            errors.name ? "border-red-500/50" : "border-white/10"
          )}
        />
        <AnimatePresence>
          {showSuggestions && filteredTools.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-white/10 rounded-xl overflow-hidden z-20 shadow-2xl"
            >
              {filteredTools.map(tool => (
                <button
                  key={tool}
                  onClick={() => {
                    onUpdate(subscription.id, { name: tool });
                    setShowSuggestions(false);
                    validate('name', tool);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-brand-500 hover:text-white transition-colors border-b border-white/5 last:border-0"
                >
                  {tool}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        {errors.name && <span className="absolute -bottom-5 left-0 text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.name}</span>}
      </div>
      <div className="md:col-span-2">
        <label className="block text-[11px] font-bold text-slate-subtle uppercase tracking-wider mb-2">Plan</label>
        <select 
           value={subscription.plan}
           onChange={(e) => onUpdate(subscription.id, { plan: e.target.value })}
           className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-[14px] outline-none text-white appearance-none"
        >
          <option value="Pro" className="bg-slate-900">Pro</option>
          <option value="Business" className="bg-slate-900">Business</option>
          <option value="Enterprise" className="bg-slate-900">Enterprise</option>
        </select>
      </div>
      <div className="md:col-span-2 relative">
        <label className="block text-[11px] font-bold text-slate-subtle uppercase tracking-wider mb-2">Price/User ($)</label>
        <input 
          type="number" 
          value={subscription.monthlyRate}
          onChange={(e) => {
            const val = e.target.value;
            onUpdate(subscription.id, { monthlyRate: Number(val) });
            validate('monthlyRate', val);
          }}
          placeholder="0.00"
          className={cn(
            "w-full bg-black/40 border rounded-lg p-3 text-[14px] outline-none text-white focus:border-brand-500 transition-colors",
            errors.monthlyRate ? "border-red-500/50" : "border-white/10"
          )}
        />
        {errors.monthlyRate && <span className="absolute -bottom-5 left-0 text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.monthlyRate}</span>}
      </div>
      <div className="md:col-span-2 relative">
        <label className="block text-[11px] font-bold text-slate-subtle uppercase tracking-wider mb-2">Team Size</label>
        <input 
          type="number" 
          value={subscription.teamSize}
          onChange={(e) => {
            const val = e.target.value;
            onUpdate(subscription.id, { teamSize: Number(val) });
            validate('teamSize', val);
          }}
          placeholder="1"
          className={cn(
            "w-full bg-black/40 border rounded-lg p-3 text-[14px] outline-none text-white focus:border-brand-500 transition-colors",
            errors.teamSize ? "border-red-500/50" : "border-white/10"
          )}
        />
        {errors.teamSize && <span className="absolute -bottom-5 left-0 text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.teamSize}</span>}
      </div>
      <div className="md:col-span-2">
        <label className="block text-[11px] font-bold text-slate-subtle uppercase tracking-wider mb-2">Usage</label>
        <select 
          value={subscription.useCase}
          onChange={(e) => onUpdate(subscription.id, { useCase: e.target.value })}
          className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-[14px] outline-none text-white appearance-none"
        >
          <option value="Operations" className="bg-slate-900">Operations</option>
          <option value="Engineering" className="bg-slate-900">Engineering</option>
          <option value="Marketing" className="bg-slate-900">Marketing</option>
          <option value="Research" className="bg-slate-900">Research</option>
          <option value="Content Creation" className="bg-slate-900">Content Creation</option>
          <option value="Customer Support" className="bg-slate-900">Customer Support</option>
        </select>
      </div>
      <div className="md:col-span-1 flex justify-end">
        <button 
          onClick={() => onRemove(subscription.id)}
          className="p-3 text-slate-700 hover:text-red-400 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

const AuditResults = ({ 
  result, 
  onClose 
}: { 
  result: AuditResult; 
  onClose: () => void 
}) => {
  const [copied, setCopied] = useState(false);

  const copySummary = () => {
    const text = `AI Spend Audit Results\nTotal Spend: $${result.summary.totalMonthlySpend.toLocaleString()}\nPotential Annual Savings: $${result.summary.annualSavings.toLocaleString()}\nRisk Level: ${result.summary.riskLevel}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const chartData = useMemo(() => [
    { name: 'Current', amount: result.summary.totalMonthlySpend },
    { name: 'Benchmark', amount: result.summary.benchmarkMonthlySpend },
  ], [result]);

  const pieData = useMemo(() => [
    { name: 'Efficient', value: result.summary.benchmarkMonthlySpend, color: '#6366f1' },
    { name: 'Overspend', value: result.summary.monthlyOverspend, color: '#f43f5e' },
  ], [result]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-16 space-y-10"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="font-sans text-[32px] font-extrabold tracking-tight">Audit Report</h3>
          <p className="text-slate-subtle mt-1">Generated on {new Date(result.timestamp).toLocaleDateString()}</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={copySummary}
            className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm font-bold hover:bg-white/10 transition-all border-white/10"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy Summary'}
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm font-bold hover:bg-white/10 transition-all border-white/10"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-dark p-6 rounded-3xl">
          <div className="text-slate-subtle text-[11px] font-bold uppercase tracking-wider mb-2">Monthly Spend</div>
          <div className="text-3xl font-extrabold">${result.summary.totalMonthlySpend.toLocaleString()}</div>
        </div>
        <div className="glass-dark p-6 rounded-3xl border-emerald-500/20 bg-emerald-500/5">
          <div className="text-emerald-500/60 text-[11px] font-bold uppercase tracking-wider mb-2">Annual Savings</div>
          <div className="text-3xl font-extrabold text-emerald-400">${result.summary.annualSavings.toLocaleString()}</div>
        </div>
        <div className="glass-dark p-6 rounded-3xl">
          <div className="text-slate-subtle text-[11px] font-bold uppercase tracking-wider mb-2">Over Benchmark</div>
          <div className="text-3xl font-extrabold text-brand-400">{result.summary.percentOverBenchmark.toFixed(1)}%</div>
        </div>
        <div className={cn(
          "glass-dark p-6 rounded-3xl flex items-center justify-between",
          result.summary.riskLevel === 'High' ? "bg-red-500/5 border-red-500/20" : 
          result.summary.riskLevel === 'Medium' ? "bg-amber-500/5 border-amber-500/20" : "bg-emerald-500/5 border-emerald-500/20"
        )}>
          <div>
            <div className="text-slate-subtle text-[11px] font-bold uppercase tracking-wider mb-1">Risk Profile</div>
            <div className={cn(
              "text-2xl font-extrabold",
              result.summary.riskLevel === 'High' ? "text-red-400" : 
              result.summary.riskLevel === 'Medium' ? "text-amber-400" : "text-emerald-400"
            )}>{result.summary.riskLevel} Risk</div>
          </div>
          {result.summary.riskLevel === 'High' ? <AlertCircle className="w-8 h-8 text-red-500/50" /> : <ShieldCheck className="w-8 h-8 text-emerald-500/50" />}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10">
        <div className="glass-dark p-10 rounded-[32px] border-white/10">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-brand-400" />
              Comparison Analysis
            </h4>
            <div className="flex gap-4">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#f43f5e]" />
                 <span className="text-[10px] font-bold text-slate-500 uppercase">Current</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#6366f1]" />
                 <span className="text-[10px] font-bold text-slate-500 uppercase">Benchmark</span>
               </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" barSize={40}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 600 }} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#050505', border: '1px solid #ffffff10', borderRadius: '12px' }} />
                <Bar dataKey="amount" radius={[0, 10, 10, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#f43f5e' : '#6366f1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-dark p-10 rounded-[32px] border-white/10">
          <h4 className="text-xl font-bold mb-8 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-indigo-400" />
            Spend Distribution
          </h4>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid #ffffff10', borderRadius: '12px' }} />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-6">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-medium text-slate-400">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-white">${item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10">
        <div className="glass-dark p-10 rounded-[32px] border-white/10">
          <h4 className="text-xl font-bold mb-8 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-emerald-400" />
            Savings Forecast
          </h4>
          <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 mb-6">
             <div className="text-[11px] font-bold text-emerald-500/60 uppercase tracking-wider mb-1">5-Year Projected Savings</div>
             <div className="text-[40px] font-extrabold text-emerald-400 leading-none">${(result.summary.annualSavings * 5).toLocaleString()}</div>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            Based on current inflation rates for SaaS seats and historical tool price increases.
          </p>
        </div>

        <div className="glass-dark p-10 rounded-[32px] border-white/10">
          <h4 className="text-xl font-bold mb-8 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Efficiency Insights
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.insights.map((insight, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/2 border border-white/5 hover:border-brand-500/20 transition-all group">
                <div className="w-5 h-5 rounded-full bg-brand-500/10 flex-shrink-0 flex items-center justify-center mt-1">
                  <span className="text-[10px] font-bold text-brand-400">{i + 1}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-2xl font-bold mb-8 tracking-tight">Optimization Recommendations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.recommendations.map((rec, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="glass-dark p-6 rounded-[24px] border-brand-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="px-3 py-1 bg-brand-500/10 text-brand-400 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-brand-500/20">
                    Alternative Found
                  </div>
                  <div className="text-emerald-400 text-sm font-bold flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4" />
                    Save ${rec.savings.toLocaleString()}
                  </div>
                </div>
                <h5 className="text-lg font-bold mb-1">{rec.toolName}</h5>
                <p className="text-slate-500 text-xs mb-4">Current Plan: {rec.currentPlan}</p>
                
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 mb-6">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Recommended Strategy</div>
                  <div className="text-white font-medium text-sm">{rec.alternative}</div>
                </div>
                
                <p className="text-slate-400 text-xs italic leading-relaxed">
                  {rec.reason}
                </p>
              </div>
              
              <button className="w-full mt-6 py-3 px-4 gradient-brand rounded-xl font-bold text-[13px] text-white flex items-center justify-center gap-2 group border border-white/10">
                Switch to Recommended
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
          {result.recommendations.length === 0 && (
            <div className="col-span-full py-20 glass p-10 rounded-[32px] text-center">
              <Sparkles className="w-12 h-12 text-brand-400/30 mx-auto mb-4" />
              <h5 className="text-xl font-bold mb-2">Everything Looks Great</h5>
              <p className="text-slate-500">We couldn't find any significant overspending in your current stack.</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-brand-600 rounded-[2rem] p-8 md:p-12 text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700" />
        <h2 className="text-2xl md:text-3xl font-sans font-extrabold mb-4 relative z-10">Want deep negotiation for these tools?</h2>
        <p className="text-brand-100 text-[16px] mb-8 max-w-xl mx-auto relative z-10 opacity-90">
          Our team can talk to these vendors on your behalf to secure preferred enterprise pricing 
          without you changing a single user license.
        </p>
        <button className="px-10 py-4 bg-white text-brand-600 rounded-2xl font-bold text-[18px] hover:scale-105 transition-all shadow-xl relative z-10">
          Talk to Credex Experts
        </button>
      </div>
      
      <div className="flex justify-center mt-10">
        <button 
          onClick={onClose}
          className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 font-bold text-sm"
        >
          <X className="w-4 h-4" />
          Close Report
        </button>
      </div>
    </motion.div>
  );
};

const AuditSection = () => {
  const [subscriptions, setSubscriptions] = useState<ToolSubscription[]>([
    { id: '1', name: 'ChatGPT Enterprise', plan: 'Enterprise', monthlyRate: 30, teamSize: 20, useCase: 'Operations' },
    { id: '2', name: 'Claude Team', plan: 'Pro', monthlyRate: 25, teamSize: 15, useCase: 'Engineering' },
    { id: '3', name: 'Cursor Pro', plan: 'Pro', monthlyRate: 20, teamSize: 10, useCase: 'Engineering' },
  ]);
  const [isAuditing, setIsAuditing] = useState(false);
  const [activeResult, setActiveResult] = useState<AuditResult | null>(null);
  const [history, setHistory] = useState<AuditResult[]>([]);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "Analyzing subscriptions...",
    "Comparing with market benchmarks...",
    "Detecting license overlaps...",
    "Generating recommendations...",
    "Finalizing report..."
  ];

  useEffect(() => {
    const savedHistory = localStorage.getItem('auditHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addSubscription = () => {
    const newSub: ToolSubscription = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      plan: 'Pro',
      monthlyRate: 0,
      teamSize: 1,
      useCase: 'Operations'
    };
    setSubscriptions([...subscriptions, newSub]);
  };

  const updateSubscription = (id: string, updates: Partial<ToolSubscription>) => {
    setSubscriptions(subscriptions.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const removeSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter(s => s.id !== id));
  };

  const runAudit = () => {
    setIsAuditing(true);
    setLoadingStep(0);
    
    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev >= loadingMessages.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    setTimeout(() => {
      const result = calculateAudit(subscriptions);
      setActiveResult(result);
      setIsAuditing(false);
      
      const newHistory = [result, ...history].slice(0, 5);
      setHistory(newHistory);
      localStorage.setItem('auditHistory', JSON.stringify(newHistory));
      
      document.getElementById('audit-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 3500);
  };

  return (
    <section id="audit" className="py-24 px-10 bg-black/20">
      <div className="max-w-6xl mx-auto">
        {!activeResult ? (
          <>
            <div className="text-center mb-16">
              <h2 className="font-sans text-[44px] font-extrabold mb-6 tracking-tight">Precision Spend Audit</h2>
              <p className="text-slate-subtle text-[18px] max-w-2xl mx-auto font-medium">
                Add your current stack below. We'll compare your rates against thousands of 
                negotiated enterprise contracts to find your savings.
              </p>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {subscriptions.map((sub) => (
                  <ToolInput 
                    key={sub.id} 
                    subscription={sub} 
                    onUpdate={updateSubscription} 
                    onRemove={removeSubscription} 
                  />
                ))}
              </AnimatePresence>

              <button 
                onClick={addSubscription}
                className="w-full py-4 border border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-2 text-slate-500 hover:text-white hover:border-white/30 transition-all font-bold text-[14px]"
              >
                <Plus className="w-4 h-4" />
                Add Application
              </button>
            </div>

            <div className="mt-12 flex flex-col items-center gap-4">
              <button 
                onClick={runAudit}
                disabled={isAuditing}
                className={cn(
                  "px-12 py-5 rounded-2xl font-bold text-[18px] transition-all min-w-[320px] btn-shadow relative overflow-hidden",
                  isAuditing ? "bg-slate-900 text-slate-600 cursor-not-allowed" : "gradient-brand text-white hover:scale-[1.02] active:scale-95"
                )}
              >
                {isAuditing ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="text-brand-400"
                      >
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                      {loadingMessages[loadingStep]}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    Calculate Savings Opportunity
                    <BarChart3 className="w-5 h-5" />
                  </div>
                )}
              </button>
              <p className="text-xs text-slate-600 font-bold uppercase tracking-widest">
                Secure 256-bit automated calculation
              </p>
            </div>

            {history.length > 0 && (
              <div className="mt-20">
                <h4 className="flex items-center gap-2 text-slate-500 font-bold mb-6 text-sm uppercase tracking-widest">
                  <History className="w-4 h-4" />
                  Recent Audits
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {history.map((h) => (
                    <button 
                      key={h.id}
                      onClick={() => setActiveResult(h)}
                      className="glass p-5 rounded-2xl text-left border-white/5 hover:border-brand-500/30 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-xs text-slate-500">{new Date(h.timestamp).toLocaleDateString()}</div>
                        <div className={cn(
                          "px-2 py-0.5 rounded text-[9px] font-extrabold uppercase",
                          h.summary.riskLevel === 'High' ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"
                        )}>{h.summary.riskLevel}</div>
                      </div>
                      <div className="text-xl font-bold group-hover:text-brand-300 transition-colors">
                        ${h.summary.annualSavings.toLocaleString()} Savings
                      </div>
                      <div className="text-xs text-slate-400 mt-1">{h.subscriptions.length} Tools Analyzed</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div id="audit-results">
            <AuditResults 
              result={activeResult} 
              onClose={() => setActiveResult(null)} 
            />
          </div>
        )}
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-sans text-[44px] md:text-[52px] font-extrabold mb-8 leading-tight tracking-tight gradient-text">
              Enterprise Visibility Meets Precision Control
            </h2>
            <div className="space-y-8">
              {FEATURES.map((feature, i) => (
                <motion.div 
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <div className={cn("w-12 h-12 rounded-xl glass flex-shrink-0 flex items-center justify-center text-accent-light bg-slate-900 border-white/5")}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold mb-2">{feature.title}</h3>
                    <p className="text-slate-subtle leading-relaxed text-[15px]">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="glass p-10 rounded-[40px] border-white/10 overflow-hidden">
               <div className="space-y-4">
                 {[1, 2, 3].map((i) => (
                   <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-white/2 border border-white/5 hover:border-brand-500/30 transition-all duration-300">
                     <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-[12px] font-bold text-accent-light">
                         ✓
                       </div>
                       <div className="space-y-2">
                         <div className="h-3 w-32 bg-white/10 rounded mb-2" />
                         <div className="h-2 w-48 bg-white/5 rounded" />
                       </div>
                     </div>
                     <ChevronRight className="w-5 h-5 text-slate-700" />
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    ...TESTIMONIALS,
    {
      name: 'James Wilson',
      role: 'Founder at PixelGen',
      content: 'The most ROI-positive 5 minutes of my week. We slashed our Cursor bill in half instantly.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    }
  ];

  return (
    <section id="testimonials" className="py-24 px-6 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-sans text-[36px] md:text-[44px] font-extrabold mb-4 tracking-tight">Trusted by AI-First Teams</h2>
          <p className="text-slate-subtle text-[18px] max-w-2xl mx-auto font-medium">Industry leaders who take precision spend seriously.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {testimonials.map((t, i) => (
             <motion.div 
               key={t.name}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               whileHover={{ y: -5, borderColor: 'rgba(99, 102, 241, 0.4)' }}
               className="flex flex-col gap-6 bg-white/2 border border-white/5 py-8 px-8 rounded-[32px] max-w-[380px] hover:bg-white/4 transition-all group"
             >
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full border-2 border-brand-500/20 overflow-hidden p-0.5">
                   <img src={t.avatar} alt={t.name} className="w-full h-full object-cover rounded-full opacity-80 group-hover:opacity-100 transition-opacity" />
                 </div>
                 <div>
                    <div className="text-[16px] font-bold text-white">{t.name}</div>
                    <div className="text-[12px] text-slate-500 font-semibold uppercase tracking-widest">{t.role}</div>
                 </div>
               </div>
               <p className="text-[16px] text-slate-subtle leading-relaxed font-medium italic">
                 "{t.content}"
               </p>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="py-24 px-6 md:px-10">
      <div className="max-w-5xl mx-auto glass p-12 md:p-20 rounded-[48px] border-brand-500/10 text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="relative z-10"
        >
          <h2 className="text-[40px] md:text-[56px] font-sans font-extrabold mb-6 tracking-tight leading-tight">
            Ready to Cut <br className="md:hidden" /> Your AI Spend?
          </h2>
          <p className="text-slate-subtle text-[18px] md:text-[20px] mb-12 max-w-2xl mx-auto font-medium">
            Let Credex negotiate better pricing and unlock enterprise discounts you didn't know existed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-10 py-5 gradient-brand text-white rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer">
              Talk to Credex Experts
            </button>
            <button 
              onClick={() => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-10 py-5 glass border-white/10 hover:bg-white/5 text-white rounded-2xl font-bold text-lg transition-all cursor-pointer"
            >
              Run Audit Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-10 px-10 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded gradient-brand" />
          <span className="text-[16px] font-bold">AI Spend Auditor</span>
        </div>
        <div className="text-[12px] text-slate-subtle font-medium">
          &copy; 2024 AI Spend Auditor Inc. All rights reserved.
        </div>
        <div className="flex gap-8 text-[12px] text-slate-subtle font-bold uppercase tracking-wider">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Security</a>
        </div>
      </div>
    </footer>
  );
};

const ResearchInsights = () => {
  const interviewPersonas = [
    {
      name: "Alex",
      role: "CEO, Fintech Startup",
      quote: "I just see 'OpenAI' on my card every month with zero visibility into seat utilization.",
      spend: "$800/mo",
      pain: "Shadow AI usage",
      icon: <Target className="w-5 h-5 text-blue-400" />
    },
    {
      name: "Jordan",
      role: "Freelance Creative",
      quote: "Individually they are cheap, but collectively my AI stack is a second rent payment.",
      spend: "$150/mo",
      pain: "Subscription fatigue",
      icon: <Wallet className="w-5 h-5 text-purple-400" />
    },
    {
      name: "Casey",
      role: "Engineering Manager",
      quote: "We are paying for both Cursor and Copilot for 100+ devs. The redundancy is insane.",
      spend: "$4k+/mo",
      pain: "Unmanaged overlap",
      icon: <Layers className="w-5 h-5 text-indigo-400" />
    }
  ];

  const marketData = [
    { label: "Market Size", val: "$15B+", desc: "Projected AI SaaS spend by 2026" },
    { label: "Waste Avg", val: "32%", desc: "Average enterprise overspend identified" },
    { label: "ROI Ratio", val: "12:1", desc: "First-year ROI for Credex customers" }
  ];

  return (
    <section className="py-24 px-10 bg-black/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          <div className="lg:w-1/3">
            <h2 className="font-sans text-[44px] font-extrabold mb-6 leading-tight tracking-tight gradient-text">
              User Research & <br />Product Insights
            </h2>
            <p className="text-slate-subtle text-lg mb-10 leading-relaxed font-medium">
              We interviewed 50+ founders and CTOs to understand the "AI Spend Gap." 
              The findings drove the architecture of the Auditor.
            </p>
            
            <div className="space-y-6">
              <div className="p-6 glass rounded-2xl border-brand-500/10">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-brand-400" />
                  Primary Pain Point
                </h4>
                <p className="text-slate-400 text-sm">Teams scale faster than finance can audit. Shadow IT is now the #1 cause of AI budget waste.</p>
              </div>
              <div className="p-6 glass rounded-2xl border-brand-500/10">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Why Credex Wins
                </h4>
                <p className="text-slate-400 text-sm">We provide pre-negotiated enterprise pricing that startups simply can't access on their own.</p>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {interviewPersonas.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-dark p-8 rounded-[32px] border-white/5 relative group hover:border-brand-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl glass bg-slate-900 flex items-center justify-center">
                      {p.icon}
                    </div>
                    <div>
                      <div className="text-white font-bold">{p.name}</div>
                      <div className="text-slate-500 text-xs">{p.role}</div>
                    </div>
                  </div>
                  <div className="text-[10px] font-extrabold text-slate-700 uppercase tracking-widest">Persona 0{i+1}</div>
                </div>
                <p className="text-slate-300 italic text-sm mb-6 leading-relaxed">"{p.quote}"</p>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                  <div>
                    <div className="text-[10px] font-bold text-slate-600 uppercase mb-1">Monthly Spend</div>
                    <div className="text-white font-bold text-sm tracking-tight">{p.spend}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-600 uppercase mb-1">Bottleneck</div>
                    <div className="text-white font-bold text-sm tracking-tight">{p.pain}</div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <div className="md:col-span-1 glass-dark p-8 rounded-[32px] border-brand-500/20 bg-brand-500/5 flex flex-col justify-between">
              <div>
                <h4 className="text-white font-bold mb-4">Market Potential</h4>
                <div className="space-y-6">
                  {marketData.map(m => (
                    <div key={m.label}>
                      <div className="flex justify-between items-end mb-1">
                        <div className="text-xs font-bold text-slate-500 uppercase">{m.label}</div>
                        <div className="text-xl font-extrabold text-white">{m.val}</div>
                      </div>
                      <div className="text-[11px] text-slate-600 font-medium">{m.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="w-full mt-8 py-4 gradient-brand rounded-xl font-bold text-xs uppercase tracking-widest text-white shadow-xl shadow-brand-500/20">
                View Full Research Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen font-sans text-white">
      <PremiumBackground />
      <Navbar />
      <Hero />
      <StatsSection />
      <FeaturesSection />
      <AuditSection />
      <ResearchInsights />
      <TestimonialsSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}

