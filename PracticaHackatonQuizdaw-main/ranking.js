// FUNCIÓN NUEVA · Ranking Top 3
// Guarda en la cookie "ranking" un array de objetos (las 3 mejores partidas).
// Orden: más puntos primero; si empatan, gana quien tardó menos segundos.
const MEDALLAS = ["🥇", "🥈", "🥉"];
const MAX_RANKING = 3;

function cargarRanking() {
  return leerCookie("ranking", []);
}

function actualizarRanking(partida) {
  const ranking = cargarRanking();
  ranking.push({
    nombre: partida.nombre,
    puntos: partida.puntos,
    total: partida.total,
    segundos: partida.segundos
  });
  ranking.sort((a, b) => (b.puntos - a.puntos) || (a.segundos - b.segundos));
  guardarCookie("ranking", ranking.slice(0, MAX_RANKING), 30);
}

function pintarRanking() {
  const ranking = cargarRanking();
  const lista = document.getElementById("listaRanking");
  lista.innerHTML = "";
  ranking.forEach((r, i) => {
    const li = document.createElement("li");
    li.textContent = MEDALLAS[i] + " " + r.nombre + " — " + r.puntos + "/" + r.total + " en " + r.segundos + " s";
    lista.appendChild(li);
  });
  document.getElementById("rankingVacio").hidden = ranking.length > 0;
}

function alternarRanking() {
  const seccion = document.getElementById("ranking");
  seccion.hidden = !seccion.hidden;
  document.getElementById("btnRanking").textContent = seccion.hidden ? "Ver ranking" : "Ocultar ranking";
}
