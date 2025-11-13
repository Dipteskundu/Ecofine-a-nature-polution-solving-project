import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Edit, Trash2, Eye, Plus } from 'lucide-react';
import UpdateIssueModal from '../components/UpdateIssueModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import toast from 'react-hot-toast';

export default function MyIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'My Issues | EcoFine';
  }, []);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    let active = true;
    const fetchIssues = async () => {
      try {
        const res = await fetch('http://localhost:3000/issues');
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.result || []);
        const userIssues = list.filter((i) => (i.email && i.email === user.email) || (i.userId && i.userId === user.uid));
        userIssues.sort((a, b) => {
          const dateA = new Date(a.date || a.createdAt || 0);
          const dateB = new Date(b.date || b.createdAt || 0);
          return dateB - dateA;
        });
        if (active) setIssues(userIssues.map((i) => ({ ...i, id: i._id || i.id })));
      } catch (err) {
        console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchIssues();
    return () => { active = false; };
  }, [user]);

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
      const id = selectedIssue._id || selectedIssue.id;
      const res = await fetch(`http://localhost:3000/issues/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updatedData, updatedAt: new Date().toISOString() })
      });
      if (!res.ok) throw new Error('Failed to update issue');
      setIssues((prev) => prev.map((issue) => (issue.id === id ? { ...issue, ...updatedData } : issue)));
      toast.success('Issue updated successfully!');
      setUpdateModalOpen(false);
      setSelectedIssue(null);
    } catch (error) {
      console.error('Error updating issue:', error);
      toast.error('Failed to update issue. Please try again.');
      throw error;
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const id = selectedIssue._id || selectedIssue.id;
      const res = await fetch(`http://localhost:3000/issues/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete issue');
      setIssues((prev) => prev.filter((issue) => issue.id !== id));
      toast.success('Issue deleted successfully!');
      setDeleteModalOpen(false);
      setSelectedIssue(null);
    } catch (error) {
      console.error('Error deleting issue:', error);
      toast.error('Failed to delete issue. Please try again.');
    }
  };

  const getCategoryColor = (category) => {
    const categoryMap = {
      'Garbage': 'bg-red-500',
      'Illegal Construction': 'bg-orange-500',
      'Broken Public Property': 'bg-yellow-500',
      'Road Damage': 'bg-blue-500',
      'Water Issues': 'bg-cyan-500',
      'Waste Management': 'bg-red-500',
      'Tree Plantation': 'bg-green-500',
      'Infrastructure': 'bg-yellow-500'
    };
    return categoryMap[category] || 'bg-gray-500';
  };

  const getStatusBadge = (status) => {
    if (status === 'ongoing') {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
          Ongoing
        </span>
      );
    } else if (status === 'ended') {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          Ended
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
        {status || 'Ongoing'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your issues...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Issues
          </h1>
          <p className="text-gray-600 text-lg">
              Manage all issues you have reported
            </p>
          </div>
          <button
            onClick={() => navigate('/addIssues')}
            className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Issue</span>
          </button>
        </div>
        
        {issues.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">You haven't reported any issues yet.</p>

          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Issue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {issues.map((issue) => (
                    <tr key={issue.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {issue.image && (
                            <img
                              className="h-12 w-12 rounded-lg object-cover mr-4"
                    src={issue.image}
                    alt={issue.title}
                    onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/48x48?text=No+Image';
                              }}
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {issue.title}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-1">
                              {issue.description}
                            </div>
                          </div>
                </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`${getCategoryColor(issue.category)} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                      {issue.category}
                    </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {issue.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        ${issue.amount || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(issue.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {issue.date || new Date(issue.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => navigate('/issue-details', { state: { issue } })}
                            className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleUpdate(issue)}
                            className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded transition-colors"
                            title="Update Issue"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                  <button
                            onClick={() => handleDelete(issue)}
                            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded transition-colors"
                            title="Delete Issue"
                  >
                            <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
          </div>
        )}
      </div>

      {/* Update Modal */}
      <UpdateIssueModal
        isOpen={updateModalOpen}
        onClose={() => {
          setUpdateModalOpen(false);
          setSelectedIssue(null);
        }}
        issue={selectedIssue}
        onUpdate={handleUpdateSubmit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedIssue(null);
        }}
        onConfirm={handleDeleteConfirm}
        itemName={selectedIssue?.title || 'this issue'}
        loading={false}
      />
    </div>
  );
}
