// app.js - shared utility (kept minimal)
function apiHeaders(token) {
  const h = { 'Content-Type': 'application/json' };
  if (token) h['Authorization'] = 'Bearer ' + token;
  return h;
}

// helper to show alert (use in pages)
function showAlert(msg) { alert(msg); }