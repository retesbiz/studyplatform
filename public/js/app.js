// ============================================================
//  StudyNest — Shared App Utilities
//  Wire to your Node.js/Express + MySQL backend
// ============================================================

// ── AUTH HELPERS ──────────────────────────────────────────
function getToken()   { return localStorage.getItem('token'); }
function getUser()    { try { return JSON.parse(localStorage.getItem('user')); } catch { return null; } }
function authHeaders(){ return { 'Authorization': 'Bearer ' + getToken(), 'Content-Type': 'application/json' }; }

function logout() {
  fetch('/api/auth/logout', { method: 'POST', headers: authHeaders() }).catch(() => {});
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/pages/login.html';
}

// ── PAGE INIT (call on every page) ───────────────────────
function initPage() {
  // Redirect to login if not authenticated
  if (!getToken()) {
    window.location.href = '/pages/login.html';
    return;
  }

  // Populate user info in sidebar and topbar
  const user = getUser();
  if (user) {
    const initials = ((user.firstName || 'J')[0] + (user.lastName || 'D')[0]).toUpperCase();
    const displayName = (user.firstName || '') + ' ' + (user.lastName || '');

    const sbName   = document.getElementById('sb-name');
    const sbAvatar = document.getElementById('sb-avatar');
    const tbAvatar = document.getElementById('topbar-avatar');
    const fnEl     = document.getElementById('user-firstname');

    if (sbName)   sbName.textContent   = displayName.trim() || 'Student';
    if (sbAvatar) sbAvatar.textContent = user.avatar || initials;
    if (tbAvatar) tbAvatar.textContent = user.avatar || initials;
    if (fnEl)     fnEl.textContent     = user.firstName || 'there';
  }

  // Fetch fresh user data from API in the background
  refreshUserData();

  // Set greeting based on time
  const greetEl = document.querySelector('.welcome-text h2');
  if (greetEl) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    greetEl.innerHTML = `${greeting}, <span id="user-firstname">${user?.firstName || 'there'}</span>! 👋`;
  }
}

async function refreshUserData() {
  try {
    const res  = await fetch('/api/users/me', { headers: authHeaders() });
    if (res.status === 401) { logout(); return; }
    const data = await res.json();
    localStorage.setItem('user', JSON.stringify(data));
    // Sync sidebar with fresh user data
    const initials = ((data.firstName||'J')[0]+(data.lastName||'D')[0]).toUpperCase();
    const sbAvatar = document.getElementById('sb-avatar');
    const sbName   = document.getElementById('sb-name');
    const tbAvatar = document.getElementById('topbar-avatar');
    const roleEl   = document.querySelector('.sidebar-user-role');
    if (sbAvatar) sbAvatar.textContent = data.avatar || initials;
    if (sbName)   sbName.textContent   = (data.firstName+' '+data.lastName).trim() || 'Student';
    if (tbAvatar) tbAvatar.textContent = data.avatar || initials;
    if (roleEl && data.levelName) roleEl.textContent = 'Lv.' + data.level + ' · ' + data.levelName;
  } catch (e) {
    // Offline — use cached data
  }
}

// ── TOAST NOTIFICATIONS ───────────────────────────────────
function toast(message, type = '', duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span> ${message}`;
  container.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(100%)'; t.style.transition = 'all .3s'; setTimeout(() => t.remove(), 300); }, duration);
}

// ── MODAL HELPERS (global) ────────────────────────────────
function openModal(id)  { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

// ── API WRAPPER ───────────────────────────────────────────
async function api(method, path, body) {
  const opts = { method, headers: authHeaders() };
  if (body) opts.body = JSON.stringify(body);
  let res;
  try { res = await fetch('/api' + path, opts); } catch(e) { throw new Error('Network error: ' + e.message); }
  if (res.status === 401) { logout(); return null; }
  const text = await res.text();
  try { return JSON.parse(text); } catch(e) { throw new Error('Server error (' + res.status + ')'); }
}

// ── FORMAT HELPERS ────────────────────────────────────────
function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)   return 'Just now';
  if (m < 60)  return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24)  return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-AU', { day:'numeric', month:'short', year:'numeric' });
}

function truncate(str, n) {
  return str.length > n ? str.slice(0, n) + '…' : str;
}
