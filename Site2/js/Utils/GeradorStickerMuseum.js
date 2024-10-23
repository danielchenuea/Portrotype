import gsap from 'gsap';
export default class GeradorStickerMuseum {
    constructor(options) {
        this.n_stickers = 0;
        this.stickerAberto = null;
        this.stickerArray = [];
        this.delayDefault = 500;
        this.idDiv = options.idDiv;
        if (options.stickers.length !== 0) {
            this.stickerArray = options.stickers;
            this.n_stickers = options.stickers.length;
        }
    }
    Generate() {
        const div = document.querySelector(`#${this.idDiv}`);
        if (div) {
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
            const backgroundDiv = document.createElement("div");
            backgroundDiv.classList.add("Page2_Background");
            backgroundDiv.innerHTML = `
                <div class="Page2_StickerBackground">
                    ${this.GenerateStickerHTMLFromArray(this.stickerArray)}
                    <div class="Page2_ContentWrapper">
                        <div class="Page2_StickerCloseHeader" id="Page2_StickerCloseHeader">X</div>
                        <div class="Page2_StickerTextHeader" id="Page2_StickerTextHeader" ></div>
                        <div class="Page2_StickerTextBody" id="Page2_StickerTextBody" ></div>
                    </div>
                </div>
            `;
            div.appendChild(backgroundDiv);
            this.SetDefaultGsap();
            this.CarregarEventos();
        }
        return this;
    }
    GenerateStickerHTMLFromArray(stickerArray) {
        let output = "";
        stickerArray.forEach((sticker, i) => {
            output += ` 
            <div class="Page2_StickerWrapper" id="sticker_${sticker.name}" data-name="${sticker.name}" style="display: block; left: ${sticker.leftPosition}%; top: ${sticker.topPosition}%">
                <div class="Page2_Sticker"></div>
            </div>`;
        });
        return output;
    }
    SetDefaultGsap() {
        gsap.set(`.Page2_StickerTextHeader`, {
            width: "0%"
        });
        gsap.set(`.Page2_StickerCloseHeader`, {
            opacity: "0"
        });
        gsap.set(`.Page2_StickerTextBody`, {
            height: "0%"
        });
    }
    CarregarEventos() {
        var _a;
        let classThis = this;
        (_a = document.querySelector(`.Page2_StickerBackground`)) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (e) {
            const el = e.target;
            const sticker = el.closest(".Page2_StickerWrapper");
            if (sticker) {
                const id = sticker.id;
                classThis.OpenDescription(id);
            }
        });
        document.getElementById(`Page2_StickerCloseHeader`).addEventListener("click", function (e) {
            classThis.CloseDescription();
        });
    }
    OpenDescription(stickerId) {
        const tl = gsap
            .timeline()
            .to(`.Page2_StickerBackground > .Page2_StickerWrapper:not(#${stickerId})`, {
            opacity: 0,
            duration: 0.2
        })
            .to(`#${stickerId}`, {
            left: "7.5%",
            top: "9%",
            duration: 0.3,
            onComplete: () => {
                var _a;
                (_a = document.getElementById(stickerId)) === null || _a === void 0 ? void 0 : _a.classList.add("displaced");
            }
        }, '<0.25')
            .to(`.Page2_StickerTextHeader`, {
            width: "100%",
            duration: 0.2,
        }, '<0.2')
            .to(`.Page2_StickerTextBody`, {
            height: "80%",
            duration: 0.2,
        })
            .to(`.Page2_StickerCloseHeader`, {
            opacity: "1",
            duration: 0.2,
        }, '<0.2')
            .then(() => {
        });
    }
    CloseDescription() {
        const displacedStickerElement = document.querySelector(`.Page2_StickerWrapper.displaced`);
        const displacedSticker = this.getStickerByNameOrDefault(displacedStickerElement.getAttribute("data-name"));
        const tl = gsap
            .timeline()
            .to(`.Page2_StickerTextBody`, {
            duration: 0.2,
            height: "0%"
        })
            .to(`.Page2_StickerTextHeader`, {
            duration: 0.2,
            width: "0%"
        })
            .to(`.Page2_StickerCloseHeader`, {
            opacity: "0",
            duration: 0.2,
        }, '<0.2')
            .to(displacedStickerElement, {
            left: displacedSticker ? displacedSticker.leftPosition + "%" : "0%",
            top: displacedSticker ? displacedSticker.topPosition + "%" : "0%",
            duration: 0.3,
            onComplete: () => {
                displacedStickerElement.classList.remove("displaced");
            }
        }, '<0.1')
            .to(`.Page2_StickerWrapper`, {
            opacity: 1,
            duration: 0.3,
            display: "block"
        })
            .then(() => {
        });
    }
    getStickerByNameOrDefault(name) {
        return this.stickerArray.find((sticker) => {
            return sticker.name == name;
        });
    }
}
