document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page === 'dashboard') initDashboard();
  else if (page === 'scan') initScan();
  else if (page === 'patient') initPatient();
});

// ======================
// DASHBOARD
// ======================
function initDashboard() {
  const patients = getAllPatients();

  // --- Stats ---
  const totalRiwayat = patients.reduce((sum, p) => sum + p.riwayat.length, 0);
  setTextById('stat-total-pasien', patients.length);
  setTextById('stat-total-riwayat', totalRiwayat);

  // Last scanned
  const last = getLastScanned();
  if (last) {
    const lp = getPatientById(last.id);
    if (lp) {
      setTextById('stat-last-scan', lp.nama);
      setTextById('stat-last-scan-time',
        last.time ? new Date(last.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : ''
      );
    }
  }

  // --- Render table ---
  renderPatientTable(patients);

  // --- Search ---
  const searchInp = document.getElementById('search-input');
  if (searchInp) {
    searchInp.addEventListener('input', () => {
      const results = searchPatients(searchInp.value);
      renderPatientTable(results);
    });
  }
}

function renderPatientTable(patients) {
  const tbody = document.getElementById('patient-tbody');
  if (!tbody) return;

  if (!patients.length) {
    tbody.innerHTML = `
      <tr class="empty-row">
        <td colspan="6">
          <div style="opacity:0.5;">
            <div style="font-size:2rem;margin-bottom:0.5rem;">🔍</div>
            <div>Tidak ada pasien ditemukan</div>
          </div>
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = patients.map(p => {
    const gc = getGenderClass(p.jenis_kelamin);
    const gi = getGenderIcon(p.jenis_kelamin);
    const init = getInitials(p.nama);
    const age = calculateAge(p.tanggal_lahir);
    return `
      <tr class="fade-in">
        <td>
          <span class="patient-id-badge">${escHtml(p.id)}</span>
        </td>
        <td>
          <div class="patient-name-cell">
            <div class="patient-avatar ${gc}">${init}</div>
            <div>
              <div class="name">${escHtml(p.nama)}</div>
              <div class="nik">${formatNIK(p.nik)}</div>
            </div>
          </div>
        </td>
        <td>
          <span class="gender-badge ${gc}">${gi} ${escHtml(p.jenis_kelamin)}</span>
        </td>
        <td>${age} thn</td>
        <td>
          <span class="blood-badge">${escHtml(p.golongan_darah)}</span>
        </td>
        <td>
          <span class="history-count">📋 ${p.riwayat.length} kunjungan</span>
        </td>
        <td>
          <a href="patient.html?id=${encodeURIComponent(p.id)}" class="btn-detail" id="btn-detail-${p.id}">
            Lihat Detail →
          </a>
        </td>
      </tr>`;
  }).join('');
}

// ======================
// SCAN PAGE
// ======================
function initScan() {
  const form = document.getElementById('scan-form');
  const input = document.getElementById('patient-id-input');
  const errBox = document.getElementById('scan-error');

  // Quick-fill ID chips
  document.querySelectorAll('.qid-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      input.value = chip.dataset.id;
      input.focus();
      errBox.classList.add('hidden');
    });
  });

  // Form submit
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const id = input.value.trim().toUpperCase();

      // Validation: empty
      if (!id) {
        showError(errBox, '⚠️ Masukkan ID Pasien terlebih dahulu.');
        shakeElement(input);
        return;
      }

      // Validation: patient exist
      const patient = getPatientById(id);
      if (!patient) {
        showError(errBox, `❌ Pasien dengan ID <strong>${escHtml(id)}</strong> tidak ditemukan.`);
        shakeElement(input);
        return;
      }

      // Save last scanned
      saveLastScanned(id);

      // Show loading then redirect
      errBox.classList.add('hidden');
      showScanLoading(patient, id);
    });
  }

  // Enter shortcut
  if (input) {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') form.requestSubmit();
    });
  }
}

function showScanLoading(patient, id) {
  const btn = document.getElementById('btn-scan');
  btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Memproses...';
  btn.disabled = true;

  setTimeout(() => {
    window.location.href = `patient.html?id=${encodeURIComponent(id)}`;
  }, 900);
}

// ======================
// PATIENT DETAIL
// ======================
function initPatient() {
  const id = getQueryParam('id');
  const contentArea = document.getElementById('patient-content');
  const loadingArea = document.getElementById('patient-loading');

  // Simulate loading
  setTimeout(() => {
    if (loadingArea) loadingArea.classList.add('hidden');
    if (contentArea) contentArea.classList.remove('hidden');
    renderPatient(id);
  }, 700);
}

function renderPatient(id) {
  const notFound = document.getElementById('patient-not-found');
  const detail = document.getElementById('patient-detail');

  if (!id) {
    showNotFound('ID tidak ditemukan di URL.');
    return;
  }

  const p = getPatientById(id);
  if (!p) {
    showNotFound(`Pasien dengan ID <strong>${escHtml(id.toUpperCase())}</strong> tidak terdaftar dalam sistem.`);
    return;
  }

  // Save to localStorage
  saveLastScanned(p.id);

  // Show detail
  if (notFound) notFound.classList.add('hidden');
  if (detail) detail.classList.remove('hidden');

  // Fill identity
  const age = calculateAge(p.tanggal_lahir);
  const gc = getGenderClass(p.jenis_kelamin);
  const gi = getGenderIcon(p.jenis_kelamin);
  const init = getInitials(p.nama);

  // Avatar
  const av = document.getElementById('detail-avatar');
  if (av) { av.textContent = init; av.className = `patient-avatar ${gc}`; av.style.cssText = 'width:56px;height:56px;font-size:1.3rem;border-radius:14px;display:flex;align-items:center;justify-content:center;font-weight:700;'; }

  setTextById('detail-nama', p.nama);
  setTextById('detail-id', p.id);
  setTextById('detail-nik', formatNIK(p.nik));
  setTextById('detail-tgl-lahir', formatDate(p.tanggal_lahir));
  setTextById('detail-usia', `${age} tahun`);
  setTextById('detail-jk', `${gi} ${p.jenis_kelamin}`);
  setTextById('detail-gol-darah', p.golongan_darah);
  setTextById('detail-alamat', p.alamat);
  setTextById('detail-telp', p.no_telp);
  setTextById('detail-bpjs', p.no_bpjs);

  // Page title
  document.title = `Q-CARE — ${p.nama}`;

  // Render history
  renderHistory(p);

  // Setup Send button
  setupSendButton(p);
}

function renderHistory(p) {
  const tbody = document.getElementById('history-tbody');
  const count = document.getElementById('history-count');

  if (count) count.textContent = `${p.riwayat.length} kunjungan`;

  if (!tbody) return;

  if (!p.riwayat || p.riwayat.length === 0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="4">Belum ada riwayat medis</td></tr>`;
    return;
  }

  // Sort by most recent
  const sorted = [...p.riwayat].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

  tbody.innerHTML = sorted.map((r, i) => `
    <tr class="fade-in" style="animation-delay:${i * 0.05}s">
      <td><span class="date-badge">${formatDate(r.tanggal)}</span></td>
      <td><span class="diagnosa-text">${escHtml(r.diagnosa)}</span></td>
      <td style="color:var(--text-light);font-size:0.82rem;">${escHtml(r.tindakan)}</td>
      <td><span class="dokter-text">👨‍⚕️ ${escHtml(r.dokter)}</span></td>
    </tr>`
  ).join('');
}

function setupSendButton(p) {
  const btn = document.getElementById('btn-kirim-dokter');
  const modal = document.getElementById('sendModal');

  // Fill modal info
  setTextById('modal-nama', p.nama);
  setTextById('modal-id', p.id);
  setTextById('modal-nik', formatNIK(p.nik));
  setTextById('modal-riwayat-count', `${p.riwayat.length} kunjungan`);
  setTextById('modal-timestamp', getNowTimestamp());

  // Confirm send
  const btnConfirm = document.getElementById('btn-confirm-send');
  if (btnConfirm) {
    btnConfirm.addEventListener('click', () => {
      // Close modal
      const bsModal = bootstrap.Modal.getInstance(document.getElementById('sendModal'));
      if (bsModal) bsModal.hide();

      // Show success overlay after short delay
      setTimeout(() => {
        showSuccessOverlay(p);
      }, 300);
    });
  }
}

function showSuccessOverlay(p) {
  const overlay = document.getElementById('success-overlay');
  setTextById('success-nama', p.nama);
  if (overlay) {
    overlay.classList.add('show');

    // Auto dismiss after 4s
    setTimeout(() => {
      overlay.classList.remove('show');
    }, 4000);

    // Manual dismiss
    overlay.addEventListener('click', () => {
      overlay.classList.remove('show');
    });
  }
}

function showNotFound(msg) {
  const notFound = document.getElementById('patient-not-found');
  const msgEl = document.getElementById('not-found-msg');
  if (notFound) notFound.classList.remove('hidden');
  if (msgEl) msgEl.innerHTML = msg;
  const detail = document.getElementById('patient-detail');
  if (detail) detail.classList.add('hidden');
}

// ======================
// HELPERS
// ======================
function setTextById(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function showError(el, msg) {
  if (!el) return;
  el.innerHTML = msg;
  el.classList.remove('hidden');
}

function shakeElement(el) {
  el.classList.add('shake');
  setTimeout(() => el.classList.remove('shake'), 500);
}

function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Shake animation (injected inline)
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%,60% { transform: translateX(-8px); }
    40%,80% { transform: translateX(8px); }
  }
  .shake { animation: shake 0.4s ease; }
`;
document.head.appendChild(shakeStyle);
