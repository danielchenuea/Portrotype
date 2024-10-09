var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import gsap from 'gsap';
export default class GeradorRoletaImagens {
    constructor(options) {
        this.paginaAtual = 0;
        this.imagensAtual = [];
        this.imagensArray = [
            {
                nome: "Imagem 1",
                descricao: "1",
                url: "",
                src: "src/images/chevrolet-2510031_640.jpg"
            },
            {
                nome: "Imagem 2",
                descricao: "2",
                url: "",
                src: "src/images/girl-8880144_640.png"
            },
            {
                nome: "Imagem 3",
                descricao: "3",
                url: "",
                src: "src/images/green-8935080_640.jpg"
            },
            {
                nome: "Imagem 4",
                descricao: "4",
                url: "",
                src: "src/images/sea-8344717_640.jpg"
            },
            {
                nome: "Imagem 5",
                descricao: "5",
                url: "",
                src: "src/images/truck-8497705_640.jpg"
            },
            {
                nome: "Imagem 6",
                descricao: "6",
                url: "",
                src: "src/images/water-4243762_640.jpg"
            }
        ];
        this.idDiv = options.idDiv;
        this.idController = options.idController;
        this.rows = options.rows;
        this.columns = options.columns;
    }
    Generate() {
        const div = document.querySelector(`#${this.idDiv}`);
        if (div) {
            for (let i = 0; i < this.columns; i++) {
                const mainPolaroidDiv = document.createElement("div");
                mainPolaroidDiv.classList.add("Page3Content_PolaroidRow");
                for (let j = 0; j < this.rows; j++) {
                    const index = (i * this.rows) + j;
                    mainPolaroidDiv.insertAdjacentHTML("beforeend", `
                    <div class="Page3Content_PolaroidContent">
                        <div class="Page3Content_PolaroidPhoto" id="Page3_PolaroidPhoto${index}">
                            <div class="Page3Content_PolaroidBackground"></div>
                            <div class="Page3Content_PolaroidImageWrapper">
                                <img class="Page3Content_PolaroidImage" id="Page3_PolaroidImage${index}" src="${this.imagensArray[index].src}"></img>
                                <div class="Page3Content_PolaroidOverlay"></div>
                            </div>
                        </div>
                        <div class="Page3Content_PolaroidDescription">
                            <div class="Page3Content_PolaroidDescriptionOverlay">
                                <div class="Page3Content_PolaroidDescriptionTitle" id="Page3_PolaroidDescriptionTitle${index}">
                                    ${this.imagensArray[index].nome}
                                </div> 
                                <div class="Page3Content_PolaroidDescriptionText" id="Page3_PolaroidDescriptionText${index}">
                                    ${this.imagensArray[index].descricao}
                                </div> 
                            </div> 
                        </div> 
                    </div>`);
                }
                div.appendChild(mainPolaroidDiv);
            }
            document.querySelectorAll(".Page3Content_PolaroidPhoto").forEach(el => {
                const photo = el.querySelector(".Page3Content_PolaroidBackground");
                const background = el.querySelector(".Page3Content_PolaroidImageWrapper");
                const randomRotation = (Math.random() * 1.5) + 1;
                const randomPosition = Math.floor(Math.random() * 9) >= 5;
                photo.style.transform = `rotate(${randomPosition ? "-" : ""}${randomRotation}deg)`;
                background.style.transform = `rotate(${randomPosition ? "" : "-"}${randomRotation}deg)`;
            });
        }
        const idControl = document.querySelector(`#${this.idController}`);
        if (idControl) {
            const controlDiv = document.createElement("div");
            controlDiv.classList.add("roletaButtons");
            const pageNum = Math.ceil(this.imagensArray.length / (this.columns * this.rows));
            for (let i = 0; i < pageNum; i++) {
                controlDiv.insertAdjacentHTML("beforeend", `
                    <div class="roletaPageIndicator ${0 == i ? " active" : ""}" id='roleta${i}' data-page='${i}'>
                        <div class="roletaTimerIndicator${i}">
                        </div>
                    </div>
                `);
            }
            idControl.appendChild(controlDiv);
        }
        this.EventsOnLoad();
        return this;
    }
    EventsOnLoad() {
        var _a, _b, _c;
        let classThis = this;
        (_a = document.getElementById(this.idController)) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (e) {
            const el = e.target;
            if (el.closest(".roletaPageIndicator")) {
                const newPageId = parseInt(el.getAttribute("data-page"));
                classThis.ManipularPagina(newPageId);
                classThis.ChangeButtonCss(newPageId);
            }
        });
        (_b = document.getElementById("leftDirection")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function (e) {
            classThis.VoltarPagina();
        });
        (_c = document.getElementById("rightDirection")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function (e) {
            classThis.ProximaPagina();
        });
    }
    FadeOutImagens(direction) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (direction) {
                case "left":
                    yield gsap.timeline()
                        .fromTo(".Page3Content_PolaroidPhoto", { x: 0, opacity: 1 }, { x: -50, opacity: 0, duration: 0.3, stagger: 0.05 }, "<")
                        .fromTo(".Page3Content_PolaroidDescriptionTitle", { x: 0, opacity: 1 }, { x: -5, opacity: 0, duration: 0.3, stagger: 0.05 }, "<")
                        .fromTo(".Page3Content_PolaroidDescriptionText", { x: 0, opacity: 1 }, { x: -5, opacity: 0, duration: 0.3, stagger: 0.05 }, "<");
                    break;
                default:
                    yield gsap.timeline()
                        .fromTo(".Page3Content_PolaroidPhoto", { x: 0, opacity: 1 }, { x: 50, opacity: 0, duration: 0.3, stagger: 0.05 }, "<")
                        .fromTo(".Page3Content_PolaroidDescriptionTitle", { x: 0, opacity: 1 }, { x: 5, opacity: 0, duration: 0.3, stagger: 0.05 }, "<")
                        .fromTo(".Page3Content_PolaroidDescriptionText", { x: 0, opacity: 1 }, { x: 5, opacity: 0, duration: 0.3, stagger: 0.05 }, "<");
                    break;
            }
        });
    }
    FadeInImagens(direction) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (direction) {
                case "left":
                    yield gsap.timeline()
                        .fromTo(".Page3Content_PolaroidPhoto", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<")
                        .fromTo(".Page3Content_PolaroidDescriptionTitle", { x: -5, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<")
                        .fromTo(".Page3Content_PolaroidDescriptionText", { x: -5, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<");
                    break;
                default:
                    yield gsap.timeline()
                        .fromTo(".Page3Content_PolaroidPhoto", { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<")
                        .fromTo(".Page3Content_PolaroidDescriptionTitle", { x: 5, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<")
                        .fromTo(".Page3Content_PolaroidDescriptionText", { x: 5, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<");
                    break;
            }
        });
    }
    ChangeButtonCss(elementPage) {
        const el = document.getElementById(`roleta${elementPage}`);
        [...el.parentElement.children].filter((child) => child !== el).forEach(child => {
            child.classList.remove("active");
        });
        el.classList.add("active");
    }
    ProximaPagina() {
        if (this.imagensArray === undefined)
            return;
        let novaPagina = this.paginaAtual + (1);
        if (novaPagina >= this.imagensArray.length)
            novaPagina = 0;
        this.ManipularPagina(novaPagina);
    }
    VoltarPagina() {
        if (this.imagensArray === undefined)
            return;
        let novaPagina = this.paginaAtual + (-1);
        if (novaPagina < 0)
            novaPagina = this.imagensArray.length - 1;
        this.ManipularPagina(novaPagina);
    }
    ManipularPagina(novaPagina) {
        if (this.imagensArray === undefined)
            return;
        const paginaVelha = this.paginaAtual;
        this.paginaAtual = novaPagina;
        const qtPorPagina = this.rows * this.columns;
        this.imagensAtual = this.imagensArray.slice(qtPorPagina * novaPagina, qtPorPagina * (novaPagina + 1));
        if (paginaVelha < novaPagina) {
            this.FadeOutImagens("left").then(_ => {
                this.ChangeCurrentImages(this.imagensAtual);
                this.FadeInImagens("right");
            });
        }
        else if (paginaVelha > novaPagina) {
            this.FadeOutImagens("right").then(_ => {
                this.ChangeCurrentImages(this.imagensAtual);
                this.FadeInImagens("left");
            });
        }
        this.ChangeButtonCss(novaPagina);
    }
    ChangeCurrentImages(arrayImages) {
        var _a, _b;
        for (let i = 0; i < this.rows * this.columns; i++) {
            if (arrayImages[i] === undefined) {
                (_a = document.getElementById("Page3_PolaroidImage" + i)) === null || _a === void 0 ? void 0 : _a.setAttribute("src", "");
                const polaroidTitle = document.getElementById("Page3_PolaroidDescriptionTitle" + i);
                if (polaroidTitle)
                    polaroidTitle.innerText = "";
                const polaroidDesc = document.getElementById("Page3_PolaroidDescriptionText" + i);
                if (polaroidDesc)
                    polaroidDesc.innerText = "";
            }
            else {
                (_b = document.getElementById("Page3_PolaroidImage" + i)) === null || _b === void 0 ? void 0 : _b.setAttribute("src", arrayImages[i].src);
                const polaroidTitle = document.getElementById("Page3_PolaroidDescriptionTitle" + i);
                if (polaroidTitle)
                    polaroidTitle.innerText = arrayImages[i].nome;
                const polaroidDesc = document.getElementById("Page3_PolaroidDescriptionText" + i);
                if (polaroidDesc)
                    polaroidDesc.innerText = arrayImages[i].descricao;
            }
        }
    }
}
