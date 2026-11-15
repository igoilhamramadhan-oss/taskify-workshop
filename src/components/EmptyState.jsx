import React from 'react';

export default function EmptyState() {
  return (
    <div className="py-12 text-center">
      <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h4 className="text-sm font-semibold text-slate-700">Belum Ada Tugas</h4>
      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
        Tambahkan tugas baru melalui formulir di sebelah kiri atau sesuaikan filter pencarian Anda.
      </p>
    </div>
  );
}
