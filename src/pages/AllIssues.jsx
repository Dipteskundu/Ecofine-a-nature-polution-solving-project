import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, ChevronLeft, ChevronRight, X, Grid, List as ListIcon } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import IssueCard from '../components/ui/IssueCard';
import Loader from '../components/ui/Loader';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';

export default function AllIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  // URL Params State
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const status = searchParams.get('status') || '';
  const sort = searchParams.get('sort') || 'date_desc';
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = 8;

  useEffect(() => {
    document.title = 'All Issues | EcoFine';
  }, []);

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      try {
        const { data } = await axiosSecure.get('/issues', {
          params: { search, category, status, sort, page, limit }
        });
        setIssues(data.result || []);
        setTotalCount(data.totalCount || 0);
      } catch (err) {
        console.error('Error fetching issues:', err);
        toast.error('Failed to load issues from server.');
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [axiosSecure, search, category, status, sort, page]);

  const updateFilters = (newParams) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    // Reset to page 1 on filter change
    if (!newParams.page) params.set('page', '1');
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const categories = [
    'Waste Management',
    'Tree Plantation',
    'Infrastructure',
    'Water Issues',
    'Road Damage',
    'Garbage',
    'Illegal Construction',
    'Broken Public Property'
  ];

  const statusOptions = ['Active', 'In Progress', 'Resolved'];

  const handleSeeDetails = (issue) => {
    const issueId = issue?._id || issue?.id;
    if (!issueId) {
      toast.error('Invalid issue id');
      return;
    }
    if (user) {
      navigate(`/issue-details/${issueId}`);
    } else {
      navigate('/login', {
        state: {
          from: {
            pathname: `/issue-details/${issueId}`
          }
        }
      });
    }
  };

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight mb-4">
              Explore Community <span className="text-green-600">Reports</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              Discover and support localized cleanup initiatives. Real impact starts with your community.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-1 rounded-xl shadow-sm flex items-center">
              <button className="p-2 bg-[var(--bg-surface)] rounded-lg text-green-600"><Grid size={20} /></button>
              <button className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"><ListIcon size={20} /></button>
            </div>
            <Button variant="outline" className="lg:hidden flex items-center gap-2" onClick={() => setShowMobileFilters(true)}>
              <Filter size={20} />
              <span>Filters</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block space-y-8">
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm sticky top-28 theme-transition">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-green-600" />
                  Filters
                </h3>
                {(category || status || search) && (
                  <button onClick={clearFilters} className="text-xs text-red-500 hover:underline">Clear All</button>
                )}
              </div>

              {/* Categories */}
              <div className="space-y-4 mb-8">
                <p className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">Categories</p>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        checked={category === cat}
                        onChange={() => updateFilters({ category: cat })}
                        className="w-4 h-4 text-green-600 focus:ring-green-500 border-[var(--border-color)] rounded bg-[var(--bg-surface)]"
                      />
                      <span className={`text-sm transition-colors ${category === cat ? 'text-green-600 font-semibold' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'}`}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="space-y-4 mb-8">
                <p className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">Status</p>
                <div className="space-y-2">
                  {statusOptions.map((opt) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="status"
                        checked={status === opt}
                        onChange={() => updateFilters({ status: opt })}
                        className="w-4 h-4 text-green-600 focus:ring-green-500 border-[var(--border-color)] rounded"
                      />
                      <span className={`text-sm transition-colors ${status === opt ? 'text-green-600 font-semibold' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'}`}>
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--border-color)]">
                <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>{totalCount} Reports Live</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Results Content */}
          <main className="lg:col-span-3 space-y-6">
            {/* Controls Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[var(--bg-card)] p-4 rounded-2xl shadow-sm border border-[var(--border-color)] theme-transition">
              <div className="relative w-full md:w-2/3">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                <input
                  type="text"
                  placeholder="Search by title, location..."
                  value={search}
                  onChange={(e) => updateFilters({ search: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-[var(--bg-surface)] border-none rounded-xl focus:ring-2 focus:ring-green-500 text-[var(--text-primary)] text-sm"
                />
              </div>
              <div className="w-full md:w-1/3">
                <Select
                  value={sort}
                  onChange={(e) => updateFilters({ sort: e.target.value })}
                  options={[
                    { value: 'date_desc', label: 'Newest First' },
                    { value: 'date_asc', label: 'Oldest First' },
                    { value: 'amount_desc', label: 'Higher Budget' },
                    { value: 'amount_asc', label: 'Lower Budget' },
                    { value: 'title_asc', label: 'Title (A-Z)' }
                  ]}
                  className="w-full"
                />
              </div>
            </div>

            {/* Results Grid */}
            <div className="min-h-[600px] flex flex-col items-center justify-center">
              {loading ? (
                <Loader fullPage={false} />
              ) : issues.length === 0 ? (
                <EmptyState
                  title="No reports found"
                  message="We couldn't find any reports matching your current criteria. Try widening your search or clearing filters."
                  actionLabel="Reset All Filters"
                  onAction={clearFilters}
                  icon={Search}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {issues.map((issue) => (
                    <IssueCard
                      key={issue._id || issue.id}
                      issue={issue}
                      onSeeDetails={handleSeeDetails}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 pt-10">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => updateFilters({ page: page - 1 })}
                  className="rounded-xl"
                >
                  <ChevronLeft size={20} />
                </Button>

                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => updateFilters({ page: i + 1 })}
                      className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${page === i + 1
                        ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                        : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-green-600'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => updateFilters({ page: page + 1 })}
                  className="rounded-xl"
                >
                  <ChevronRight size={20} />
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex justify-end"
            onClick={() => setShowMobileFilters(false)}
          >
            <Motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-xs bg-[var(--bg-card)] h-full p-8 overflow-y-auto border-l border-[var(--border-color)] shadow-2xl theme-transition"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-[var(--text-primary)]">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-[var(--bg-surface)] rounded-full transition-colors">
                  <X size={24} className="text-[var(--text-muted)]" />
                </button>
              </div>

              {/* Mobile Filter Content - Same as Desktop Sidebar but slightly rearranged for touch */}
              <div className="space-y-10">
                <div className="space-y-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">By Category</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => updateFilters({ category: cat })}
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${category === cat
                          ? 'bg-green-600 text-white shadow-lg shadow-green-500/20'
                          : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-green-600'
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">By Status</p>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateFilters({ status: opt })}
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${status === opt
                          ? 'bg-green-600 text-white shadow-lg shadow-green-500/20'
                          : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-green-600'
                          }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <Button className="w-full py-4 text-lg" onClick={() => setShowMobileFilters(false)}>
                  Show {totalCount} Results
                </Button>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


