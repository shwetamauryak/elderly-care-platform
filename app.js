// AuraCare — Smart Elderly Care & Medication Management Platform
// Author: Shweta Maurya

const DEFAULT_STATE = {
  currentRole: 'elderly', // 'elderly' | 'caretaker' | 'family'
  passcodes: { elderly: '1111', caretaker: '2222', family: '3333' },
  medications: [
    {
      id: 'med-1',
      name: 'Telmisartan (Blood Pressure)',
      dosage: '40 mg',
      timing: 'Morning (8:00 AM)',
      notes: 'Take after light breakfast with warm water',
      status: 'taken', // 'taken' | 'pending' | 'missed'
      takenAt: '08:15 AM'
    },
    {
      id: 'med-2',
      name: 'Metformin (Blood Sugar)',
      dosage: '500 mg',
      timing: 'Morning (8:00 AM)',
      notes: 'Take along with morning meal',
      status: 'taken',
      takenAt: '08:15 AM'
    },
    {
      id: 'med-3',
      name: 'Calcium & Vitamin D3',
      dosage: '1 Tablet',
      timing: 'Afternoon (1:00 PM)',
      notes: 'Post lunch',
      status: 'taken',
      takenAt: '01:20 PM'
    },
    {
      id: 'med-4',
      name: 'Atorvastatin (Cholesterol)',
      dosage: '10 mg',
      timing: 'Night (9:30 PM)',
      notes: 'Take before sleeping',
      status: 'pending',
      takenAt: null
    }
  ],
  appointments: [
    {
      id: 'apt-1',
      doctor: 'Dr. K. Verma, MD (Cardiologist)',
      clinic: 'Apex Heart & Wellness Centre',
      datetime: 'Tomorrow, Nov 16 • 11:00 AM',
      purpose: 'Routine 3-month BP & ECG Evaluation',
      status: 'Confirmed'
    },
    {
      id: 'apt-2',
      doctor: 'Dr. Sunita Rao (Endocrinologist)',
      clinic: 'Care Diabetes Care Clinic',
      datetime: 'Nov 24, 2026 • 04:30 PM',
      purpose: 'HbA1c Follow-up and Diet Review',
      status: 'Upcoming'
    }
  ],
  auditLog: [
    { time: '08:15 AM Today', text: 'Savitri Sharma marked Telmisartan & Metformin as TAKEN.' },
    { time: '08:16 AM Today', text: 'Automated email confirmation sent to Caretaker Anita Sharma.' },
    { time: '01:20 PM Today', text: 'Calcium & Vitamin D3 marked as TAKEN by Savitri Sharma.' },
    { time: 'Yesterday 09:30 PM', text: 'Night Atorvastatin verified by Caretaker Anita.' }
  ],
  simulatedEmails: [
    {
      timestamp: 'Today 08:00 AM',
      to: 'anita.sharma@example.com, family.care@example.com',
      subject: 'Morning Medication Alert: Savitri Sharma',
      preview: 'Reminder: 2 morning doses scheduled (Telmisartan 40mg, Metformin 500mg).'
    },
    {
      timestamp: 'Today 01:00 PM',
      to: 'anita.sharma@example.com',
      subject: 'Afternoon Dose Logged: Calcium & D3 Completed',
      preview: 'Patient adhered to afternoon schedule on time.'
    }
  ]
};

// Initialize State
let state = JSON.parse(localStorage.getItem('auracare_state')) || DEFAULT_STATE;

function saveState() {
  localStorage.setItem('auracare_state', JSON.stringify(state));
}

// Render Functions
function renderMedications() {
  const container = document.getElementById('med-card-container');
  if (!container) return;

  container.innerHTML = state.medications.map(med => {
    const isTaken = med.status === 'taken';
    const isMissed = med.status === 'missed';
    
    return `
      <div class="bg-white rounded-2xl p-5 border ${isTaken ? 'border-emerald-200 bg-emerald-50/20' : isMissed ? 'border-red-200 bg-red-50/20' : 'border-slate-200'} shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold px-2.5 py-1 rounded-full ${isTaken ? 'bg-emerald-100 text-emerald-800' : isMissed ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}">
              ${med.timing}
            </span>
            <span class="text-xs font-semibold ${isTaken ? 'text-emerald-600' : isMissed ? 'text-red-500' : 'text-slate-400'}">
              ${isTaken ? '✓ Taken at ' + med.takenAt : isMissed ? '⚠ Missed' : '⏳ Pending'}
            </span>
          </div>
          <h4 class="text-lg font-bold text-slate-800 mb-1">${med.name}</h4>
          <p class="text-sm font-semibold text-emerald-700 mb-2">Dosage: ${med.dosage}</p>
          <p class="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-4">${med.notes}</p>
        </div>

        <div class="pt-3 border-t border-slate-100 flex gap-2">
          ${isTaken ? `
            <button onclick="undoMedication('${med.id}')" class="w-full py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-200">
              Undo / Edit
            </button>
          ` : `
            <button onclick="markMedicationTaken('${med.id}')" class="w-2/3 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 shadow-sm flex items-center justify-center gap-1.5">
              <i data-lucide="check" class="w-4 h-4"></i> Mark Taken
            </button>
            <button onclick="markMedicationMissed('${med.id}')" class="w-1/3 py-2.5 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 border border-red-200">
              Missed
            </button>
          `}
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
  updateStats();
}

function renderAppointments() {
  const container = document.getElementById('appt-container');
  if (!container) return;

  container.innerHTML = `
    <div class="divide-y divide-slate-100">
      ${state.appointments.map(apt => `
        <div class="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">${apt.status}</span>
              <span class="text-sm font-bold text-slate-800">${apt.datetime}</span>
            </div>
            <h4 class="text-base font-bold text-slate-900">${apt.doctor}</h4>
            <p class="text-xs text-slate-500">${apt.clinic} • <span class="text-slate-700 font-medium">${apt.purpose}</span></p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="triggerApptReminder('${apt.doctor}')" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold">
              Email Reminder
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  lucide.createIcons();
}

function renderAuditLog() {
  const container = document.getElementById('audit-log-container');
  if (!container) return;

  container.innerHTML = state.auditLog.map(item => `
    <div class="flex items-start space-x-3 text-xs pb-3 border-b border-slate-100 last:border-0">
      <span class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
      <div>
        <p class="font-bold text-slate-800">${item.text}</p>
        <span class="text-slate-400 text-[11px]">${item.time}</span>
      </div>
    </div>
  `).join('');
}

function renderEmailSimulation() {
  const container = document.getElementById('email-inbox-simulation');
  if (!container) return;

  container.innerHTML = state.simulatedEmails.map(mail => `
    <div class="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
      <div class="flex justify-between items-center text-slate-400 text-[11px] mb-1">
        <span>To: <strong class="text-slate-700">${mail.to}</strong></span>
        <span>${mail.timestamp}</span>
      </div>
      <p class="font-bold text-slate-900 text-xs mb-1">Subject: ${mail.subject}</p>
      <p class="text-slate-600 text-xs">${mail.preview}</p>
    </div>
  `).join('');
}

function updateStats() {
  const total = state.medications.length;
  const taken = state.medications.filter(m => m.status === 'taken').length;
  const percent = total > 0 ? Math.round((taken / total) * 100) : 100;
  
  const elPercent = document.getElementById('adherence-percent');
  const elCount = document.getElementById('doses-today-count');
  if (elPercent) elPercent.innerText = `${percent}%`;
  if (elCount) elCount.innerText = `${taken} / ${total}`;
}

// User Actions
function markMedicationTaken(id) {
  const med = state.medications.find(m => m.id === id);
  if (!med) return;
  med.status = 'taken';
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  med.takenAt = now;
  state.auditLog.unshift({
    time: now + ' Today',
    text: `${med.name} marked as TAKEN (${state.currentRole.toUpperCase()}).`
  });
  saveState();
  renderMedications();
  renderAuditLog();
}

function markMedicationMissed(id) {
  const med = state.medications.find(m => m.id === id);
  if (!med) return;
  med.status = 'missed';
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  state.auditLog.unshift({
    time: now + ' Today',
    text: `MISSED DOSE ALERT: ${med.name} was not taken! Caretaker notified.`
  });

  state.simulatedEmails.unshift({
    timestamp: now + ' Today',
    to: 'anita.sharma@example.com (Caretaker), sunil.sharma@example.com (Son)',
    subject: `URGENT: Missed Medication Alert for Savitri Sharma`,
    preview: `Scheduled dose ${med.name} (${med.dosage}) at ${med.timing} was missed. Please check in with patient.`
  });

  showAlertBanner(`URGENT: Missed dose logged for ${med.name}! Automated email reminder dispatched to Caretaker.`);
  saveState();
  renderMedications();
  renderAuditLog();
  renderEmailSimulation();
}

function undoMedication(id) {
  const med = state.medications.find(m => m.id === id);
  if (!med) return;
  med.status = 'pending';
  med.takenAt = null;
  saveState();
  renderMedications();
}

function triggerSimulatedEmail() {
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  state.simulatedEmails.unshift({
    timestamp: now + ' Today',
    to: 'anita.sharma@example.com, family.care@example.com',
    subject: 'Automated Routine Health Summary: Savitri Sharma',
    preview: 'Weekly Adherence is at 94%. Next cardiologist appointment scheduled for tomorrow 11:00 AM.'
  });
  showAlertBanner('Simulated automated email dispatched successfully to family circle!');
  saveState();
  renderEmailSimulation();
}

function triggerApptReminder(doctor) {
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  state.simulatedEmails.unshift({
    timestamp: now + ' Today',
    to: 'anita.sharma@example.com (Caretaker)',
    subject: `Appointment Reminder: Consultation with ${doctor}`,
    preview: `Upcoming consultation scheduled. Please bring prior medication chart and blood pressure logs.`
  });
  showAlertBanner(`Email reminder queued for ${doctor}!`);
  saveState();
  renderEmailSimulation();
}

// Voice Readout for Elderly Users (Accessibility Feature)
function speakSchedule() {
  if ('speechSynthesis' in window) {
    const pendingMeds = state.medications.filter(m => m.status === 'pending');
    let text = `Namaste Savitri ji. Today you have taken ${state.medications.filter(m => m.status === 'taken').length} medicines. `;
    if (pendingMeds.length > 0) {
      text += `Your next medicine is ${pendingMeds[0].name}, dosage ${pendingMeds[0].dosage}, scheduled for ${pendingMeds[0].timing}.`;
    } else {
      text += 'All medicines for today are completed. Good job!';
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for clarity
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Voice readout not supported in this browser.');
  }
}

// Passcode Modal & Role Switcher
function openPasscodeModal() {
  document.getElementById('modal-passcode').classList.remove('hidden');
}
function closePasscodeModal() {
  document.getElementById('modal-passcode').classList.add('hidden');
}
function verifyPasscode() {
  const code = document.getElementById('input-passcode').value.trim();
  if (code === state.passcodes.elderly) {
    state.currentRole = 'elderly';
    document.getElementById('role-badge').innerText = 'Elderly (Dadiji)';
    closePasscodeModal();
  } else if (code === state.passcodes.caretaker) {
    state.currentRole = 'caretaker';
    document.getElementById('role-badge').innerText = 'Caretaker (Anita Sharma)';
    closePasscodeModal();
  } else if (code === state.passcodes.family) {
    state.currentRole = 'family';
    document.getElementById('role-badge').innerText = 'Family Member (Son/Daughter)';
    closePasscodeModal();
  } else {
    alert('Invalid Passcode! Try 1111 for Elderly, 2222 for Caretaker, 3333 for Family.');
  }
  document.getElementById('input-passcode').value = '';
}

// Tabs
function setActiveTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('border-emerald-600', 'text-emerald-700');
    btn.classList.add('border-transparent', 'text-slate-500');
  });
  document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));

  const activeBtn = document.getElementById('tab-' + tab);
  const activeContent = document.getElementById('view-' + tab);
  if (activeBtn) {
    activeBtn.classList.remove('border-transparent', 'text-slate-500');
    activeBtn.classList.add('border-emerald-600', 'text-emerald-700');
  }
  if (activeContent) activeContent.classList.remove('hidden');
}

// Font Size Accessibility
let fontScale = 0;
function changeFontSize(delta) {
  fontScale = Math.max(-1, Math.min(2, fontScale + delta));
  if (fontScale === 1) {
    document.body.style.fontSize = '18px';
  } else if (fontScale === 2) {
    document.body.style.fontSize = '20px';
  } else {
    document.body.style.fontSize = '16px';
  }
}

function showAlertBanner(msg) {
  const banner = document.getElementById('email-alert-banner');
  const txt = document.getElementById('alert-message');
  if (banner && txt) {
    txt.innerText = msg;
    banner.classList.remove('hidden');
  }
}
function dismissAlert() {
  const banner = document.getElementById('email-alert-banner');
  if (banner) banner.classList.add('hidden');
}

// Modal Add Med
function openAddMedModal() {
  document.getElementById('modal-add-med').classList.remove('hidden');
}
function closeAddMedModal() {
  document.getElementById('modal-add-med').classList.add('hidden');
}
function saveNewMedication(e) {
  e.preventDefault();
  const name = document.getElementById('new-med-name').value;
  const dosage = document.getElementById('new-med-dosage').value;
  const timing = document.getElementById('new-med-timing').value;
  const notes = document.getElementById('new-med-notes').value || 'As advised';

  const newMed = {
    id: 'med-' + Date.now(),
    name,
    dosage,
    timing,
    notes,
    status: 'pending',
    takenAt: null
  };
  state.medications.push(newMed);
  saveState();
  renderMedications();
  closeAddMedModal();
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  renderMedications();
  renderAppointments();
  renderAuditLog();
  renderEmailSimulation();
  lucide.createIcons();
});
