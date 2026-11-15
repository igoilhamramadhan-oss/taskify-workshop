import React, { useState, useMemo } from 'react';
import TaskItem from './TaskItem';
import EmptyState from './EmptyState';

export default function TaskTable({
  tasks,
  isLoading,
  onToggleStatus,
  onEdit,
  onDelete,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Real-time Search & Filter kombo
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const q = searchQuery.toLowerCase();
      const judulMatch = task.judul ? task.judul.toLowerCase().includes(q) : false;
      const deskripsiMatch = task.deskripsi ? task.deskripsi.toLowerCase().includes(q) : false;
      const searchMatch = q === '' || judulMatch || deskripsiMatch;

      const statusMatch = statusFilter === 'ALL' || task.status === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [tasks, searchQuery, statusFilter]);

  return (
    <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col">
      {/* Controls Bar: Search & Status Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tugas berdasarkan judul atau deskripsi..."
            className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-2xs"
          />
        </div>

        {/* Dropdown Filter Status */}
        <div className="w-full sm:w-48 flex-shrink-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-2xs"
          >
            <option value="ALL">Semua Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th scope="col" className="py-3 px-3 text-center text-xs font-semibold uppercase tracking-wider w-12">
                Cek
              </th>
              <th scope="col" className="py-3 px-4 text-xs font-semibold uppercase tracking-wider">
                Tugas & Deskripsi
              </th>
              <th scope="col" className="py-3 px-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                Deadline
              </th>
              <th scope="col" className="py-3 px-3 text-xs font-semibold uppercase tracking-wider text-center">
                Status
              </th>
              <th scope="col" className="py-3 px-3 text-xs font-semibold uppercase tracking-wider text-right w-24">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleStatus={onToggleStatus}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="py-12 text-center">
          <svg className="animate-spin h-7 w-7 text-indigo-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <p className="text-xs font-medium text-slate-500">Memuat data dari database Supabase...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredTasks.length === 0 && <EmptyState />}
    </section>
  );
}
