import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Ghost } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import Button from '../components/ui/Button';

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '404 - Missing Planet | EcoFine';
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center px-6 relative overflow-hidden theme-transition">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="text-center max-w-2xl relative z-10">
        <Motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-[var(--bg-surface)] rounded-[2rem] mb-12 shadow-sm">
            <Ghost className="w-12 h-12 text-[var(--text-muted)]" />
          </div>

          <p className="text-xs font-black text-green-600 uppercase tracking-[0.4em] mb-4">Error Code 404</p>
          <h1 className="text-6xl md:text-8xl font-black text-[var(--text-primary)] mb-8 tracking-tighter leading-none">
            Lost in the <span className="text-[var(--text-muted)]">Void.</span>
          </h1>

          <p className="text-xl text-gray-500 font-medium leading-relaxed mb-12 max-w-lg mx-auto italic">
            "The initiative you're searching for hasn't been filed yet, or the environmental report was relocated to a different sector."
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="px-10 py-5 rounded-2xl font-black text-lg border-[var(--border-color)]"
              icon={ArrowLeft}
            >
              Revert Path
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/')}
              className="px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-500/20"
              icon={Home}
            >
              EcoFine Core
            </Button>
          </div>
        </Motion.div>
      </div>
    </div>
  );
}
