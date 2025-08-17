// app.js
const API = 'http://localhost:3000';

// Auth
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (result.token) {
      localStorage.setItem('token', result.token);
      window.location.href = 'parcels.html';
    } else {
      alert('Login failed');
    }
  });
}

// Parcels
const parcelForm = document.getElementById('parcelForm');
const parcelTable = document.getElementById('parcelTable');
if (parcelForm && parcelTable) {
  parcelForm.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(parcelForm);
    const data = Object.fromEntries(formData.entries());
    await fetch(`${API}/parcels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(data)
    });
    parcelForm.reset();
    loadParcels();
  });

  async function loadParcels() {
    const res = await fetch(`${API}/parcels`, {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    });
    const parcels = await res.json();
    const tbody = parcelTable.querySelector('tbody');
    tbody.innerHTML = '';
    parcels.forEach(p => {
      tbody.innerHTML += `
        <tr>
          <td>${p.tracking_id}</td>
          <td>${p.customer_name}</td>
          <td>${p.delivery_address}</td>
          <td>${p.contact_number}</td>
          <td>${p.size}</td>
          <td>${p.weight}</td>
        </tr>
      `;
    });
  }

  loadParcels();
}

// Orders
const orderForm = document.getElementById('orderForm');
const orderTable = document.getElementById('orderTable');
if (orderForm && orderTable) {
  orderForm.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(orderForm);
    const data = Object.fromEntries(formData.entries());
    await fetch(`${API}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(data)
    });
    orderForm.reset();
    loadOrders();
  });

  async function loadOrders() {
    const res = await fetch(`${API}/orders`, {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    });
    const orders = await res.json();
    const tbody = orderTable.querySelector('tbody');
    tbody.innerHTML = '';
    orders.forEach(o => {
      tbody.innerHTML += `
        <tr>
          <td>${o.id}</td>
          <td>${o.parcel_id}</td>
          <td>${o.status}</td>
        </tr>
      `;
    });
  }

  loadOrders();
}