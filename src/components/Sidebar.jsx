import React from 'react';

export default function Sidebar({ currentScreen, onNavigate, tasksCount }) {
  const pendingCount = tasksCount?.pending ?? 2;
  const totalCount = tasksCount?.total ?? 3;

  return (
    <aside className="w-[240px] flex-shrink-0 bg-white border-r border-[#EEF0F6] flex flex-col justify-between py-6 px-4 h-screen sticky top-0 select-none">
      {/* Top Branding & Main Navigation */}
      <div>
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('dashboard')} 
          className="flex items-center gap-3 px-2 mb-8 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#5B4FE9] flex items-center justify-center text-white shadow-md shadow-indigo-100 flex-shrink-0">
            {/* Flame/Droplet emblem */}
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.25c.34 0 .67.14.91.4 2.87 3.1 6.84 8.23 6.84 12.35 0 4.28-3.47 7.75-7.75 7.75S4.25 19.28 4.25 15c0-4.12 3.97-9.25 6.84-12.35.24-.26.57-.4.91-.4zm0 6.25c-1.93 2.1-3.75 4.75-3.75 6.5 0 2.07 1.68 3.75 3.75 3.75s3.75-1.68 3.75-3.75c0-1.75-1.82-4.4-3.75-6.5z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-[#111827]">Taskify</span>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          {/* 1. Dashboard */}
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all relative ${
              currentScreen === 'dashboard'
                ? 'bg-[#EEF0FF] text-[#5B4FE9]'
                : 'text-[#6B7280] hover:text-[#111827] hover:bg-slate-50'
            }`}
          >
            {currentScreen === 'dashboard' && (
              <span className="absolute left-0 top-2 bottom-2 w-1.5 bg-[#5B4FE9] rounded-r-full" />
            )}
            <div className="flex items-center gap-3 pl-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
              <span>Dashboard</span>
            </div>
          </button>

          {/* 2. Daftar Tugas */}
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all relative ${
              currentScreen === 'create' || currentScreen === 'detail'
                ? 'bg-[#5B4FE9] text-white shadow-md shadow-indigo-100'
                : 'text-[#6B7280] hover:text-[#111827] hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3 pl-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span>Daftar Tugas</span>
            </div>
            {currentScreen === 'create' || currentScreen === 'detail' ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white font-bold">
                {currentScreen === 'create' ? '4 Aktif' : totalCount}
              </span>
            ) : (
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-[#6B7280] font-semibold">
                {totalCount}
              </span>
            )}
          </button>

          {/* 3. Proyek */}
          <button
            type="button"
            className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-medium text-[#6B7280] hover:text-[#111827] hover:bg-slate-50 transition-all"
          >
            <div className="flex items-center gap-3 pl-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
              </svg>
              <span>Proyek</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#EEF0FF] text-[#5B4FE9] font-bold">2</span>
          </button>

          {/* 4. Laporan */}
          <button
            type="button"
            className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-medium text-[#6B7280] hover:text-[#111827] hover:bg-slate-50 transition-all"
          >
            <div className="flex items-center gap-3 pl-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span>Laporan</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Bottom Pinned Links & Profile */}
      <div className="space-y-3 pt-4 border-t border-[#EEF0F6]">
        <button
          type="button"
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#6B7280] hover:text-[#111827] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
          <span>{currentScreen === 'dashboard' ? 'Bantuan' : 'Bantuan & Dukungan'}</span>
        </button>

        <button
          type="button"
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#6B7280] hover:text-[#111827] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Pengaturan</span>
        </button>

        {/* User Profile Footer (for Screen 2 & 3 matching screenshot) */}
        {(currentScreen === 'create' || currentScreen === 'detail') && (
          <div className="pt-3 border-t border-[#EEF0F6] flex items-center justify-between px-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                KN
              </div>
              <div className="leading-tight">
                <p className="text-xs font-bold text-[#111827]">Kim Namjoon</p>
                <p className="text-[10px] text-[#6B7280]">UI/UX Designer</p>
              </div>
            </div>
            <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </div>
        )}
      </div>
    </aside>
  );
}
