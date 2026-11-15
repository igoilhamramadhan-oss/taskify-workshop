import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import RightSidebarDashboard from './components/RightSidebarDashboard';
import RightSidebarForm from './components/RightSidebarForm';
import RightSidebarDetail from './components/RightSidebarDetail';
import DashboardView from './views/DashboardView';
import TaskFormView from './views/TaskFormView';
import TaskDetailView from './views/TaskDetailView';
import ConfigModal from './components/ConfigModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import {
  initSupabaseClient,
  saveCredentials,
} from './lib/supabase';

// Seed data realistis jika Supabase belum terhubung
const DEFAULT_TASKS = [
  {
    id: 8924,
    judul: 'Menyusun kerangka laporan',
    deskripsi:
      'Membuat kerangka untuk laporan mingguan dan membagi bab materi secara terstruktur. Pastikan mencakup analisis tren produktivitas harian, ringkasan pencapaian sprint, serta evaluasi hambatan teknis yang dihadapi oleh tim pengembang. Sediakan juga lampiran matriks beban kerja terkini.',
    deadline: '2026-05-20',
    status: 'Pending',
    created_at: new Date().toISOString(),
  },
  {
    id: 8925,
    judul: 'Membaca materi kuliah',
    deskripsi: 'Sistem Basis Data Terdistribusi - Modul 4 & 5 materi replikasi dan konsistensi data.',
    deadline: '2026-05-21',
    status: 'Pending',
    created_at: new Date().toISOString(),
  },
  {
    id: 8926,
    judul: 'Mengirim revisi tugas',
    deskripsi: 'Pengujian Fungsionalitas SKPL dan dokumentasi kontrak pengujian black box diserahkan ke portal akademik.',
    deadline: '2026-05-18',
    status: 'Completed',
    created_at: new Date().toISOString(),
  },
];

export default function App() {
  const [supabaseClient, setSupabaseClient] = useState(() => initSupabaseClient());
  const [tasks, setTasks] = useState(DEFAULT_TASKS);
  const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'dashboard' | 'create' | 'edit' | 'detail'
  const [selectedTask, setSelectedTask] = useState(DEFAULT_TASKS[0]);
  const [editingTask, setEditingTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  // Interactivity States: Toast & Custom Delete Modal
  const [toast, setToast] = useState(null);
  const [deleteModalState, setDeleteModalState] = useState({ isOpen: false, task: null });

  const isConnected = Boolean(supabaseClient);

  // Helper Toast Notification
  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Ambil data dari Supabase jika terhubung
  const fetchTasks = useCallback(async () => {
    if (!supabaseClient) return;

    try {
      const { data, error } = await supabaseClient
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        setTasks(data);
        if (!selectedTask || !data.some((t) => t.id === selectedTask.id)) {
          setSelectedTask(data[0]);
        }
      }
    } catch (err) {
      console.warn('Menggunakan data lokal:', err.message);
    }
  }, [supabaseClient, selectedTask]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Navigasi Layar
  const handleNavigate = (screen) => {
    if (screen === 'create') {
      setEditingTask(null);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pilih tugas untuk ditampilkan di Screen 3 (Detail)
  const handleSelectTask = (task) => {
    setSelectedTask(task);
    setCurrentScreen('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mulai Edit Tugas
  const handleEditTask = (task) => {
    setEditingTask(task);
    setCurrentScreen('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Cepat Status (TC-01)
  const handleToggleStatus = async (taskId, isChecked) => {
    const nextStatus = isChecked ? 'Completed' : 'Pending';

    // Optimistic UI Update
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: nextStatus } : t))
    );

    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask((prev) => ({ ...prev, status: nextStatus }));
    }

    showToast(
      isChecked ? 'Status diubah ke Selesai ✓' : 'Status diubah ke Pending ⏱️',
      isChecked ? 'success' : 'info'
    );

    if (!supabaseClient) return;

    try {
      await supabaseClient
        .from('tasks')
        .update({ status: nextStatus })
        .eq('id', taskId);
    } catch (err) {
      console.error('Gagal toggle status:', err.message);
      showToast('Gagal mengubah status di server', 'danger');
      fetchTasks();
    }
  };

  // Submit Simpan / Perbarui Tugas
  const handleSubmitTask = async (payload) => {
    setIsSubmitting(true);

    if (!supabaseClient) {
      // Local State Update untuk demo interaktif
      if (editingTask) {
        setTasks((prev) =>
          prev.map((t) => (t.id === editingTask.id ? { ...t, ...payload } : t))
        );
        setSelectedTask({ ...editingTask, ...payload });
        showToast('Perubahan tugas berhasil disimpan!', 'success');
      } else {
        const newTask = {
          id: Date.now(),
          ...payload,
          created_at: new Date().toISOString(),
        };
        setTasks((prev) => [newTask, ...prev]);
        setSelectedTask(newTask);
        showToast('Tugas baru berhasil ditambahkan!', 'success');
      }
      setIsSubmitting(false);
      handleNavigate('dashboard');
      return;
    }

    try {
      if (editingTask) {
        const { error } = await supabaseClient
          .from('tasks')
          .update(payload)
          .eq('id', editingTask.id);
        if (error) throw error;
        showToast('Perubahan tugas berhasil disimpan!', 'success');
      } else {
        const { error } = await supabaseClient.from('tasks').insert([payload]);
        if (error) throw error;
        showToast('Tugas baru berhasil ditambahkan!', 'success');
      }
      await fetchTasks();
      handleNavigate('dashboard');
    } catch (err) {
      showToast(`Gagal: ${err.message}`, 'danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Buka Modal Konfirmasi Hapus
  const handlePromptDelete = (task) => {
    setDeleteModalState({ isOpen: true, task });
  };

  // Konfirmasi Eksekusi Hapus Tugas
  const handleConfirmDelete = async (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    setDeleteModalState({ isOpen: false, task: null });
    showToast('Tugas berhasil dihapus.', 'danger');

    if (currentScreen === 'detail') {
      handleNavigate('dashboard');
    }

    if (!supabaseClient) return;

    try {
      await supabaseClient.from('tasks').delete().eq('id', taskId);
      await fetchTasks();
    } catch (err) {
      console.error('Gagal menghapus tugas:', err.message);
      showToast('Gagal menghapus di server', 'danger');
    }
  };

  const pendingCount = tasks.filter((t) => t.status === 'Pending').length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-[#F6F7FB] flex font-sans text-slate-800 antialiased selection:bg-[#EEF0FF] selection:text-[#5B4FE9]">
      {/* 1. LEFT SIDEBAR (240px) */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        tasksCount={{ pending: pendingCount, total: totalCount }}
      />

      {/* 2. CENTER MAIN WORKSPACE (Flex-1) */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Banner Status Koneksi Supabase jika belum disetel */}
        {!isConnected && (
          <div className="bg-[#FFF4E5] border-b border-amber-200 text-[#D97706] px-4 py-2 text-xs flex items-center justify-between">
            <span>
              <strong>Mode Pratinjau Desain:</strong> Menjalankan Taskify dengan data sampel. Hubungkan Supabase untuk sinkronisasi database live.
            </span>
            <button
              onClick={() => setIsConfigOpen(true)}
              className="text-[11px] font-bold underline hover:text-amber-900"
            >
              Hubungkan Supabase
            </button>
          </div>
        )}

        {/* Screen 1: Dashboard Utama */}
        {currentScreen === 'dashboard' && (
          <DashboardView
            tasks={tasks}
            onNavigate={handleNavigate}
            onToggleStatus={handleToggleStatus}
            onSelectTask={handleSelectTask}
            onEditTask={handleEditTask}
            onPromptDelete={handlePromptDelete}
          />
        )}

        {/* Screen 2: Formulir Tambah / Edit Tugas */}
        {currentScreen === 'create' && (
          <TaskFormView
            editingTask={editingTask}
            onSubmit={handleSubmitTask}
            onNavigate={handleNavigate}
            isSubmitting={isSubmitting}
          />
        )}

        {/* Screen 3: Halaman Detail Tugas */}
        {currentScreen === 'detail' && (
          <TaskDetailView
            task={selectedTask}
            onNavigate={handleNavigate}
            onToggleStatus={handleToggleStatus}
            onEdit={handleEditTask}
            onPromptDelete={handlePromptDelete}
          />
        )}
      </main>

      {/* 3. RIGHT CONTEXTUAL SIDEBAR (320px) */}
      {currentScreen === 'dashboard' && <RightSidebarDashboard />}
      {currentScreen === 'create' && <RightSidebarForm />}
      {currentScreen === 'detail' && (
        <RightSidebarDetail
          otherTasks={tasks.filter((t) => t.id !== selectedTask?.id)}
          onSelectTask={handleSelectTask}
        />
      )}

      {/* Modal Kredensial Supabase */}
      <ConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        onSave={(url, key) => {
          saveCredentials(url, key);
          setSupabaseClient(initSupabaseClient());
          showToast('Kredensial tersimpan. Menghubungkan ke Supabase...', 'success');
        }}
      />

      {/* Custom SaaS Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalState.isOpen}
        task={deleteModalState.task}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModalState({ isOpen: false, task: null })}
      />

      {/* Floating Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
