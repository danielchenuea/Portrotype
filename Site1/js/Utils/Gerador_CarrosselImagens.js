export default class Gerador_CarrosselImagens {
    constructor(options) {
        this.n_Imagens = 3;
        this.idDiv = options.idDiv;
    }
    Generate() {
        const div = document.querySelector("main");
        if (div) {
            const mainModalDiv = document.createElement("div");
            mainModalDiv.classList.add("carrosselWrapper");
            mainModalDiv.id = this.idDiv;
            mainModalDiv.setAttribute("tabindex", "-1");
            mainModalDiv.setAttribute("role", "dialog");
            mainModalDiv.setAttribute("aria-hidden", "true");
            mainModalDiv.style.display = "none";
            mainModalDiv.innerHTML = `
            <div class="carrosselWrapper" id="carrosselWrapper">
                <div class="imageRoller">
                    <img src="src/images/carrossel1.jpg"></img>
                    <img src="src/images/carrossel2.jpg"></img>
                    <img src="src/images/carrossel3.jpg"></img>
                </div>
                <div class="carrosselButtons">
                    
                </div>
            </div>
            `;
            div.appendChild(mainModalDiv);
            return this;
        }
        return this;
    }
}
