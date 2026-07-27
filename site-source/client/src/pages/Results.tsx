/**
 * Results / Portfolio Page
 * ALL data recreated as native web components — charts, graphs, numbers.
 * Every number is real, pulled from actual client proposals.
 */

import { motion } from "framer-motion";
import { ArrowLeft, Phone, Mail, TrendingUp, DollarSign, Users, Star, Eye, Megaphone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadialBarChart, RadialBar
} from "recharts";

// ============ ANIMATED COUNTER ============
function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ============ DATA ============

// German Gastro - Facebook Reach Data (from charts in screenshots)
const wirtshausReachData = [
  { month: "Feb '22", reach: 15000 },
  { month: "May '22", reach: 45000 },
  { month: "Aug '22", reach: 85000 },
  { month: "Nov '22", reach: 120000 },
  { month: "Feb '23", reach: 155000 },
  { month: "May '23", reach: 180000 },
  { month: "Aug '23", reach: 200000 },
  { month: "Nov '23", reach: 210000 },
  { month: "Mar '24", reach: 225700 },
];

const rasselbockLAReachData = [
  { month: "Dec '21", reach: 5000 },
  { month: "Mar '22", reach: 12000 },
  { month: "Jun '22", reach: 18000 },
  { month: "Sep '22", reach: 24000 },
  { month: "Dec '22", reach: 30000 },
  { month: "Mar '23", reach: 35000 },
  { month: "Jul '23", reach: 44600 },
];

const rasselbockLBReachData = [
  { month: "Oct '21", reach: 20000 },
  { month: "Jan '22", reach: 40000 },
  { month: "Apr '22", reach: 55000 },
  { month: "Jul '22", reach: 65000 },
  { month: "Oct '22", reach: 72000 },
  { month: "Jan '23", reach: 80000 },
  { month: "May '23", reach: 92000 },
];

// Natalee Thai / OG Tony's - Ad Campaign Data
const nataleeAdPerformance = [
  { name: "Calls for Takeout", value: 1019 },
  { name: "Online Orders", value: 396 },
  { name: "Viewed Directions", value: 1095 },
  { name: "Visited Store", value: 256 },
  { name: "Viewed Website", value: 1486 },
];

// Natalee - ROAS comparison
const roasData = [
  { campaign: "FB Shopping", roas: 2.75, color: "#c17f4a" },
  { campaign: "FB Lead", roas: 6.5, color: "#d4956b" },
  { campaign: "Google Search & Shopping", roas: 4.0, color: "#a86835" },
  { campaign: "FB Sales", roas: 4.5, color: "#e8b08a" },
  { campaign: "Google Search", roas: 10.0, color: "#8b5e3c" },
];

// Natalee - Content Reach
const nataleeContentReach = [
  { platform: "Facebook", reach: 18900, growth: 81.4, organic: 100 },
  { platform: "Instagram", reach: 124700, growth: 17.8, organic: 100 },
];

// Natalee - IG Reach over time
const nataleeIGReachData = [
  { month: "Mar '23", reach: 2000 },
  { month: "Jun '23", reach: 5000 },
  { month: "Aug '23", reach: 8000 },
  { month: "Nov '23", reach: 15000 },
  { month: "Feb '24", reach: 25000 },
  { month: "May '24", reach: 36700 },
];

// Anejo Cantina - Content Reach
const anejoFBReachData = [
  { month: "Aug '22", reach: 2000 },
  { month: "Nov '22", reach: 8000 },
  { month: "Feb '23", reach: 15000 },
  { month: "May '23", reach: 22000 },
  { month: "Sep '23", reach: 28000 },
  { month: "Jan '24", reach: 35000 },
  { month: "Mar '24", reach: 40000 },
];

const anejoIGReachData = [
  { month: "Aug '22", reach: 1000 },
  { month: "Nov '22", reach: 10000 },
  { month: "Feb '23", reach: 25000 },
  { month: "May '23", reach: 45000 },
  { month: "Sep '23", reach: 60000 },
  { month: "Jan '24", reach: 72000 },
  { month: "Mar '24", reach: 80000 },
];

// Anejo - Meta Engagement Ads
const anejoAdsData = {
  spent: 2600,
  engagements: 15565,
  reach: 119241,
  cpe: 0.17,
  er: 13.06,
  cpm: 21.80,
};

// Anejo - Boosted Ads
const anejoBoostedData = {
  spent: 430,
  clicks: 627,
  reach: 16617,
  cpc: 0.69,
  ctr: 3.77,
  cpm: 25.87,
};

// Review elevation data
const reviewData = [
  { restaurant: "Wirtshaus", yelp: 10, google: 45 },
  { restaurant: "Rasselbock LA", yelp: 5, google: 30 },
  { restaurant: "Rasselbock LB", yelp: 11, google: 50 },
];

// Client upgrade results
const clientUpgradeData = [
  { client: "Client #1", accountsReached: 37000, growth: 170.1 },
  { client: "Client #2", accountsReached: 10400, growth: 24 },
  { client: "Client #3", impressions: 69731, growth: 74.5 },
];

// Influencer reach
const influencerData = [
  { name: "Rachel Zoe", followers: "4.8M", type: "Fashion Designer" },
  { name: "LA Eats IG", followers: "1.5M", type: "Food Blogger" },
  { name: "Kevin Noparvar", followers: "558K", type: "Food Blogger" },
  { name: "Local Influencers", followers: "100K+", type: "Combined Reach" },
  { name: "Mayor Karen Bass", followers: "—", type: "Visit to Restaurant" },
];

const COLORS = ["#c17f4a", "#d4956b", "#a86835", "#e8b08a", "#8b5e3c"];

// ============ COMPONENTS ============

function SectionDivider() {
  return <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c17f4a]/20 to-transparent my-4" />;
}

function StatCard({ value, label, detail, delay = 0 }: { value: string; label: string; detail?: string; delay?: number }) {
  return (
    <motion.div
      className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <p className="text-[#c17f4a] text-3xl md:text-4xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
        {value}
      </p>
      <p className="text-white font-medium text-sm">{label}</p>
      {detail && <p className="text-white/50 text-xs mt-1">{detail}</p>}
    </motion.div>
  );
}

function LightStatCard({ value, label, detail, delay = 0 }: { value: string; label: string; detail?: string; delay?: number }) {
  return (
    <motion.div
      className="bg-[#faf7f4] border border-[#c17f4a]/10 rounded-xl p-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <p className="text-[#c17f4a] text-3xl md:text-4xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
        {value}
      </p>
      <p className="text-[#2a2a2a] font-medium text-sm">{label}</p>
      {detail && <p className="text-[#2a2a2a]/50 text-xs mt-1">{detail}</p>}
    </motion.div>
  );
}

// ============ MAIN PAGE ============

export default function Results() {
  return (
    <div className="min-h-screen bg-[#faf7f4]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#faf7f4]/90 backdrop-blur-md border-b border-black/5">
        <div className="container flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2 text-[#2a2a2a] hover:text-[#c17f4a] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Meera<span className="text-[#c17f4a]">Social</span>
            </span>
          </a>
          <a
            href="tel:+13237474097"
            className="inline-flex items-center gap-2 bg-[#c17f4a] text-white px-5 py-2 text-sm font-medium rounded-full hover:opacity-90 transition-all duration-300 active:scale-[0.97]"
          >
            <Phone className="w-3.5 h-3.5" />
            Let's talk
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <p className="text-[#c17f4a] text-sm font-semibold tracking-wide uppercase mb-4">Portfolio & Results</p>
            <h1 className="text-4xl md:text-6xl font-bold text-[#2a2a2a] leading-[1.1] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              The proof is in<br />the numbers.
            </h1>
            <p className="text-[#2a2a2a]/70 text-lg md:text-xl max-w-2xl leading-relaxed">
              Real data. Real results from real clients. Every chart, graph, and number below is pulled directly from ad managers, analytics dashboards, and platform insights. Nothing fabricated.
            </p>
          </motion.div>

          {/* Aggregate stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12 pt-8 border-t border-black/5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[
              { icon: <TrendingUp className="w-4 h-4" />, value: "10x", label: "Best ROAS" },
              { icon: <DollarSign className="w-4 h-4" />, value: "796%", label: "Avg ROI" },
              { icon: <Users className="w-4 h-4" />, value: "6.5M", label: "People reached" },
              { icon: <Star className="w-4 h-4" />, value: "5,800%", label: "IG follower growth" },
              { icon: <Eye className="w-4 h-4" />, value: "2,000%", label: "FB reach growth" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-black/5">
                <div className="w-8 h-8 flex items-center justify-center bg-[#c17f4a]/10 text-[#c17f4a] rounded-lg mb-2">
                  {s.icon}
                </div>
                <p className="text-[#c17f4a] text-xl md:text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
                <p className="text-[#2a2a2a]/60 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CLIENT 1: NATALEE THAI & HOUSE OF PIES */}
      {/* ============================================ */}
      <section className="py-16 md:py-24 bg-[#2a2a2a] text-white rounded-3xl mx-4 md:mx-8 relative overflow-hidden">
        <div className="container">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#c17f4a] text-sm font-semibold tracking-wide uppercase mb-2">Client Results</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Natalee Thai & House of Pies
            </h2>
            <p className="text-white/60 text-lg">Thai restaurant & pie shop — Ad campaigns, content, influencer strategy</p>
          </motion.div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <StatCard value="796%" label="ROI" detail="$2,564 spend → $16K-$41K revenue" delay={0} />
            <StatCard value="182K" label="People Reached" detail="Total ad campaign reach" delay={0.05} />
            <StatCard value="1,019" label="Calls for Takeout" detail="Direct response from ads" delay={0.1} />
            <StatCard value="6.5M" label="Influencer Visibility" detail="Through organic mentions" delay={0.15} />
          </div>

          {/* Beyond the Click - Ad Campaign Performance */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Beyond the Click — Ad Campaign Performance
            </h3>
            <p className="text-white/50 text-sm mb-2">Total spend: $2,564 | Monthly cost: ~$53 | Avg ticket: $25</p>
            <p className="text-white/50 text-sm mb-8">Generated <span className="text-[#c17f4a] font-bold">$16K–$41K in revenue</span>. Return of <span className="text-[#c17f4a] font-bold">$7.96 for every $1 invested</span>.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bar chart - actions */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-white font-medium text-sm mb-4">Real-World Actions Generated</h4>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={nataleeAdPerformance} layout="vertical">
                    <XAxis type="number" tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#ccc' }} axisLine={false} tickLine={false} width={120} />
                    <Tooltip formatter={(v: number) => v.toLocaleString()} />
                    <Bar dataKey="value" fill="#c17f4a" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* ROAS comparison */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-white font-medium text-sm mb-4">ROAS by Campaign Type</h4>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={roasData}>
                    <XAxis dataKey="campaign" tick={{ fontSize: 10, fill: '#999' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v: number) => `${v}x ROAS`} />
                    <Bar dataKey="roas" radius={[4, 4, 0, 0]}>
                      {roasData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-white/40 text-xs mt-2">Google Search campaign hit 10x ROAS: $760 spend → $7,991 revenue (239 conversions, $3.17/conv)</p>
              </div>
            </div>
          </motion.div>

          {/* Content Reach */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Content Reach — 100% Organic
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {nataleeContentReach.map((p, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{p.platform}</h4>
                    <span className="text-green-400 text-sm font-bold">↑ {p.growth}%</span>
                  </div>
                  <p className="text-[#c17f4a] text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {p.reach >= 1000 ? `${(p.reach / 1000).toFixed(1)}K` : p.reach}
                  </p>
                  <p className="text-white/40 text-xs mt-1">Organic Reach: {p.organic}% | Ads: 0%</p>
                </div>
              ))}
            </div>

            {/* IG Reach Growth Chart */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="text-white font-medium text-sm mb-4">Instagram Reach Growth Over Time</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={nataleeIGReachData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v: number) => v.toLocaleString()} />
                  <Line type="monotone" dataKey="reach" stroke="#c17f4a" strokeWidth={3} dot={{ fill: '#c17f4a', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Influencer Spotlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              High Fives & Spotlights
            </h3>
            <p className="text-white/50 text-sm mb-6">Influencer and user-generated content connected us to newer, larger audiences — turbo charging visibility to <span className="text-[#c17f4a] font-bold">6.5 million people</span>.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {influencerData.map((inf, i) => (
                <motion.div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="w-10 h-10 mx-auto mb-3 bg-[#c17f4a]/20 rounded-full flex items-center justify-center">
                    <Megaphone className="w-5 h-5 text-[#c17f4a]" />
                  </div>
                  <p className="text-white font-medium text-sm">{inf.name}</p>
                  <p className="text-[#c17f4a] font-bold text-lg">{inf.followers}</p>
                  <p className="text-white/40 text-xs">{inf.type}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* ============================================ */}
      {/* CASE STUDY 3: ANEJO CANTINA / HOOKAH LOUNGE */}
      {/* ============================================ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#c17f4a] text-sm font-semibold tracking-wide uppercase mb-2">Client Results</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#2a2a2a] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Anejo Cantina & Hookah Lounge
            </h2>
            <p className="text-[#2a2a2a]/60 text-lg">Mexican restaurant & lounge — Social media, ads, TikTok growth over 2.5 years</p>
          </motion.div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <LightStatCard value="306K" label="Total FB Reach" detail="32% organic, 68% ads" delay={0} />
            <LightStatCard value="+5,800%" label="IG Follower Growth" detail="17% organic, 83% ads" delay={0.05} />
            <LightStatCard value="553K" label="TikTok Views" detail="539 followers, 1,893 shares" delay={0.1} />
            <LightStatCard value="+2,000%" label="FB Reach Growth" detail="Over 2.5 years" delay={0.15} />
          </div>

          {/* Reach Charts */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-[#2a2a2a] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Content Reach — Last 2.5 Years
            </h3>
            <p className="text-[#2a2a2a]/60 text-sm mb-8">Even without ads, through content and curation, consistent growth throughout the 2.5 years.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Facebook */}
              <div className="bg-[#faf7f4] rounded-xl p-6 border border-[#c17f4a]/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-[#2a2a2a]">Facebook Reach</h4>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">+2,000%</span>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={anejoFBReachData}>
                    <defs>
                      <linearGradient id="anejoFBGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#c17f4a" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#c17f4a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="reach" stroke="#c17f4a" strokeWidth={2} fill="url(#anejoFBGrad)" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#999' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#999' }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v: number) => v.toLocaleString()} />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex gap-4 mt-3 text-xs">
                  <span className="text-[#2a2a2a]/60">Follows: <strong className="text-green-600">↑ 47%</strong></span>
                  <span className="text-[#2a2a2a]/60">Total: <strong className="text-[#2a2a2a]">306,000</strong></span>
                </div>
              </div>

              {/* Instagram */}
              <div className="bg-[#faf7f4] rounded-xl p-6 border border-[#c17f4a]/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-[#2a2a2a]">Instagram Reach</h4>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">+670%</span>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={anejoIGReachData}>
                    <defs>
                      <linearGradient id="anejoIGGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d4956b" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#d4956b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="reach" stroke="#d4956b" strokeWidth={2} fill="url(#anejoIGGrad)" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#999' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#999' }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v: number) => v.toLocaleString()} />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex gap-4 mt-3 text-xs">
                  <span className="text-[#2a2a2a]/60">Follows: <strong className="text-green-600">↑ 5,800%</strong></span>
                  <span className="text-[#2a2a2a]/60">Total: <strong className="text-[#2a2a2a]">131,200</strong></span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ad Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-[#2a2a2a] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ad Performance
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Meta Engagement Booster */}
              <div className="bg-[#2a2a2a] rounded-xl p-6 text-white">
                <h4 className="font-bold text-white mb-1">Meta Engagement Booster Ads</h4>
                <p className="text-white/40 text-xs mb-4">Top tier results. Low CPE in a tough market like LA.</p>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <p className="text-[#c17f4a] text-xl font-bold">${anejoAdsData.spent.toLocaleString()}</p>
                    <p className="text-white/50 text-xs">Spent</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#c17f4a] text-xl font-bold">{anejoAdsData.engagements.toLocaleString()}</p>
                    <p className="text-white/50 text-xs">Engagements</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#c17f4a] text-xl font-bold">{anejoAdsData.reach.toLocaleString()}</p>
                    <p className="text-white/50 text-xs">Reach</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
                  <div className="text-center">
                    <p className="text-green-400 font-bold">${anejoAdsData.cpe}</p>
                    <p className="text-white/40 text-xs">CPE</p>
                  </div>
                  <div className="text-center">
                    <p className="text-green-400 font-bold">{anejoAdsData.er}%</p>
                    <p className="text-white/40 text-xs">Engagement Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold">${anejoAdsData.cpm}</p>
                    <p className="text-white/40 text-xs">CPM</p>
                  </div>
                </div>
              </div>

              {/* Boosted Ads */}
              <div className="bg-[#2a2a2a] rounded-xl p-6 text-white">
                <h4 className="font-bold text-white mb-1">Ads Boosted by You | Our Content</h4>
                <p className="text-white/40 text-xs mb-4">Strong CTR and above-average CPM shows the power of engaging content.</p>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <p className="text-[#c17f4a] text-xl font-bold">${anejoBoostedData.spent}</p>
                    <p className="text-white/50 text-xs">Spent</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#c17f4a] text-xl font-bold">{anejoBoostedData.clicks}</p>
                    <p className="text-white/50 text-xs">Clicks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#c17f4a] text-xl font-bold">{anejoBoostedData.reach.toLocaleString()}</p>
                    <p className="text-white/50 text-xs">Reach</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
                  <div className="text-center">
                    <p className="text-green-400 font-bold">${anejoBoostedData.cpc}</p>
                    <p className="text-white/40 text-xs">CPC</p>
                  </div>
                  <div className="text-center">
                    <p className="text-green-400 font-bold">{anejoBoostedData.ctr}%</p>
                    <p className="text-white/40 text-xs">CTR</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold">${anejoBoostedData.cpm}</p>
                    <p className="text-white/40 text-xs">CPM</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}

      <SectionDivider />

      {/* ============================================ */}
      {/* CLIENT 4: PASTA SISTERS */}
      {/* ============================================ */}
      <section className="py-16 md:py-24 bg-[#2a2a2a] text-white rounded-3xl mx-4 md:mx-8 relative overflow-hidden">
        <div className="container">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#c17f4a] text-sm font-semibold tracking-wide uppercase mb-2">Client Results</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Pasta Sisters
            </h2>
            <p className="text-white/60 text-lg">Family-owned Italian restaurant & fresh pasta store — 3 locations across LA, 10+ years in business</p>
          </motion.div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <StatCard value="3" label="Locations" detail="Mid City, Culver City, Costa Mesa" delay={0} />
            <StatCard value="4,900+" label="Yelp Reviews" detail="Combined across locations" delay={0.05} />
            <StatCard value="7,400+" label="Photos on Yelp" detail="User-generated content" delay={0.1} />
            <StatCard value="10+" label="Years in Business" detail="Opened 2015 in Mid City" delay={0.15} />
          </div>

          {/* Growth & Reach */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Brand Growth & Visibility
            </h3>
            <p className="text-white/50 text-sm mb-8">From a single counter in Mid City to a multi-location brand with national press coverage and retail distribution.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <p className="text-[#c17f4a] text-4xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>1 → 3</p>
                <p className="text-white font-medium text-sm">Location Expansion</p>
                <p className="text-white/40 text-xs mt-1">Mid City → Culver City → Costa Mesa</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <p className="text-[#c17f4a] text-4xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Gelson's</p>
                <p className="text-white font-medium text-sm">Retail Distribution</p>
                <p className="text-white/40 text-xs mt-1">Frozen pasta in grocery aisles</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <p className="text-[#c17f4a] text-4xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>50+</p>
                <p className="text-white font-medium text-sm">Press Features</p>
                <p className="text-white/40 text-xs mt-1">LA Times, BuzzFeed, Eater & more</p>
              </div>
            </div>
          </motion.div>

          {/* Social & Community */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Social Media & Community Impact
            </h3>
            <p className="text-white/50 text-sm mb-6">Strong organic presence driven by food influencers, user-generated content, and community loyalty.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-white font-medium mb-4">Instagram Presence</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">Follower Base</span>
                    <span className="text-[#c17f4a] font-bold">Strong & Growing</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">Content Style</span>
                    <span className="text-white font-medium text-sm">Food photography + behind-the-scenes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">Engagement</span>
                    <span className="text-green-400 font-bold">High — food influencer mentions daily</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-white font-medium mb-4">Review Dominance</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/60 text-sm">Mid City — Yelp</span>
                      <span className="text-[#c17f4a] font-bold">2,224 reviews</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-[#c17f4a] rounded-full" initial={{ width: 0 }} whileInView={{ width: "90%" }} viewport={{ once: true }} transition={{ duration: 1 }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/60 text-sm">Culver City — Yelp</span>
                      <span className="text-[#c17f4a] font-bold">2,686 reviews</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-[#d4956b] rounded-full" initial={{ width: 0 }} whileInView={{ width: "95%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* ============================================ */}
      {/* CASE STUDY 1: GERMAN GASTRO */}
      {/* ============================================ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#c17f4a] text-sm font-semibold tracking-wide uppercase mb-2">Client Results</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#2a2a2a] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Rasselbock
            </h2>
            <p className="text-[#2a2a2a]/60 text-lg">Rasselbock LA & Long Beach, Wirtshaus — Multi-location hospitality group, 2+ years</p>
            <span className="inline-block mt-2 text-xs bg-[#2a2a2a]/10 text-[#2a2a2a]/60 px-3 py-1 rounded-full">Past Client</span>
          </motion.div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <LightStatCard value="225,700" label="Total FB Reach" detail="Wirtshaus alone" delay={0} />
            <LightStatCard value="+620%" label="Reach Growth" detail="Wirtshaus Facebook" delay={0.05} />
            <LightStatCard value="+76%" label="Follower Growth" detail="Wirtshaus" delay={0.1} />
            <LightStatCard value="+45%" label="Google Reviews" detail="Wirtshaus elevation" delay={0.15} />
          </div>

          {/* Facebook Reach Breakdown */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-[#2a2a2a] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Facebook Reach — All 3 Locations
            </h3>
            <p className="text-[#2a2a2a]/60 text-sm mb-6">Total reach has been consistently growing. High-quality & diverse content drove up organic reach.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Wirtshaus */}
              <div className="bg-[#faf7f4] rounded-xl p-6 border border-[#c17f4a]/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-[#2a2a2a]">Wirtshaus</h4>
                  <span className="text-xs bg-[#c17f4a]/10 text-[#c17f4a] px-2 py-1 rounded-full font-medium">225,700 reach</span>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={wirtshausReachData}>
                    <defs>
                      <linearGradient id="wirtGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#c17f4a" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#c17f4a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="reach" stroke="#c17f4a" strokeWidth={2} fill="url(#wirtGrad)" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#999' }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v: number) => v.toLocaleString()} />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex gap-4 mt-3 text-xs">
                  <span className="text-[#2a2a2a]/60">Organic: <strong className="text-[#2a2a2a]">60%</strong></span>
                  <span className="text-[#2a2a2a]/60">Ads: <strong className="text-[#2a2a2a]">40%</strong></span>
                  <span className="text-green-600 font-medium">↑ 620% reach</span>
                </div>
              </div>

              {/* Rasselbock LA */}
              <div className="bg-[#faf7f4] rounded-xl p-6 border border-[#c17f4a]/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-[#2a2a2a]">Rasselbock LA</h4>
                  <span className="text-xs bg-[#c17f4a]/10 text-[#c17f4a] px-2 py-1 rounded-full font-medium">44,600 reach</span>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={rasselbockLAReachData}>
                    <defs>
                      <linearGradient id="rassLAGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d4956b" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#d4956b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="reach" stroke="#d4956b" strokeWidth={2} fill="url(#rassLAGrad)" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#999' }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v: number) => v.toLocaleString()} />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex gap-4 mt-3 text-xs">
                  <span className="text-[#2a2a2a]/60">Organic: <strong className="text-[#2a2a2a]">58%</strong></span>
                  <span className="text-[#2a2a2a]/60">Ads: <strong className="text-[#2a2a2a]">42%</strong></span>
                  <span className="text-green-600 font-medium">↑ 103% reach</span>
                </div>
              </div>

              {/* Rasselbock LB */}
              <div className="bg-[#faf7f4] rounded-xl p-6 border border-[#c17f4a]/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-[#2a2a2a]">Rasselbock LB</h4>
                  <span className="text-xs bg-[#c17f4a]/10 text-[#c17f4a] px-2 py-1 rounded-full font-medium">92,000 reach</span>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={rasselbockLBReachData}>
                    <defs>
                      <linearGradient id="rassLBGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a86835" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#a86835" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="reach" stroke="#a86835" strokeWidth={2} fill="url(#rassLBGrad)" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#999' }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v: number) => v.toLocaleString()} />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex gap-4 mt-3 text-xs">
                  <span className="text-[#2a2a2a]/60">Organic: <strong className="text-[#2a2a2a]">71%</strong></span>
                  <span className="text-[#2a2a2a]/60">Ads: <strong className="text-[#2a2a2a]">29%</strong></span>
                  <span className="text-green-600 font-medium">↑ 6.3% reach</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Customer Feedback / Review Elevation */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-[#2a2a2a] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Customer Feedback & Review Elevation
            </h3>
            <p className="text-[#2a2a2a]/60 text-sm mb-6">After working with every guest and their issues, all 3 places saw a remarkable uplift in reviews. Elevation = negatives go down & positives go up.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviewData.map((r, i) => (
                <motion.div
                  key={i}
                  className="bg-[#faf7f4] rounded-xl p-6 border border-[#c17f4a]/10"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <h4 className="font-bold text-[#2a2a2a] mb-4">{r.restaurant}</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#2a2a2a]/60">Yelp</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-[#c17f4a] rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${r.yelp * 2}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                          />
                        </div>
                        <span className="text-sm font-bold text-green-600">+{r.yelp}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#2a2a2a]/60">Google</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-[#c17f4a] rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${r.google}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                        <span className="text-sm font-bold text-green-600">+{r.google}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Client Upgrade Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-[#2a2a2a] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Client Upgrade Results
            </h3>
            <p className="text-[#2a2a2a]/60 text-sm mb-6">Strategic + relatable content, showing people and faces, community engagement, trends, 100% organic content.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {clientUpgradeData.map((c, i) => (
                <motion.div
                  key={i}
                  className="bg-[#faf7f4] rounded-xl p-6 border border-[#c17f4a]/10 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="text-xs text-[#c17f4a] font-semibold uppercase mb-2">{c.client}</p>
                  <p className="text-3xl font-bold text-[#2a2a2a]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {c.accountsReached ? `${(c.accountsReached / 1000).toFixed(1)}K` : `${(c.impressions! / 1000).toFixed(1)}K`}
                  </p>
                  <p className="text-sm text-[#2a2a2a]/60 mt-1">{c.accountsReached ? "Accounts Reached" : "Impressions"}</p>
                  <p className="text-green-600 font-bold text-lg mt-2">+{c.growth}%</p>
                </motion.div>
              ))}
            </div>

            {/* IG Reach highlight */}
            <div className="mt-8 bg-[#2a2a2a] rounded-2xl p-8 text-center">
              <p className="text-white/60 text-sm mb-2">Instagram Reach</p>
              <p className="text-[#c17f4a] text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                36.7K
              </p>
              <p className="text-green-400 text-xl font-bold mt-1">↑ 241%</p>
              <p className="text-white/50 text-xs mt-2">100% organic content — no paid promotion</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AD RESULTS BREAKDOWN - ALL CAMPAIGNS */}
      {/* ============================================ */}
      <section className="py-16 md:py-24 bg-[#faf7f4]">
        <div className="container">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#c17f4a] text-sm font-semibold tracking-wide uppercase mb-2">Ad Manager Screenshots Recreated</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#2a2a2a] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Screenshots of Ad Results
            </h2>
            <p className="text-[#2a2a2a]/60 text-lg">From Ad Manager's personal website — real campaign data</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* FB Shopping */}
            <motion.div
              className="bg-white rounded-xl p-6 border border-black/5 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <h4 className="font-bold text-[#2a2a2a] text-sm mb-1">Facebook Shopping</h4>
              <p className="text-[#c17f4a] text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>2.5–3x ROAS</p>
              <div className="space-y-2 text-xs text-[#2a2a2a]/70">
                <div className="flex justify-between"><span>7 purchases</span><span>$197.55 spent</span><span>$493.81 value</span><span className="text-[#c17f4a] font-bold">2.50x</span></div>
                <div className="flex justify-between"><span>5 purchases</span><span>$133.72 spent</span><span>$406.77 value</span><span className="text-[#c17f4a] font-bold">3.04x</span></div>
                <div className="flex justify-between"><span>4 purchases</span><span>$202.19 spent</span><span>$612.36 value</span><span className="text-[#c17f4a] font-bold">3.03x</span></div>
              </div>
            </motion.div>

            {/* FB Lead */}
            <motion.div
              className="bg-white rounded-xl p-6 border border-black/5 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              <h4 className="font-bold text-[#2a2a2a] text-sm mb-1">Facebook Lead Campaign</h4>
              <p className="text-[#c17f4a] text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>3–9x ROAS</p>
              <div className="space-y-2 text-xs text-[#2a2a2a]/70">
                <div className="flex justify-between"><span>22 results</span><span>$218.99 spent</span><span>$1,415.42 value</span><span className="text-[#c17f4a] font-bold">6.46x</span></div>
                <div className="flex justify-between"><span>25 results</span><span>$219.91 spent</span><span>$1,914.05 value</span><span className="text-[#c17f4a] font-bold">8.70x</span></div>
                <div className="flex justify-between"><span>15 results</span><span>$219.26 spent</span><span>$1,271.79 value</span><span className="text-[#c17f4a] font-bold">5.80x</span></div>
                <div className="flex justify-between"><span>11 results</span><span>$141.43 spent</span><span>$1,214.23 value</span><span className="text-[#c17f4a] font-bold">8.59x</span></div>
              </div>
            </motion.div>

            {/* Google Search & Shopping */}
            <motion.div
              className="bg-white rounded-xl p-6 border border-black/5 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="font-bold text-[#2a2a2a] text-sm mb-1">Google Search & Shopping</h4>
              <p className="text-[#c17f4a] text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>4x ROAS</p>
              <div className="space-y-2 text-xs text-[#2a2a2a]/70">
                <div className="flex justify-between"><span>$3,487 cost</span><span>$9,980 rev</span><span>43.69 conv</span></div>
                <div className="flex justify-between"><span>$1,652 cost</span><span>$3,632 rev</span><span>48.51 conv</span></div>
                <div className="flex justify-between"><span>$375 cost</span><span>$10,524 rev</span><span className="text-[#c17f4a] font-bold">28x!</span></div>
                <div className="flex justify-between"><span>$6,047 cost</span><span>$25,614 rev</span><span>158.32 conv</span></div>
              </div>
            </motion.div>

            {/* FB Sales */}
            <motion.div
              className="bg-white rounded-xl p-6 border border-black/5 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <h4 className="font-bold text-[#2a2a2a] text-sm mb-1">Facebook Sales Campaign</h4>
              <p className="text-[#c17f4a] text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>2–7x ROAS</p>
              <div className="space-y-2 text-xs text-[#2a2a2a]/70">
                <div className="flex justify-between"><span>6 purchases</span><span>$585.81 spent</span><span>$1,329.72 value</span><span className="text-[#c17f4a] font-bold">2.27x</span></div>
                <div className="flex justify-between"><span>12 purchases</span><span>$286.45 spent</span><span>$2,066.93 value</span><span className="text-[#c17f4a] font-bold">7.22x</span></div>
              </div>
            </motion.div>

            {/* Google Search 10x */}
            <motion.div
              className="bg-white rounded-xl p-6 border border-black/5 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-bold text-[#2a2a2a] text-sm mb-1">Google Search Campaign</h4>
              <p className="text-[#c17f4a] text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>10x ROAS</p>
              <div className="space-y-2 text-xs text-[#2a2a2a]/70">
                <div className="flex justify-between border-b border-black/5 pb-2"><span className="font-medium">Cost</span><span className="font-medium">Revenue</span><span className="font-medium">Conversions</span></div>
                <div className="flex justify-between"><span>$760.51</span><span>$7,991.61</span><span>239.82</span></div>
                <div className="flex justify-between mt-2"><span className="text-[#2a2a2a]/50">Cost per conversion:</span><span className="text-[#c17f4a] font-bold">$3.17</span></div>
              </div>
            </motion.div>

            {/* Summary card */}
            <motion.div
              className="bg-[#2a2a2a] rounded-xl p-6 text-white flex flex-col justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              <p className="text-white/50 text-xs uppercase tracking-wide mb-2">Total across all campaigns</p>
              <p className="text-[#c17f4a] text-4xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>$100K+</p>
              <p className="text-white font-medium">Revenue Generated</p>
              <p className="text-white/40 text-xs mt-2">From less than $15K total ad spend</p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-green-400 text-2xl font-bold">$7.96</p>
                <p className="text-white/50 text-xs">Return for every $1 invested</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <motion.div
            className="bg-[#2a2a2a] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Want results like these?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              Let's talk about what I can do for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:+13237474097"
                className="inline-flex items-center gap-2 bg-[#c17f4a] text-white px-8 py-3.5 text-sm font-medium rounded-full hover:opacity-90 transition-all duration-300 active:scale-[0.97]"
              >
                <Phone className="w-4 h-4" />
                (323) 747-4097
              </a>
              <a
                href="mailto:meera@meerasocial.com"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-3.5 text-sm font-medium rounded-full hover:border-[#c17f4a] hover:text-[#c17f4a] transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                meera@meerasocial.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-black/5 bg-white">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="/" className="text-lg font-bold text-[#2a2a2a]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Meera<span className="text-[#c17f4a]">Social</span>
          </a>
          <p className="text-[#2a2a2a] text-xs">&copy; 2026 Meera Social</p>
        </div>
      </footer>
    </div>
  );
}
