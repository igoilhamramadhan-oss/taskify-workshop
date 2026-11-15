import React from 'react';
import { formatTanggalID } from '../utils/formatters';

export default function TaskDetailView({
  task,
  onNavigate,
  onToggleStatus,
  onEdit,
  onPromptDelete,
}) {
  if (!task) {
    return (
      <div className="flex-1 py-12 text-center text-[#6B7280]">
        <p className="text-sm">Tidak ada tugas yang dipilih.</p>
        <button
          onClick={() => onNavigate('dashboard')}
          className="mt-4 px-4 py-2 rounded-full bg-[#5B4FE9] text-white text-xs font-bold"
        >
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  const isCompleted = task.status === 'Completed';

  return (
    <div className="flex-1 space-y-6 py-6 px-4 max-w-[840px] mx-auto w-full animate-fadeIn">
      {/* 1. Top Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-[#6B7280] font-medium mb-1">
            <span>Taskify</span> &gt;{' '}
            <span
              onClick={() => onNavigate('dashboard')}
              className="cursor-pointer hover:underline"
            >
              Daftar Tugas
            </span>{' '}
            &gt; <span className="text-[#5B4FE9] font-bold">Detail Tugas</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#111827]">Detail Tugas</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#EEF0F6] text-xs font-bold text-[#111827] shadow-xs hover:bg-slate-50 transition-colors"
          >
            &larr; Kembali ke Daftar Tugas
          </button>
          <button
            type="button"
            title="Notifikasi"
            className="w-10 h-10 rounded-full bg-white border border-[#EEF0F6] shadow-xs flex items-center justify-center text-slate-600 hover:text-slate-900 relative transition-transform active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            <span className="w-2 h-2 rounded-full bg-[#E11D48] absolute top-2.5 right-2.5 ring-2 ring-white" />
          </button>
        </div>
      </div>

      {/* 2. Center Task Detail Card */}
      <div className="bg-white rounded-3xl border border-[#EEF0F6] shadow-soft p-8 space-y-6">
        {/* Top Metadata Row */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EEF0F6]">
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                isCompleted
                  ? 'bg-[#E6F9F0] text-[#059669]'
                  : 'bg-[#FFF4E5] text-[#D97706]'
              }`}
            >
              <span>&bull;</span> {isCompleted ? 'Selesai (Completed)' : 'Menunggu (Pending)'}
            </span>
            <span className="text-xs text-[#6B7280] font-medium">ID Tugas: #TSK-{task.id}</span>
          </div>

          <div className="text-right">
            <span className="block text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-1">
              Prioritas
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FFF1F2] text-[#E11D48] inline-flex items-center gap-1">
              <span>🚩</span> Tinggi
            </span>
          </div>
        </div>

        {/* Main Title */}
        <h2 className="text-2xl font-extrabold text-[#111827] tracking-tight leading-snug">
          {task.judul}
        </h2>

        {/* Description Section */}
        <div>
          <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">
            Rincian Tugas
          </h3>
          <p className="text-xs sm:text-sm text-[#111827] leading-relaxed whitespace-pre-line font-normal">
            {task.deskripsi ||
              'Membuat kerangka untuk laporan mingguan dan membagi bab materi secara terstruktur. Pastikan mencakup analisis tren produktivitas harian, ringkasan pencapaian sprint, serta evaluasi hambatan teknis yang dihadapi oleh tim pengembang. Sediakan juga lampiran matriks beban kerja terkini.'}
          </p>
        </div>

        {/* Deadline Callout Box (Soft Lavender Container) */}
        <div className="p-4 rounded-2xl bg-[#EEF0FF] border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5B4FE9] text-white flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-[#6B7280] font-medium">Batas Waktu Pengumpulan (Deadline)</p>
              <p className="text-sm font-bold text-[#111827]">
                {formatTanggalID(task.deadline)} &bull; Pukul 17:00 WIB
              </p>
            </div>
          </div>
          <span className="self-start sm:self-center text-xs font-bold px-3 py-1 rounded-full bg-white text-[#5B4FE9] shadow-2xs whitespace-nowrap">
            ⏱️ {isCompleted ? 'Tuntas' : 'Sisa 2 Hari Lagi'}
          </span>
        </div>

        {/* 2-Column Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Left: Penanggung Jawab */}
          <div className="p-3.5 rounded-2xl border border-[#EEF0F6] bg-slate-50/50">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mb-1.5">
              Penanggung Jawab
            </p>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                KN
              </div>
              <div>
                <p className="text-xs font-bold text-[#111827]">Kim Namjoon</p>
                <p className="text-[10px] text-[#6B7280]">Lead Designer</p>
              </div>
            </div>
          </div>

          {/* Right: Kategori Modul */}
          <div className="p-3.5 rounded-2xl border border-[#EEF0F6] bg-slate-50/50">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mb-1.5">
              Kategori Modul
            </p>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-[#EEF0FF] text-[#5B4FE9] flex items-center justify-center text-xs">
                📁
              </div>
              <div>
                <p className="text-xs font-bold text-[#111827]">Desain Sistem & Dashboard</p>
                <p className="text-[10px] text-[#6B7280]">Proyek Internal Q2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer Bar */}
        <div className="pt-6 border-t border-[#EEF0F6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Toggle Selesai / Pending */}
          <button
            type="button"
            onClick={() => onToggleStatus(task.id, !isCompleted)}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#5B4FE9] hover:bg-[#4A3ED4] text-white text-xs font-bold shadow-md shadow-indigo-200 transition-all active:scale-95"
          >
            <span>{isCompleted ? '↺' : '✓'}</span>{' '}
            {isCompleted ? 'Tandai Pending' : 'Tandai Selesai'}
          </button>

          {/* Right: Edit & Delete */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              type="button"
              onClick={() => onEdit(task)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-[#EEF0F6] text-xs font-bold text-[#111827] hover:bg-slate-50 transition-colors"
            >
              <span>✏️</span> Edit Tugas
            </button>
            <button
              type="button"
              onClick={() => onPromptDelete(task)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#FFF1F2] text-[#E11D48] text-xs font-bold hover:bg-rose-100 transition-colors"
            >
              <span>🗑️</span> Hapus Tugas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
