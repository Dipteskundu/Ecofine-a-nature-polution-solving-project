import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Edit, Trash2, Eye, Plus } from 'lucide-react';
import UpdateIssueModal from '../components/UpdateIssueModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import EmptyState from '../components/ui/EmptyState';
import { motion as Motion } from 'framer-motion';

export default function MyIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    document.title = 'My Reports | EcoFine';
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchMyIssues = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await axiosSecure.get(`/my-issues/${user.email}`);
        if (isMounted) {
          setIssues(Array.isArray(data) ? data : (data.result || []));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching my issues:', error);
        toast.error('Failed to fetch your issues');
        if (isMounted) setLoading(false);
      }
    };
    fetchMyIssues();
    return () => { isMounted = false; };
  }, [user, axiosSecure]);

  const handleUpdate = (issue) => {
    setSelectedIssue(issue);
    setUpdateModalOpen(true);
  };

  const handleDelete = (issue) => {
    setSelectedIssue(issue);
    setDeleteModalOpen(true);
  };

  const handleUpdateSubmit = async (updatedData) => {
    try {
      const issueId = selectedIssue._id || selectedIssue.id;
      if (!issueId) throw new Error("Invalid issue ID");

      await axiosSecure.put(`/issues/${issueId}`, updatedData);
      toast.success('Issue updated successfully!');

      setIssues(prev => prev.map(issue =>
        (issue._id === issueId || issue.id === issueId) ? { ...issue, ...updatedData } : issue
      ));

      setUpdateModalOpen(false);
      setSelectedIssue(null);
    } catch (error) {
      console.error('Error updating issue:', error);
      toast.error('Failed to update issue.');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const issueId = selectedIssue._id || selectedIssue.id;
      if (!issueId) throw new Error("Invalid issue ID");

      await axiosSecure.delete(`/issues/${issueId}`);
      toast.success('Deleted successfully');

      setIssues(prev => prev.filter(issue => (issue._id || issue.id) !== issueId));
      setDeleteModalOpen(false);
      setSelectedIssue(null);
    } catch (error) {
      console.error('Error deleting issue:', error);
      toast.error('Failed to delete issue.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-page)] pt-24 flex items-center justify-center theme-transition">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[var(--text-muted)] font-bold uppercase tracking-widest text-xs">Syncing your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] pt-32 pb-20 theme-transition">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tighter mb-2">My Reports.</h1>
            <p className="text-[var(--text-secondary)] font-medium">Manage and monitor the environmental issues you've flagged.</p>
          </div>
          <Button variant="primary" icon={Plus} onClick={() => navigate('/addIssues')} className="px-8 shadow-xl shadow-green-500/20 font-black">
            Report New Issue
          </Button>
        </div>

        {issues.length === 0 ? (
          <div className="bg-[var(--bg-card)] rounded-[2.5rem] border border-[var(--border-color)] p-12 theme-transition">
            <EmptyState
              title="Clean slate!"
              message="You haven't reported any issues yet. Be the eyes of your community and start today."
              actionLabel="Add First Issue"
              onAction={() => navigate('/addIssues')}
              icon={Plus}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues.map((issue, idx) => (
              <Motion.div
                key={issue._id || issue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="p-0 border-none shadow-sm bg-[var(--bg-card)] overflow-hidden group h-full flex flex-col theme-transition">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={issue.image || 'https://via.placeholder.com/400x300?text=No+Photo'}
                      alt={issue.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button onClick={() => navigate(`/issue-details/${issue._id || issue.id}`)} className="p-2 bg-[var(--bg-header)] rounded-xl backdrop-blur-md shadow-lg text-[var(--text-secondary)] hover:text-green-500 transition-colors">
                        <Eye size={18} />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                        {issue.status || 'Active'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                      <span className="text-green-600">{issue.category}</span>
                      <span>•</span>
                      <span>{new Date(issue.createdAt || Date.now()).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 line-clamp-1">{issue.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-6 font-medium leading-relaxed">{issue.description}</p>

                    <div className="mt-auto pt-6 border-t border-[var(--border-color)] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-black text-[var(--text-primary)] uppercase tracking-wider">
                        <span className="text-[var(--text-muted)]">$</span>{issue.amount || 0}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdate(issue)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(issue)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </Motion.div>
            ))}
          </div>
        )}
      </div>

      <UpdateIssueModal
        isOpen={updateModalOpen}
        onClose={() => { setUpdateModalOpen(false); setSelectedIssue(null); }}
        issue={selectedIssue}
        onUpdate={handleUpdateSubmit}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => { setDeleteModalOpen(false); setSelectedIssue(null); }}
        onConfirm={handleDeleteConfirm}
        itemName={selectedIssue?.title || 'this issue'}
        loading={false}
      />
    </div>
  );
}
