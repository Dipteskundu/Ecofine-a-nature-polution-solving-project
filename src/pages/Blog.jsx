import React, { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag, Share2, Search } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Link } from 'react-router-dom';

import { BLOG_POSTS } from '../constants/blogData';

export default function Blog() {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        document.title = 'Community Blog | EcoFine';
    }, []);

    const featured = BLOG_POSTS.find(p => p.featured);
    const others = BLOG_POSTS.filter(p => !p.featured);

    const excludedMainIds = [5];

    const gridPosts = (searchTerm ? BLOG_POSTS : others).filter(
        (post) => !excludedMainIds.includes(post.id)
    );

    return (
        <div className="min-h-screen bg-[var(--bg-page)] pt-32 pb-20 px-6 theme-transition">
            <div className="max-w-7xl mx-auto">
                {/* Blog Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <Motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block px-4 py-1.5 mb-6 text-xs font-bold text-green-600 bg-green-50 rounded-full uppercase tracking-widest border border-green-100"
                        >
                            Insights & Stories
                        </Motion.div>
                        <h1 className="text-5xl md:text-6xl font-black text-[var(--text-primary)] tracking-tighter leading-none mb-6">
                            The EcoFine <span className="text-green-500 underline decoration-green-500/30">Journal.</span>
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] font-medium">
                            Daily coverage of environmental action, technological breakthroughs, and the heroes of our community.
                        </p>
                    </div>
                    <div className="w-full md:w-80">
                        <Input
                            icon={Search}
                            placeholder="Search articles..."
                            className="shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Featured Post */}
                {featured && !searchTerm && (
                    <Motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-20"
                    >
                        <Card className="p-0 border-none shadow-2xl bg-[var(--bg-card)] overflow-hidden group">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="relative overflow-hidden h-80 lg:h-full">
                                    <img
                                        src={featured.image}
                                        alt={featured.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute top-6 left-6 px-3 py-1 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                                        Featured Story
                                    </div>
                                </div>
                                <div className="p-10 md:p-16 flex flex-col justify-center">
                                    <div className="flex items-center gap-4 text-xs font-bold text-gray-500 mb-6 uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5 text-green-600 font-black"><Tag size={12} /> {featured.category}</span>
                                        <span className="flex items-center gap-1.5"><Calendar size={12} /> {featured.date}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-6 tracking-tight leading-tight">
                                        {featured.title}
                                    </h2>
                                    <p className="text-lg text-[var(--text-secondary)] font-medium leading-relaxed mb-8">
                                        {featured.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto pt-8 border-t border-[var(--border-color)]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[var(--bg-surface)] rounded-full" />
                                            <span className="text-sm font-bold text-[var(--text-primary)]">{featured.author}</span>
                                        </div>
                                        <Link to={`/blog/${featured.id}`}>
                                            <Button variant="outline" icon={ArrowRight}>Read Story</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Motion.div>
                )}

                {/* Categories Bar */}
                <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
                    {['All Stories', 'Sustainability', 'Technology', 'Community', 'Success Stories', 'Guides'].map((cat, i) => (
                        <button
                            key={i}
                            className={`px-5 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${i === 0
                                ? 'bg-gray-900 text-white shadow-xl'
                                : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {gridPosts.map((post, i) => (
                        <Motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="p-0 border-none shadow-sm bg-[var(--bg-card)] overflow-hidden h-full flex flex-col group hover:shadow-xl transition-shadow">
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-[var(--bg-card)]/90 backdrop-blur-md rounded-full text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest border border-[var(--border-color)]">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                                        <span className="flex items-center gap-1.5 font-black text-green-600"><Share2 size={12} /> Share</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 tracking-tight group-hover:text-green-500 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed mb-8 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-[var(--border-color)]">
                                        <span className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">{post.author}</span>
                                        <Link to={`/blog/${post.id}`}>
                                            <ArrowRight size={18} className="text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        </Motion.div>
                    ))}
                </div>

                {/* Newsletter In-line */}
                <div className="mt-32 p-12 md:p-20 bg-green-500 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
                    <div className="relative z-10 max-w-lg">
                        <h2 className="text-4xl font-black mb-4 tracking-tighter">Never miss a story.</h2>
                        <p className="text-green-50 font-medium">Join 12,000+ environmentalists receiving our weekly digest.</p>
                    </div>
                    <div className="relative z-10 w-full md:w-auto flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-md min-w-[280px]"
                        />
                        <Button variant="primary" className="bg-purple-300 text-black hover:bg-gray-500 shadow-none">Subscribe</Button>
                    </div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 -mr-32 -mt-32 rounded-full blur-3xl opacity-50" />
                </div>
            </div>
        </div>
    );
}
