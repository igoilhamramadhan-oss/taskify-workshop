/**
 * Format tanggal ke standar Bahasa Indonesia (id-ID)
 * Contoh: "2026-11-18" -> "18 Nov 2026"
 */
export function formatTanggalID(dateString) {
  if (!dateString) return '-';
  try {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(date);
    }
    return dateString;
  } catch (e) {
    return dateString;
  }
}
