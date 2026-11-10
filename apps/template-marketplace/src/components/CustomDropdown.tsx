import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search, X } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  subLabel?: string;
  badge?: string;
  icon?: React.ReactNode;
}

export interface CustomDropdownProps {
  label?: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  searchable?: boolean;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder = 'Chọn một mục...',
  className = '',
  searchable = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    if (!isOpen) {
      setFilterText('');
    }
  }, [isOpen, searchable]);

  const filteredOptions = searchable && filterText.trim()
    ? options.filter(
        (opt) =>
          opt.label.toLowerCase().includes(filterText.toLowerCase()) ||
          (opt.subLabel && opt.subLabel.toLowerCase().includes(filterText.toLowerCase()))
      )
    : options;

  return (
    <div ref={containerRef} className={`relative flex flex-col ${className}`}>
      {label && (
        <label
          title={label}
          className="h-5 flex items-center text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 truncate select-none"
        >
          {label}
        </label>
      )}

      {/* Synchronized Standard-Height Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`h-11 w-full flex items-center justify-between gap-2 rounded-xl border px-3 text-xs font-semibold transition-all duration-150 outline-none select-none shadow-sm ${
          isOpen
            ? 'border-indigo-600 bg-white ring-2 ring-indigo-500/20 text-indigo-700 shadow-md'
            : 'border-slate-200 bg-white text-slate-800 hover:border-indigo-500 hover:bg-slate-50/80 hover:shadow'
        }`}
      >
        <div className="flex items-center gap-2 truncate min-w-0">
          {selectedOption?.icon && <span className="shrink-0">{selectedOption.icon}</span>}
          <span className="truncate font-medium text-slate-800">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-1">
          {selectedOption?.badge && (
            <span className="rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 px-1.5 py-0.5 text-[10px] font-mono font-bold">
              {selectedOption.badge}
            </span>
          )}
          <ChevronDown
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-indigo-600' : ''
            }`}
          />
        </div>
      </button>

      {/* Clean White Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-[100] min-w-[240px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95 duration-150">
          {/* Quick Search */}
          {searchable && (
            <div className="relative mb-1.5 p-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Tìm nhanh..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
              />
              {filterText && (
                <button
                  type="button"
                  onClick={() => setFilterText('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          )}

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
            {filteredOptions.length === 0 ? (
              <div className="py-4 text-center text-xs text-slate-400">
                Không tìm thấy kết quả
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <div
                    key={opt.value}
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-bold shadow-sm'
                        : 'text-slate-700 hover:bg-indigo-50/80 hover:text-indigo-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate min-w-0">
                      {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                      <div className="truncate">
                        <div className="truncate">{opt.label}</div>
                        {opt.subLabel && (
                          <div className={`text-[10px] truncate ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                            {opt.subLabel}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {opt.badge && (
                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-mono ${
                          isSelected ? 'bg-white/20 text-white font-bold' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {opt.badge}
                        </span>
                      )}
                      {isSelected && <Check className="h-3.5 w-3.5 text-white shrink-0" />}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
