import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Trash2, Building2, Wrench, Route, Users, CheckCircle, Clock, Heart, Leaf, Sun, ShieldCheck, Sparkles, MapPin, DollarSign, ChevronDown, MessageCircle, Star, Quote } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import IssueCard from '../components/ui/IssueCard';
import IssueCardSkeleton from '../components/ui/IssueCardSkeleton';
import image2 from '../assets/img2.png';
import logo from '../assets/img.png';  

const FloatingElement = ({ children, delay = 0, className = "" }) => (
  <Motion.div
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
    className={`absolute pointer-events-none ${className}`}
  >
    {children}
  </Motion.div>
);

export default function Home() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    document.title = 'Home | EcoFine - Community Restoration';
  }, []);

  const bannerSlides = [
    {
      title: "Clean Rivers, Greener Shores.",
      description: "Join our 2025 initiative targeting urban waterways and industrial waste zones.",
      image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=1600&h=800&fit=crop",
      link: "/issues"
    },
    {
      title: "Urban Reforestation.",
      description: "Help us restore 5,000 acres of local green cover by 2026. Every tree counts.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&h=800&fit=crop",
      link: "/add-issue"
    },
    {
      title: "Renewable Energy Support.",
      description: "Switching to solar isn't just for homes. Report community centers that need green power.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&h=800&fit=crop",
      link: "/issues"
    },
    {
      title: "Ocean Plastic Recovery.",
      description: "Support our deep-sea cleanup teams and floating waste containment systems.",
      image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=1600&h=800&fit=crop",
      link: "/issues"
    },
    {
      title: "Green Industrial Hubs.",
      description: "Working with local factories to reduce carbon output and transition to circular waste.",
      image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1600&h=800&fit=crop",
      link: "/issues"
    },
    {
      title: "Wildlife Habitat Corridors.",
      description: "Mapping and protecting migratory paths for local endangered species.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&h=800&fit=crop",
      link: "/issues"
    },
    {
      title: "Community Compost.",
      description: "Reducing landfill waste through neighborhood-led organic recycling programs.",
      image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=1600&h=800&fit=crop",
      link: "/issues"
    },
    {
      title: "Clean Air Monitoring.",
      description: "Installing low-cost sensor networks to track and reduce urban smog levels.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&h=800&fit=crop",
      link: "/issues"
    }
  ];

  useEffect(() => {
    const fetchLatestIssues = async () => {
      try {
        const { data } = await axiosSecure.get('/issues/recent');
        const list = Array.isArray(data) ? data : (data.result || []);
        setIssues(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestIssues();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSeeDetails = (issue) => {
    const id = issue._id || issue.id;
    navigate(`/issue-details/${id}`);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">

      {/* Hero Carousel Slider */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <Motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 active:scale-100 transition-transform duration-10000"
              style={{ backgroundImage: `url(${bannerSlides[currentSlide].image})` }}
            >
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
              <Motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="max-w-3xl"
              >
                <span className="text-primary font-black uppercase tracking-[0.3em] text-sm mb-6 block border-l-4 border-primary pl-4">
                  EcoFine Protection
                </span>
                <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
                  {bannerSlides[currentSlide].title}
                </h1>
                <p className="text-white/70 text-xl md:text-2xl mb-12 leading-relaxed max-w-2xl font-medium">
                  {bannerSlides[currentSlide].description}
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  <Button
                    onClick={() => navigate(bannerSlides[currentSlide].link)}
                    className="bg-primary text-white border-none rounded-2xl px-12 py-6 text-lg font-black uppercase tracking-widest shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all"
                  >
                    Take Action Now <ArrowRight size={24} className="ml-3" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-black hover:text-black rounded-2xl px-12 py-6 text-lg font-black uppercase tracking-widest transition-all"
                  >
                    Learn More
                  </Button>
                </div>
              </Motion.div>
            </div>
          </Motion.div>
        </AnimatePresence>

        {/* Navigation Arrows - fixed on right side */}
        <div className="absolute right-12 bottom-24 z-20 flex gap-4">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)}
            className="w-10 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)}
            className="w-10 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Indicator Dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
          {bannerSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`transition-all duration-500 rounded-full h-3 ${i === currentSlide ? 'w-12 bg-primary' : 'w-3 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* Top Logo Banner - Moved & Refined */}
      {/* Trusted Partnerships Section */}
      <section className="py-16 bg-[var(--bg-surface)] border-y border-[var(--border-color)] overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
          <p className="text-sm font-black text-[var(--text-secondary)] uppercase tracking-widest opacity-70">Trusted by Global Partners</p>
        </div>

        <div className="flex relative items-center">
          {/* Fading Gradient Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg-surface)] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg-surface)] to-transparent z-10"></div>

          <Motion.div
            className="flex gap-16 items-center whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Umbraco_logo.svg/2560px-Umbraco_logo.svg.png" alt="Umbraco" className="h-8 grayscale hover:grayscale-0 transition-all" />
                </div>
                <div className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-3xl font-black text-[var(--text-primary)]">Pearlfisher.</span>
                </div>
                <div className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="w-8 h-8 rounded-full border-2 border-[var(--text-primary)] flex items-center justify-center">
                    <div className="w-4 h-4 bg-[var(--text-primary)] rounded-full"></div>
                  </div>
                  <span className="text-2xl font-bold text-[var(--text-primary)]">Planday</span>
                </div>
                <div className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-3xl font-black text-[var(--text-primary)] tracking-tighter">BrightGreen</span>
                </div>
                <div className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="h-8 w-8 bg-black rounded-lg transform rotate-45"></div>
                  <span className="text-2xl font-bold text-[var(--text-primary)]">NextLayer</span>
                </div>

                <div className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-3xl font-black text-[var(--text-primary)]">Pearlfisher.</span>
                </div>
                <div className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="w-8 h-8 rounded-full border-2 border-[var(--text-primary)] flex items-center justify-center">
                    <div className="w-4 h-4 bg-[var(--text-primary)] rounded-full"></div>
                  </div>
                  <span className="text-2xl font-bold text-[var(--text-primary)]">Planday</span>
                </div>
                <div className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-3xl font-black text-[var(--text-primary)] tracking-tighter">BrightGreen</span>
                </div>
                <div className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="h-8 w-8 bg-black rounded-lg transform rotate-45"></div>
                  <span className="text-2xl font-bold text-[var(--text-primary)]">NextLayer</span>
                </div>
              </React.Fragment>
            ))}
          </Motion.div>
        </div>
      </section>

      {/* Environmental Awareness Section (Restored & Greenly) */}
      <section className="py-24 bg-green-50/50 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse gap-16 items-center">
          <Motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <span className="text-primary font-black uppercase tracking-widest text-xs mb-4 block">The Urgency</span>
            <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] mb-8 leading-[1.1] tracking-tight">
              Our planet can't wait for "someday"
            </h2>
            <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
              Every year, millions of tons of waste enter our oceans, and urban green spaces are disappearing at an alarming rate. EcoFine was born from the belief that community-led action is the fastest way to reverse this trend.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "8M Tons", desc: "Plastic in oceans annually", icon: Leaf },
                { title: "27%", desc: "Forest loss since 2000", icon: Sun }
              ].map((stat, i) => (
                <div key={i} className="flex gap-4 p-6 bg-[var(--bg-card)] rounded-3xl shadow-sm border border-[var(--border-color)] transform hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-xl text-primary">{stat.title}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Motion.div>
          <Motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="rounded-[4rem] overflow-hidden shadow-2xl relative z-10 border-8 border-[var(--bg-card)]">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=1000&fit=crop"
                alt="Environmental Urgency"
                className="w-full h-full object-cover aspect-[4/5]"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary rounded-full flex flex-col items-center justify-center text-white p-6 text-center z-20 shadow-2xl rotate-12 border-4 border-[var(--bg-card)]">
              <span className="text-3xl font-black">ACT</span>
              <span className="text-xs font-bold uppercase tracking-widest">NOW</span>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Who We Are (Hero Intro) */}
      <section className="py-24 px-6 bg-[var(--bg-page)] relative overflow-hidden">
        {/* Floating Background Decorations */}
        <FloatingElement className="top-20 left-10 text-primary/20" delay={0}>
          <Leaf size={120} />
        </FloatingElement>
        <FloatingElement className="bottom-20 right-20 text-green-200/30" delay={2}>
          <Sparkles size={80} />
        </FloatingElement>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <Motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <span className="text-primary font-black uppercase tracking-widest text-xs mb-4 block">Who We Are</span>
            <h1 className="text-5xl md:text-7xl font-black text-[var(--text-primary)] mb-8 leading-[1.1] tracking-tight">
              Caring for the Earth one project at a time
            </h1>
            <p className="text-[var(--text-secondary)] text-lg mb-12 max-w-lg leading-relaxed">
              One project at a time, we can all make a positive impact on the health and sustainability of our planet. It is good for the environment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-[var(--bg-card)] rounded-full flex items-center justify-center shadow-lg text-primary shrink-0 border border-[var(--border-color)]">
                  <Sparkles size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-black mb-2">Sustain Solutions</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Ecologists use a variety of methods, such as field observations</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg text-primary shrink-0 border border-green-50">
                  <Building2 size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-black mb-2">Residential model</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Variety of methods, such as field observations, experiments</p>
                </div>
              </div>
            </div>
          </Motion.div>

          <Motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=800&fit=crop"
                alt="Environmental Care"
                className="w-full h-full object-cover aspect-square"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
            </div>
            {/* Abstract Shape Overlay */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-green-200/20 rounded-full blur-3xl -z-10"></div>
          </Motion.div>
        </div>
      </section>

      {/* Our Impact Section (New) */}
      <section className="py-24 bg-[var(--bg-page)] px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-6 relative z-10">
              <div className="bg-primary/5 p-10 rounded-[3rem] text-center border border-primary/10">
                <Users size={48} className="text-primary mx-auto mb-4" />
                <h4 className="text-4xl font-black text-primary mb-2">4.2k+</h4>
                <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Active Volunteers</p>
              </div>
              <div className="bg-[var(--bg-surface)] p-10 rounded-[3rem] text-center mt-12 border border-[var(--border-color)]">
                <Leaf size={48} className="text-primary mx-auto mb-4" />
                <h4 className="text-4xl font-black text-primary mb-2">150+</h4>
                <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Restored Sites</p>
              </div>
              <div className="bg-[var(--bg-surface)] p-10 rounded-[3rem] text-center -mt-12 border border-[var(--border-color)]">
                <Clock size={48} className="text-primary mx-auto mb-4" />
                <h4 className="text-4xl font-black text-primary mb-2">24/7</h4>
                <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Rapid Response</p>
              </div>
              <div className="bg-primary/5 p-10 rounded-[3rem] text-center border border-primary/10">
                <DollarSign size={48} className="text-primary mx-auto mb-4" />
                <h4 className="text-4xl font-black text-primary mb-2">$85k</h4>
                <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Funds Dispersed</p>
              </div>
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[150px] rounded-full"></div>
          </div>

          <div>
            <span className="text-primary font-black uppercase tracking-widest text-xs mb-4 block">Our Impact</span>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-8 tracking-tight">
              Driving real change across the community
            </h2>
            <p className="text-[var(--text-secondary)] text-lg mb-10 leading-relaxed">
              We empower citizens to take direct action. From reporting minor issues to funding large-scale restoration projects, EcoFine provides the tools for environmental accountability.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "100% Transparency in funding allocation",
                "Direct connection to local restoration teams",
                "Real-time GPS tracking for report verification",
                "Verified community-led impact reports"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-bold text-sm">
                  <CheckCircle size={20} className="text-primary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button className="bg-primary text-white border-none rounded-lg px-10 py-4 font-bold">
              Download Impact Report 2024
            </Button>
          </div>
        </div>
      </section>



      {/* Restoration Success Story (Restored) */}
      <section className="py-24 bg-primary text-white px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <span className="text-white/60 font-black uppercase tracking-widest text-xs mb-4 block">Success Story</span>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                From Waste Site to Urban Oasis
              </h2>
              <p className="text-white/80 text-lg mb-10 leading-relaxed font-medium">
                In early 2023, the community reported the "Zone 7" industrial dumping ground. Through EcoFine, $12,000 was raised in just two weeks, funding a complete cleanup and reforestation effort.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20">
                  <h4 className="text-3xl font-black text-white mb-1">2.4 Tons</h4>
                  <p className="text-xs uppercase font-black text-white/60 tracking-widest">Debris Removed</p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20">
                  <h4 className="text-3xl font-black text-white mb-1">450+</h4>
                  <p className="text-xs uppercase font-black text-white/60 tracking-widest">Native Trees Planted</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/20">
                <img src="https://images.unsplash.com/photo-1526951521990-620dc14c214b?w=400&h=600&fit=crop" alt="Before" className="w-full h-64 md:h-80 object-cover" />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Before</div>
              </div>
              <div className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl translate-y-8 border-4 border-white/20">
                <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop" alt="After" className="w-full h-64 md:h-80 object-cover" />
                <div className="absolute top-4 left-4 bg-white text-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">After</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Project Section */}
      <section className="py-24 bg-[var(--bg-page)] px-6 relative overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-xl">
              <span className="text-primary font-black uppercase tracking-widest text-xs mb-4 block">Latest Project</span>
              <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight">
                Green thinking for better world
              </h2>
            </div>
            <Button className="bg-primary text-white border-none rounded-lg px-8 py-4 font-bold flex items-center gap-2">
              Our Latest Project <ArrowRight size={18} />
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-64 shrink-0">
              <div className="space-y-3">
                {['All Projects', 'Ecosystem', 'Recycling'].map((cat, i) => (
                  <button
                    key={cat}
                    className={`w-full text-left px-6 py-4 rounded-xl font-bold transition-all ${i === 0 ? 'bg-primary text-white shadow-lg shadow-green-500/20' : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] border border-[var(--border-color)]'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => <IssueCardSkeleton key={i} />)}
                </div>
              ) : issues.length === 0 ? (
                <div className="text-center py-20 bg-[var(--bg-surface)]/30 rounded-[3rem] border border-[var(--border-color)]">
                  <p className="text-[var(--text-muted)] font-black uppercase tracking-widest text-[10px]">Waiting for new reports</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {issues.slice(0, 3).map(issue => (
                    <IssueCard key={issue._id || issue.id} issue={issue} onSeeDetails={handleSeeDetails} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4 Step Process Section */}
      <section className="py-24 bg-[var(--bg-page)] relative overflow-hidden">
        <FloatingElement className="top-1/4 left-0 text-primary/5" delay={3}>
          <Wrench size={200} />
        </FloatingElement>
        <FloatingElement className="bottom-1/4 right-0 text-primary/5" delay={1}>
          <Route size={200} />
        </FloatingElement>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="mb-16">
            <span className="text-primary font-black uppercase tracking-widest text-xs mb-4 block">4 Step Process</span>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight max-w-2xl mx-auto leading-tight">
              Go Green And Reduce Your Carbon Footprint
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {/* Connectors (CSS based or SVG) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full -translate-y-1/2 z-0">
              <div className="flex justify-around items-center h-full px-32">
                <ArrowRight className="text-green-200" size={48} />
                <ArrowRight className="text-green-200" size={48} />
                <ArrowRight className="text-green-200" size={48} />
              </div>
            </div>

            {[
              { id: '01', title: 'Sustain Solutions', icon: Sparkles },
              { id: '02', title: 'Renewable Energy', icon: Sun },
              { id: '03', title: 'Green Building', icon: Building2 },
              { id: '04', title: 'Sustainable', icon: Leaf }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <div className="w-32 h-32 bg-[var(--bg-card)] rounded-full flex items-center justify-center shadow-xl mb-8 group hover:bg-primary transition-all duration-500 relative ring-8 ring-[var(--bg-surface)] border border-[var(--border-color)]">
                  <div className="absolute -top-2 -left-2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-black text-sm shadow-lg">
                    {step.id}
                  </div>
                  <step.icon size={48} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-black text-[var(--text-primary)] tracking-tight">{step.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Fundraising Causes Section */}
      <section className="py-24 bg-[var(--bg-page)] px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <span className="text-primary font-black uppercase tracking-widest text-xs mb-4 block">Open Donation</span>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            Fundraising Causes
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[
            {
              title: 'Save Donate for Ecofine forest house',
              desc: 'Despite applying for three times and even hiring a lawyer to assist with the process...',
              goal: 500,
              raised: 250,
              img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop'
            },
            {
              title: 'Start Event for tour and collect...',
              desc: 'Despite applying for three times and even hiring a lawyer to assist with the process...',
              goal: 500,
              raised: 250,
              img: image2
            }
          ].map((cause, i) => (
            <div key={i} className="bg-[var(--bg-card)] rounded-[3rem] p-4 flex flex-col md:flex-row gap-8 shadow-sm hover:shadow-xl transition-all group overflow-hidden border border-[var(--border-color)]">
              <div className="md:w-1/2 h-64 md:h-auto rounded-[2.5rem] overflow-hidden">
                <img src={cause.img} alt={cause.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="md:w-1/2 flex flex-col justify-center pr-8 py-4">
                <h3 className="text-xl font-black mb-4 line-clamp-2">{cause.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] mb-8 line-clamp-2 leading-relaxed">{cause.desc}</p>

                <div className="mb-8">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-primary mb-2">
                    <span>Goal ${cause.goal}</span>
                    <span>Rise ${cause.raised}</span>
                  </div>
                  <div className="h-2 bg-[var(--bg-surface)] rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${(cause.raised / cause.goal) * 100}%` }}></div>
                  </div>
                </div>

                <Button className="w-full bg-primary text-white border-none rounded-lg font-black uppercase tracking-widest text-xs py-4">
                  Donate Now
                </Button>
              </div>
            </div>
          ))}
        </div>


      </section>

      {/* Testimonials Section (New) */}
      <section className="py-24 bg-[var(--bg-page)] px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-primary font-black uppercase tracking-widest text-xs mb-4 block">Our Reviews</span>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-4 tracking-tight">What our community says</h2>
            <p className="text-[var(--text-secondary)] text-sm font-bold opacity-60">Real stories from real people making a difference</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Robert Fox", role: "Contributor", text: "The transparency of EcoFine is unmatched. I can see exactly where my contributions are going and the real-world impact they make.", avatar: "https://i.pravatar.cc/150?u=robert" },
              { name: "Eleanor Pena", role: "Volunteer", text: "Finally, a platform that makes environmental activism accessible. Reporting issues is as simple as taking a photo.", avatar: "https://i.pravatar.cc/150?u=eleanor" },
              { name: "Guy Hawkins", role: "Citizen Reporter", text: "Reported a waste spill last week and it was already resolved by the community team today! Outstanding speed.", avatar: "https://i.pravatar.cc/150?u=guy" }
            ].map((rev, i) => (
              <div key={i} className="bg-[var(--bg-surface)]/30 p-12 rounded-[3.5rem] border border-[var(--border-color)] relative group hover:bg-[var(--bg-card)] hover:shadow-2xl transition-all duration-500">
                <div className="flex gap-1 text-primary mb-8">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                </div>
                <p className="text-[var(--text-primary)] font-bold italic mb-10 leading-relaxed text-lg">"{rev.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={rev.avatar} className="w-14 h-14 rounded-full border-4 border-[var(--bg-card)] shadow-xl" alt={rev.name} />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white border-2 border-[var(--bg-card)]">
                      <MessageCircle size={10} fill="currentColor" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-black text-base">{rev.name}</h5>
                    <span className="text-[10px] uppercase font-black text-primary tracking-widest">{rev.role}</span>
                  </div>
                </div>
                <Quote className="absolute top-10 right-10 text-primary/5 group-hover:text-primary/10 transition-colors" size={64} />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-green-50/50 to-transparent -z-10"></div>
      </section>

      {/* Helpful FAQ Section (New) */}
      <section className="py-24 bg-[var(--bg-page)] px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-black uppercase tracking-widest text-xs mb-4 block">Common Questions</span>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)]">Helpful FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "How do I report an issue?", a: "You can report an issue by navigating to the 'Add Issue' page, providing a title, description, and photo of the site." },
              { q: "Where does my contribution go?", a: "100% of your contributions go directly to the materials and manpower required for the specific restoration project you fund." },
              { q: "How can I become a volunteer?", a: "Register for an account and mark your interest in volunteering in your profile. You'll receive alerts for local cleanup events." },
              { q: "Is EcoFine non-profit?", a: "Yes, EcoFine is a community-driven platform dedicated solely to environmental restoration and transparency." }
            ].map((faq, i) => (
              <div key={i} className="bg-[var(--bg-card)] rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-sm theme-transition">
                <button className="w-full flex justify-between items-center p-6 text-left hover:bg-[var(--bg-surface)] transition-colors">
                  <span className="font-black text-sm">{faq.q}</span>
                  <ChevronDown size={20} className="text-primary" />
                </button>
                <div className="px-6 pb-6 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Latest Blog Section */}
      <section className="py-24 bg-[var(--bg-page)] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-xl">
              <span className="text-primary font-black uppercase tracking-widest text-xs mb-4 block">Our Latest Blog</span>
              <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight">
                Let's checkout our all latest news
              </h2>
            </div>
            <Button className="bg-primary text-white border-none rounded-lg px-8 py-4 font-bold flex items-center gap-2">
              Read More Blog <ArrowRight size={18} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Go green and reduce your carbon footprint', date: 'April 3, 2023', cat: 'Recycling', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop' },
              { title: 'Make a statement support of the eco', date: 'April 3, 2023', cat: 'Global Warming', img: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=300&fit=crop' },
              { title: 'Affordable, targeted media for every one', date: 'April 3, 2023', cat: 'Climate', img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop' }
            ].map((blog, i) => (
              <div key={i} className="group border border-[var(--border-color)] bg-[var(--bg-card)] rounded-[2.5rem] overflow-hidden hover:shadow-xl transition-all theme-transition">
                <div className="h-64 overflow-hidden">
                  <img src={blog.img} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-primary mb-4">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.cat}</span>
                  </div>
                  <h3 className="text-xl font-black text-[var(--text-primary)] mb-6 group-hover:text-primary transition-colors leading-tight">
                    {blog.title}
                  </h3>
                  <div className="flex items-center gap-3 pt-6 border-t border-[var(--border-color)]">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-black text-[10px]">E</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">By Ecofine</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Questions Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <FloatingElement className="top-10 right-10 text-primary/10" delay={1}>
          <Users size={150} />
        </FloatingElement>
        <div className="max-w-7xl mx-auto glass-effect rounded-[4rem] overflow-hidden flex flex-col lg:flex-row items-stretch relative z-10 border-white/40">
          <div className="lg:w-1/2 min-h-[400px]">
            <img
              src={logo}
              alt="Questions"
              className="w-full h-full object-cover p-8 rounded-[4rem]"
            />
          </div>
          <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center">
            <span className="text-primary font-black uppercase tracking-widest text-xs mb-4 block">Talk to us</span>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-10 tracking-tight">
              Do you have any question?
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="You Name" className="w-full bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary shadow-sm" />
                <input type="email" placeholder="Email Address" className="w-full bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary shadow-sm" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Phone Number" className="w-full bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary shadow-sm" />
                <input type="text" placeholder="Subject" className="w-full bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary shadow-sm" />
              </div>
              <textarea placeholder="Your Message" rows="4" className="w-full bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary shadow-sm"></textarea>
              <Button className="bg-primary text-white border-none rounded-lg px-12 py-5 font-bold uppercase tracking-widest text-sm">
                Submit Now
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
