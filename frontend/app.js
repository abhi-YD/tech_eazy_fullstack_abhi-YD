const form = document.getElementById("parcelForm");
const table = document.getElementById("parcelTable");

let editingParcelId = null;

// Handle Form Submit (Create or Edit)
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const parcel = Object.fromEntries(formData.entries());

  const url = editingParcelId
    ? 'http://localhost:3000/parcels/${editingParcelId}'
    : "http://localhost:3000/parcels";

  const method = editingParcelId ? "PUT" : "POST";

  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parcel),
  });

  form.reset();
  editingParcelId = null;
  loadParcels();
});

// Load & Render Table
async function loadParcels() {
  const res = await fetch("http://localhost:3000/parcels");
  const parcels = await res.json();

  table.innerHTML = `
    <tr>
      <th>Tracking ID</th>
      <th>Name</th>
      <th>Address</th>
      <th>Contact</th>
      <th>Size</th>
      <th>Weight</th>
      <th>Actions</th>
    </tr>
  `;

  parcels.forEach((p) => {
    table.innerHTML += `
      <tr>
        <td>${p.tracking_id}</td>
        <td>${p.customer_name}</td>
        <td>${p.delivery_address}</td>
        <td>${p.contact_number}</td>
        <td>${p.size}</td>
        <td>${p.weight}</td>
        <td>
          <button class="edit-btn" onclick="editParcel('${p.tracking_id}')">Edit</button>
          <button class="delete-btn" onclick="deleteParcel('${p.tracking_id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Edit Parcel
async function editParcel(id) {
  const res = await fetch('http://localhost:3000/parcels/${id}');
  const parcel = await res.json();

  document.querySelector('[name="customer_name"]').value = parcel.customer_name;
  document.querySelector('[name="delivery_address"]').value = parcel.delivery_address;
  document.querySelector('[name="contact_number"]').value = parcel.contact_number;
  document.querySelector('[name="size"]').value = parcel.size;
  document.querySelector('[name="weight"]').value = parcel.weight;

  editingParcelId = id;
}

// Delete Parcel
async function deleteParcel(id) {
  if (!confirm("Are you sure you want to delete this parcel?")) return;

  await fetch('http://localhost:3000/parcels/${id}', {
    method: "DELETE",
  });

  loadParcels();
}

loadParcels();