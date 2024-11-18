import { Heroes } from "../Entidades/Heroe";

export class TLista {
    public ListaHeroes: Heroes[] = [
        new Heroes(1, "Batman", 40, "Gotica", "https://bandai.com.mx/blog/wp-content/uploads/2019/09/Historia-de-Batman-el-superhe%CC%81roe-ma%CC%81s-popular-en-la-era-digital-copia-1.jpg"),
        new Heroes(2, "Spiderman", 20, "New York", "https://www.mundodeportivo.com/alfabeta/hero/2023/09/aprende-como-puedes-leer-de-forma-cronologica-los-comics-de-spider.jpg?width=1200"),
        new Heroes(3, "Superman", 35, "Metropolis", "https://resizer.glanacion.com/resizer/v2/asi-se-veria-superman-en-la-vida-real-segun-la-SS2YWWIXDVEPPIPZDHJII7NWTM.PNG?auth=ba47cfa4417daa14555b3e27c76bd60d60c3123c13c3e02b8fd2abb742d81fef&width=768&quality=70&smart=false"),
    ];

    insertar(nombre: string, edad: number, ciudad: string, imagen: string): void {
        const nuevoCodigo = this.ListaHeroes.length > 0 
            ? Math.max(...this.ListaHeroes.map((heroe) => heroe.Codigo)) + 1 
            : 1;
    
        const nuevoHeroe = new Heroes(nuevoCodigo, nombre, edad, ciudad, imagen);
        this.ListaHeroes.push(nuevoHeroe);
        this.listar();
    }
    

    editar(codigo: number, nuevoCodigo: number, nombre: string, edad: number, ciudad: string, imagen: string): void {
        const index = this.ListaHeroes.findIndex((heroe) => heroe.Codigo === codigo);
        if (index !== -1) {
            this.ListaHeroes[index] = new Heroes(nuevoCodigo, nombre, edad, ciudad, imagen);
            this.listar();
        }
    }

    eliminar(codigo: number): void {
        this.ListaHeroes = this.ListaHeroes.filter((heroe) => heroe.Codigo !== codigo);
        this.listar();
    }

    listar(): void {
        const lista = document.getElementById("lista-h") as HTMLElement;
        if (!lista) return;

        lista.innerHTML = this.ListaHeroes.map((heroe) => `
            <tr>
                <td>${heroe.Codigo}</td>
                <td>${heroe.Nombre}</td>
                <td>${heroe.Edad}</td>
                <td>${heroe.Ciudad}</td>
                <td><img src="${heroe.Imagen}" alt="${heroe.Nombre}" class="hero-img"></td>
            </tr>
        `).join('');
    }
}

export const listaHeroes = new TLista();
