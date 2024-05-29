export default class GeradorCarrosselImagens {
    constructor(options) {
        this.n_Imagens = 3;
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
            mainModalDiv.id = this.idDiv;
            mainModalDiv.innerHTML = `
            <div class="carrosselWrapper" id="carrosselWrapper">
                <div class="imageRoller">
                    ${this.Convert_CarrosselImagens_To_Html(this.GenerateCloneImages(this.imagensArray))}
                </div>
                <div class="carrosselButtons">
                    <
                </div>
            </div>
            `;
            div.appendChild(mainModalDiv);
            return this;
        }
        return this;
    }
    GenerateCarrosselButtons() {
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
            output += `<img class='${img.isClone ? "clone" : ""}' src='${img.src}'></img>`;
        });
        return output;
    }
}
