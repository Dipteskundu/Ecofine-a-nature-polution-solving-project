import React from 'react';
import { motion as Motion } from 'framer-motion';
import Button from './Button';
import { Inbox } from 'lucide-react';

export default function EmptyState(props) {
    const {
        title = "No data found",
        message = "It looks like there's nothing here yet.",
        actionLabel,
        onAction,
        icon: StateIcon = Inbox
    } = props;

    return (
        <Motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 px-6 text-center"
        >
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 text-gray-300">
                <StateIcon size={40} />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight">
                {title}
            </h3>
            <p className="text-gray-500 font-medium max-w-sm mb-8">
                {message}
            </p>
            {actionLabel && (
                <Button variant="primary" onClick={onAction} className="px-8">
                    {actionLabel}
                </Button>
            )}
        </Motion.div>
    );
}
