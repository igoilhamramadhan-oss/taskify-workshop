import React from 'react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isDanger = toast.type === 'danger';
  const isInfo = toast.type === 'info';

  let bgClass = 'bg-white border-[#EEF0F6] text-[#111827]';
  let iconClass = 'bg-[#EEF0FF] text-[#5B4FE9]';
  let icon = 'ℹ';

  if (isSuccess) {
    bgClass = 'bg-white border-[#E6F9F0] text-[#059669]';
    iconClass = 'bg-[#E6F9F0] text-[#059669]';
    icon = '✓';
  } else if (isDanger) {
    bgClass = 'bg-white border-[#FFF1F2] text-[#E11D48]';
    iconClass = 'bg-[#FFF1F2] text-[#E11D48]';
    icon = '🗑️';
  } else if (isInfo) {
    bgClass = 'bg-white border-[#EEF0FF] text-[#5B4FE9]';
    iconClass = 'bg-[#EEF0FF] text-[#5B4FE9]';
    icon = '⏱️';
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-sm">
      <div
        className={`flex items-center gap-3 p-4 rounded-2xl border shadow-soft ${bgClass} transition-all`}
        role="alert"
      >
        <span
          className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 ${iconClass}`}
        >
          {icon}
        </span>
        <p className="text-xs font-bold flex-1 leading-snug">{toast.message}</p>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
          aria-label="Tutup Notifikasi"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
