import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, User, DollarSign, Users, TrendingUp, Heart, CheckCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import ContributionModal from '../components/ContributionModal';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import IssueCard from '../components/ui/IssueCard';
import IssueCardSkeleton from '../components/ui/IssueCardSkeleton';
import { motion as Motion } from 'framer-motion';

export default function IssueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [loadingIssue, setLoadingIssue] = useState(true);
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contributions, setContributions] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [relatedIssues, setRelatedIssues] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  useEffect(() => {
    document.title = issue ? `${issue.title} | EcoFine` : 'Issue Details | EcoFine';
  }, [issue]);

  useEffect(() => {
    let isMounted = true;
    const fetchIssue = async () => {
      try {
        if (!id) return;
        // console.log('Fetching issue details for:', id);
        const { data } = await axiosSecure.get(`/issues/${id}`);
        // console.log('Issue details response:', data);

        if (data.success && data.result) {
          if (isMounted) setIssue(data.result);
        } else if (data.issue) {
          if (isMounted) setIssue(data.issue);
        } else {
          if (isMounted) setIssue(data);
        }
      } catch (err) {
        console.error('Error fetching issue details:', err);
        toast.error('Failed to load issue');
      } finally {
        if (isMounted) setLoadingIssue(false);
      }
    };
    fetchIssue();
    return () => { isMounted = false; };
  }, [id, axiosSecure]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      // Only fetch contributions if user is logged in
      if (!user || !id) return;

      try {
        const { data } = await axiosSecure.get(`/my-contribution`);
        const list = Array.isArray(data) ? data : (data.result || []);
        const filtered = list.filter((c) => c.issueId === id);
        filtered.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
        if (active) {
          setContributions(filtered);
        }
      } catch {
        if (active) {
          setContributions([]);
        }
      }
    };
    load();
    return () => { active = false; };
  }, [id, axiosSecure, user]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const { data } = await axiosSecure.get('/issues/recent');
        const list = Array.isArray(data) ? data : (data.result || []);
        setRelatedIssues(list.filter(item => (item._id || item.id) !== id).slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingRelated(false);
      }
    };
    fetchRelated();
  }, [id, axiosSecure]);

  /* 
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (!user || !id) return;
      try {
        const { data } = await axiosSecure.get(`/users/favorites/${user.email}`);
        if (data.success) {
          setIsLiked(data.favorites.includes(id));
        }
      } catch (err) {
        console.error('Error fetching favorite status:', err);
      }
    };
    fetchFavoriteStatus();
  }, [id, user, axiosSecure]);

  const handleLikeToggle = async () => {
    if (!user) {
      toast.error('Please login to favorite issues');
      navigate('/login', { state: { from: `/issue-details/${id}` } });
      return;
    }

    try {
      const { data } = await axiosSecure.post('/users/favorites', { issueId: id });
      if (data.success) {
        setIsLiked(data.isLiked);
        toast.success(data.isLiked ? 'Added to favorites' : 'Removed from favorites', {
          icon: data.isLiked ? '❤️' : '💔',
        });
      }
    } catch {
      toast.error('Failed to update favorites');
    }
  };
  */

  const totalCollected = contributions.reduce((sum, contribution) => sum + (Number(contribution.amount) || 0), 0);


  const targetAmount = issue?.amount || 0;
  const progressPercentage = targetAmount > 0 ? Math.min((totalCollected / targetAmount) * 100, 100) : 0;
  const isGoalReached = progressPercentage >= 100;

  const handleContributionSubmit = async (contributionData) => {
    try {
      if (!user) {
        toast.error('Login required');
        navigate('/login');
        return;
      }

      const payload = {
        email: user.email,
        issueId: id,
        issueTitle: issue?.title || '',
        category: issue?.category || '',
        amount: contributionData.amount,
        date: new Date().toISOString(),
      };

      await axiosSecure.post(`/my-contribution`, payload);
      toast.success('Contribution successful!');

      // Refetch contributions
      const { data } = await axiosSecure.get(`/my-contribution`);
      const list = Array.isArray(data) ? data : (data.result || []);
      const filtered = list.filter((c) => c.issueId === id);
      setContributions(filtered);
    } catch {
      toast.error('Transaction failed');
    }
  };

  if (loadingIssue) {
    return (
      <div className="min-h-screen bg-[var(--bg-page)] pt-32 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!issue) return null;

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] pt-32 pb-20 theme-transition">
      <div className="max-w-7xl mx-auto px-6">

        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex-1">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm font-black text-[var(--text-muted)] hover:text-green-600 transition-colors mb-8 group uppercase tracking-widest"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Listing View
            </button>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-50 px-4 py-1.5 rounded-full text-[10px] font-black text-green-600 uppercase tracking-widest border border-green-100">
                {issue.category}
              </span>
              {isGoalReached && (
                <span className="bg-blue-50 px-4 py-1.5 rounded-full text-[10px] font-black text-blue-600 uppercase tracking-widest border border-blue-100 flex items-center gap-1.5">
                  <CheckCircle size={10} /> Fully Funded
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] tracking-tighter max-w-4xl">
              {issue.title}
            </h1>
          </div>


        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Main Visuals & Content */}
          <div className="lg:col-span-8 space-y-12">
            <Motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-video rounded-[3rem] overflow-hidden border border-gray-100 shadow-2xl shadow-green-900/5 group"
            >
              <img
                src={issue.image}
                alt={issue.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </Motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: MapPin, label: 'Location', value: issue.location },
                { icon: Calendar, label: 'Date Filed', value: new Date(issue.createdAt || Date.now()).toLocaleDateString() },
                { icon: ShieldCheck, label: 'Vetting', value: 'Verified Post' }
              ].map((stat, i) => (
                <Card key={i} className="p-8 border-none bg-[var(--bg-card)] shadow-sm flex flex-col items-center text-center theme-transition">
                  <div className="w-12 h-12 bg-[var(--bg-surface)] rounded-2xl flex items-center justify-center text-green-500 mb-4">
                    <stat.icon size={24} />
                  </div>
                  <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="font-bold text-[var(--text-primary)]">{stat.value}</p>
                </Card>
              ))}
            </div>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-1 bg-green-500 rounded-full"></div>
                <h2 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-widest">Case Description.</h2>
              </div>
              <div className="prose prose-lg max-w-none font-medium text-[var(--text-secondary)] leading-loose">
                {issue.description}
              </div>
            </section>

            <section className="pt-12 border-t border-[var(--border-color)]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-[var(--text-primary)] tracking-tight flex items-center gap-3">
                  Community Resolution <span className="text-green-600 font-black">{contributions.length}</span>
                </h2>
                <Users size={20} className="text-[var(--text-muted)]" />
              </div>

              {contributions.length === 0 ? (
                <div className="py-12 px-8 bg-[var(--bg-surface)] rounded-[2rem] border-2 border-dashed border-[var(--border-color)] text-center">
                  <p className="text-[var(--text-muted)] font-bold uppercase tracking-widest text-[10px]">No action recorded yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contributions.slice(0, 6).map((c, i) => (
                    <div key={i} className="p-6 bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] flex items-center justify-between group hover:border-green-500 transition-colors theme-transition">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 font-black text-xs">
                          {c.email.charAt(0).toUpperCase()}
                        </div>
                        <div className="max-w-[120px]">
                          <p className="text-sm font-black text-[var(--text-primary)] truncate">{c.email.split('@')[0]}</p>
                          <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase">{new Date(c.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <p className="text-lg font-black text-[var(--text-primary)] group-hover:text-green-600 transition-colors">${c.amount}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <Card className="p-10 border-none bg-[var(--bg-card)] shadow-2xl shadow-green-900/5 rounded-[2rem] theme-transition">
                <div className="mb-10">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Raised Progress</p>
                      <p className="text-4xl font-black text-gray-900">${totalCollected.toFixed(0)} <span className="text-lg text-gray-400">/ ${targetAmount}</span></p>
                    </div>
                    <p className="text-2xl font-black text-green-600">{progressPercentage.toFixed(0)}%</p>
                  </div>
                  <div className="h-4 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                    <Motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    disabled={isGoalReached}
                    className="w-full py-5 text-lg font-black rounded-2xl shadow-xl shadow-green-500/20"
                  >
                    {isGoalReached ? 'Fully Resolved' : 'Contribute Resolution'}
                  </Button>
                  <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    SECURE PAYMENTS ENABLED
                  </p>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-50 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-900 uppercase tracking-wider">Trusted Resolution</p>
                    <p className="text-[10px] text-gray-500 font-bold leading-tight">Vetted by local community leaders for impact accuracy.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-none bg-green-600 text-white rounded-[2.5rem] shadow-xl shadow-green-600/20">
                <h4 className="text-xl font-black mb-4 tracking-tight leading-tight">Want to help differently?</h4>
                <p className="text-green-50 font-medium text-sm leading-relaxed mb-6 italic">
                  "Citizen science is our strongest tool. Share this report with local representatives to expedite restoration."
                </p>
                <Button variant="outline" className="w-full border-green-400 text-white hover:bg-green-700 rounded-xl font-black">
                  Official Share
                </Button>
              </Card>
            </div>
          </div>
        </div>

        {/* Related Items Section */}
        <section className="mt-32 pt-20 border-t border-gray-100">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-widest uppercase text-center md:text-left">Adjacent reports.</h2>
            </div>
            <Button variant="link" onClick={() => navigate('/all-issues')} className="font-black">See all &rarr;</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loadingRelated ? (
              [1, 2, 3].map(i => <IssueCardSkeleton key={i} />)
            ) : (
              relatedIssues.map(item => (
                <IssueCard key={item._id || item.id} issue={item} onSeeDetails={(it) => navigate(`/issue-details/${it._id || it.id}`)} />
              ))
            )}
          </div>
        </section>
      </div>

      <ContributionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        issue={issue}
        onSubmit={handleContributionSubmit}
        user={user}
      />
    </div>
  );
}
