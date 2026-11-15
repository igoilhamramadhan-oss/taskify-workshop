import React from 'react';

export default function AlertError({ message, onClose }) {
  if (!message) return null;

  return (
    <div
      className="bg-rose-50 border border-rose-200 text-rose-800 rounded-lg p-3 text-sm flex items-start gap-2.5 shadow-sm mb-5"
      role="alert"
    >
      <svg className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
      <div className="flex-1">
        <p className="font-semibold text-xs sm:text-sm">{message}</p>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-rose-500 hover:text-rose-700 transition"
          aria-label="Tutup Peringatan"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
