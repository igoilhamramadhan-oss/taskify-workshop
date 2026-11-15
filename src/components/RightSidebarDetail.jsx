import React from 'react';

export default function RightSidebarDetail({ otherTasks = [], onSelectTask }) {
  return (
    <aside className="w-[320px] flex-shrink-0 space-y-6 py-6 px-4">
      {/* 1. Riwayat Aktivitas Card */}
      <div className="bg-white p-5 rounded-3xl border border-[#EEF0F6] shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-sm text-[#111827]">Riwayat Aktivitas</h4>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEF0FF] text-[#5B4FE9]">
            Realtime
          </span>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-5 space-y-4 border-l-2 border-indigo-100 ml-2">
          {/* Timeline Event 1 */}
          <div className="relative">
            <span className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-[#5B4FE9] ring-4 ring-white" />
            <div>
              <p className="text-xs font-bold text-[#111827]">Status Diatur ke Menunggu</p>
              <p className="text-[10px] text-[#6B7280] mt-0.5">
                Oleh Kim Namjoon &bull; 19 Mei 2026, 09:30 WIB
              </p>
            </div>
          </div>

          {/* Timeline Event 2 */}
          <div className="relative">
            <span className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-slate-300 ring-4 ring-white" />
            <div>
              <p className="text-xs font-bold text-[#111827]">Tugas Dibuat</p>
              <p className="text-[10px] text-[#6B7280] mt-0.5">
                Oleh Kim Namjoon &bull; 18 Mei 2026, 14:15 WIB
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Tugas Terkait Lainnya Card */}
      <div className="bg-white p-5 rounded-3xl border border-[#EEF0F6] shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-sm text-[#111827]">Tugas Terkait Lainnya</h4>
          <button type="button" className="text-xs font-bold text-[#5B4FE9] hover:underline">
            Semua
          </button>
        </div>

        <div className="space-y-3">
          {/* Item 1 */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#111827]">Riset Analisis Kompetitor</p>
              <p className="text-[10px] text-[#6B7280] mt-0.5">Deadline: 21 Mei 2026</p>
            </div>
            <span className="w-6 h-6 rounded-full bg-[#E6F9F0] text-[#059669] flex items-center justify-center text-xs font-bold">
              ✓
            </span>
          </div>

          {/* Item 2 */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#111827]">Finalisasi Prototipe Figma</p>
              <p className="text-[10px] text-[#6B7280] mt-0.5">Deadline: 24 Mei 2026</p>
            </div>
            <span className="w-6 h-6 rounded-full bg-[#FFF4E5] text-[#D97706] flex items-center justify-center text-xs font-bold">
              ⏳
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
