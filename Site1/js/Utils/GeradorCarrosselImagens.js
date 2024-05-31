export default class GeradorCarrosselImagens {
    constructor(options) {
        this.n_Imagens = 3;
        this.imagemPadrao = 0;
        this.paginaAtual = 0;
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
            <div class="carrosselButtons">
                ${this.Convert_CarrosselImagens_To_Buttons(this.imagensArray)}
            </div>
            `;
            div.appendChild(mainModalDiv);
        }
        console.log(1);
        this.JQueryOnLoad();
        return this;
    }
    JQueryOnLoad() {
        console.log(12);
        let classThis = this;
        $(`#carrosselWrapper`).on("click", ".carrosselPageIndicator", function () {
            console.log(123);
            classThis.ManipularPagina(parseInt($(this).attr("data-page")));
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
        });
        let container = document.getElementById("imageWrapper");
        let innerContainer = document.getElementById("imageSubWrapper");
        let pressed = false;
        let startX = 0;
        let x = 0;
        container.addEventListener("mousedown", (e) => {
            pressed = true;
            startX = e.offsetX - innerContainer.offsetLeft;
            container.style.cursor = "grabbing";
        });
        container.addEventListener("mouseenter", () => {
            container.style.cursor = "grab";
        });
        container.addEventListener("mouseup", () => {
            container.style.cursor = "grab";
            pressed = false;
        });
        container.addEventListener("mousemove", (e) => {
            if (!pressed)
                return;
            e.preventDefault();
            x = e.offsetX;
            innerContainer.style.left = `${x - startX}px`;
        });
    }
    Convert_CarrosselImagens_To_Buttons(imagemArray) {
        let output = "";
        imagemArray.forEach((img, i) => {
            output += `<div class="carrosselPageIndicator${this.imagemPadrao == i ? " active" : ""}" id='carrossel${i}' data-page='${i}'></div>`;
        });
        return output;
    }
    GenerateCloneImages(imagemArray) {
        let i = 0;
        const setAsClone = (arr) => { arr.forEach(el => { el.isClone = true; el.ordem = i++; }); return arr; };
        const setAsNotClone = (arr) => { arr.forEach(el => { el.isClone = false; el.ordem = i++; }); return arr; };
        const pushArray = (arr1, arr2) => { arr1.forEach(el => arr2.push(el)); };
        let result = [];
        pushArray(setAsClone(imagemArray.map(a => { return Object.assign({}, a); }).slice(1, imagemArray.length)), result);
        pushArray(setAsNotClone(imagemArray.map(a => { return Object.assign({}, a); })), result);
        pushArray(setAsClone(imagemArray.map(a => { return Object.assign({}, a); }).slice(0, imagemArray.length - 1)), result);
        return result;
    }
    Convert_CarrosselImagens_To_Html(imagemArray) {
        let output = "";
        imagemArray.forEach((img, i) => {
            output += `<img draggable="false" class='${img.isClone ? "clone" : ""}' src='${img.src}'></img>`;
        });
        return output;
    }
    ProximaPagina() {
        this.ManipularPagina(1);
    }
    VoltarPagina() {
        this.ManipularPagina(-1);
    }
    ManipularPagina(pagina) {
        if (this.imagensArray === undefined)
            return;
        console.log();
        const div = document.getElementById(`imageSubWrapper`);
        div.style.transform = `translate(-${pagina * 100}%, 0px)`;
    }
    Converter_Imagem_To_LeftSpacing() {
    }
}
