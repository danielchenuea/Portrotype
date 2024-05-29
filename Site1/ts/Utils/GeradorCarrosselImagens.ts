

export interface CarrosselImagem {
    url: string
    src: string
    ordem?: number
    isClone?: boolean
    title?: string
    delay?: number
}

export interface GeradorCarrossel_Constructor{
    idDiv: string
    imagens: CarrosselImagem[]
}

export default class GeradorCarrosselImagens{

    constructor (options: GeradorCarrossel_Constructor) {
        this.idDiv = options.idDiv;

        if (options.imagens.length !== 0){
            this.imagensArray = options.imagens;
            this.n_Imagens = options.imagens.length;
        }
    }

    idDiv: string
    n_Imagens: number = 3;
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
            // this.JQueryOnPress();
            // this.JQueryOnLoad();
            return this;
        }
        return this;
    }

    private GenerateCarrosselButtons(){
        
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
            output += `<img class='${img.isClone ? "clone" : ""}' src='${img.src}'></img>`
        });

        return output;
    }

}