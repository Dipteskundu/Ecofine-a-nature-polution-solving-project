import React from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Trash2 } from 'lucide-react';
import Button from './ui/Button';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, itemName, loading }) {
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
            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="p-10 text-center">
              <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-red-500">
                <AlertTriangle size={40} />
              </div>

              <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
                Are you sure?
              </h2>

              <p className="text-gray-500 font-medium mb-10 leading-relaxed">
                You are about to delete <span className="text-gray-900 font-bold">"{itemName}"</span>. This action is permanent and cannot be reversed.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={loading}
                  className="rounded-2xl py-4 font-black"
                >
                  No, Keep it
                </Button>
                <Button
                  onClick={onConfirm}
                  disabled={loading}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-2xl py-4 font-black shadow-xl shadow-red-500/20"
                >
                  {loading ? 'Deleting...' : 'Yes, Delete'}
                </Button>
              </div>
            </div>
          </Motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
