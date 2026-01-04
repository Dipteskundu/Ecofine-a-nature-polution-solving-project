import React, { useEffect } from 'react';
import { Shield, Lock, Eye, FileText, CheckCircle, Globe2 } from 'lucide-react';

export default function PrivacyPolicy() {
    useEffect(() => {
        document.title = 'Legal & Privacy | EcoFine';
    }, []);

    const sections = [
        {
            id: 'privacy',
            title: 'Privacy Policy',
            icon: Shield,
            content: `Your privacy is paramount at EcoFine. This policy outlines how we handle your personal information across our platform. We strictly adhere to data protection regulations and only collect information essential for providing our services. By using EcoFine, you consent to the practices described here. We maintain a principle of minimal data collection and maximum security.`
        },
        {
            id: 'data-tracking',
            title: 'Data Collection & Detailed Usage',
            icon: Eye,
            content: `We collect several types of information to provide and improve our service to you:
            \n• Personal Identifiers: Name, email address, and profile picture (via Google OAuth if opted) for account management.
            \n• Geospatial Data: Precise location data is requested ONLY when you submit a report to help local communities and authorities identify environmental issues.
            \n• Usage Data: Information on how you interact with our platform (e.g., reports submitted, contributions made) to enhance user experience.`
        },
        {
            id: 'cookies',
            title: 'Cookie Policy',
            icon: Globe2,
            content: `We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.`
        },
        {
            id: 'security',
            title: 'Advanced Security Measures',
            icon: Lock,
            content: `We implement a layered security approach including:
            \n• End-to-End Encryption: Sensitive data is encrypted during transit using SSL/TLS protocols.
            \n• Secure Authentication: We utilize Firebase Authentication for industry-standard user verification and session management.
            \n• Regular Audits: Our internal systems undergo routine security checks to prevent unauthorized access, alteration, or disclosure of your personal information.`
        },
        {
            id: 'user-rights',
            title: 'Your Data Rights',
            icon: CheckCircle,
            content: `Under various data protection laws (like GDPR), you have specific rights regarding your data:
            \n• Right of Access: You can request a copy of the personal data we hold about you.
            \n• Right to Rectification: You can ask us to correct any inaccurate or incomplete information.
            \n• Right to Erasure: You can request that we delete your personal data under certain conditions.
            \n• Right to Object: You can object to our processing of your personal data for direct marketing purposes.`
        },
        {
            id: 'terms',
            title: 'Terms of Use & Community Standards',
            icon: FileText,
            content: `Integrity is the core of EcoFine. Users must provide accurate, non-misleading information in all reports. Harassment, spam, or any form of malicious activity will result in immediate account suspension. We reserve the right to moderate and remove content that violates our community safety guidelines to maintain a healthy environment for all users.`
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-page)] pt-24 pb-20 px-6 theme-transition">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

                    {/* Sidebar Nav */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-4">
                            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4 mb-6">Legal Center</h2>
                            {sections.map(s => (
                                <a
                                    key={s.id}
                                    href={`#${s.id}`}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-[var(--text-secondary)] hover:text-green-600 hover:bg-green-50 transition-all group"
                                >
                                    <s.icon size={18} className="group-hover:scale-110 transition-transform" />
                                    {s.title}
                                </a>
                            ))}
                            <div className="mt-10 p-6 bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-color)]">
                                <p className="text-xs font-bold text-[var(--text-muted)] uppercase mb-2">Last Updated</p>
                                <p className="text-sm font-bold text-[var(--text-primary)]">January 20, 2026</p>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight mb-8">
                                Commitment to Transparency
                            </h1>
                            <p className="text-lg text-[var(--text-secondary)] font-medium mb-12 leading-relaxed">
                                EcoFine is built on trust. We believe that managing community data requires extreme care and honesty. This document outlines how we protect you and what we expect in return.
                            </p>

                            <div className="space-y-16">
                                {sections.map(s => (
                                    <section key={s.id} id={s.id} className="scroll-mt-32">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                                                <s.icon size={20} />
                                            </div>
                                            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{s.title}</h2>
                                        </div>
                                        <div className="prose prose-green max-w-none">
                                            <p className="text-[var(--text-secondary)] font-medium leading-loose">
                                                {s.content}
                                            </p>
                                            <ul className="mt-8 space-y-4">
                                                {[1, 2, 3].map(i => (
                                                    <li key={i} className="flex gap-3 text-sm font-semibold text-[var(--text-secondary)]">
                                                        <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                                                        <span>Standard compliance point #{i} for {s.title.toLowerCase()}. Ensuring verified data handling protocols are maintained.</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </section>
                                ))}
                            </div>

                            <div className="mt-20 p-10 bg-green-600 rounded-[2.5rem] text-white overflow-hidden relative">
                                <Shield className="absolute top-0 right-0 w-64 h-64 text-white opacity-5 -mr-20 -mt-20" />
                                <h3 className="text-2xl font-black mb-4">Questions about your data?</h3>
                                <p className="text-green-100 font-medium mb-8 max-w-md">
                                    If you have any questions or concerns regarding our privacy practices, please reach out to our team directly.
                                </p>
                                <a
                                    href="mailto:privacy@ecofine.org"
                                    className="inline-block bg-white text-green-700 px-8 py-3 rounded-2xl font-black hover:bg-green-50 transition-colors"
                                >
                                    Email Security Team
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
