import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
    children,
    className = '',
    hoverEffect = false,
    onClick,
    ...props
}) => {
    const baseStyles = 'bg-[var(--bg-card)] rounded-[2.5rem] shadow-sm overflow-hidden border border-[var(--border-color)] theme-transition';
    const hoverStyles = hoverEffect ? 'hover:shadow-2xl hover:shadow-green-500/5 transition-all duration-500 cursor-pointer lg:hover:-translate-y-2' : '';

    const Component = hoverEffect && onClick ? motion.div : 'div';

    const motionProps = hoverEffect && onClick ? {
        whileHover: { y: -5 },
        transition: { type: 'spring', stiffness: 300 }
    } : {};

    return (
        <Component
            className={`${baseStyles} ${hoverStyles} ${className}`}
            onClick={onClick}
            {...motionProps}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Card;
