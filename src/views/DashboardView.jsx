import React, { useState, useMemo } from 'react';
import { formatTanggalID } from '../utils/formatters';

export default function DashboardView({
  tasks = [],
  onNavigate,
  onToggleStatus,
  onSelectTask,
  onEditTask,
  onPromptDelete,
}) {
  const [filterTab, setFilterTab] = useState('ALL'); // ALL, Pending, Completed
  const [searchQuery, setSearchQuery] = useState('');

  const total = tasks.length;
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const pendingCount = tasks.filter((t) => t.status === 'Pending').length;

  // Filter tasks berdasarkan Tab + Search Query
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        q === '' ||
        (task.judul && task.judul.toLowerCase().includes(q)) ||
        (task.deskripsi && task.deskripsi.toLowerCase().includes(q));

      const matchTab = filterTab === 'ALL' || task.status === filterTab;

      return matchSearch && matchTab;
    });
  }, [tasks, filterTab, searchQuery]);

  // Ambil 3 tugas teratas untuk kartu progress atas
  const topThreeTasks = useMemo(() => {
    if (tasks.length === 0) return [];
    return tasks.slice(0, 3);
  }, [tasks]);

  return (
    <div className="flex-1 space-y-6 py-6 px-4 max-w-[840px] mx-auto w-full animate-fadeIn">
      {/* 1. Header Bar: Greeting & Notification */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#111827]">Halo, Pengguna</h1>
        </div>
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

      {/* 2. Hero Banner Card */}
      <div className="bg-gradient-to-r from-[#EEF0FF] via-[#F4F3FF] to-[#FAF8FF] p-7 rounded-3xl border border-indigo-100/60 shadow-soft relative overflow-hidden flex items-center justify-between">
        <div className="max-w-md z-10">
          <h2 className="text-2xl font-extrabold text-[#111827] tracking-tight">Tugas Hari Ini</h2>
          <p className="text-xs text-[#6B7280] font-medium mt-2 leading-relaxed">
            Periksa prioritas dan selesaikan seluruh jadwal kegiatan Anda agar tetap produktif.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('create')}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5B4FE9] hover:bg-[#4A3ED4] text-white text-xs font-bold shadow-md shadow-indigo-200 transition-all active:scale-95 hover:shadow-lg"
          >
            <span className="text-sm">+</span> Tambah Tugas Baru
          </button>
        </div>

        {/* Vector Illustration (Right) */}
        <div className="hidden sm:flex items-center justify-center relative w-44 h-36 flex-shrink-0 select-none">
          {/* Circular Clock Face */}
          <div className="w-24 h-24 rounded-full border-4 border-indigo-200 bg-white/70 backdrop-blur-xs flex items-center justify-center relative shadow-sm">
            <div className="absolute w-1 h-8 bg-[#5B4FE9] rounded-full top-3 left-[43px] origin-bottom transform rotate-12" />
            <div className="absolute w-6 h-1 bg-[#5B4FE9] rounded-full top-[43px] left-[43px] origin-left" />
            <div className="w-2 h-2 rounded-full bg-[#5B4FE9] z-10" />
          </div>

          {/* Calendar Badge MEI 20 */}
          <div className="absolute -top-1 right-2 bg-white rounded-2xl shadow-md border border-slate-100 px-3 py-1.5 text-center">
            <span className="block text-[9px] font-extrabold tracking-wider text-[#6B7280] uppercase">MEI</span>
            <span className="block text-sm font-extrabold text-[#111827] leading-none">20</span>
          </div>

          {/* Floating Checkmark Badge */}
          <div className="absolute -bottom-1 left-2 bg-white rounded-xl shadow-md border border-slate-100 p-2 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-[#E6F9F0] text-[#059669] flex items-center justify-center text-[10px] font-bold">
              ✓
            </span>
            <div className="space-y-1">
              <div className="w-8 h-1 bg-slate-200 rounded-full" />
              <div className="w-5 h-1 bg-slate-200 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. 3-Column Task Progress Cards Grid (Dinamis dari Real Data) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topThreeTasks.map((task, idx) => {
          const isCompleted = task.status === 'Completed';
          const progressPercent = isCompleted ? 100 : idx === 0 ? 40 : idx === 1 ? 20 : 60;
          const avatarLabel = idx === 0 ? 'KN +' : idx === 1 ? 'AD +' : 'RJ +';
          const timeLabel = isCompleted ? 'Tuntas' : idx === 0 ? 'Hari ini' : `${idx + 1} hari lagi`;

          return (
            <div
              key={task.id}
              onClick={() => onSelectTask(task)}
              className="bg-white p-5 rounded-3xl border border-[#EEF0F6] shadow-card hover:shadow-soft hover:border-indigo-100 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#6B7280]">
                    Deadline: {formatTanggalID(task.deadline)}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isCompleted
                        ? 'bg-[#E6F9F0] text-[#059669]'
                        : 'bg-[#FFF4E5] text-[#D97706]'
                    }`}
                  >
                    {isCompleted ? 'Selesai' : 'Pending'}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[#111827] mt-3 leading-snug group-hover:text-[#5B4FE9] transition-colors truncate">
                  {task.judul}
                </h3>
                <p className="text-[11px] text-[#6B7280] mt-1 line-clamp-1">
                  {task.deskripsi || 'Rincian tugas dan agenda harian'}
                </p>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between text-[11px] mb-1.5 font-medium">
                  <span className="text-[#6B7280]">Progres</span>
                  <span className={`font-bold ${isCompleted ? 'text-[#059669]' : 'text-[#5B4FE9]'}`}>
                    {progressPercent}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCompleted ? 'bg-[#059669]' : 'bg-[#5B4FE9]'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-3 text-[11px]">
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[#111827] font-bold text-[10px]">
                    {avatarLabel}
                  </span>
                  <span
                    className={`font-semibold text-[10px] ${
                      isCompleted ? 'text-[#059669]' : 'text-[#D97706]'
                    }`}
                  >
                    {timeLabel}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Bottom 2-Column Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Widget: Progres Mingguan */}
        <div className="bg-white p-6 rounded-3xl border border-[#EEF0F6] shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-[#111827]">Progres Mingguan</h4>
                <p className="text-[11px] text-[#6B7280] mt-0.5">Penyelesaian jam belajar & tugas</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-[#111827] flex items-center gap-1 cursor-pointer">
                Minggu Ini ▾
              </span>
            </div>

            {/* Vertical Rounded Bar Chart: S S R K J S M */}
            <div className="flex items-end justify-between h-36 mt-6 px-3">
              <div className="flex flex-col items-center gap-2">
                <div className="w-3.5 h-16 bg-[#EEF0FF] rounded-full hover:bg-indigo-200 transition-colors" />
                <span className="text-[11px] text-[#6B7280] font-semibold">S</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-3.5 h-20 bg-[#EEF0FF] rounded-full hover:bg-indigo-200 transition-colors" />
                <span className="text-[11px] text-[#6B7280] font-semibold">S</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-3.5 h-28 bg-[#5B4FE9] rounded-full shadow-sm shadow-indigo-200" />
                <span className="text-[11px] text-[#5B4FE9] font-bold">R</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-3.5 h-14 bg-[#EEF0FF] rounded-full hover:bg-indigo-200 transition-colors" />
                <span className="text-[11px] text-[#6B7280] font-semibold">K</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-3.5 h-24 bg-[#EEF0FF] rounded-full hover:bg-indigo-200 transition-colors" />
                <span className="text-[11px] text-[#6B7280] font-semibold">J</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-3.5 h-12 bg-[#EEF0FF] rounded-full hover:bg-indigo-200 transition-colors" />
                <span className="text-[11px] text-[#6B7280] font-semibold">S</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-3.5 h-10 bg-[#EEF0FF] rounded-full hover:bg-indigo-200 transition-colors" />
                <span className="text-[11px] text-[#6B7280] font-semibold">M</span>
              </div>
            </div>
          </div>

          {/* Bottom Metrics */}
          <div className="grid grid-cols-2 gap-3 pt-5 border-t border-[#EEF0F6] mt-4">
            <div>
              <p className="text-[10px] text-[#6B7280] font-medium">Waktu Selesai</p>
              <p className="text-sm font-bold text-[#111827]">
                18 Jam <span className="text-[#059669] text-xs font-semibold">(+12%)</span>
              </p>
            </div>
            <div>
              <p className="text-[10px] text-[#6B7280] font-medium">Efisiensi</p>
              <p className="text-sm font-bold text-[#111827]">
                92% <span className="text-[#5B4FE9] text-xs font-semibold">Bagus</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Widget: Daftar Tugas Harian */}
        <div className="bg-white p-6 rounded-3xl border border-[#EEF0F6] shadow-card flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h4 className="font-bold text-sm text-[#111827]">Daftar Tugas Harian</h4>
                <p className="text-[11px] text-[#6B7280] mt-0.5">
                  {completedCount} dari {total} tugas selesai
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full text-[11px] font-semibold self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setFilterTab('ALL')}
                  className={`px-2.5 py-1 rounded-full transition-all ${
                    filterTab === 'ALL'
                      ? 'bg-white text-[#5B4FE9] shadow-xs'
                      : 'text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  Semua ({total})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterTab('Pending')}
                  className={`px-2.5 py-1 rounded-full transition-all ${
                    filterTab === 'Pending'
                      ? 'bg-white text-[#D97706] shadow-xs'
                      : 'text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  Pending ({pendingCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterTab('Completed')}
                  className={`px-2.5 py-1 rounded-full transition-all ${
                    filterTab === 'Completed'
                      ? 'bg-white text-[#059669] shadow-xs'
                      : 'text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  Selesai ({completedCount})
                </button>
              </div>
            </div>

            {/* Quick Search Input */}
            <div className="relative mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari tugas di sini..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-[#EEF0F6] rounded-xl text-xs text-[#111827] placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#5B4FE9] transition"
              />
              <svg className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Checklist Rows (Connected to Supabase data & TC-01 toggle) */}
            <div className="space-y-2.5">
              {filteredTasks.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#6B7280]">
                  Belum ada tugas yang cocok dengan filter.
                </div>
              ) : (
                filteredTasks.slice(0, 5).map((task) => {
                  const isCompleted = task.status === 'Completed';

                  return (
                    <div
                      key={task.id}
                      className="p-3 rounded-2xl border border-[#EEF0F6] bg-slate-50/50 hover:bg-slate-50 flex items-center justify-between gap-3 transition-colors group"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Checkbox (TC-01 Instant Toggle) */}
                        <input
                          type="checkbox"
                          checked={isCompleted}
                          onChange={(e) => onToggleStatus(task.id, e.target.checked)}
                          className="w-4 h-4 rounded border-slate-300 text-[#5B4FE9] focus:ring-[#5B4FE9] cursor-pointer"
                        />
                        <div
                          onClick={() => onSelectTask(task)}
                          className="flex-1 cursor-pointer min-w-0"
                        >
                          <p
                            className={`text-xs font-bold truncate ${
                              isCompleted
                                ? 'line-through text-slate-400'
                                : 'text-[#111827] group-hover:text-[#5B4FE9]'
                            }`}
                          >
                            {task.judul}
                          </p>
                          <p className="text-[10px] text-[#6B7280] truncate mt-0.5">
                            Deadline: {formatTanggalID(task.deadline)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Status Badge */}
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap ${
                            isCompleted
                              ? 'bg-[#E6F9F0] text-[#059669]'
                              : 'bg-[#FFF4E5] text-[#D97706]'
                          }`}
                        >
                          {isCompleted ? 'Selesai' : 'Pending'}
                        </span>

                        {/* Quick Action Icons on Row */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditTask(task);
                            }}
                            title="Edit"
                            className="p-1 text-slate-400 hover:text-[#5B4FE9] rounded"
                          >
                            ✏️
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onPromptDelete(task);
                            }}
                            title="Hapus"
                            className="p-1 text-slate-400 hover:text-[#E11D48] rounded"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Bottom Link: Tambah Catatan / Tugas Baru */}
          <div className="pt-4 border-t border-[#EEF0F6] mt-4 text-center">
            <button
              type="button"
              onClick={() => onNavigate('create')}
              className="text-xs font-bold text-[#5B4FE9] hover:underline"
            >
              + Tambah Catatan / Tugas Baru
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
