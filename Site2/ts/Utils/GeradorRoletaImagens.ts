import gsap from 'gsap';

export interface ImagemRoleta {
    nome: string
    descricao: string
    url: string
    src: string
}

export interface GeradorRoletaImagens_Constructor{
    idDiv: string
    idController: string
    rows: number
    columns: number
    imagens?: ImagemRoleta[]
}

export default class GeradorRoletaImagens{

    constructor (options: GeradorRoletaImagens_Constructor) {
        this.idDiv = options.idDiv;
        this.idController = options.idController;
        this.rows = options.rows;
        this.columns = options.columns;
    }

    idDiv: string;
    idController: string;

    paginaAtual: number = 0;

    rows: number;
    columns: number;

    changeTimer = 0;
    timeToChange = 5000;
    changePageTimer: NodeJS.Timeout | null = null;
    roletaAtual: HTMLDivElement | null = null;

    imagensAtual: ImagemRoleta[] = []
    imagensArray: ImagemRoleta[] = [
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

    Generate(): this {
        const div = document.querySelector(`#${this.idDiv}`);

        if (div) {

            for (let i = 0; i < this.columns; i++) {
                const mainPolaroidDiv = document.createElement("div");
                mainPolaroidDiv.classList.add("Page3Content_PolaroidRow");
                for(let j = 0; j < this.rows; j++) {
                    const index = (i*this.rows) + j;
                    mainPolaroidDiv.insertAdjacentHTML("beforeend", `
                    <div class="Page3Content_PolaroidContent">
                        <div class="Page3Content_PolaroidPhoto" id="Page3_PolaroidPhoto${index}">
                            <div class="Page3Content_PolaroidBackground"></div>
                            <div class="Page3Content_PolaroidImageWrapper">
                                <img class="Page3Content_PolaroidImage" id="Page3_PolaroidImage${index}" src="${this.imagensArray[index].src}"></img>
                                <div class="Page3Content_PolaroidImageFiller" id="Page3_PolaroidImageFiller${index}" style="display: none"></div>
                                <div class="Page3Content_PolaroidOverlay" id="Page3_PolaroidOverlay${index}"></div>
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
                    </div>`)
                }
                div.appendChild(mainPolaroidDiv);
            }

            document.querySelectorAll(".Page3Content_PolaroidPhoto").forEach(el => {
                const photo = (el.querySelector(".Page3Content_PolaroidBackground") as HTMLElement);
                const background = (el.querySelector(".Page3Content_PolaroidImageWrapper") as HTMLElement);
                const randomRotation = (Math.random() * 1.5) + 1;
                const randomPosition = Math.floor(Math.random() * 9) >= 5 ;
    
                photo.style.transform = `rotate(${randomPosition ? "-" : ""}${randomRotation}deg)`;
                background.style.transform = `rotate(${randomPosition ? "" : "-"}${randomRotation}deg)`;
            })
        }

        const idControl = document.querySelector(`#${this.idController}`);
        if (idControl) {
            const controlDiv = document.createElement("div");
            controlDiv.classList.add("roletaButtons");

            const pageNum = Math.ceil(this.imagensArray.length / (this.columns * this.rows))
            for (let i = 0; i < pageNum; i++) {
                controlDiv.insertAdjacentHTML("beforeend", `
                    <div class="roletaPageIndicator ${0 == i ? " active" : ""}" id='roleta${i}' data-page='${i}'>
                        <div class="roletaTimerIndicator">
                        </div>
                    </div>
                `);
            }

            idControl.appendChild(controlDiv);
        }
        
        this.EventsOnLoad();
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
        document.getElementById(this.idController)?.addEventListener("click", function (e){
            const el = (e.target as HTMLElement);
            const pageEl = el.closest(".roletaPageIndicator");
            if (pageEl) {
                const newPageId = parseInt(pageEl.getAttribute("data-page") as string);
                const direction = newPageId > classThis.paginaAtual ? "left" : "right";
                classThis.ManipularPagina(newPageId, direction)
                classThis.ChangeButtonCss(newPageId)

            }
        });


        document.getElementById("leftDirection")?.addEventListener("click", function(e){
            classThis.VoltarPagina();
        });
        document.getElementById("rightDirection")?.addEventListener("click", function(e){
            classThis.ProximaPagina();
        });
    }

    async FadeOutImagens(direction: "left" | "right"){
        switch(direction){
            case "left":
                await gsap.timeline()
                    .fromTo(".Page3Content_PolaroidPhoto", { x: 0, opacity: 1 }, { x: -50, opacity: 0, duration: 0.3, stagger: 0.05 }, "<")
                    .fromTo(".Page3Content_PolaroidDescriptionTitle", { x: 0, opacity: 1 }, { x: -5, opacity: 0, duration: 0.3, stagger: 0.05 }, "<")
                    .fromTo(".Page3Content_PolaroidDescriptionText", { x: 0, opacity: 1 }, { x: -5, opacity: 0, duration: 0.3, stagger: 0.05 }, "<")
                break;
            default:
                await gsap.timeline()
                .fromTo(".Page3Content_PolaroidPhoto", { x: 0, opacity: 1 }, { x: 50, opacity: 0, duration: 0.3, stagger: 0.05 }, "<")
                .fromTo(".Page3Content_PolaroidDescriptionTitle", { x: 0, opacity: 1 }, { x: 5, opacity: 0, duration: 0.3, stagger: 0.05 }, "<")
                .fromTo(".Page3Content_PolaroidDescriptionText", { x: 0, opacity: 1 }, { x: 5, opacity: 0, duration: 0.3, stagger: 0.05 }, "<")
                break;
        }
    }
    async FadeInImagens(direction: "left" | "right"){
        switch(direction){
            case "left":
                await gsap.timeline()
                    .fromTo(".Page3Content_PolaroidPhoto", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<")
                    .fromTo(".Page3Content_PolaroidDescriptionTitle", { x: -5, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<")
                    .fromTo(".Page3Content_PolaroidDescriptionText", { x: -5, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<")
                break;
            default:
                await gsap.timeline()
                .fromTo(".Page3Content_PolaroidPhoto", { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<")
                .fromTo(".Page3Content_PolaroidDescriptionTitle", { x: 5, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<")
                .fromTo(".Page3Content_PolaroidDescriptionText", { x: 5, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<")
                break;
        }
    }

    ChangeButtonCss(elementPage: number){
        const el = document.getElementById(`roleta${elementPage}`)!;
        [...el.parentElement!.children].filter((child) => child !== el).forEach(child => {
            child.classList.remove("active");
        });
        el.classList.add("active");
    }
    
    ProximaPagina() {
        if (this.imagensArray === undefined) return;

        let novaPagina = this.paginaAtual + (1);
        const pageNum = Math.ceil(this.imagensArray.length / (this.columns * this.rows))

        if (novaPagina >= pageNum) novaPagina = 0;

        this.ManipularPagina(novaPagina, "right");
    }
    VoltarPagina() {
        if (this.imagensArray === undefined) return;

        let novaPagina = this.paginaAtual + (-1);
        const pageNum = Math.ceil(this.imagensArray.length / (this.columns * this.rows))

        if (novaPagina < 0) novaPagina = pageNum - 1;

        this.ManipularPagina(novaPagina, "left");
    }

    ResetPaginaInicial(){
        this.paginaAtual = 0;
        const qtPorPagina = this.rows * this.columns;
        this.imagensAtual = this.imagensArray.slice(0, qtPorPagina);
        this.ChangeCurrentImages(this.imagensAtual);
    }

    ManipularPagina(novaPagina: number, direction: "left" | "right") {
        if (this.imagensArray === undefined) return;

        const paginaVelha = this.paginaAtual;
        this.paginaAtual = novaPagina;
        const qtPorPagina = this.rows * this.columns;

        this.changeTimer = 0;
        this.roletaAtual = document.getElementById("roleta" + novaPagina) as HTMLDivElement;
        this.ResetTimerCss();

        this.imagensAtual = this.imagensArray.slice(qtPorPagina * novaPagina, qtPorPagina * (novaPagina + 1));

        if (direction == "right") { // direita 
            this.FadeOutImagens("left").then(_ => {
                this.ChangeCurrentImages(this.imagensAtual);
                this.FadeInImagens("right");  
            });
        }else if(direction == "left"){ // esquerda
            this.FadeOutImagens("right").then(_ => {
                this.ChangeCurrentImages(this.imagensAtual);
                this.FadeInImagens("left");
            });
        }

        // const div = document.getElementById(`imageSubWrapper`) as HTMLElement;
        // div!.style.transform = `translate(-${novaPagina * this.GetScreenWidth()}px, 0px)`;
        this.ChangeButtonCss(novaPagina);
    }

    ChangeCurrentImages(arrayImages: ImagemRoleta[]){
        for (let i = 0; i < this.rows * this.columns; i++) {
            if (arrayImages[i] === undefined) {
                document.getElementById("Page3_PolaroidImage" + i)?.setAttribute("src", "");
                document.getElementById("Page3_PolaroidOverlay" + i)?.style.setProperty("display", "none");
                const polaroidTitle = document.getElementById("Page3_PolaroidDescriptionTitle" + i);
                if (polaroidTitle) polaroidTitle.innerText = "";
                const polaroidDesc = document.getElementById("Page3_PolaroidDescriptionText" + i)
                if (polaroidDesc) polaroidDesc.innerText = "";
            }else{
                document.getElementById("Page3_PolaroidOverlay" + i)?.style.removeProperty("display");
                document.getElementById("Page3_PolaroidImage" + i)?.setAttribute("src", arrayImages[i].src);
                const polaroidTitle = document.getElementById("Page3_PolaroidDescriptionTitle" + i);
                if (polaroidTitle) polaroidTitle.innerText = arrayImages[i].nome;
                const polaroidDesc = document.getElementById("Page3_PolaroidDescriptionText" + i)
                if (polaroidDesc) polaroidDesc.innerText = arrayImages[i].descricao;
            }
        }
    }

    StartTimer(){
        if (this.roletaAtual == null) this.roletaAtual = document.getElementById("roleta" + this.paginaAtual) as HTMLDivElement;

        this.changePageTimer = setInterval(() => {
            this.changeTimer += 150;
            let roletaLoading = (this.roletaAtual?.firstElementChild as HTMLDivElement);
            roletaLoading.style.width = `${(this.changeTimer / this.timeToChange) * 100}%`;
            if (this.changeTimer > this.timeToChange + 150) {
                this.changeTimer = 0;
                this.ProximaPagina();
            }
        }, 150);
    }
    StopTimer(){
        this.changeTimer = 0;
        if (this.changePageTimer) clearInterval(this.changePageTimer);
        // this.ManipularPagina(0, "left");
        this.ResetPaginaInicial();
        this.ResetTimerCss();
    }
    ResetTimerCss(){
        document.querySelectorAll(".roletaPageIndicator").forEach(el => {
            const loader = el as HTMLDivElement
            const newPageId = parseInt(el.getAttribute("data-page") as string);
            const roletaLoading = (loader?.firstElementChild as HTMLDivElement);
            if (newPageId < this.paginaAtual){
                roletaLoading.style.width = "100%";
            }else{
                roletaLoading.style.width = "0%";
            }
        });
    }
}