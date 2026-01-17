import React from "react";
import { Leaf, Github, Twitter, Linkedin, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[var(--bg-page)] text-[var(--text-secondary)] py-16 mt-20 border-t border-[var(--border-color)] theme-transition">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand Section */}
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center space-x-2 mb-6 group">
            <div className="p-2 bg-primary rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-green-500/20">
              <Leaf className="text-white w-5 h-5" />
            </div>
            <span className="text-2xl font-black text-[var(--text-primary)] tracking-tighter">EcoFine</span>
          </Link>
          <p className="text-sm leading-relaxed mb-6">
            Empowering communities to report, resolve, and recover environmental issues. Built for a sustainable future.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 bg-[var(--bg-card)] rounded-full hover:text-primary transition-colors border border-[var(--border-color)]"><Twitter size={18} /></a>
            <a href="#" className="p-2 bg-[var(--bg-card)] rounded-full hover:text-primary transition-colors border border-[var(--border-color)]"><Github size={18} /></a>
            <a href="#" className="p-2 bg-[var(--bg-card)] rounded-full hover:text-primary transition-colors border border-[var(--border-color)]"><Linkedin size={18} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-[var(--text-primary)] font-black mb-6 text-sm uppercase tracking-widest">Platform</h3>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/all-issues" className="hover:text-green-600 transition-colors">Explore Issues</Link></li>
            <li><Link to="/services" className="hover:text-green-600 transition-colors">Platform Services</Link></li>
            <li><Link to="/blog" className="hover:text-green-600 transition-colors">Action Blog</Link></li>
            <li><Link to="/about" className="hover:text-green-600 transition-colors">Our Mission</Link></li>
          </ul>
        </div>

        {/* Help & Support */}
        <div>
          <h3 className="text-[var(--text-primary)] font-black mb-6 text-sm uppercase tracking-widest">Resources</h3>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/contact" className="hover:text-green-600 transition-colors">Support Center</Link></li>
            <li><Link to="/faq" className="hover:text-green-600 transition-colors">Help & FAQ</Link></li>
            <li><Link to="/privacy" className="hover:text-green-600 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/privacy#terms" className="hover:text-green-600 transition-colors">Terms of Use</Link></li>
          </ul>
        </div>

        {/* Impact Message */}
        <div className="bg-primary/5 p-8 pb-0 rounded-[30px] border border-primary/20">
          <h4 className="text-primary font-black mb-3 flex items-center gap-2">
            <Heart size={16} className="fill-primary text-primary" />
            Support Action
          </h4>
          <p className="text-xs leading-relaxed text-[var(--text-secondary)] font-medium">
            Every report counts. Join 4,000+ citizens making the world a cleaner place today.
          </p>
          <Link to="/addIssues" className="mt-4 block text-center bg-primary text-white py-2.5 rounded-xl font-bold text-xs hover:bg-primary-hover transition-colors shadow-lg shadow-green-500/10">
            Report New Issue
          </Link>
        </div>
      </div>

      <div className="-mb-10 max-w-7xl mx-auto  px-6 mt-8 pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">
        <p>© {new Date().getFullYear()} EcoFine Core. All Rights Reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-primary transition-colors">Security</a>
          <a href="#" className="hover:text-primary transition-colors">Status</a>
          <a href="#" className="hover:text-primary transition-colors">API</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
