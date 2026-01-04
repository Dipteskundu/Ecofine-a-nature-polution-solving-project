import React from 'react';
import Card from './Card';

const IssueCardSkeleton = () => {
    return (
        <Card className="h-full flex flex-col p-0 border-none shadow-sm bg-[var(--bg-card)] rounded-[2.5rem] overflow-hidden">
            {/* Image Placeholder */}
            <div className="h-56 w-full bg-[var(--bg-surface)] animate-pulse"></div>

            <div className="flex flex-1 flex-col p-8 space-y-4">
                {/* Meta Header Placeholder */}
                <div className="flex items-center gap-2">
                    <div className="h-2 w-16 bg-[var(--bg-surface)] rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-[var(--bg-surface)] rounded-full animate-pulse"></div>
                    <div className="h-2 w-20 bg-[var(--bg-surface)] rounded-full animate-pulse"></div>
                </div>

                {/* Title Placeholder */}
                <div className="h-8 w-3/4 bg-[var(--bg-surface)] rounded-2xl animate-pulse"></div>

                {/* Description Placeholder */}
                <div className="space-y-3 pt-2">
                    <div className="h-3 w-full bg-[var(--bg-surface)]/50 rounded-full animate-pulse"></div>
                    <div className="h-3 w-5/6 bg-[var(--bg-surface)]/50 rounded-full animate-pulse"></div>
                </div>

                {/* Footer Placeholder */}
                <div className="pt-8 border-t border-[var(--border-color)] flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 bg-[var(--bg-surface)] rounded-full animate-pulse"></div>
                        <div className="h-3 w-24 bg-[var(--bg-surface)] rounded-full animate-pulse"></div>
                    </div>
                    <div className="h-4 w-12 bg-[var(--bg-surface)] rounded-full animate-pulse"></div>
                </div>
            </div>
        </Card>
    );
};

export default IssueCardSkeleton;
