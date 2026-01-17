import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { DollarSign, Calendar, FileText, Sparkles, Download, Search, SlidersHorizontal, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import EmptyState from '../components/ui/EmptyState';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

export default function MyContribution() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [contributions, setContributions] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date_desc');

  const downloadReport = () => {
    if (!user) {
      toast.error('Login required');
      return;
    }
    if (!contributions || contributions.length === 0) {
      toast.error('No contributions to export');
      return;
    }
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(16, 185, 129); // Emerald-500
    doc.text('EcoFine Impact Report', 14, 25);

    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Contributor: ${user.displayName || 'Community Member'}`, 14, 35);
    doc.text(`Email: ${user.email}`, 14, 40);
    doc.text(`Statement Date: ${new Date().toLocaleDateString()}`, 14, 45);

    const rows = contributions.map((c) => [
      c.issueTitle || 'N/A',
      c.category || 'Environmental',
      `$${(Number(c.amount) || 0).toFixed(2)}`,
      c.date ? new Date(c.date).toLocaleDateString() : 'N/A'
    ]);

    autoTable(doc, {
      startY: 55,
      head: [['Issue Impacted', 'Category', 'Amount Contribution', 'Date']],
      body: rows,
      theme: 'grid',
      headStyles: { fillStyle: 'emerald', fillColor: [16, 185, 129] },
      styles: { fontSize: 9, cellPadding: 5 }
    });

    const total = contributions.reduce((s, c) => s + (Number(c.amount) || 0), 0);
    const finalY = doc.lastAutoTable.finalY + 15;

    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text(`Total Lifetime Impact: $${total.toFixed(2)}`, 14, finalY);

    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('Thank you for being part of the EcoFine resolution network.', 14, finalY + 10);

    const filenameBase = (user.displayName || user.email || 'user').replace(/[^a-z0-9]+/gi, '_');
    doc.save(`EcoFine_Impact_${filenameBase}.pdf`);
  };

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const { data } = await axiosSecure.get('/my-contribution');
        const list = Array.isArray(data) ? data : (data.result || []);
        const mine = list.filter((c) => c.email === user?.email);
        mine.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
        if (active) setContributions(mine);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load contributions');
      } finally {
        if (active) setLoading(false);
      }
    };
    if (user) load(); else setLoading(false);
    return () => { active = false; };
  }, [user, axiosSecure]); // Added axiosSecure to dependencies for completeness

  if (!user) {
    return (
      <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] pt-32 px-6 theme-transition">
        <EmptyState
          title="Authentication Required"
          message="Please log in to view your contribution history and impact metrics."
          actionLabel="Login to Continue"
          onAction={() => window.location.href = '/login'}
        />
      </div>
    );
  }

  const filtered = contributions
    .filter((c) => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return [c.issueTitle, c.category]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    })
    .sort((a, b) => {
      if (sortBy === 'date_desc') return new Date(b?.date || 0) - new Date(a?.date || 0);
      if (sortBy === 'date_asc') return new Date(a?.date || 0) - new Date(b?.date || 0);
      if (sortBy === 'amount_desc') return (Number(b.amount) || 0) - (Number(a.amount) || 0);
      if (sortBy === 'amount_asc') return (Number(a.amount) || 0) - (Number(b.amount) || 0);
      if (sortBy === 'title_asc') return String(a.issueTitle || '').localeCompare(String(b.issueTitle || ''));
      if (sortBy === 'title_desc') return String(b.issueTitle || '').localeCompare(String(a.issueTitle || ''));
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-page)] pt-24 flex items-center justify-center theme-transition">
        <div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] pt-32 pb-20 theme-transition">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-black text-green-600 uppercase tracking-widest mb-4">
              <Sparkles size={16} /> Individual Impact
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] mb-4 tracking-tighter">Your Legacy.</h1>
            <p className="text-lg text-[var(--text-secondary)] font-medium leading-relaxed">
              Every contribution, no matter the size, fuels the resolution of environmental issues in your neighborhood.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-[var(--bg-card)] p-6 rounded-[2rem] border border-[var(--border-color)] flex items-center gap-6 shadow-sm">
              <div>
                <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Total Impact</p>
                <p className="text-3xl font-black text-green-600">${filtered.reduce((s, c) => s + (Number(c.amount) || 0), 0).toFixed(2)}</p>
              </div>
              <Button onClick={downloadReport} icon={Download} className="w-14 h-14 rounded-2xl p-0 flex items-center justify-center bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-green-500 hover:text-white transition-all shadow-none">
                <span className="sr-only">Download</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center mb-10">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search by issue or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={Search}
              className="bg-[var(--bg-card)] border-none shadow-sm"
            />
          </div>
          <div className="w-full md:w-64">
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              icon={SlidersHorizontal}
              options={[
                { value: 'date_desc', label: 'Newest First' },
                { value: 'date_asc', label: 'Oldest First' },
                { value: 'amount_desc', label: 'Impact: High' },
                { value: 'amount_asc', label: 'Impact: Low' },
              ]}
              className="bg-[var(--bg-card)] border-none shadow-sm"
            />
          </div>
        </div>

        {/* Content */}
        {filtered.length === 0 ? (
          <div className="bg-[var(--bg-card)] rounded-[3rem] p-20 border border-[var(--border-color)] shadow-sm">
            <EmptyState
              title="No records found"
              message={search ? "We couldn't find any contributions matching your search." : "You haven't made any contributions yet. Start leading the change today."}
              actionLabel={search ? "Clear Search" : "Explore Issues"}
              onAction={() => search ? setSearch('') : window.location.href = '/all-issues'}
              icon={FileText}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((c, idx) => (
              <Motion.div
                key={c._id || idx}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
              >
                <Card className="p-0 border-none shadow-sm bg-[var(--bg-card)] overflow-hidden group">
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                        <DollarSign size={24} />
                      </div>
                      <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest italic">{c.category || 'Environmental'}</span>
                    </div>

                    <h3 className="text-xl font-black text-[var(--text-primary)] mb-3 line-clamp-1">{c.issueTitle || 'Direct Support'}</h3>
                    <p className="text-sm text-[var(--text-secondary)] font-medium mb-8 leading-relaxed">Impact made toward cleaning and restoration of local infrastructure.</p>

                    <div className="flex items-center justify-between pt-6 border-t border-[var(--border-color)]">
                      <div className="flex items-center gap-2 text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">
                        <Calendar size={14} className="text-[var(--text-muted)]" />
                        {new Date(c.date || c.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-2xl font-black text-green-600">
                        ${(Number(c.amount) || 0).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </Card>
              </Motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
