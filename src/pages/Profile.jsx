import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Image as ImageIcon, Save } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = 'Update Profile | EcoFine';
  }, []);

  useEffect(() => {
    setDisplayName(user?.displayName || '');
    setPhotoURL(user?.photoURL || '');
  }, [user]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!displayName.trim()) {
      toast.error('Please enter your name');
      return;
    }

    setSaving(true);
    try {
      await updateUserProfile(displayName.trim(), photoURL.trim() || null);
      toast.success('Profile updated successfully');
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] pt-28 pb-16 px-4 sm:px-6 lg:px-8 theme-transition">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--text-secondary)] hover:text-primary px-4 py-2 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-xs font-black tracking-[0.25em] uppercase text-green-600 hidden sm:inline">
            Account
          </span>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="px-6 sm:px-10 pt-8 pb-6 border-b border-[var(--border-color)] flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center text-white text-2xl font-black overflow-hidden border-4 border-white shadow-md">
                {photoURL ? (
                  <img
                    src={photoURL}
                    alt={displayName || 'User'}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/80?text=User'; }}
                  />
                ) : (
                  <span>{(displayName || user?.email || 'E')[0].toUpperCase()}</span>
                )}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight mb-1">
                  {displayName || 'EcoFine Member'}
                </h1>
                <p className="text-sm font-medium text-[var(--text-secondary)] flex items-center gap-2">
                  <Mail className="w-4 h-4 text-green-500" />
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-6 sm:px-10 py-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                  Display Name
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your name"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] text-sm font-medium outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500/60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                  Photo URL
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">
                    <ImageIcon className="w-4 h-4" />
                  </span>
                  <input
                    type="url"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] text-sm font-medium outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500/60"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <p className="text-xs text-[var(--text-secondary)] font-medium max-w-md">
                Update your name and photo so other community members can recognize you in reports and contributions.
              </p>
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full sm:w-auto px-8"
                icon={Save}
                loading={saving}
              >
                Save changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

