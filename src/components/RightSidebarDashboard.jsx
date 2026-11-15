import React from 'react';

export default function RightSidebarDashboard() {
  return (
    <aside className="w-[320px] flex-shrink-0 space-y-6 py-6 px-4">
      {/* 1. Solid Vibrant Purple Profile Card */}
      <div className="bg-[#5B4FE9] text-white p-5 rounded-3xl shadow-soft relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xs border border-white/30 flex items-center justify-center font-bold text-sm tracking-wide">
            KP
          </div>
          <div>
            <h3 className="font-bold text-base tracking-tight leading-tight">Kim Namjoon</h3>
            <p className="text-xs text-white/80 font-medium mt-0.5">UI/UX Designer &bull; Mahasiswa</p>
          </div>
        </div>
      </div>

      {/* 2. Horizontal Week Calendar: Mei 2026 */}
      <div className="bg-white p-5 rounded-3xl border border-[#EEF0F6] shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-sm text-[#111827]">Mei 2026</h4>
          <button
            type="button"
            className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EEF0FF] text-[#5B4FE9] hover:bg-[#5B4FE9] hover:text-white transition-colors"
          >
            + Jadwal
          </button>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-6 gap-2 text-center text-xs">
          <div>
            <span className="block text-[11px] text-[#6B7280] font-medium">Sen</span>
            <span className="block font-bold text-[#111827] mt-1.5">18</span>
          </div>
          <div>
            <span className="block text-[11px] text-[#6B7280] font-medium">Sel</span>
            <span className="block font-bold text-[#111827] mt-1.5">19</span>
          </div>
          <div>
            <span className="block text-[11px] text-[#5B4FE9] font-bold">Rab</span>
            <span className="w-7 h-7 mx-auto rounded-full bg-[#5B4FE9] text-white flex items-center justify-center font-bold text-xs mt-1 shadow-sm shadow-indigo-200">
              20
            </span>
          </div>
          <div>
            <span className="block text-[11px] text-[#6B7280] font-medium">Kam</span>
            <span className="block font-bold text-[#111827] mt-1.5">21</span>
          </div>
          <div>
            <span className="block text-[11px] text-[#6B7280] font-medium">Jum</span>
            <span className="block font-bold text-[#111827] mt-1.5">22</span>
          </div>
          <div>
            <span className="block text-[11px] text-[#6B7280] font-medium">Sab</span>
            <span className="block font-bold text-[#111827] mt-1.5">23</span>
          </div>
        </div>

        {/* Hourly Schedule Timeline */}
        <div className="mt-6 space-y-3 pt-4 border-t border-[#EEF0F6]">
          {/* Item 1 */}
          <div className="flex items-start gap-3">
            <span className="text-[11px] font-bold text-[#6B7280] pt-1 w-10 flex-shrink-0">09:00</span>
            <div className="flex-1 bg-[#EEF0FF] p-3 rounded-2xl border border-indigo-100">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-xs text-[#111827]">Menyusun Kerangka Laporan</h5>
                <span className="text-slate-400 text-xs">&bull;&bull;&bull;</span>
              </div>
              <p className="text-[10px] text-[#6B7280] mt-1">09:00 - 11:30 &bull; Perpustakaan</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-3">
            <span className="text-[11px] font-bold text-[#6B7280] pt-1 w-10 flex-shrink-0">13:00</span>
            <div className="flex-1 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-xs text-[#111827]">Membaca Materi SKPL</h5>
                <span className="text-slate-400 text-xs">&bull;&bull;&bull;</span>
              </div>
              <p className="text-[10px] text-[#6B7280] mt-1">13:00 - 15:00 &bull; Mandiri</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Rekan Tim / Belajar */}
      <div className="bg-white p-5 rounded-3xl border border-[#EEF0F6] shadow-card">
        <h4 className="font-bold text-sm text-[#111827] mb-4">Rekan Tim / Belajar</h4>
        <div className="space-y-3.5">
          {/* Member 1 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EEF0FF] text-[#5B4FE9] flex items-center justify-center font-bold text-xs">
                RJ
              </div>
              <div>
                <p className="text-xs font-bold text-[#111827]">Rinsen Jey</p>
                <p className="text-[10px] text-[#6B7280]">Front-End Developer</p>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#059669]" title="Online" />
          </div>

          {/* Member 2 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs">
                KJ
              </div>
              <div>
                <p className="text-xs font-bold text-[#111827]">Kim Jee Yong</p>
                <p className="text-[10px] text-[#6B7280]">Product Manager</p>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-slate-300" title="Offline" />
          </div>
        </div>
      </div>
    </aside>
  );
}
