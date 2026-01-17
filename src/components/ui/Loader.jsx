import React from 'react';
import { motion as Motion } from 'framer-motion';

const Loader = ({ fullPage = true }) => {
    return (
        <div className={`flex flex-col items-center justify-center ${fullPage ? 'fixed inset-0 z-[100] bg-[var(--bg-page)]' : 'w-full py-12'}`}>
            <div className="relative">
                {/* Main Spinning Circle */}
                <Motion.div
                    className="w-20 h-20 border-4 border-green-500/20 border-t-green-500 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Inner Pulsing Circle */}
                <Motion.div
                    className="absolute inset-0 m-auto w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                </Motion.div>

                {/* Orbital Dots */}
                {[0, 1, 2].map((i) => (
                    <Motion.div
                        key={i}
                        className="absolute inset-0"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "linear"
                        }}
                    >
                        <div className="w-2 h-2 bg-green-400 rounded-full absolute -top-1 left-1/2 -ml-1 shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                    </Motion.div>
                ))}
            </div>

            <Motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center"
            >
                <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                    Eco<span className="text-green-600">Fine</span>
                </h3>
                <p className="text-[var(--text-secondary)] text-sm font-medium mt-1">
                    Loading impact...
                </p>
            </Motion.div>
        </div>
    );
};

export default Loader;
