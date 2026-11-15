import React from 'react';

export default function RightSidebarForm() {
  return (
    <aside className="w-[320px] flex-shrink-0 space-y-6 py-6 px-4">
      {/* 1. Purple Gradient Tips Card */}
      <div className="bg-[#5B4FE9] text-white p-6 rounded-3xl shadow-soft relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-amber-300">
            {/* Lightbulb Icon */}
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14H8a4 4 0 01-.82-7.915A5 5 0 0116 10a4 4 0 01-4 4z" />
            </svg>
          </div>
          <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/20 text-white uppercase">
            Tips Hari Ini
          </span>
        </div>

        <h4 className="font-bold text-base tracking-tight mb-2">Tips Manajemen Waktu</h4>
        <p className="text-xs text-white/80 leading-relaxed font-normal">
          Pecah tugas besar menjadi sub-tugas kecil berdurasi 25–30 menit untuk menjaga konsentrasi optimal dan mengurangi stres deadline.
        </p>
      </div>

      {/* 2. Deadline Minggu Ini Card */}
      <div className="bg-white p-5 rounded-3xl border border-[#EEF0F6] shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#5B4FE9]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <h4 className="font-bold text-sm text-[#111827]">Deadline Minggu Ini</h4>
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EEF0FF] text-[#5B4FE9]">
            3 Tugas
          </span>
        </div>

        {/* Task Items */}
        <div className="space-y-3">
          {/* Item 1 */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#5B4FE9] mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#111827] leading-snug">Web Dashboard Redesign</p>
                <p className="text-[10px] text-[#6B7280] mt-0.5">Besok, 17:00 WIB</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FFF4E5] text-[#D97706] whitespace-nowrap">
              Urgent
            </span>
          </div>

          {/* Item 2 */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#111827] leading-snug">Review Design System</p>
                <p className="text-[10px] text-[#6B7280] mt-0.5">Jumat, 12:00 WIB</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EEF0FF] text-[#5B4FE9] whitespace-nowrap">
              Reguler
            </span>
          </div>

          {/* Item 3 */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#111827] leading-snug">Prototyping Alur Checkout</p>
                <p className="text-[10px] text-[#6B7280] mt-0.5">Sabtu, 20:00 WIB</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 whitespace-nowrap">
              Normal
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
