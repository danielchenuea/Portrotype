import gsap from 'gsap';

export interface Sticker {
    url: string
    src: string
    name: string
    leftPosition: number
    topPosition: number
    description: string
}

export interface GeradorStickerMuseum_Constructor{
    idDiv: string
    stickers: Sticker[]
}

export default class GeradorStickerMuseum{

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
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }

            const backgroundDiv = document.createElement("div");
            backgroundDiv.classList.add("Page2_Background");

            // ${this.Convert_CarrosselImagens_To_Html(this.GenerateCloneImages(this.imagensArray))}
            backgroundDiv.innerHTML = `
                <div class="Page2_StickerBackground">
                    ${this.GenerateStickers(this.stickerArray)}
                    <div class="Page2_ContentWrapper">
                        <div class="Page2_StickerCloseHeader" id="Page2_StickerCloseHeader">X</div>
                        <div class="Page2_StickerTextHeader" id="Page2_StickerTextHeader" ></div>
                        <div class="Page2_StickerTextBody" id="Page2_StickerTextBody" ></div>
                    </div>
                </div>
            `;

            div.appendChild(backgroundDiv);

            this.SetDefaultHtml();
            this.EventsOnLoad();
        }
        return this;
    }

    GenerateStickers(stickerArray: Sticker[]): string {
        let output = "";

        stickerArray.forEach((sticker, i) => {
            output += ` 
            <div class="Page2_StickerWrapper" id="sticker_${sticker.name}" data-name="${sticker.name}" style="display: block; left: ${sticker.leftPosition}%; top: ${sticker.topPosition}%">
                <div class="Page2_Sticker"></div>
            </div>`
        });

        return output;
    }

    SetDefaultHtml(){
        gsap.set(`.Page2_StickerTextHeader`, {
            width: "0%"
        })
        gsap.set(`.Page2_StickerCloseHeader`, {
            opacity: "0"
        })
        gsap.set(`.Page2_StickerTextBody`, {
            height: "0%"
        })
    }
    
    /**
     * Função que Configura os JQuery a serem utilizados pela classe.
     * - Clicar no Fora do Modal faz o Modal se fechar.
     * - Clicar no Modal impede que ele se feche.
     */
    private EventsOnLoad() {
        let classThis = this;

        document.querySelector(`.Page2_StickerBackground`)?.addEventListener("click", function (e){
            const el = (e.target as HTMLElement);
            const sticker = el.closest(".Page2_StickerWrapper");
            if (sticker) {
                const id = sticker.id;
                classThis.OpenDescription(id);
            }
        });
        document.getElementById(`Page2_StickerCloseHeader`)!.addEventListener("click", function (e){
            classThis.CloseDescription();
        });
    }

    private OpenDescription(stickerId: string) {
        const tl = gsap
            .timeline()
            .to(`.Page2_StickerBackground > .Page2_StickerWrapper:not(#${stickerId})`, {
                opacity: 0,
                duration: 0.2
            })
            .to(`#${stickerId}`, {
                left: "7.5%",
                top: "7.5%",
                duration: 0.3,
                onComplete: () => {
                    document.getElementById(stickerId)?.classList.add("displaced");
                }
            }, '<0.3')
            .to(`.Page2_StickerTextHeader`, {
                width: "100%",
                duration: 0.2,
            }, '<0.2')
            .to(`.Page2_StickerCloseHeader`, {
                opacity: "1",
                duration: 0.2,
            }, '<')
            .to(`.Page2_StickerTextBody`, {
                height: "80%",
                duration: 0.2,
            }, '<0.2')
            .then(() => {

            })
    }

    private CloseDescription() {
        const displacedStickerElement = document.querySelector(`.Page2_StickerWrapper.displaced`) as HTMLElement;
        const displacedSticker = this.getStickerByNameOrDefault(displacedStickerElement.getAttribute("data-name") as string)
        const tl = gsap
            .timeline()
            .to(`.Page2_StickerTextBody`, {
                duration: 0.2,
                height: "0%"
            })            
            .to(`.Page2_StickerCloseHeader`, {
                opacity: "0",
                duration: 0.2,
            }, '<')
            .to(`.Page2_StickerTextHeader`, {
                duration: 0.2,
                width: "0%"
            }, '<0.2')
            .to(displacedStickerElement, {
                left: displacedSticker? displacedSticker.leftPosition + "%" : "0%",
                top: displacedSticker? displacedSticker.topPosition + "%" : "0%",
                duration: 0.3,
                onComplete: () => {
                    displacedStickerElement.classList.remove("displaced")
                }
            }, '<0.2')
            .to(`.Page2_StickerWrapper`, {
                opacity: 1,
                duration: 0.3,
                display: "block"
            })
            .then(() => {
                
            })
    }
    
    private getStickerByNameOrDefault(name: string): Sticker | undefined{
        return this.stickerArray.find((sticker) => {
            return sticker.name == name;
        })
    }

}