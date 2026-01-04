import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { Leaf, Users, Heart, CheckCircle, Globe2, Shield, Eye } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function About() {
  useEffect(() => {
    document.title = 'About | EcoFine';
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] pt-32 pb-20 px-6 theme-transition">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold text-green-600 bg-green-50 rounded-full uppercase tracking-widest border border-green-100">
              Our Heritage & Mission
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-[var(--text-primary)] tracking-tighter leading-[0.9] mb-8">
              Healing the Earth, <span className="text-green-500">Together.</span>
            </h1>
            <p className="text-xl text-[var(--text-secondary)] font-medium leading-relaxed max-w-xl">
              EcoFine isn't just a platform; it's a movement. We believe that environmental restoration shouldn't be a local struggle, but a global collaboration powered by transparency and collective will.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/register">
                <Button variant="primary" className="px-8 py-4 text-base font-extrabold shadow-xl shadow-green-500/20">Begin Your Journey</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="px-8 py-4 text-base font-extrabold border-[var(--border-color)]">Support Mission</Button>
              </Link>
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-green-500 to-emerald-700 rounded-[3rem] p-12 text-white flex flex-col justify-between overflow-hidden group shadow-2xl">
              <Leaf className="w-20 h-20 text-white/20 absolute -top-4 -right-4 group-hover:rotate-45 transition-transform duration-1000" />
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-4">EcoFine Core</h3>
                <p className="text-green-50/80 font-medium text-lg leading-relaxed">
                  Connecting 4,000+ citizens with local authorities and NGOs to solve environmental crises in real-time.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 relative z-10">
                <div>
                  <p className="text-4xl font-black">1.2k</p>
                  <p className="text-xs font-bold text-green-100/60 uppercase tracking-widest mt-1">Issues Saved</p>
                </div>
                <div>
                  <p className="text-4xl font-black">15</p>
                  <p className="text-xs font-bold text-green-100/60 uppercase tracking-widest mt-1">Countries Active</p>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 -mb-32 -mr-32 rounded-full blur-3xl" />
            </div>
          </Motion.div>
        </div>

        {/* Values Grid */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">Built on Core Principles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Community Autonomy', desc: 'We provide the tools, but the power lies with the citizens of each neighborhood.', icon: Users, color: 'text-green-500', bg: 'bg-green-50' },
              { title: 'Radical Transparency', desc: 'Every report, every update, and every success is visible to everyone, always.', icon: Eye, color: 'text-blue-500', bg: 'bg-blue-50' },
              { title: 'Future Centric', desc: 'We don\'t just fix today; we build systems that prevent environmental decay tomorrow.', icon: Globe2, color: 'text-amber-500', bg: 'bg-amber-50' },
            ].map((val, i) => (
              <Card key={i} className="p-8 border-none shadow-sm bg-[var(--bg-card)] group">
                <div className={`w-14 h-14 ${val.bg} ${val.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <val.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">{val.title}</h3>
                <p className="text-[var(--text-secondary)] font-medium leading-relaxed">{val.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <Card className="bg-gray-900 p-12 md:p-20 border-none rounded-[3rem] overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.1),transparent)]" />
          <div className="relative z-10 text-center max-w-2xl mx-auto text-white">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8">Ready to make an impact?</h2>
            <p className="text-gray-400 font-medium text-lg mb-10">
              Join thousands of others who are already reporting and resolving issues in their local areas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button variant="primary" className="px-10 py-5 text-lg font-black bg-green-500 hover:bg-green-600">Join EcoFine Today</Button>
              </Link>
              <Link to="/all-issues">
                <Button variant="outline" className="px-10 py-5 text-lg font-black border-white/10 text-white hover:bg-white/5">View Active Map</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}