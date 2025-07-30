window.onload = function () {
  tambahTopik(); // mula dengan satu baris topik
};

function tambahTopik() {
  const tbody = document.getElementById("topikBody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td><input type="text" class="topik" /></td>
    <td><input type="number" class="markah" /></td>
    <td>
      <select class="item">
        <option>Objektif</option>
        <option>Struktur</option>
        <option>Esei</option>
      </select>
    </td>
    <td><button onclick="hapusTopik(this)">Padam</button></td>
  `;

  tbody.appendChild(row);
}

function hapusTopik(button) {
  const row = button.parentNode.parentNode;
  row.remove();
}

function paparJSU() {
  const topik = [...document.querySelectorAll(".topik")].map(i => i.value);
  const markah = [...document.querySelectorAll(".markah")].map(i => i.value);
  const item = [...document.querySelectorAll(".item")].map(i => i.value);

  const output = document.getElementById("output");
  let html = `<table><thead><tr><th>Topik</th><th>Markah</th><th>Jenis Item</th></tr></thead><tbody>`;

  for (let i = 0; i < topik.length; i++) {
    html += `<tr><td>${topik[i]}</td><td>${markah[i]}</td><td>${item[i]}</td></tr>`;
  }

  html += `</tbody></table>`;

  // Kesukaran
  const tahap = ["c1", "c2", "c3", "c4", "c5", "c6"];
  let jumlah = 0;
  let kesukaranHTML = `<h3>Peratus Tahap Kesukaran</h3><ul>`;
  tahap.forEach(id => {
    const val = parseInt(document.getElementById(id).value) || 0;
    jumlah += val;
    kesukaranHTML += `<li>${id.toUpperCase()}: ${val}%</li>`;
  });
  kesukaranHTML += `</ul>`;
  document.getElementById("jumlahKesukaran").textContent =
    "Jumlah: " + jumlah + "%";

  output.innerHTML = html + kesukaranHTML;

  // Simpan ke localStorage
  localStorage.setItem("jsuData", JSON.stringify({
    topik, markah, item,
    c1: document.getElementById("c1").value,
    c2: document.getElementById("c2").value,
    c3: document.getElementById("c3").value,
    c4: document.getElementById("c4").value,
    c5: document.getElementById("c5").value,
    c6: document.getElementById("c6").value
  }));
}

function resetBorang() {
  document.getElementById("topikBody").innerHTML = "";
  tambahTopik();
  document.getElementById("output").innerHTML = "";
  document.getElementById("jumlahKesukaran").textContent = "";
  ["c1", "c2", "c3", "c4", "c5", "c6"].forEach(id => {
    document.getElementById(id).value = "";
  });
  localStorage.clear();
}

function muatTurunExcel() {
  const ws = XLSX.utils.table_to_sheet(document.querySelector("#output table"));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "JSU");
  XLSX.writeFile(wb, "JSU.xlsx");
}

function muatTurunPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Jadual Spesifikasi Ujian", 10, 10);
  doc.html(document.getElementById("output"), {
    callback: function (doc) {
      doc.save("JSU.pdf");
    },
    x: 10,
    y: 20
  });
}
