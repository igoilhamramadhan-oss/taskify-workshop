import React from 'react';
import { formatTanggalID } from '../utils/formatters';

export default function TaskItem({ task, onToggleStatus, onEdit, onDelete }) {
  const isCompleted = task.status === 'Completed';

  return (
    <tr className="hover:bg-slate-50 transition-colors duration-150">
      {/* 1. Checkbox Cepat (TC-01) */}
      <td className="py-3.5 px-3 text-center align-top w-12">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => onToggleStatus(task.id, e.target.checked)}
          title={isCompleted ? 'Tandai sebagai Pending' : 'Tandai sebagai Selesai'}
          className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition"
        />
      </td>

      {/* 2. Tugas & Deskripsi (SEC-01 Anti-XSS: React Auto-Escapes) */}
      <td className="py-3.5 px-4 align-top">
        <h3
          className={
            isCompleted
              ? 'line-through text-slate-400 font-medium text-sm leading-snug'
              : 'font-semibold text-slate-800 text-sm leading-snug'
          }
        >
          {task.judul}
        </h3>
        {task.deskripsi && (
          <p className="text-xs text-slate-500 mt-1 whitespace-pre-line leading-relaxed">
            {task.deskripsi}
          </p>
        )}
      </td>

      {/* 3. Tanggal Deadline */}
      <td className="py-3.5 px-3 align-top whitespace-nowrap">
        <span className="inline-flex items-center text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
          {formatTanggalID(task.deadline)}
        </span>
      </td>

      {/* 4. Badge Status */}
      <td className="py-3.5 px-3 align-top text-center whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
            isCompleted
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}
        >
          {task.status}
        </span>
      </td>

      {/* 5. Aksi (Edit & Hapus) */}
      <td className="py-3.5 px-3 align-top text-right whitespace-nowrap w-24">
        <div className="inline-flex items-center justify-end gap-1.5">
          {/* Tombol Edit */}
          <button
            type="button"
            onClick={() => onEdit(task)}
            title="Edit Rincian Tugas"
            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </button>

          {/* Tombol Hapus */}
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            title="Hapus Tugas"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}
