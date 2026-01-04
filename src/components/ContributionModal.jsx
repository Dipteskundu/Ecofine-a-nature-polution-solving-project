import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, User, Mail, Phone, MapPin, Calendar, FileText, AlignLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from './ui/Button';
import Input from './ui/Input';

export default function ContributionModal({ isOpen, onClose, issue, onSubmit, user }) {
  const getInitialFormData = () => ({
    issueTitle: issue?.title || '',
    amount: '',
    contributorName: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    additionalInfo: ''
  });

  const [formData, setFormData] = useState(getInitialFormData());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        issueTitle: issue?.title || '',
        amount: '',
        contributorName: user?.displayName || '',
        email: user?.email || '',
        phone: '',
        address: '',
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        additionalInfo: ''
      });
    }
  }, [isOpen, issue?.title, user?.displayName, user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error('Enter valid amount');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        amount: parseFloat(formData.amount)
      });
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 text-left">
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
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="px-10 py-8 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Support Resolution.</h2>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-1">Direct community intervention</p>
              </div>
              <button
                onClick={onClose}
                className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 overflow-y-auto space-y-8 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Initiative"
                  icon={FileText}
                  value={formData.issueTitle}
                  readOnly
                  disabled
                />
                <Input
                  label="Impact Amount ($)"
                  icon={DollarSign}
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Contributor"
                  icon={User}
                  value={formData.contributorName}
                  onChange={(e) => setFormData({ ...formData, contributorName: e.target.value })}
                  placeholder="Full name"
                  required
                />
                <Input
                  label="Email"
                  icon={Mail}
                  value={formData.email}
                  readOnly
                  disabled
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Contact"
                  icon={Phone}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Primary phone"
                  required
                />
                <Input
                  label="Transaction Date"
                  icon={Calendar}
                  value={formData.date}
                  readOnly
                  disabled
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <MapPin size={14} className="text-green-600" />
                  Impact Address
                </label>
                <textarea
                  className="w-full p-6 bg-gray-50 border-none rounded-3xl text-gray-900 font-medium focus:ring-2 focus:ring-green-500/20 min-h-[100px] transition-all"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Verified residential or service address..."
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <AlignLeft size={14} className="text-green-600" />
                  Resolution Notes
                </label>
                <textarea
                  className="w-full p-6 bg-gray-50 border-none rounded-3xl text-gray-900 font-medium focus:ring-2 focus:ring-green-500/20 min-h-[100px] transition-all text-sm"
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                  placeholder="Add specific instructions or support details (Optional)..."
                />
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row gap-4">
                <Button variant="outline" type="button" onClick={onClose} className="flex-1 py-4 font-black">
                  Hold Transaction
                </Button>
                <Button variant="primary" type="submit" loading={loading} className="flex-1 py-4 font-black shadow-xl shadow-green-500/20">
                  Confirm Impact
                </Button>
              </div>
            </form>
          </Motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
