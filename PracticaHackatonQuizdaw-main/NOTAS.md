# Hackatón QuizDAW · Notas de la práctica

## Parte 1 · Los 15 fallos

| # | Archivo | Qué era | Cómo se encuentra | Arreglo |
|---|---------|---------|-------------------|---------|
| 1 | app.js `pedirNombre` | `prompt()` devuelve `null` si pulsas Cancelar y `null.trim()` lanza TypeError | Consola: recargar con las cookies borradas y pulsar Cancelar | `(prompt(...) \|\| "").trim() \|\| "invitado"` |
| 2 | app.js `aplicarTema` | `document.body.class` no existe; la propiedad es `className` | El botón "Cambiar tema" guarda la cookie pero la página no cambia | `document.body.className = ...` |
| 3 | app.js `datosDelNavegador` | `document.innerWidth` no existe (es de `window`) | Pie de página: "Ventana: NaN × NaN" | `window.innerWidth` / `window.innerHeight` |
| 4 | app.js `datosDelNavegador` | `window.title` no existe (el título es `document.title`) | Pie de página: "Página: undefined" | `document.title` |
| 5 | app.js `elegirPreguntas` | `Math.random()*length + 1` nunca elige la posición 0 y puede salirse del array (`undefined`) | Partidas con preguntas repetidas o que fallan con `q` undefined; `console.log(posicion)` | Quitar el `+ 1` |
| 6 | app.js `manejarOpcion` | `dataset.i` es **texto** ("1") y se compara con `===` contra un número | Siempre sale "Incorrecto" aunque aciertes; `console.log(typeof i)` | `responder(Number(dato))` |
| 7 | app.js `abrirResultados` | Abre `resultado.html` pero el archivo es `resultados.html` | La ventana emergente da 404 | Corregir el nombre |
| 8 | app.js `iniciar` | `addEventListener("click", abrirResultados())`: se **ejecuta** al cargar en vez de pasar la función | Se abre la ventana sola al entrar y el botón no hace nada | `abrirResultados` sin paréntesis |
| 9 | cookies.js `borrarCookie` | Usa `path=/quiz`, pero las cookies se crearon con `path=/` | "Borrar datos" no borra nada (Application → Cookies) | `path=/` |
| 10 | cookies.js `guardarCookie` | `dias*24*60` son **minutos**, no segundos | Application → Cookies: la caducidad es de 43 200 s (12 h) en vez de 30 días | `dias*24*60*60` |
| 11 | partida.js `formatearFecha` | `getMonth()` empieza en 0 | La fecha de marzo sale como mes 2 | `getMonth() + 1` |
| 12 | partida.js `formatearFecha` | `getYear()` está obsoleto y devuelve años desde 1900 ("126") | La fecha sale como `15/2/126` | `getFullYear()` |
| 13 | partida.js `cargarPartidas` | `JSON.parse` devuelve objetos sueltos, no instancias de `Partida`, así que no tienen métodos | Al recargar tras una partida: "p.resumen is not a function" | `datos.map(d => new Partida(...))` |
| 14 | partida.js `guardarPartida` | `slice(0, 5)` se queda con las 5 **primeras** (más antiguas), no las 5 últimas | A partir de la 6.ª partida la lista no cambia | `slice(-5)` |
| 15 | partida.js `mediaPuntos` | `reduce` sin valor inicial: la primera suma es un objeto + número | "Media: NaN puntos" | `reduce((s, p) => s + p.puntos, 0)` |

**Fallos que esconden a otros:** el 8 tapaba el 7 (la ventana se abría al cargar, así que no se veía que el nombre era incorrecto), el 6 tapaba todo lo que pasa después de acertar, y el 13 no se ve hasta que existe una partida guardada.

### Mejoras extra (no son de los 15)
- `cookies.js`: el JSON se guarda con `encodeURIComponent` y se lee con `decodeURIComponent`, así un nombre con `;` no rompe la cookie. `leerCookie` usa `try/catch` por si la cookie está corrupta.

## Parte 2 · Función nueva: Ranking Top 3

**Qué hace:** guarda las 3 mejores partidas (más puntos; si empatan, menos segundos) y las muestra con medallas.

- **Botón nuevo:** "Ver ranking" / "Ocultar ranking".
- **Cookie con JSON:** `quiz_ranking`, 30 días.
- **Array de objetos:** `{ nombre, puntos, total, segundos }`, ordenado con `sort`.
- **Texto con código:** `createElement` + `textContent` para pintar la lista.
- Archivos tocados: `ranking.js` (nuevo), `index.html`, `app.js`, `estilos.css`.

**Qué decirle al profesor antes de programarla:**
"Voy a añadir un ranking con las 3 mejores partidas. Tendrá un botón para mostrarlo u ocultarlo, guardará un array de objetos en una cookie con JSON y lo pintará con el DOM. Se borra con 'Borrar datos'."

## Para la defensa
- Ten claros dos cambios, por ejemplo el 6 (string vs número) y el 13 (JSON no conserva métodos).
- Fallo a propósito fácil: quitar el `, 0` del `reduce` (sale NaN) o poner mal el `id` de un `getElementById`.
- Cambio pequeño típico: la duración de la cookie está en la llamada `guardarCookie(..., 30)`; el parámetro son días.
