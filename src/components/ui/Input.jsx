import React from 'react';

const Input = ({
    label,
    error,
    icon: Icon,
    type = 'text',
    className = '',
    containerClassName = '',
    ...props
}) => {
    const isTextarea = type === 'textarea';
    const Component = isTextarea ? 'textarea' : 'input';

    return (
        <div className={`space-y-1.5 ${containerClassName}`}>
            {label && (
                <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2 uppercase tracking-tight">
                    {label}
                </label>
            )}
            <div className="relative group">
                {Icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-primary transition-colors">
                        <Icon size={18} />
                    </div>
                )}
                <Component
                    type={isTextarea ? undefined : type}
                    className={`
                        flex w-full rounded-2xl border border-[var(--border-color)] 
                        bg-[var(--bg-card)] px-5 py-4 text-sm font-medium
                        text-[var(--text-primary)]
                        placeholder:text-[var(--text-muted)] 
                        placeholder:font-medium
                        shadow-sm transition-all theme-transition
                        focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary
                        disabled:cursor-not-allowed disabled:opacity-50
                        ${Icon ? 'pl-12' : ''}
                        ${error ? 'border-red-500/50 focus:ring-red-500/10' : ''}
                        ${className}
                    `}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-xs text-red-500 font-medium">{error}</p>
            )}
        </div>
    );
};

export default Input;
