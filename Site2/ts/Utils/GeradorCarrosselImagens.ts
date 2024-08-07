

export interface CarrosselImagem {
    url: string
    src: string
    ordem?: number
    isClone?: boolean
    title?: string
    delay?: number
}

export interface GeradorCarrosselImagens_Constructor{
    idDiv: string
    imagens: CarrosselImagem[]
}

export default class GeradorCarrosselImagens{

    constructor (options: GeradorCarrosselImagens_Constructor) {
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

    imagensArray: CarrosselImagem[] = [
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
            
            // ${this.Convert_CarrosselImagens_To_Html(this.GenerateCloneImages(this.imagensArray))}
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
         
            this.EventsOnLoad();
        }
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

        // let container = document.getElementById("imageWrapper")!;
        // let innerContainer = document.getElementById("imageSubWrapper")!;
        
        // let pressed = false;
        // let startX: number = 0;
        // let x: number = 0;

        // container.addEventListener("mousedown", (e) => {
        //     pressed = true;
        //     startX = e.offsetX - innerContainer.offsetLeft;
        //     container.style.cursor = "grabbing";
        // });
        
        // container.addEventListener("mouseenter", () => {
        //     container.style.cursor = "grab";
        // });
        
        // container.addEventListener("mouseup", () => {
        //     container.style.cursor = "grab";
        //     pressed = false;
        // });
        
        // container.addEventListener("mousemove", (e) => {
        //     if (!pressed) return;
        //     e.preventDefault();
        
        //     x = e.offsetX;
        //     innerContainer.style.left = `${x - startX}px`;
        // });
    }

    private Convert_CarrosselImagens_To_Buttons(imagemArray: CarrosselImagem[]): string{
        let output = "";

        imagemArray.forEach((img, i) => {
            output += `<div class="carrosselPageIndicator ${this.imagemPadrao == i ? " active" : ""}" id='carrossel${i}' data-page='${i}'></div>`
        });

        return output;
    }

    private GenerateCloneImages(imagemArray: CarrosselImagem[]): CarrosselImagem[]{
        let i = 0;

        const setAsClone = (arr: CarrosselImagem[]) => { arr.forEach(el => { el.isClone = true; el.ordem = i++ }); return arr };
        const setAsNotClone = (arr: CarrosselImagem[]) => { arr.forEach(el => { el.isClone = false; el.ordem = i++ }); return arr };
        const pushArray = (arr1: CarrosselImagem[], arr2: CarrosselImagem[]) => { arr1.forEach(el => arr2.push(el)) };

        let result: CarrosselImagem[] = [];
        
        pushArray(setAsClone(imagemArray.map(a => {return {...a}}).slice(1, imagemArray.length)), result);
        pushArray(setAsNotClone(imagemArray.map(a => {return {...a}})), result);
        pushArray(setAsClone(imagemArray.map(a => {return {...a}}).slice(0, imagemArray.length - 1)), result);

        return result;
    }
    private Convert_CarrosselImagens_To_Html(imagemArray: CarrosselImagem[]): string{
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