import React, { useEffect } from 'react';
import { Users, HeartHandshake, Building2, Globe2 } from 'lucide-react';
import Button from '../components/ui/Button';

export default function ServicesPartnerships() {
  useEffect(() => {
    document.title = 'Partnership Programs | EcoFine';
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] pt-32 pb-20 px-6 theme-transition">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-green-600 mb-4">
            EcoFine Services
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tighter mb-4">
            Partnership Programs
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-medium max-w-3xl">
            Structured collaboration options for NGOs, schools, and companies who want to align their climate efforts with measurable community outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            {
              icon: HeartHandshake,
              title: 'NGO collaboration',
              body: 'Coordinate cleanups and awareness drives while EcoFine handles digital reporting and tracking.'
            },
            {
              icon: Building2,
              title: 'Corporate programs',
              body: 'Offer employees verified volunteering hours and impact dashboards as part of ESG initiatives.'
            },
            {
              icon: Users,
              title: 'Campus partners',
              body: 'Enable student-led environmental clubs to log actions and showcase results over semesters.'
            },
            {
              icon: Globe2,
              title: 'Global coalitions',
              body: 'Share anonymized learnings with international networks to accelerate best practices.'
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
          <h2 className="text-3xl font-black text-[var(--text-primary)] mb-10 tracking-tight text-center">
            Our Partnership Ecosystem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Community Allies', icon: Users, desc: 'Local grassroots organizations and student clubs using EcoFine to organize weekly cleanups.' },
              { title: 'Corporate Stewards', icon: Building2, desc: 'Companies integrating EcoFine into their CSR programs to track employee volunteer impact.' },
              { title: 'Gov Partners', icon: Globe2, desc: 'Municipal bodies connecting EcoFine reporting directly into city maintenance workflows.' }
            ].map((tier, i) => (
              <div key={i} className="p-8 bg-[var(--bg-card)] rounded-[2.5rem] border border-[var(--border-color)] text-center group hover:bg-green-500 hover:text-white transition-all duration-500">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-600 group-hover:bg-white/20 group-hover:text-white">
                  <tier.icon size={32} />
                </div>
                <h3 className="text-xl font-black mb-3">{tier.title}</h3>
                <p className="text-sm font-medium opacity-80 leading-relaxed">{tier.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[3rem] bg-[var(--bg-card)] border border-[var(--border-color)] p-12 md:p-20 relative overflow-hidden text-center">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl font-black text-[var(--text-primary)] mb-6 tracking-tight">
              Scale Your Impact Today
            </h2>
            <p className="text-lg text-[var(--text-secondary)] font-medium mb-10 leading-relaxed">
              Whether you are a team of 5 or 5,000, we have the partnership model that fits your mission and geographic reach.
            </p>
            <Button
              variant="primary"
              className="px-12 py-5 font-black text-lg"
              onClick={() => window.location.href = '/contact'}
            >
              Start Collaboration
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 -mr-32 -mt-32 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 -ml-32 -mb-32 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}

