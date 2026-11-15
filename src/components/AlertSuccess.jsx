import React from 'react';

export default function AlertSuccess({ message }) {
  if (!message) return null;

  return (
    <div
      className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg p-3 text-sm flex items-start gap-2.5 shadow-sm mb-5 transition-all"
      role="status"
    >
      <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div className="flex-1">
        <p className="font-semibold text-xs sm:text-sm">{message}</p>
      </div>
    </div>
  );
}
