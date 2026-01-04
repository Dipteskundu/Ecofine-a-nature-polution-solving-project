import React from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({
    label,
    options = [],
    value,
    onChange,
    icon: Icon,
    className = '',
    required = false
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-1 flex items-center gap-2">
                    {Icon && <Icon size={14} className="text-green-600" />}
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative group">
                <select
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`
            w-full h-14 pl-6 pr-12 
            bg-gray-50 
            text-gray-900 
            font-medium rounded-2xl appearance-none 
            border-2 border-transparent focus:border-green-500/20 
            transition-all duration-300 outline-none
            cursor-pointer
            ${className}
          `}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-white">
                            {opt.label}
                        </option>
                    ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-green-500 transition-colors">
                    <ChevronDown size={20} />
                </div>
            </div>
        </div>
    );
};

export default Select;
