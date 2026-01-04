import React, { useEffect } from 'react';
import { CloudLightning, MapPin, Camera, AlertTriangle } from 'lucide-react';
import Button from '../components/ui/Button';

export default function ServicesReporting() {
  useEffect(() => {
    document.title = 'Citizen Reporting Service | EcoFine';
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] pt-32 pb-20 px-6 theme-transition">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-green-600 mb-4">
            EcoFine Services
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tighter mb-4">
            Citizen Reporting
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-medium max-w-3xl">
            A streamlined flow that lets any resident capture, geolocate, and submit an environmental issue in under a minute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            {
              icon: CloudLightning,
              title: 'Fast submissions',
              body: 'Pre-filled categories and smart defaults reduce friction so more issues make it into the system.'
            },
            {
              icon: MapPin,
              title: 'Location aware',
              body: 'Every report is stored with precise coordinates so teams can plan routes and actions efficiently.'
            },
            {
              icon: Camera,
              title: 'Rich evidence',
              body: 'Support photos and descriptions that help validators understand severity at a glance.'
            },
            {
              icon: AlertTriangle,
              title: 'Priority flagging',
              body: 'Critical issues can be highlighted for immediate attention from moderators and admins.'
            }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600">
                <item.icon size={24} />
              </div>
              <div>
                <h2 className="text-lg font-black text-[var(--text-primary)] mb-1.5">
                  {item.title}
                </h2>
                <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-black text-[var(--text-primary)] mb-12 tracking-tight text-center">
            The Reporting Lifecycle
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Capture', desc: 'Take a photo of the environmental issue.' },
              { step: '02', title: 'Geotag', desc: 'Automatic GPS tagging for precise location.' },
              { step: '03', title: 'Categorize', desc: 'Select waste type and severity level.' },
              { step: '04', title: 'Submit', desc: 'Instant upload to the community feed.' }
            ].map((s, i) => (
              <div key={i} className="relative p-8 bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] group hover:border-green-500 transition-colors">
                <span className="absolute -top-4 -left-4 w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center font-black text-xs shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
                  {s.step}
                </span>
                <h3 className="text-xl font-black text-[var(--text-primary)] mb-3 mt-2">{s.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[4rem] bg-gradient-to-br from-green-500 to-green-600 p-12 md:p-20 text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Make Your First Report</h2>
            <p className="text-xl text-green-50 font-medium mb-10 max-w-2xl mx-auto opacity-90">
              Join thousands of citizens who are already cleaning their neighborhoods using the EcoFine reporting engine.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                variant="outline"
                className="px-10 py-4 bg-white text-green-600 border-none hover:bg-green-50 font-black"
                onClick={() => window.location.href = '/addIssues'}
              >
                Go to Reporter
              </Button>
              <Button
                variant="outline"
                className="px-10 py-4 bg-green-400/20 border-white/20 text-white hover:bg-green-400/30 font-black"
                onClick={() => window.location.href = '/contact'}
              >
                Enterprise Inquiry
              </Button>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 -ml-40 -mt-40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 -mr-40 -mb-40 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}

