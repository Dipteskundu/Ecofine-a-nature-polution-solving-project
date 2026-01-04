import React, { useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import {
    Zap,
    MapPin,
    Search,
    Users,
    ShieldCheck,
    BarChart3,
    CloudLightning,
    HeartHandshake
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

export default function Services() {
    useEffect(() => {
        document.title = 'Our Services | EcoFine';
    }, []);

    const services = [
        {
            title: 'Real-time Issue Reporting',
            desc: 'Our proprietary reporting engine allows citizens to submit environmental concerns in under 60 seconds with GPS precision and photographic evidence.',
            icon: CloudLightning,
            color: 'text-yellow-500',
            bg: 'bg-yellow-50'
        },
        {
            title: 'Community Resolution Hub',
            desc: 'A collaborative space where reports matched with volunteers, resources, and NGOs to drive issues from detection to full resolution.',
            icon: HeartHandshake,
            color: 'text-red-500',
            bg: 'bg-red-50'
        },
        {
            title: 'Impact Data Analytics',
            desc: 'Comprehensive dashboards for local authorities and researchers to identify trends, hotspots, and seasonal environmental shifts.',
            icon: BarChart3,
            color: 'text-blue-500',
            bg: 'bg-blue-50'
        },
        {
            title: 'Verified Governance',
            desc: 'Our administrative "Admin Hub" ensures that every report is verified by authorized personnel before being promoted to critical status.',
            icon: ShieldCheck,
            color: 'text-green-500',
            bg: 'bg-green-50'
        },
        {
            title: 'Resource Crowdsourcing',
            desc: 'Enabling micro-contributions of tools, time, and funds to power community cleanup projects that would otherwise lack budget.',
            icon: Users,
            color: 'text-purple-500',
            bg: 'bg-purple-50'
        },
        {
            title: 'Geospatial Discovery',
            desc: 'Advanced filtering and proximity-based searches help users find the most pressing issues in their immediate neighborhood.',
            icon: MapPin,
            color: 'text-orange-500',
            bg: 'bg-orange-50'
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-page)] pt-32 pb-20 px-6 theme-transition">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <Motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 mb-6 text-xs font-bold text-green-600 bg-green-50 rounded-full uppercase tracking-widest border border-green-100"
                    >
                        EcoFine Ecosystem
                    </Motion.div>
                    <h1 className="text-5xl md:text-6xl font-black text-[var(--text-primary)] tracking-tighter mb-8 italic">
                        Solutions for a <span className="text-green-500">Living Planet.</span>
                    </h1>
                    <p className="text-xl text-[var(--text-secondary)] font-medium leading-relaxed">
                        We provide a comprehensive suite of digital tools designed to bridge the gap between environmental awareness and tangible community action.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                    {services.map((s, i) => (
                        <Card key={i} className="p-10 border-none shadow-sm bg-[var(--bg-card)] group hover:ring-2 hover:ring-green-500/20 transition-all">
                            <div className={`w-16 h-16 ${s.bg} ${s.color} rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                <s.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-[var(--text-primary)] mb-4 tracking-tight">{s.title}</h3>
                            <p className="text-[var(--text-secondary)] font-medium leading-loose text-sm">
                                {s.desc}
                            </p>
                        </Card>
                    ))}
                </div>

                {/* Specialized Solutions Section */}
                <div className="bg-[var(--bg-surface)] rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-black text-[var(--text-primary)] mb-8 tracking-tight">Enterprise & Government Solutions</h2>
                            <p className="text-[var(--text-secondary)] font-medium mb-8 leading-relaxed">
                                Are you a local government body or an environmental NGO? EcoFine offers specialized API access, white-label reporting tools, and deep-dive analytics to help you manage regional sustainability efforts.
                            </p>
                            <div className="space-y-4 mb-10">
                                {[
                                    'Custom CSV/JSON Data Exports',
                                    'Dedicated Support Channel',
                                    'API Access for Integration',
                                    'Advanced User Role Management'
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-[var(--text-primary)]">
                                        <Zap size={16} className="text-green-500" />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                            <Link to="/contact">
                                <Button variant="primary" className="px-10 py-4 font-black">Request Enterprise Portal</Button>
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="aspect-video bg-[var(--bg-card)] rounded-3xl shadow-2xl p-4 md:p-8 flex items-center justify-center overflow-hidden border border-[var(--border-color)]">
                                <div className="w-full h-full bg-green-500/5 rounded-2xl flex flex-col items-center justify-center text-center p-8">
                                    <BarChart3 size={48} className="text-green-500 mb-6 animate-pulse" />
                                    <p className="text-lg font-black text-[var(--text-primary)] mb-2 tracking-tight">Interactive Global Stats</p>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Login as Admin to view live dashboard</p>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-500/20 blur-3xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
