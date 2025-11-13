import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { DollarSign, Calendar, Tag, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MyContribution() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch('http://localhost:3000/my-contribution');
        const data = await res.json();
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
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 flex items-center justify-center">
        <p className="text-gray-600">Login required to view your contributions.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Contribution</h1>
          <p className="text-gray-600">Only your own contributions are listed.</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading contributions...</p>
          </div>
        ) : contributions.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No contributions yet.</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {contributions.map((c, idx) => (
                    <tr key={c._id || idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span>{c.issueTitle}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-gray-500" />
                        <span>{c.category}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600 flex items-center space-x-2">
                        <DollarSign className="w-4 h-4" />
                        <span>${(c.amount || 0).toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{c.date ? new Date(c.date).toLocaleDateString() : ''}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
