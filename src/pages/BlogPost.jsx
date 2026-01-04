import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { ArrowLeft, Clock, Share2, Twitter, Facebook, Tag } from 'lucide-react';
import Button from '../components/ui/Button';
import { BLOG_POSTS } from '../constants/blogData';

export default function BlogPost() {
    const { id } = useParams();
    const post = BLOG_POSTS.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
        if (post) {
            document.title = `${post.title} | EcoFine Journal`;
        }
    }, [post]);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--bg-page)] theme-transition">
                <div className="text-center">
                    <h1 className="text-4xl font-black mb-4">Post not found</h1>
                    <Link to="/blog">
                        <Button variant="outline">Back to Journal</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--bg-page)] pt-32 pb-20 theme-transition">
            <div className="max-w-4xl mx-auto px-6">
                <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--text-secondary)] hover:text-green-600 transition-colors mb-12 group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Journal
                </Link>

                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-center gap-4 text-xs font-bold text-green-600 mb-6 uppercase tracking-widest">
                        <span className="bg-green-50 px-3 py-1 rounded-full">{post.category}</span>
                        <span className="text-gray-400 flex items-center gap-1.5"><Clock size={12} /> 5 min read</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] tracking-tighter leading-tight mb-8">
                        {post.title}
                    </h1>

                    <div className="mb-12 rounded-[2rem] overflow-hidden shadow-2xl">
                        <img src={post.image} alt={post.title} className="w-full h-[400px] object-cover" />
                    </div>

                    <div className="flex items-center justify-between py-8 border-y border-[var(--border-color)] mb-12">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-600 font-bold">
                                {post.author.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-black text-[var(--text-primary)]">{post.author}</p>
                                <p className="text-xs text-[var(--text-secondary)] font-bold">{post.date} • EcoFine Contributor</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="p-2.5 bg-[var(--bg-surface)] rounded-xl hover:text-blue-500 transition-colors border border-[var(--border-color)]"><Twitter size={18} /></button>
                            <button className="p-2.5 bg-[var(--bg-surface)] rounded-xl hover:text-blue-700 transition-colors border border-[var(--border-color)]"><Facebook size={18} /></button>
                            <button className="p-2.5 bg-[var(--bg-surface)] rounded-xl hover:text-green-500 transition-colors border border-[var(--border-color)]"><Share2 size={18} /></button>
                        </div>
                    </div>

                    <div className="prose prose-lg prose-green max-w-none font-medium text-[var(--text-secondary)] leading-loose">
                        <p className="text-xl text-[var(--text-primary)] font-bold mb-8">
                            {post.excerpt}
                        </p>
                        <p className="mb-6">
                            Environmental action is no longer a choice—it is a collective responsibility. At EcoFine, we believe that every report is a step toward a cleaner world. This article explores how individual contributions bridge the gap between digital awareness and local restoration.
                        </p>
                        <div className="my-12 p-8 bg-[var(--bg-card)] rounded-3xl border-l-4 border-green-500 italic text-xl font-bold text-[var(--text-primary)]">
                            "The best time to plant a tree was 20 years ago. The second best time is now. The same applies to reporting environmental issues."
                        </div>
                        <p className="mb-6">
                            We've seen communities transform illegal dumpsites into playgrounds, and polluted streams into vibrant ecosystems, all starting with a single report on our platform. The power of change is literally in your hands.
                        </p>
                    </div>

                    <div className="mt-20 pt-12 border-t border-[var(--border-color)]">
                        <h4 className="text-xl font-black text-[var(--text-primary)] mb-8">Related Discussions</h4>
                        <div className="p-8 bg-[var(--bg-card)] rounded-[2rem] border border-[var(--border-color)]">
                            <textarea
                                placeholder="Share your thoughts on this story..."
                                className="w-full p-6 bg-[var(--bg-page)] border border-[var(--border-color)] rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20"
                                rows={4}
                            />
                            <div className="flex justify-end mt-4">
                                <Button variant="primary" className="px-8 py-3 text-sm font-black">Post Comment</Button>
                            </div>
                        </div>
                    </div>
                </Motion.div>
            </div>
        </div>
    );
}
