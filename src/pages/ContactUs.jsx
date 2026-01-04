import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import toast from 'react-hot-toast';

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = 'Contact Us | EcoFine';
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            toast.success('Your message has been sent! We will get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setLoading(false);
        }, 1500);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-[var(--bg-page)] pt-24 pb-20 px-6 theme-transition">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <Motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 mb-6 text-xs font-bold text-green-600 bg-green-50 rounded-full uppercase tracking-widest border border-green-100"
                    >
                        Get in touch
                    </Motion.div>
                    <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight mb-6">
                        We'd Love to Hear From You
                    </h1>
                    <p className="text-lg text-[var(--text-secondary)] font-medium">
                        Have questions about reporting? Want to partner with us? Our team is dedicated to supporting your environmental initiatives.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="p-8 border-none shadow-sm bg-[var(--bg-card)] overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 -mr-16 -mt-16 rounded-full" />
                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Contact Information</h3>

                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="p-3 bg-green-50 rounded-2xl text-green-600">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">Email Us</p>
                                        <p className="font-bold text-[var(--text-primary)]">support@ecofine.org</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">Call Us</p>
                                        <p className="font-bold text-[var(--text-primary)]">+1 (555) 123-4567</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">Visit Us</p>
                                        <p className="font-bold text-[var(--text-primary)]">123 Green Way, Eco City, EC 94103</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-[var(--border-color)]">
                                <h4 className="text-sm font-bold text-[var(--text-primary)] mb-4">Core Support Hours</h4>
                                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                                    <Clock size={16} />
                                    <span>Mon - Fri: 9:00 AM - 6:00 PM EST</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-8 border-none shadow-sm bg-green-600 text-white">
                            <Globe className="w-10 h-10 mb-4 opacity-50" />
                            <h3 className="text-xl font-bold mb-2">Global Community</h3>
                            <p className="text-sm text-green-50 mb-6 font-medium">
                                We support reports in over 120 cities across 15 countries. Join our global effort.
                            </p>
                            <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                                Join Discord Community
                            </Button>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card className="p-8 md:p-12 border-none shadow-xl bg-[var(--bg-card)]">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                                    <MessageSquare size={24} className="text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-[var(--text-primary)]">Send a Message</h3>
                                    <p className="text-sm text-[var(--text-secondary)] font-medium">Expected response time: within 24 hours.</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Full Name"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Input
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <Input
                                    label="Subject"
                                    name="subject"
                                    placeholder="How can we help?"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    label="Message"
                                    name="message"
                                    type="textarea"
                                    rows={5}
                                    placeholder="Enter your message in detail..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full py-4 text-base font-extrabold shadow-lg shadow-green-500/20"
                                    isLoading={loading}
                                    icon={Send}
                                >
                                    Send Message
                                </Button>
                            </form>

                            <p className="mt-8 text-xs text-gray-400 text-center font-medium">
                                By clicking send, you agree to our <span className="text-green-600 hover:underline cursor-pointer">Privacy Policy</span> regarding data handling.
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
