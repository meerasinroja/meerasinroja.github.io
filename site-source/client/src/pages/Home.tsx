/**
 * Meera Social Landing Page
 * Content sourced from websiteoldcontent.docx
 * Graphics splattered across sections for visual pop.
 */

import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Code, FileText, Heart, MessageCircle, Phone, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MEERA_PHOTO = "/manus-storage/file_000000003b6471f5be9d45f22c8c7a1b_105cf7e4.jpeg";
const MEERA_CLOSE = "";

// Graphics
const GRAPHIC_BLOB = "/graphics/graphic-hero-blob-hBViFRFtdpcBZhoXtptd2Q.webp";
const GRAPHIC_DOTS = "/graphics/graphic-dots-pattern-S8YXP5tcj5hufc6yMhDNH8.webp";
const GRAPHIC_WAVES = "/graphics/graphic-wavy-lines-FA8gCyfN7hUwnVBDxkWPQq.webp";
const GRAPHIC_RING = "/graphics/graphic-circle-ring-5ug6WmQtEbHZq7z9zNXfsT.webp";
const GRAPHIC_SHAPES = "/graphics/graphic-abstract-shapes-B5jD3ShdsNXG3ma6JHiYEa.webp";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
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
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf9f7] overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f7]/90 backdrop-blur-sm border-b border-black/5">
        <div className="container flex items-center justify-between h-16">
          <a href="#" className="text-xl font-bold text-[#2a2a2a] tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Meera<span className="text-[#c17f4a]">Social</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-[#2a2a2a] font-medium">
            <a href="#what-i-do" className="hover:text-[#c17f4a] transition-colors">What I Do</a>
            <a href="#results" className="hover:text-[#c17f4a] transition-colors">Results</a>
            <a href="#about" className="hover:text-[#c17f4a] transition-colors">About</a>
            <a href="#contact" className="hover:text-[#c17f4a] transition-colors">Contact</a>
          </div>
          <a
            href="#contact"
            className="bg-[#2a2a2a] text-white px-5 py-2 text-sm rounded-full hover:bg-[#c17f4a] transition-colors duration-300"
          >
            Contact Me
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 relative">
        {/* Decorative blob - top right */}
        <img
          src={GRAPHIC_BLOB}
          alt=""
          className="absolute top-16 right-0 w-48 md:w-72 opacity-20 pointer-events-none select-none"
          aria-hidden="true"
        />
        {/* Decorative dots - bottom left */}
        <img
          src={GRAPHIC_DOTS}
          alt=""
          className="absolute bottom-0 left-0 w-40 md:w-56 opacity-15 pointer-events-none select-none"
          aria-hidden="true"
        />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="text-[#c17f4a] text-sm font-medium mb-4">Social Media & Facebook Ads</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2a2a2a] leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                I help businesses
                <br />
                <span className="text-[#c17f4a]">connect with customers.</span>
              </h1>
              <p className="text-[#2a2a2a] text-lg max-w-md leading-relaxed mb-8">
                I manage your social media and run your Facebook ads so your customers can find you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#c17f4a] text-white px-7 py-3.5 text-sm font-medium rounded-full hover:opacity-90 transition-all duration-300 active:scale-[0.97] group"
                >
                  Contact Me
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#results"
                  className="inline-flex items-center justify-center gap-2 border border-[#2a2a2a]/15 text-[#2a2a2a] px-7 py-3.5 text-sm font-medium rounded-full hover:border-[#c17f4a] hover:text-[#c17f4a] transition-all duration-300"
                >
                  See My Work
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center relative"
            >
              {/* Ring graphic behind photo */}
              <img
                src={GRAPHIC_RING}
                alt=""
                className="absolute -top-8 -right-8 w-64 md:w-80 opacity-25 pointer-events-none select-none"
                aria-hidden="true"
              />
              <img
                src={MEERA_PHOTO}
                alt="Meera Sinroja"
                className="w-full max-w-md h-[500px] rounded-2xl shadow-lg object-cover object-top relative z-10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 border-y border-black/5 relative">
        <div className="container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: 7, suffix: "+", label: "Years of experience" },
              { number: 100, suffix: "K+", label: "Revenue optimised" },
              { number: 5, suffix: "M+", label: "People reached" },
              { number: 73, suffix: "%", label: "Repeat customers" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <p className="text-3xl md:text-4xl font-bold text-[#c17f4a]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </p>
                <p className="text-[#2a2a2a] text-sm font-medium mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What I Do — Card grid with graphics */}
      <section id="what-i-do" className="py-16 md:py-24 relative">
        {/* Waves graphic - right side */}
        <img
          src={GRAPHIC_WAVES}
          alt=""
          className="absolute top-12 right-0 w-64 md:w-96 opacity-10 pointer-events-none select-none"
          aria-hidden="true"
        />
        {/* Blob graphic - bottom left */}
        <img
          src={GRAPHIC_BLOB}
          alt=""
          className="absolute bottom-8 left-0 w-36 md:w-52 opacity-10 rotate-45 pointer-events-none select-none"
          aria-hidden="true"
        />

        <div className="container relative z-10">
          <div className="max-w-xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2a2a] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              What I do for you
            </h2>
            <p className="text-[#2a2a2a] text-lg">
              Reliable. Consistent. A presence that keeps your business growing. Specializing in long-term client retention and satisfaction for 7 years.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Heart className="w-5 h-5" />,
                title: "Social Media & Content Creation",
                desc: "I create content that connects with your audience and post consistently so you stay top of mind. Photos, graphics, captions, stories — all handled."
              },
              {
                icon: <BarChart3 className="w-5 h-5" />,
                title: "Facebook & Instagram Ads",
                desc: "I create and run ads that put your business in front of the right people. More eyes on you means more calls, more bookings, more sales."
              },
              {
                icon: <MessageCircle className="w-5 h-5" />,
                title: "Reputation Management",
                desc: "I manage your online reputation so you get more positive reviews. More trust from new customers before they even pick up the phone."
              },
              {
                icon: <Code className="w-5 h-5" />,
                title: "Websites & Apps",
                desc: "I build clean, professional websites and custom apps that make your business look great and help streamline your operations."
              },
              {
                icon: <FileText className="w-5 h-5" />,
                title: "Business Analysis",
                desc: "Customer intelligence reports and SWOT analysis — I show you exactly where your strengths and weaknesses are so you can make smarter decisions."
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-xl border border-black/5 hover:border-[#c17f4a]/30 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-[#c17f4a]/10 text-[#c17f4a] rounded-lg mb-4">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-[#2a2a2a] mb-2">{service.title}</h3>
                <p className="text-[#2a2a2a] text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results — Rounded dark section with graphics */}
      <section id="results" className="py-16 md:py-24 bg-[#2a2a2a] text-white rounded-3xl mx-4 md:mx-8 relative overflow-hidden">
        {/* Abstract shapes graphic - background */}
        <img
          src={GRAPHIC_SHAPES}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.04] pointer-events-none select-none"
          aria-hidden="true"
        />
        {/* Ring graphic - top right */}
        <img
          src={GRAPHIC_RING}
          alt=""
          className="absolute -top-16 -right-16 w-56 md:w-72 opacity-15 pointer-events-none select-none"
          aria-hidden="true"
        />

        <div className="container relative z-10">
          <p className="text-[#c17f4a] text-sm font-medium mb-3">Real results</p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Full-funnel impact.
          </h2>
          <p className="text-white/70 text-base mb-10 max-w-xl">
            This is what happens when I step into a brand's content, customer voice, and digital presence — not to make it louder, but to make it stickier.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { stat: "28x", label: "Best ROAS", detail: "$375 spend → $10,524 revenue" },
              { stat: "762%", label: "ROI", detail: "$2,564 spend → $19,560 revenue" },
              { stat: "620%", label: "Facebook reach growth", detail: "Across multiple clients" },
              { stat: "5,800%", label: "Instagram follower growth", detail: "Portfolio-wide increase" },
              { stat: "73%", label: "Repeat order rate", detail: "Highest client retention" },
              { stat: "45%", label: "More Google reviews", detail: "For one client alone" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-5"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <p className="text-[#c17f4a] font-bold text-2xl mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{item.stat}</p>
                <p className="text-white font-medium text-sm mb-1">{item.label}</p>
                <p className="text-white/50 text-xs">{item.detail}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-8">
            {[
              { label: "Organic reach", value: "5M+" },
              { label: "Ad revenue generated", value: "$100K+" },
              { label: "Ad spend (total)", value: "<$15K" },
              { label: "Repeat order rates", value: "21–73%" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <p className="text-[#c17f4a] font-bold text-xl">{item.value}</p>
                <p className="text-white/60 text-xs mt-1">{item.label}</p>
              </motion.div>
            ))}
          </div>

          {/* LOUD CTA */}
          <div className="text-center mt-14">
            <a
              href="/results"
              className="group relative inline-flex items-center gap-3 bg-[#c17f4a] text-white px-12 py-5 text-lg md:text-xl font-bold rounded-full hover:bg-[#d4944f] hover:scale-105 transition-all duration-300 active:scale-[0.97] shadow-[0_8px_30px_rgba(193,127,74,0.4)] hover:shadow-[0_12px_40px_rgba(193,127,74,0.6)]"
            >
              SEE THE PROOF <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-white/50 text-sm mt-3">Charts. Numbers. Real results.</p>
          </div>

        </div>
      </section>

      {/* Testimonial with graphic */}
      <section className="py-16 md:py-24 bg-white relative">
        {/* Dots graphic - left */}
        <img
          src={GRAPHIC_DOTS}
          alt=""
          className="absolute top-8 left-0 w-32 md:w-44 opacity-10 pointer-events-none select-none"
          aria-hidden="true"
        />

        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[#c17f4a] text-sm font-medium mb-6">What clients say</p>
            <blockquote className="text-xl md:text-2xl text-[#2a2a2a] leading-relaxed mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              "It was a pleasure working together over the years, and I always appreciated Team Meera Social's creativity, responsiveness, and strategic input. They really helped elevate our social presence in a meaningful way!"
            </blockquote>
            <div>
              <p className="font-bold text-[#2a2a2a]">Ben Yildrim</p>
              <p className="text-[#2a2a2a] text-sm">Owner, German Gastro — Multi-location hospitality group, LA</p>
            </div>
          </div>
        </div>
      </section>

      {/* About with graphics */}
      <section id="about" className="py-16 md:py-24 relative">
        {/* Waves graphic - behind the about section */}
        <img
          src={GRAPHIC_WAVES}
          alt=""
          className="absolute bottom-12 left-0 w-72 md:w-[28rem] opacity-8 pointer-events-none select-none"
          aria-hidden="true"
        />
        {/* Ring graphic - top right corner */}
        <img
          src={GRAPHIC_RING}
          alt=""
          className="absolute top-0 right-8 w-28 md:w-40 opacity-10 pointer-events-none select-none"
          aria-hidden="true"
        />

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#2a2a2a] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Hey, I'm Meera.
              </h2>
              <p className="text-[#2a2a2a] text-lg leading-relaxed mb-4">
                I've been helping businesses grow their social media presence for over 7 years. I step into your brand and become part of your team — handling your content, your ads, your online reputation, and your customer insights.
              </p>
              <p className="text-[#2a2a2a] text-lg leading-relaxed mb-6">
                I'm all about long-term relationships. Most of my clients have been with me for years because I treat their business like my own.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[#c17f4a] font-medium hover:underline"
              >
                Get in touch <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact with graphic accents */}
      <section id="contact" className="py-16 md:py-24 relative">
        {/* Abstract shapes - subtle background */}
        <img
          src={GRAPHIC_SHAPES}
          alt=""
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl opacity-[0.03] pointer-events-none select-none"
          aria-hidden="true"
        />

        <div className="container relative z-10">
          <div className="bg-[#c17f4a]/5 border border-[#c17f4a]/20 rounded-2xl p-10 md:p-16 text-center max-w-3xl mx-auto relative overflow-hidden">
            {/* Dots accent inside the contact box */}
            <img
              src={GRAPHIC_DOTS}
              alt=""
              className="absolute -top-8 -right-8 w-32 opacity-10 pointer-events-none select-none"
              aria-hidden="true"
            />

            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2a2a] mb-4 relative z-10" style={{ fontFamily: "'Playfair Display', serif" }}>
              Let's talk about your business.
            </h2>
            <p className="text-[#2a2a2a] text-lg mb-8 max-w-md mx-auto relative z-10">
              Tell me what you're working on and I'll show you how I can help.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 relative z-10">
              <a
                href="tel:+13237474097"
                className="inline-flex items-center gap-2 bg-[#c17f4a] text-white px-8 py-3.5 text-sm font-medium rounded-full hover:opacity-90 transition-all duration-300 active:scale-[0.97]"
              >
                <Phone className="w-4 h-4" />
                (323) 747-4097
              </a>
              <a
                href="mailto:meera@meerasocial.com"
                className="inline-flex items-center gap-2 border border-[#2a2a2a]/15 text-[#2a2a2a] px-8 py-3.5 text-sm font-medium rounded-full hover:border-[#c17f4a] hover:text-[#c17f4a] transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                meera@meerasocial.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-black/5">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#" className="text-lg font-bold text-[#2a2a2a]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Meera<span className="text-[#c17f4a]">Social</span>
          </a>
          <div className="flex items-center gap-4 text-sm text-[#2a2a2a] font-medium">
            <a href="tel:+13237474097" className="hover:text-[#c17f4a] transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3" /> (323) 747-4097
            </a>
            <a href="mailto:meera@meerasocial.com" className="hover:text-[#c17f4a] transition-colors flex items-center gap-1">
              <Mail className="w-3 h-3" /> meera@meerasocial.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="text-[#2a2a2a]/50 text-xs hover:text-[#c17f4a] transition-colors">Privacy & Terms</a>
            <p className="text-[#2a2a2a] text-xs">&copy; 2026 Meera Social</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
