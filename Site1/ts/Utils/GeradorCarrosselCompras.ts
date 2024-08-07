

export interface CarrosselCompra {
    url: string
    src: string
    ordem?: number
    isClone?: boolean
    title?: string
    delay?: number
}

export interface GeradorCarrosselCompras_Constructor{
    idDiv: string
    imagens: CarrosselCompra[]
}

export default class GeradorCarrosselCompras{

    constructor (options: GeradorCarrosselCompras_Constructor) {
        this.idDiv = options.idDiv;

        this.SetScreenWidth();

        if (options.imagens.length !== 0){
            this.imagensArray = options.imagens;
            this.n_Imagens = options.imagens.length;
        }
    }

    idDiv: string;
    n_Imagens: number = 3;
    imagemPadrao: number = 0;
    paginaAtual: number = 0;

    screenWidth: number = 0;

    delayDefault: number = 500;

    imagensArray: CarrosselCompra[] = [
        {
            url: "1",
            src: "src/images/carrossel1.jpg",
        },
        {
            url: "2",
            src: "src/images/carrossel2.jpg",
        },
        {
            url: "3",
            src: "src/images/carrossel3.jpg"
        }
    ];

    Generate(): this {
        const div = document.querySelector(`#${this.idDiv}`);

        if (div) {

            const mainModalDiv = document.createElement("div");
            mainModalDiv.classList.add("carrosselWrapper");
            mainModalDiv.id = "carrosselWrapper";
            
            mainModalDiv.innerHTML = `
            <div class="imageWrapper" id="imageWrapper">
                <div class="imageSubWrapper" id="imageSubWrapper">
                    ${this.Convert_CarrosselImagens_To_Html(this.imagensArray)}
                </div>
            </div>
            <div class="carrosselSideButton left">
                <div class="buttonSideScroll" id="leftDirection"><</div>
            </div>
            <div class="carrosselSideButton right">
                <div class="buttonSideScroll" id="rightDirection">></div>
            </div>
            <div class="carrosselButtons">
                ${this.Convert_CarrosselImagens_To_Buttons(this.imagensArray)}
            </div>
            `;

            div.appendChild(mainModalDiv);
        }
        
        this.EventsOnLoad();
        return this;
    }
    
    /**
     * Função que Configura os JQuery a serem utilizados pela classe.
     * - Clicar no Fora do Modal faz o Modal se fechar.
     * - Clicar no Modal impede que ele se feche.
     */
    private EventsOnLoad() {
        let classThis = this;
        window.addEventListener("resize", function() {
            classThis.SetScreenWidth();
            const div = document.getElementById(`imageSubWrapper`) as HTMLElement;
            div!.style.transform = `translate(-${classThis.paginaAtual * classThis.GetScreenWidth()}px, 0px)`;
        });

        document.getElementById(`carrosselWrapper`)?.addEventListener("click", function (e){
            const el = (e.target as HTMLElement);
            if (el.closest(".carrosselPageIndicator")) {
                const newPageId = parseInt(el.getAttribute("data-page") as string);
                classThis.ManipularPagina(newPageId)
                classThis.ChangeButtonCss(newPageId)

            }
        });


        document.getElementById("leftDirection")?.addEventListener("click", function(e){
            classThis.VoltarPagina();
        });
        document.getElementById("rightDirection")?.addEventListener("click", function(e){
            classThis.ProximaPagina();
        });
    }

    private Convert_CarrosselImagens_To_Buttons(imagemArray: CarrosselCompra[]): string{
        let output = "";

        imagemArray.forEach((img, i) => {
            output += `<div class="carrosselPageIndicator ${this.imagemPadrao == i ? " active" : ""}" id='carrossel${i}' data-page='${i}'></div>`
        });

        return output;
    }

    private Convert_CarrosselImagens_To_Html(imagemArray: CarrosselCompra[]): string{
        let output = "";

        imagemArray.forEach((img, i) => {
            output += `<img draggable="false" class='${img.isClone ? "clone" : ""}' src='${img.src}'></img>`
        });

        return output;
    }

    ChangeButtonCss(elementPage: number){
        const el = document.getElementById(`carrossel${elementPage}`)!;
        [...el.parentElement!.children].filter((child) => child !== el).forEach(child => {
            child.classList.remove("active");
        });
        el.classList.add("active");
    }
    
    ProximaPagina() {
        if (this.imagensArray === undefined) return;

        let novaPagina = this.paginaAtual + (1);

        if (novaPagina >= this.n_Imagens) novaPagina = 0;

        this.ManipularPagina(novaPagina);
    }
    VoltarPagina() {
        if (this.imagensArray === undefined) return;

        let novaPagina = this.paginaAtual + (-1);

        if (novaPagina < 0) novaPagina = this.n_Imagens - 1;

        this.ManipularPagina(novaPagina);
    }

    ManipularPagina(novaPagina: number) {
        if (this.imagensArray === undefined) return;

        this.paginaAtual = novaPagina;
        const div = document.getElementById(`imageSubWrapper`) as HTMLElement;
        div!.style.transform = `translate(-${novaPagina * this.GetScreenWidth()}px, 0px)`;
        this.ChangeButtonCss(novaPagina);
    }

    SetScreenWidth(): this{
        this.screenWidth = document.body.clientWidth;
        return this;
    }
    GetScreenWidth(): number{
        return this.screenWidth;
    }

}