import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Sparkles, FileText, MapPin, DollarSign, AlignLeft, Tag, Calendar, ImageIcon } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

export default function AddIssues() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        image: '',
        amount: '',
        category: '',
        email: user?.email || '',
        status: 'pending'
    });

    useEffect(() => {
        document.title = 'Report Issue | EcoFine';
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axiosSecure.post('/issues', {
                ...formData,
                amount: parseFloat(formData.amount),
                createdAt: new Date().toISOString()
            });
            toast.success('Report submitted successfully!');
            setFormData({
                title: '',
                description: '',
                location: '',
                image: '',
                amount: '',
                category: '',
                email: user?.email || '',
                status: 'pending'
            });
            navigate('/my-issues');
        } catch (err) {
            console.error(err);
            toast.error('Submission failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-page)] pt-32 pb-20 px-6 theme-transition">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12 text-center">
                    <div className="flex items-center justify-center gap-2 text-xs font-black text-green-600 uppercase tracking-widest mb-4">
                        <Sparkles size={16} /> New Environment Report
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] tracking-tighter">File a Case.</h1>
                </div>

                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="p-8 md:p-12 border-none shadow-2xl shadow-green-900/5 rounded-[3rem] bg-[var(--bg-card)]">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Input
                                    label="Incident Title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Hazardous Waste Near River"
                                    icon={FileText}
                                    required
                                />
                                <Select
                                    label="Incident Category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    icon={Tag}
                                    required
                                    options={[
                                        { value: '', label: 'Select category' },
                                        { value: 'Garbage', label: 'Garbage' },
                                        { value: 'Illegal Construction', label: 'Illegal Construction' },
                                        { value: 'Broken Public Property', label: 'Broken Public Property' },
                                        { value: 'Road Damage', label: 'Road Damage' },
                                        { value: 'Water Issues', label: 'Water Issues' },
                                        { value: 'Drainage', label: 'Drainage' },
                                        { value: 'Other', label: 'Other' }
                                    ]}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Input
                                    label="Specific Location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Street, District, Landmark"
                                    icon={MapPin}
                                    required
                                />
                                <Input
                                    label="Required Impact Funds ($)"
                                    name="amount"
                                    type="number"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    placeholder="Estimated restoration cost"
                                    icon={DollarSign}
                                    required
                                />
                            </div>

                            <Input
                                label="Visual Evidence (Image URL)"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://image-source.com/photo.jpg"
                                icon={ImageIcon}
                            />

                            <div className="space-y-2">
                                <label className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <AlignLeft size={14} className="text-green-600" />
                                    Case Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                    className="w-full p-6 bg-[var(--bg-surface)] border-none rounded-3xl text-[var(--text-primary)] font-medium focus:ring-2 focus:ring-green-500/20 min-h-[150px] transition-all"
                                    placeholder="Provide comprehensive details about the environmental hazard..."
                                />
                            </div>

                            <div className="pt-6 border-t border-[var(--border-color)] flex flex-col items-center">
                                <Button
                                    type="submit"
                                    loading={loading}
                                    className="w-full md:w-auto px-12 py-5 text-lg font-black shadow-xl shadow-green-500/20 rounded-2xl"
                                >
                                    Deploy Report to Network
                                </Button>
                                <p className="mt-4 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                                    Every report is vetted by community leaders
                                </p>
                            </div>
                        </form>
                    </Card>
                </Motion.div>
            </div>
        </div>
    );
}
