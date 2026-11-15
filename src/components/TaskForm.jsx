import React, { useState, useEffect } from 'react';
import AlertError from './AlertError';
import AlertSuccess from './AlertSuccess';

export default function TaskForm({
  editingTask,
  onSubmit,
  onCancelEdit,
  isSubmitting,
  successMessage,
}) {
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('Pending');
  const [errorMessage, setErrorMessage] = useState('');

  // Saat editingTask berubah, isi form dengan data tugas yang dipilih
  useEffect(() => {
    if (editingTask) {
      setJudul(editingTask.judul || '');
      setDeskripsi(editingTask.deskripsi || '');
      setDeadline(editingTask.deadline || '');
      setStatus(editingTask.status || 'Pending');
      setErrorMessage('');
    } else {
      resetForm();
    }
  }, [editingTask]);

  const resetForm = () => {
    setJudul('');
    setDeskripsi('');
    const today = new Date().toISOString().split('T')[0];
    setDeadline(today);
    setStatus('Pending');
    setErrorMessage('');
  };

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

    // Bersihkan error sebelum submit
    setErrorMessage('');

    onSubmit({
      judul: trimmedJudul,
      deskripsi: deskripsi.trim() !== '' ? deskripsi.trim() : null,
      deadline,
      status,
    });
  };

  return (
    <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 sticky top-24">
      <div className="border-b border-slate-100 pb-4 mb-5">
        <h2 className="text-lg font-semibold text-slate-800">
          {editingTask ? 'Edit Rincian Tugas' : 'Tambah Tugas Baru'}
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          {editingTask
            ? `Memperbarui tugas ID #${editingTask.id}`
            : 'Isi detail tugas dengan lengkap untuk mencatat target pengerjaan.'}
        </p>
      </div>

      {/* Alert Error Box (TC-02) */}
      <AlertError message={errorMessage} onClose={() => setErrorMessage('')} />

      {/* Alert Success */}
      <AlertSuccess message={successMessage} />

      {/* Form Input (novalidate to enforce JS validation) */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Input Judul Tugas */}
        <div>
          <label htmlFor="react-judul" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Judul Tugas <span className="text-rose-600">*</span>
          </label>
          <input
            id="react-judul"
            type="text"
            maxLength={150}
            value={judul}
            onChange={(e) => {
              setJudul(e.target.value);
              if (e.target.value.trim().length > 0) {
                setErrorMessage('');
              }
            }}
            placeholder="Contoh: Menyelesaikan Laporan Modul"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-xs"
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-[10px] text-slate-400">Wajib diisi & maksimal 150 karakter</span>
            <span className="text-[10px] text-slate-400">{judul.length}/150</span>
          </div>
        </div>

        {/* Input Deskripsi Tugas */}
        <div>
          <label htmlFor="react-deskripsi" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Deskripsi Tugas <span className="text-slate-400 lowercase font-normal">(opsional)</span>
          </label>
          <textarea
            id="react-deskripsi"
            rows={3}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Tuliskan catatan atau rincian tugas di sini..."
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-xs resize-y"
          />
        </div>

        {/* Input Deadline */}
        <div>
          <label htmlFor="react-deadline" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Tanggal Batas Waktu (Deadline) <span className="text-rose-600">*</span>
          </label>
          <input
            id="react-deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-xs"
          />
        </div>

        {/* Dropdown Status */}
        <div>
          <label htmlFor="react-status" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Status Pengerjaan <span className="text-rose-600">*</span>
          </label>
          <select
            id="react-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-xs"
          >
            <option value="Pending">Pending (Tertunda)</option>
            <option value="Completed">Completed (Selesai)</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-lg shadow-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span>{editingTask ? 'Perbarui Tugas' : 'Simpan Tugas'}</span>
              </>
            )}
          </button>

          {editingTask && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-sm transition"
            >
              Batal Edit
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
