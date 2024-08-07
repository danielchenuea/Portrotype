export default class GeradorCarrosselCompras {
    constructor(options) {
        this.n_Imagens = 3;
        this.imagemPadrao = 0;
        this.paginaAtual = 0;
        this.screenWidth = 0;
        this.delayDefault = 500;
        this.imagensArray = [
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
        this.idDiv = options.idDiv;
        this.SetScreenWidth();
        if (options.imagens.length !== 0) {
            this.imagensArray = options.imagens;
            this.n_Imagens = options.imagens.length;
        }
    }
    Generate() {
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
    EventsOnLoad() {
        var _a, _b, _c;
        let classThis = this;
        window.addEventListener("resize", function () {
            classThis.SetScreenWidth();
            const div = document.getElementById(`imageSubWrapper`);
            div.style.transform = `translate(-${classThis.paginaAtual * classThis.GetScreenWidth()}px, 0px)`;
        });
        (_a = document.getElementById(`carrosselWrapper`)) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (e) {
            const el = e.target;
            if (el.closest(".carrosselPageIndicator")) {
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
    Convert_CarrosselImagens_To_Buttons(imagemArray) {
        let output = "";
        imagemArray.forEach((img, i) => {
            output += `<div class="carrosselPageIndicator ${this.imagemPadrao == i ? " active" : ""}" id='carrossel${i}' data-page='${i}'></div>`;
        });
        return output;
    }
    Convert_CarrosselImagens_To_Html(imagemArray) {
        let output = "";
        imagemArray.forEach((img, i) => {
            output += `<img draggable="false" class='${img.isClone ? "clone" : ""}' src='${img.src}'></img>`;
        });
        return output;
    }
    ChangeButtonCss(elementPage) {
        const el = document.getElementById(`carrossel${elementPage}`);
        [...el.parentElement.children].filter((child) => child !== el).forEach(child => {
            child.classList.remove("active");
        });
        el.classList.add("active");
    }
    ProximaPagina() {
        if (this.imagensArray === undefined)
            return;
        let novaPagina = this.paginaAtual + (1);
        if (novaPagina >= this.n_Imagens)
            novaPagina = 0;
        this.ManipularPagina(novaPagina);
    }
    VoltarPagina() {
        if (this.imagensArray === undefined)
            return;
        let novaPagina = this.paginaAtual + (-1);
        if (novaPagina < 0)
            novaPagina = this.n_Imagens - 1;
        this.ManipularPagina(novaPagina);
    }
    ManipularPagina(novaPagina) {
        if (this.imagensArray === undefined)
            return;
        this.paginaAtual = novaPagina;
        const div = document.getElementById(`imageSubWrapper`);
        div.style.transform = `translate(-${novaPagina * this.GetScreenWidth()}px, 0px)`;
        this.ChangeButtonCss(novaPagina);
    }
    SetScreenWidth() {
        this.screenWidth = document.body.clientWidth;
        return this;
    }
    GetScreenWidth() {
        return this.screenWidth;
    }
}
