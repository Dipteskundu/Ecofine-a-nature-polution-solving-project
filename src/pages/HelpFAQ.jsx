import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, HelpCircle, Shield, Award, MessageCircle, AlertTriangle, Zap } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const faqs = [
    {
        category: 'General',
        icon: HelpCircle,
        items: [
            { q: "What is EcoFine?", a: "EcoFine is a community-driven platform that empowers citizens to report environmental and infrastructure issues, collaborate on solutions, and track progress transparently." },
            { q: "How do I create an account?", a: "You can create an account by clicking the 'Register' button in the navbar. We require your name, email, and a secure password. You can also sign up instantly using Google." },
            { q: "Is EcoFine free to use?", a: "Yes, EcoFine is completely free for community members. Our mission is to provide an accessible tool for environmental action." }
        ]
    },
    {
        category: 'Reporting',
        icon: AlertTriangle,
        items: [
            { q: "How do I report an issue?", a: "Once logged in, click 'Report Issue' in the navbar. Provide a descriptive title, select a category, add a location, and ideally upload a photo to help others understand the situation." },
            { q: "What categories of issues can I report?", a: "You can report various issues including illegal dumping, road damage, water leaks, broken streetlights, and overgrown vegetation." },
            { q: "Can I edit my report after submission?", a: "Currently, reports are locked after submission to ensure data integrity. However, you can add comments or updates to your existing reports." }
        ]
    },
    {
        category: 'Contributions',
        icon: Zap,
        items: [
            { q: "How can I contribute to an issue?", a: "Browse the 'Discover' page to find issues in your area. Open the issue details and use the contribution form to pledge resources, time, or funds to help resolve it." },
            { q: "Are funds contributed verified?", a: "EcoFine provides the platform for communication. We recommend verifying the identity of the reporter before making significant financial contributions outside the platform's secure channels." },
            { q: "Can I track my contributions?", a: "Yes, all your activity is tracked in the 'My Activity' dashboard under the 'Contributions' tab." }
        ]
    }
];

export default function HelpFAQ() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState(faqs[0].category);
    const [openIndex, setOpenIndex] = useState(0);

    useEffect(() => {
        document.title = 'Help & FAQ | EcoFine';
    }, []);

    const filteredFaqs = faqs.map(cat => ({
        ...cat,
        items: cat.items.filter(item =>
            item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.a.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(cat => cat.items.length > 0);

    return (
        <div className="min-h-screen bg-[var(--bg-page)] pt-24 pb-20 px-6 theme-transition">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <Motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-6 tracking-tight"
                    >
                        How can we help?
                    </Motion.h1>
                    <div className="max-w-2xl mx-auto relative group">
                        <Input
                            icon={Search}
                            placeholder="Search for answers (e.g. 'reporting', 'account')"
                            className="py-4 text-base shadow-lg group-hover:shadow-green-500/10 transition-shadow"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Support Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <Card className="p-6 text-center border-none shadow-sm bg-[var(--bg-card)] hover:scale-105 transition-transform cursor-pointer">
                        <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <MessageCircle className="text-green-600" />
                        </div>
                        <h3 className="font-bold text-[var(--text-primary)]">Community Forum</h3>
                        <p className="text-xs text-[var(--text-secondary)] mt-2 font-medium">Discuss issues with others</p>
                    </Card>
                    <Card className="p-6 text-center border-none shadow-sm bg-[var(--bg-card)] hover:scale-105 transition-transform cursor-pointer">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Award className="text-blue-600" />
                        </div>
                        <h3 className="font-bold text-[var(--text-primary)]">Impact Guide</h3>
                        <p className="text-xs text-[var(--text-secondary)] mt-2 font-medium">Learn how to maximize help</p>
                    </Card>
                    <Card className="p-6 text-center border-none shadow-sm bg-[var(--bg-card)] hover:scale-105 transition-transform cursor-pointer">
                        <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Shield className="text-amber-600" />
                        </div>
                        <h3 className="font-bold text-[var(--text-primary)]">Trust & Safety</h3>
                        <p className="text-xs text-[var(--text-secondary)] mt-2 font-medium">Our community guidelines</p>
                    </Card>
                </div>

                {/* Tabs for Category */}
                {!searchTerm && (
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {faqs.map((cat) => (
                            <button
                                key={cat.category}
                                onClick={() => { setActiveTab(cat.category); setOpenIndex(0); }}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === cat.category
                                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] shadow-sm'
                                    }`}
                            >
                                <cat.icon size={16} />
                                {cat.category}
                            </button>
                        ))}
                    </div>
                )}

                {/* Accordion List */}
                <div className="space-y-4">
                    {filteredFaqs
                        .filter(cat => searchTerm || cat.category === activeTab)
                        .map((cat) => (
                            <div key={cat.category} className="space-y-4">
                                {searchTerm && (
                                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4 mb-2">
                                        Results in {cat.category}
                                    </h3>
                                )}
                                {cat.items.map((item, idx) => (
                                    <Card key={idx} className="p-0 border-none shadow-sm bg-[var(--bg-card)] overflow-hidden">
                                        <button
                                            onClick={() => setOpenIndex(openIndex === idx && !searchTerm ? -1 : idx)}
                                            className="w-full text-left px-8 py-6 flex items-center justify-between group"
                                        >
                                            <span className="font-bold text-[var(--text-primary)] group-hover:text-green-500 transition-colors">
                                                {item.q}
                                            </span>
                                            <ChevronDown
                                                size={20}
                                                className={`text-gray-400 transition-transform ${openIndex === idx ? 'rotate-180 text-green-500' : ''}`}
                                            />
                                        </button>
                                        <AnimatePresence>
                                            {openIndex === idx && (
                                                <Motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-8 pb-8 text-[var(--text-secondary)] font-medium leading-relaxed">
                                                        {item.a}
                                                    </div>
                                                </Motion.div>
                                            )}
                                        </AnimatePresence>
                                    </Card>
                                ))}
                            </div>
                        ))}
                    {filteredFaqs.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500 font-bold mb-4">No results found for "{searchTerm}"</p>
                            <Button variant="outline" onClick={() => setSearchTerm('')}>Clear Search</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
