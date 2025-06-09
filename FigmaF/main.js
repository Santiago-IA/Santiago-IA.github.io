const db = new Dexie("PortfolioDB");
db.version(1).stores({
  visitas: "++id, timestamp",
  libros: "++id, titulo, autor"
});

document.getElementById("form-libro").addEventListener("submit", async e => {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  if (titulo && autor) {
    await db.libros.add({ titulo, autor });
    document.getElementById("form-libro").reset();
    cargarLibros();
  }
});

async function cargarLibros() {
  const contenedor = document.getElementById("lista-libros");
  contenedor.innerHTML = "";
  const libros = await db.libros.toArray();
  libros.forEach(libro => {
    const div = document.createElement("div");
    div.className = "libro-card";
    div.innerHTML = `
      <h4>${libro.titulo}</h4>
      <p>${libro.autor}</p>
      <button class="btn-eliminar" onclick="eliminarLibro(${libro.id})">×</button>
    `;
    contenedor.appendChild(div);
  });
}

async function eliminarLibro(id) {
  await db.libros.delete(id);
  cargarLibros();
}

cargarLibros();
