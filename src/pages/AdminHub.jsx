import React from 'react';
import { Shield, Users, AlertTriangle, TrendingUp, Search } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function AdminHub() {
    return (
        <div className="min-h-screen bg-[var(--bg-page)] pt-24 pb-12 px-6 text-[var(--text-primary)] theme-transition">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">Admin Control Center</h1>
                        <p className="text-[var(--text-secondary)] mt-1">Manage environmental impact and community reporting.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" icon={Search}>Global Audit</Button>
                        <Button variant="primary">Security Report</Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Total Reports', value: '1,284', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
                        { label: 'Verified Issues', value: '852', icon: Shield, color: 'text-green-500', bg: 'bg-green-50' },
                        { label: 'Active Users', value: '4,102', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
                        { label: 'Monthly Growth', value: '+12.5%', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
                    ].map((stat, i) => (
                        <Card key={i} className="p-6 border-none shadow-sm bg-[var(--bg-card)]">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">{stat.label}</p>
                                    <p className="text-2xl font-black text-[var(--text-primary)]">{stat.value}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <Card className="p-0 overflow-hidden border-none shadow-md bg-[var(--bg-card)] theme-transition">
                    <div className="px-8 py-6 border-b border-[var(--border-color)] flex items-center justify-between">
                        <h3 className="text-lg font-bold text-[var(--text-primary)]">Recent Security Logs</h3>
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-widest">Live Monitoring</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[var(--bg-surface)] text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                                    <th className="px-8 py-4">Event Source</th>
                                    <th className="px-8 py-4">Action Taken</th>
                                    <th className="px-8 py-4">Timestamp</th>
                                    <th className="px-8 py-4">Severity</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-color)]">
                                {[
                                    { source: 'admin@eco.com', action: 'Auth Bypass (Demo Mode)', time: '2 mins ago', level: 'Low' },
                                    { source: 'system_core', action: 'DB Sync Complete', time: '15 mins ago', level: 'Neutral' },
                                    { source: 'firewall_v2', action: 'Prevented XSS Injection', time: '1 hour ago', level: 'High' },
                                    { source: 'user_4102', action: 'New Report Filed', time: '3 hours ago', level: 'Low' },
                                ].map((log, i) => (
                                    <tr key={i} className="text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] transition-colors">
                                        <td className="px-8 py-4 font-bold text-[var(--text-primary)]">{log.source}</td>
                                        <td className="px-8 py-4">{log.action}</td>
                                        <td className="px-8 py-4 text-xs">{log.time}</td>
                                        <td className="px-8 py-4">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${log.level === 'High' ? 'bg-red-50 text-red-600' :
                                                log.level === 'Low' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                {log.level}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}
