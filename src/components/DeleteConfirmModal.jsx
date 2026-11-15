import React from 'react';

export default function DeleteConfirmModal({ isOpen, task, onConfirm, onCancel }) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#EEF0F6] text-center transform transition-all">
        {/* Warning Icon Badge */}
        <div className="w-14 h-14 rounded-2xl bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center mx-auto mb-4 text-2xl">
          🗑️
        </div>

        <h3 className="text-lg font-extrabold text-[#111827] tracking-tight">Hapus Tugas Ini?</h3>
        <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
          Tugas <strong className="text-[#111827]">"{task.judul}"</strong> akan dihapus secara permanen dari daftar kerja Anda. Tindakan ini tidak dapat dibatalkan.
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-2.5 rounded-full bg-white border border-[#EEF0F6] text-xs font-bold text-[#6B7280] hover:text-[#111827] hover:bg-slate-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => onConfirm(task.id)}
            className="w-full py-2.5 rounded-full bg-[#E11D48] hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-200 transition-all active:scale-95"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
