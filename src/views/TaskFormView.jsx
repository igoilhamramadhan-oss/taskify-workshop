import React, { useState, useEffect } from 'react';
import AlertError from '../components/AlertError';

export default function TaskFormView({
  editingTask,
  onSubmit,
  onNavigate,
  isSubmitting,
}) {
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('Pending');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (editingTask) {
      setJudul(editingTask.judul || '');
      setDeskripsi(editingTask.deskripsi || '');
      setDeadline(editingTask.deadline || '');
      setStatus(editingTask.status || 'Pending');
    } else {
      setJudul('');
      setDeskripsi('');
      const today = new Date().toISOString().split('T')[0];
      setDeadline(today);
      setStatus('Pending');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validasi Mutlak Judul (Skenario TC-02)
    const trimmedJudul = judul ? judul.trim() : '';
    if (trimmedJudul.length === 0) {
      // WAJIB PERSIS: Teks pesan error validasi TC-02
      setErrorMessage('Judul tugas tidak boleh kosong');
      return;
    }

    // 2. Validasi Deadline
    if (!deadline) {
      setErrorMessage('Tanggal batas waktu (deadline) wajib diisi');
      return;
    }

    setErrorMessage('');
    onSubmit({
      judul: trimmedJudul,
      deskripsi: deskripsi.trim() !== '' ? deskripsi.trim() : null,
      deadline,
      status,
    });
  };

  return (
    <div className="flex-1 space-y-6 py-6 px-4 max-w-[840px] mx-auto w-full">
      {/* 1. Top Header Bar with Breadcrumbs & Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#EEF0F6] text-xs font-bold text-[#111827] shadow-xs hover:bg-slate-50 transition-colors"
          >
            &larr; Kembali ke Daftar Tugas
          </button>
          <div className="text-xs text-[#6B7280] font-medium hidden sm:block">
            <span>Taskify</span> &gt; <span>Daftar Tugas</span> &gt;{' '}
            <span className="text-[#5B4FE9] font-bold">
              {editingTask ? 'Edit Tugas' : 'Tambah Tugas Baru'}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="w-10 h-10 rounded-full bg-white border border-[#EEF0F6] shadow-xs flex items-center justify-center text-slate-600 hover:text-slate-900 relative transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span className="w-2 h-2 rounded-full bg-[#E11D48] absolute top-2.5 right-2.5 ring-2 ring-white" />
        </button>
      </div>

      {/* 2. Center Form Card */}
      <div className="bg-white rounded-3xl border border-[#EEF0F6] border-t-4 border-t-[#5B4FE9] shadow-soft p-8">
        {/* Form Card Header */}
        <div className="border-b border-[#EEF0F6] pb-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold tracking-wider px-3 py-1 rounded-full bg-[#EEF0FF] text-[#5B4FE9]">
              FORM INPUT TUGAS &bull; {editingTask ? 'Mode Pembaruan' : 'Mode Pembuatan Baru'}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-[#111827] flex items-center gap-1.5">
              <span>✏️</span> Draft Aktif
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#111827] tracking-tight">
            {editingTask ? 'Perbarui Data Tugas' : 'Tambah Tugas Baru'}
          </h2>
          <p className="text-xs text-[#6B7280] font-medium mt-1">
            Lengkapi rincian agenda kerja dan tetapkan batas waktu pelaksanaan tugas Anda.
          </p>
        </div>

        {/* Alert Error Box (TC-02 Requirement) */}
        <AlertError message={errorMessage} onClose={() => setErrorMessage('')} />

        {/* Input Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Field 1: Judul Tugas */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="taskify-judul" className="text-xs font-bold text-[#111827]">
                Judul Tugas <span className="text-rose-600">*</span>
              </label>
              <span className="text-xs text-[#6B7280] font-medium">{judul.length} / 150</span>
            </div>
            <input
              id="taskify-judul"
              type="text"
              maxLength={150}
              value={judul}
              onChange={(e) => {
                setJudul(e.target.value);
                if (e.target.value.trim().length > 0) setErrorMessage('');
              }}
              placeholder="Contoh: Menyusun kerangka laporan bulanan"
              className="w-full px-4 py-3 rounded-2xl bg-white border border-[#EEF0F6] text-sm text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B4FE9] focus:border-transparent transition shadow-2xs"
            />
            <p className="text-[11px] text-[#6B7280] mt-1.5 flex items-center gap-1">
              <span className="text-[#5B4FE9] font-bold">ℹ</span> Judul wajib diisi secara padat dan deskriptif.
            </p>
          </div>

          {/* Field 2: Deskripsi Rincian */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="taskify-desc" className="text-xs font-bold text-[#111827]">
                Deskripsi Rincian
              </label>
              <span className="text-xs text-[#6B7280] font-normal">(Opsional)</span>
            </div>
            <textarea
              id="taskify-desc"
              rows={4}
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Tuliskan catatan teknis, tautan referensi, atau instruksi langkah kerja tugas ini..."
              className="w-full px-4 py-3 rounded-2xl bg-white border border-[#EEF0F6] text-sm text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B4FE9] focus:border-transparent transition shadow-2xs resize-y"
            />
          </div>

          {/* Bottom 2-Column Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left: Tenggat Waktu (Deadline) */}
            <div>
              <label htmlFor="taskify-date" className="block text-xs font-bold text-[#111827] mb-2">
                Tenggat Waktu (Deadline) <span className="text-rose-600">*</span>
              </label>
              <input
                id="taskify-date"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-[#EEF0F6] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#5B4FE9] focus:border-transparent transition shadow-2xs"
              />
              <p className="text-[11px] text-[#6B7280] mt-1.5">Format baku: DD/MM/YYYY</p>
            </div>

            {/* Right: Status Default Awal */}
            <div>
              <label className="block text-xs font-bold text-[#111827] mb-2">
                Status Default Awal
              </label>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
                <p className="text-xs text-[#111827] font-medium leading-relaxed">
                  <strong className="text-[#D97706]">Status: Pending (Menunggu)</strong> &bull; Tugas baru otomatis berstatus Pending.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Action Buttons (Right-Aligned) */}
          <div className="pt-6 border-t border-[#EEF0F6] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-2.5 rounded-full bg-white border border-[#EEF0F6] text-xs font-bold text-[#6B7280] hover:text-[#111827] hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#5B4FE9] hover:bg-[#4A3ED4] text-white text-xs font-bold shadow-md shadow-indigo-200 transition-all active:scale-95 disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Menyimpan...</span>
              ) : (
                <>
                  <span>✓</span> {editingTask ? 'Perbarui Tugas' : 'Simpan Tugas'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
