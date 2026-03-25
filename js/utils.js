/**
 * Get a single patient by ID
 * @param {string} id - Patient ID (e.g. "P001")
 * @returns {object|null}
 */
function getPatientById(id) {
  if (!id) return null;
  return PATIENTS_DB.find(p => p.id.toUpperCase() === id.toUpperCase()) || null;
}

/**
 * Get all patients
 * @returns {Array}
 */
function getAllPatients() {
  return PATIENTS_DB;
}

/**
 * Filter patients by search query (name or ID)
 * @param {string} query
 * @returns {Array}
 */
function searchPatients(query) {
  if (!query || !query.trim()) return PATIENTS_DB;
  const q = query.toLowerCase().trim();
  return PATIENTS_DB.filter(p =>
    p.nama.toLowerCase().includes(q) ||
    p.id.toLowerCase().includes(q) ||
    p.nik.includes(q)
  );
}

/**
 * Format date string to Indonesian locale
 * @param {string} dateStr - ISO date string "YYYY-MM-DD"
 * @returns {string}
 */
function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

/**
 * Calculate age from birth date
 * @param {string} dateStr
 * @returns {number}
 */
function calculateAge(dateStr) {
  if (!dateStr) return 0;
  const today = new Date();
  const birth = new Date(dateStr + 'T00:00:00');
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

/**
 * Get initials from a name
 * @param {string} nama
 * @returns {string}
 */
function getInitials(nama) {
  if (!nama) return '?';
  const parts = nama.split(' ');
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

/**
 * Get gender CSS class
 * @param {string} jk - Jenis kelamin
 * @returns {string}
 */
function getGenderClass(jk) {
  return jk && jk.toLowerCase().includes('perempuan') ? 'female' : 'male';
}

/**
 * Get gender icon
 * @param {string} jk
 * @returns {string}
 */
function getGenderIcon(jk) {
  return jk && jk.toLowerCase().includes('perempuan') ? '♀' : '♂';
}

/**
 * Get URL query param
 * @param {string} name
 * @returns {string|null}
 */
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

/**
 * Save last scanned patient ID to localStorage
 * @param {string} id
 */
function saveLastScanned(id) {
  try {
    localStorage.setItem('qcare_last_scanned', id);
    localStorage.setItem('qcare_last_scanned_time', new Date().toISOString());
  } catch (e) { /* localStorage not available */ }
}

/**
 * Get last scanned patient info
 * @returns {{id: string, time: string}|null}
 */
function getLastScanned() {
  try {
    const id = localStorage.getItem('qcare_last_scanned');
    const time = localStorage.getItem('qcare_last_scanned_time');
    if (!id) return null;
    return { id, time };
  } catch (e) { return null; }
}

/**
 * Get current timestamp string
 * @returns {string}
 */
function getNowTimestamp() {
  return new Date().toLocaleString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

/**
 * Format NIK for display (add spaces)
 * @param {string} nik
 * @returns {string}
 */
function formatNIK(nik) {
  if (!nik) return '-';
  return nik.replace(/(\d{6})(\d{6})(\d{4})/, '$1 $2 $3');
}
