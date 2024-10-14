

export interface Sticker {
    url: string
    src: string
    name: string
    description: string
}

export interface GeradorStickerMuseum_Constructor{
    idDiv: string
    stickers: Sticker[]
}

export default class GeradorCarrosselImagens{

    constructor (options: GeradorStickerMuseum_Constructor) {
        this.idDiv = options.idDiv;

        if (options.stickers.length !== 0){
            this.stickerArray = options.stickers;
            this.n_stickers = options.stickers.length;
        }
    }

    idDiv: string;
    n_stickers: number = 0;

    stickerAberto: Sticker | null = null;
    stickerArray: Sticker[] = [];

    delayDefault: number = 500;

    Generate(): this {
        const div = document.querySelector(`#${this.idDiv}`);

        if (div) {

            // const mainModalDiv = document.createElement("div");
            // mainModalDiv.classList.add("carrosselWrapper");
            // mainModalDiv.id = "carrosselWrapper";
            
            // // ${this.Convert_CarrosselImagens_To_Html(this.GenerateCloneImages(this.imagensArray))}
            // mainModalDiv.innerHTML = `
            // <div class="imageWrapper" id="imageWrapper">
            //     <div class="imageSubWrapper" id="imageSubWrapper">
            //         ${this.Convert_CarrosselImagens_To_Html(this.imagensArray)}
            //     </div>
            // </div>
            // <div class="carrosselSideButton left">
            //     <div class="buttonSideScroll" id="leftDirection"><</div>
            // </div>
            // <div class="carrosselSideButton right">
            //     <div class="buttonSideScroll" id="rightDirection">></div>
            // </div>
            // <div class="carrosselButtons">
            //     ${this.Convert_CarrosselImagens_To_Buttons(this.imagensArray)}
            // </div>
            // `;

            // div.appendChild(mainModalDiv);
         
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
        // window.addEventListener("resize", function() {
        //     classThis.SetScreenWidth();
        //     const div = document.getElementById(`imageSubWrapper`) as HTMLElement;
        //     div!.style.transform = `translate(-${classThis.paginaAtual * classThis.GetScreenWidth()}px, 0px)`;
        // });

        // document.getElementById(`carrosselWrapper`)?.addEventListener("click", function (e){
        //     const el = (e.target as HTMLElement);
        //     if (el.closest(".carrosselPageIndicator")) {
        //         const newPageId = parseInt(el.getAttribute("data-page") as string);
        //         classThis.ManipularPagina(newPageId)
        //         classThis.ChangeButtonCss(newPageId)

        //     }
        // });
    }

}