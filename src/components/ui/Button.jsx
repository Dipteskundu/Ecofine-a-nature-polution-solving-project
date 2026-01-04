import React from 'react';
import { motion as Motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    icon: Icon,
    loading = false,
    isLoading,
    disabled = false,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-black transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20',
        secondary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20',
        outline: 'bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white',
        ghost: 'bg-transparent hover:bg-gray-100 text-gray-600',
        link: 'bg-transparent text-green-600 hover:text-green-700 underline underline-offset-4 p-0 shadow-none hover:shadow-none'
    };

    const sizes = {
        sm: 'px-4 py-2 text-xs rounded-xl',
        md: 'px-6 py-3 text-sm rounded-2xl',
        lg: 'px-10 py-5 text-lg rounded-[1.5rem]'
    };

    return (
        <Motion.button
            whileHover={{ y: -2 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || loading || isLoading}
            {...props}
        >
            {(loading || isLoading) ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            ) : Icon && (
                <Icon className={`${children ? 'mr-2' : ''} w-5 h-5`} />
            )}
            {children}
        </Motion.button>
    );
};

export default Button;
