import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../constants/blogData';
import Card from '../components/ui/Card';

export default function BlogCategory() {
  const { slug } = useParams();

  const metaData = {
    'success-stories': {
      title: 'Success Stories',
      subtitle: 'Real wins from the EcoFine community',
      description: 'Explore detailed case studies showing how reported issues moved from alerts to fully resolved success stories.'
    },
    'guides-tips': {
      title: 'Guides & Tips',
      subtitle: 'Practical advice for everyday impact',
      description: 'Step-by-step guides, checklists, and best practices to help you reduce waste and organize local actions.'
    }
  };

  const currentMeta = metaData[slug] || {
    title: 'Journal',
    subtitle: 'EcoFine Insights',
    description: 'Browse curated content from the EcoFine journal.'
  };

  const filteredPosts = BLOG_POSTS.filter(post => post.slug === slug);

  useEffect(() => {
    document.title = `${currentMeta.title} | EcoFine Blog`;
    window.scrollTo(0, 0);
  }, [currentMeta.title]);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] pt-32 pb-20 px-6 theme-transition">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-[var(--text-secondary)] hover:text-green-600 transition-colors mb-12 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Journal
        </Link>

        <div className="mb-16">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-green-600 mb-4">
            Category: {currentMeta.title}
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-[var(--text-primary)] tracking-tighter mb-4 leading-none">
            {currentMeta.subtitle}
          </h1>
          <p className="text-xl text-[var(--text-secondary)] font-medium max-w-2xl">
            {currentMeta.description}
          </p>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post, i) => (
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
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                      <span className="text-green-600 font-black">{post.category}</span>
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
        ) : (
          <div className="py-20 text-center bg-[var(--bg-card)] rounded-[3rem] border border-[var(--border-color)]">
            <h2 className="text-2xl font-black text-[var(--text-primary)] mb-2">No articles found</h2>
            <p className="text-[var(--text-secondary)] font-medium">We're still gathering stories for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

