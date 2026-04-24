// Dynamic Header Logic

async function initHeader() {
  try {
    const user = await AsmaraAPI.auth.me();
    localStorage.setItem('asmara_user', JSON.stringify(user));
    renderUser(user);
  } catch (e) {
    renderGuest();
  }

  loadNotifications();
}

function renderUser(user) {
  const container = document.querySelector('.header-actions');
  if (!container) return;

  container.innerHTML = `
    <span>👋 ${user.name}</span>
    <a href="/messages.html">💬 Messages</a>
    <a href="/notifications.html">🔔</a>
    <button onclick="AsmaraAPI.auth.logout()">Logout</button>
  `;
}

function renderGuest() {
  const container = document.querySelector('.header-actions');
  if (!container) return;

  container.innerHTML = `
    <a href="/login.html">Login</a>
    <a href="/register.html">Register</a>
  `;
}

async function loadNotifications() {
  try {
    const data = await AsmaraAPI.notifications.unreadCount();
    console.log('Unread notifications:', data.count);
  } catch (e) {
    console.log('No notifications');
  }
}

document.addEventListener('DOMContentLoaded', initHeader);
