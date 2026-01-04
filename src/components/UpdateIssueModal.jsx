import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { X, FileText, MapPin, DollarSign, AlignLeft, Tag, ImageIcon, Sparkles } from 'lucide-react';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';

export default function UpdateIssueModal({ isOpen, onClose, issue, onUpdate }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: issue?.title || '',
        description: issue?.description || '',
        location: issue?.location || '',
        image: issue?.image || '',
        amount: issue?.amount || '',
        category: issue?.category || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onUpdate({
                ...formData,
                amount: parseFloat(formData.amount)
            });
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <Motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <Motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        <div className="px-10 py-8 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                            <div>
                                <div className="flex items-center gap-2 text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">
                                    <Sparkles size={12} /> Registry Modification
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Refine Report.</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-10 overflow-y-auto space-y-8 custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Input
                                    label="Context Title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    icon={FileText}
                                    placeholder="Primary headline"
                                    required
                                />
                                <Select
                                    label="Classification"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    icon={Tag}
                                    required
                                    options={[
                                        { value: 'Garbage', label: 'Garbage' },
                                        { value: 'Illegal Construction', label: 'Illegal Construction' },
                                        { value: 'Broken Public Property', label: 'Broken Public Property' },
                                        { value: 'Road Damage', label: 'Road Damage' },
                                        { value: 'Water Issues', label: 'Water Issues' },
                                        { value: 'Other', label: 'Other' }
                                    ]}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Input
                                    label="Area of Concern"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    icon={MapPin}
                                    placeholder="Coordinates or Address"
                                    required
                                />
                                <Input
                                    label="Updated Request ($)"
                                    name="amount"
                                    type="number"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    icon={DollarSign}
                                    placeholder="0.00"
                                    required
                                />
                            </div>

                            <Input
                                label="Evidence Reference"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                icon={ImageIcon}
                                placeholder="Secure image link"
                            />

                            <div className="space-y-2">
                                <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <AlignLeft size={14} className="text-green-600" />
                                    Detailed Assessment
                                </label>
                                <textarea
                                    name="description"
                                    className="w-full p-8 bg-gray-50 border-none rounded-[2rem] text-gray-900 font-medium focus:ring-2 focus:ring-green-500/20 min-h-[150px] transition-all resize-none shadow-inner"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Update details regarding current state of hazard..."
                                    required
                                />
                            </div>

                            <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row gap-4">
                                <Button variant="ghost" type="button" onClick={onClose} className="flex-1 py-5 font-black">
                                    Abort Changes
                                </Button>
                                <Button variant="primary" type="submit" loading={loading} className="flex-1 py-5 font-black shadow-xl shadow-green-500/20">
                                    Update Registry
                                </Button>
                            </div>
                        </form>
                    </Motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
