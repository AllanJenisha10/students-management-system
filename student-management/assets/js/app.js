// Shared helpers used by every page.
const $ = s => document.querySelector(s);

async function api(url, method = 'GET', data) {
  const r = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) {
    if (r.status === 401) location = 'index.html';
    throw new Error(j.error || 'Something went wrong');
  }
  return j;
}

function esc(v) {
  return String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

let toastTimer;
function toast(msg, bad) {
  const t = $('#toast');
  t.textContent = msg;
  t.className = 'show' + (bad ? ' bad' : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.className = '', 2800);
}

async function logout() {
    try {
        await api('api/logout.php', 'POST');
    } catch (e) {
        console.error('Logout request failed:', e);
    } finally {
        location.href = 'index.html';
    }
}

// Send people to the right page if their role does not match.
async function guard(role) {
  const me = await api('api/me.php');
  if (me.role !== role) location = 'index.html';
  return me;
}
