import React, { useEffect } from 'react';
import { BarChart3, PieChart, Activity, Radar } from 'lucide-react';
import Button from '../components/ui/Button';

export default function ServicesAnalytics() {
  useEffect(() => {
    document.title = 'Impact Analytics Service | EcoFine';
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] pt-32 pb-20 px-6 theme-transition">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-green-600 mb-4">
            EcoFine Services
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tighter mb-4">
            Data & Analytics
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-medium max-w-3xl">
            Transform raw community reports into actionable dashboards for operations teams, researchers, and decision-makers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            {
              icon: BarChart3,
              title: 'Hotspot analysis',
              body: 'Surface locations with recurring issues so you can prioritize structural fixes instead of one-off cleanups.'
            },
            {
              icon: PieChart,
              title: 'Category breakdowns',
              body: 'Understand the ratio of waste, water, air quality, and biodiversity concerns across your region.'
            },
            {
              icon: Activity,
              title: 'Trend monitoring',
              body: 'Track progress month over month and communicate impact back to the community and stakeholders.'
            },
            {
              icon: Radar,
              title: 'Risk forecasting',
              body: 'Identify patterns that hint at upcoming problem zones before they become emergencies.'
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[var(--bg-surface)] rounded-[3rem] p-10 md:p-16 border border-[var(--border-color)]">
          <div>
            <h2 className="text-3xl font-black text-[var(--text-primary)] mb-6 tracking-tight">
              Integrated Data Pipeline
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Community Ingest', desc: 'Every resident report is automatically cleaned and categorized for the analytics engine.' },
                { title: 'Admin Verification', desc: 'Authoritative oversight ensures that only verified environmental data impacts regional trends.' },
                { title: 'Stakeholder Export', desc: 'Generate PDF or CSV reports for city council meetings and environmental audits in one click.' }
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-black">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">{step.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] p-8 shadow-2xl flex flex-col justify-center">
              <div className="space-y-4">
                <div className="h-4 w-3/4 bg-green-500/10 rounded-full animate-pulse" />
                <div className="h-4 w-1/2 bg-blue-500/10 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="h-32 w-full bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)] flex items-center justify-center">
                  <BarChart3 className="text-green-500 w-12 h-12" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-10 bg-orange-500/10 rounded-xl" />
                  <div className="h-10 bg-purple-500/10 rounded-xl" />
                  <div className="h-10 bg-red-500/10 rounded-xl" />
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 px-4 py-2 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
              Live Feed
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button
            variant="primary"
            className="px-12 py-5 font-black text-lg shadow-xl shadow-green-500/20"
            onClick={() => window.location.href = '/contact'}
          >
            Get Custom Analytics Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

