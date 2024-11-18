import { listaHeroes } from "../src/Controlador/TLista";

document.addEventListener("DOMContentLoaded", () => { 
    const appContainer = document.getElementById("app-container");

    function renderView(): void {
        if (!appContainer) return;

        const hash = window.location.hash || "#heroes";
        appContainer.innerHTML = "";

        if (hash === "#heroes") {
            renderHeroesView(appContainer);
        } else if (hash === "#agregar") {
            renderAgregarView(appContainer);
        } else if (hash === "#editar") {
            renderEditarEliminarView(appContainer);
        }
    }

    window.addEventListener("hashchange", renderView);
    renderView();
});

function renderHeroesView(container: HTMLElement): void {
    const table = document.createElement("table");
    table.id = "tabla-H";
    table.innerHTML = `
        <thead>
            <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Ciudad</th>
                <th>Imagen</th>
            </tr>
        </thead>
        <tbody id="lista-h"></tbody>
    `;
    container.appendChild(table);

    listaHeroes.listar();
}

function renderAgregarView(container: HTMLElement): void {
    container.innerHTML = `
        <form id="form-hero">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre">
            <label for="edad">Edad:</label>
            <input type="number" id="edad" name="edad">
            <label for="ciudad">Ciudad:</label>
            <input type="text" id="ciudad" name="ciudad">
            <label for="imagen">URL Imagen:</label>
            <input type="url" id="imagen" name="imagen">
            <button type="button" id="btn">Guardar</button>
        </form>
    `;

    const button = container.querySelector("#btn") as HTMLButtonElement;
    button.addEventListener("click", (e) => saveHero(e));
}


function saveHero(e: Event): void {
    e.preventDefault();

    const nombre = (document.getElementById("nombre") as HTMLInputElement).value;
    const edad = Number((document.getElementById("edad") as HTMLInputElement).value);
    const ciudad = (document.getElementById("ciudad") as HTMLInputElement).value;
    const imagen = (document.getElementById("imagen") as HTMLInputElement).value;

    const hash = window.location.hash;
    if (hash === "#agregar") {
        listaHeroes.insertar(nombre, edad, ciudad, imagen);
    }

    window.location.hash = "#heroes";
}


function renderEditarEliminarView(container: HTMLElement): void {
    container.innerHTML = "";

    const list = document.createElement("div");
    list.innerHTML = listaHeroes.ListaHeroes.map((heroe) => `
        <div class="heroe-item">
            <img src="${heroe.Imagen}" alt="${heroe.Nombre}" class="hero-img">
            <p><strong>${heroe.Nombre}</strong></p>
            <p>Código: ${heroe.Codigo}</p>
            <button class="editar" data-codigo="${heroe.Codigo}">Editar</button>
            <button class="eliminar" data-codigo="${heroe.Codigo}">Eliminar</button>
        </div>
    `).join('');

    container.appendChild(list);

    list.addEventListener("click", (event) => {
        const target = event.target as HTMLButtonElement;
        const codigo = Number(target.dataset.codigo);

        if (target.classList.contains("editar")) {
            const heroe = listaHeroes.ListaHeroes.find((h) => h.Codigo === codigo);
            if (heroe) {
                window.location.hash = "#agregar";
                setTimeout(() => {
                    (document.getElementById("codigo") as HTMLInputElement).value = heroe.Codigo.toString();
                    (document.getElementById("nombre") as HTMLInputElement).value = heroe.Nombre;
                    (document.getElementById("edad") as HTMLInputElement).value = heroe.Edad.toString();
                    (document.getElementById("ciudad") as HTMLInputElement).value = heroe.Ciudad;
                    (document.getElementById("imagen") as HTMLInputElement).value = heroe.Imagen;
                }, 100);
            }
        } else if (target.classList.contains("eliminar")) {
            listaHeroes.eliminar(codigo);
            renderEditarEliminarView(container); 
        }
    });
}

