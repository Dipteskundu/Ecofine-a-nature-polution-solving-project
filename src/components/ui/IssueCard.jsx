import React, { useState } from 'react';
import { ArrowRight, MapPin, Calendar, AlertCircle, Eye } from 'lucide-react';
import Card from './Card';
import Button from './Button';
import { motion as Motion } from 'framer-motion';

const IssueCard = ({ issue, onSeeDetails }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <Motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h-full"
        >
            <Card
                className="h-full flex flex-col group relative overflow-hidden p-0 border-none shadow-sm bg-[var(--bg-card)] rounded-[2.5rem] theme-transition"
                hoverEffect={true}
                onClick={() => onSeeDetails(issue)}
            >
                {/* Visual Header */}
                <div className="relative h-56 w-full overflow-hidden">
                    <div className={`absolute inset-0 bg-[var(--bg-surface)] animate-pulse ${imageLoaded ? 'hidden' : 'block'}`} />
                    <img
                        src={imageError ? 'https://via.placeholder.com/600x400?text=No+Photo' : issue.image}
                        alt={issue.title}
                        loading="lazy"
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageError(true)}
                        className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
                    />

                    {/* Floating Overlays */}
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[var(--bg-header)] backdrop-blur-md rounded-full text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest shadow-lg border border-white/20">
                            {issue.category}
                        </span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                            <Eye size={24} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 flex-col p-8">
                    {/* Context Header */}
                    <div className="flex items-center gap-2 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-3">
                        <span className="text-green-600 font-bold">{issue.category}</span>
                        <span>•</span>
                        <span>{new Date(issue.createdAt || Date.now()).toLocaleDateString()}</span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-black text-[var(--text-primary)] mb-2 line-clamp-1 tracking-tight group-hover:text-green-600 transition-colors">
                        {issue.title}
                    </h3>

                    <p className="text-[var(--text-secondary)] text-sm font-medium mb-6 line-clamp-2 leading-relaxed flex-grow">
                        {issue.description}
                    </p>

                    {/* Metadata Footer */}
                    <div className="flex items-center justify-between pt-6 border-t border-[var(--border-color)]">
                        <div className="flex items-center gap-2 overflow-hidden">
                            <MapPin className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-xs font-bold text-[var(--text-primary)] truncate uppercase tracking-wider">{issue.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-black text-[var(--text-primary)] uppercase">
                            <span className="text-[var(--text-muted)]">$</span>{issue.amount || 0}
                        </div>
                    </div>
                </div>
            </Card>
        </Motion.div>
    );
};

export default IssueCard;
