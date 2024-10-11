import gsap from 'gsap';

export interface SocialIcon {
    nome: string
    descricao: string
    url: string
    src: string
    icon: string
}

export interface GeradorSocial_Constructor{
    idDiv: string
    fadeIn?: number
    fadeOut?: number
    imagens?: SocialIcon[]
}

export default class GeradorSocialContent{

    constructor (options: GeradorSocial_Constructor) {
        this.idDiv = options.idDiv;
        if (options.fadeIn != undefined) this.fadeIn = options.fadeIn;
        if (options.fadeOut != undefined) this.fadeOut = options.fadeOut;
    }

    idDiv: string;
    fadeIn: number = 0.3;
    fadeOut: number = 0.2;

    socialArray: SocialIcon[] = [
        {
            nome: "GitHub",
            descricao: "1",
            url: "",
            src: "src/images/github.jpg",
            icon: "fa fa-github-square",
        },
        {
            nome: "LinkedIn",
            descricao: "2",
            url: "",
            src: "",
            icon: "fa fa-linkedin-square",

        }
    ];

    Generate(): this {
        const div = document.querySelector(`#${this.idDiv}`);

        if (div) {
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }

            // Header
            const mainSocialHeader = document.createElement("div");
            mainSocialHeader.classList.add("PageSocialContent_Header");
            mainSocialHeader.insertAdjacentHTML("beforeend", `<div class="PageSocialContent_HeaderOverlay"></div>`);
            
            // Content
            const mainSocialContent = document.createElement("div");
            mainSocialContent.classList.add("PageSocialContent_Content");

            for(let i = 0; i < this.socialArray.length; i++) {
                const social = this.socialArray[i];
                mainSocialHeader.insertAdjacentHTML("beforeend", `
                <div class="PageSocialContent_HeaderButton" id="HeaderButton_${social.nome}" data-social="${social.nome}">
                    <i class="${social.icon}" aria-hidden="true"></i>
                </div>`);
            }
            div.appendChild(mainSocialHeader);

            for(let i = 0; i < this.socialArray.length; i++) {
                const social = this.socialArray[i];
                mainSocialContent.insertAdjacentHTML("beforeend", `
                <div class="PageSocialContent_Wrapper" id="Content_${social.nome}" style="display: none">
                    <div class="PageSocialContent_ImageWrapper">
                        <img class="PageSocialContent_Image" src="${social.src}"></img>
                    </div>
                    <div class="PageSocialContent_ButtonDiv">
                        <div class="PageSocialContent_Button">
                            ${social.descricao}
                        </div>
                    </div>
                </div>`);
            }
            div.appendChild(mainSocialContent);
        }

        this.EventsOnLoad();
        return this;
    }
    
    private EventsOnLoad() {
        let classThis = this;

        document.getElementById(this.idDiv)?.addEventListener("click", function (e){
            const el = (e.target as HTMLElement);
            const pageEl = el.closest(".PageSocialContent_HeaderButton");
            if (pageEl) {
                const socialId = pageEl.getAttribute("data-social") as string;
                classThis.HideAllSocial().then(() => {
                    classThis.ShowSocial(socialId.toString());
                });
            }
        });

        // document.getElementById("leftDirection")?.addEventListener("click", function(e){
        //     classThis.VoltarPagina();
        // });
        // document.getElementById("rightDirection")?.addEventListener("click", function(e){
        //     classThis.ProximaPagina();
        // });
    }

    async ShowSocial(id: string){
        const socialDiv = document.getElementById("Content_" + id);
        if (socialDiv){
            gsap.set(socialDiv, {opacity: 0});
            socialDiv.style.display = "";
            await gsap.to(socialDiv, {opacity: 1, duration: this.fadeIn});
        }
    }

    async HideAllSocial(){
        const elArr = document.querySelectorAll(".PageSocialContent_Wrapper")
        for (let i = 0; i < elArr.length; i++) {
            const el = elArr[i];
            const socialDiv = el as HTMLDivElement;
            if (socialDiv.style.display != "none") {
                await gsap.to(socialDiv, {opacity: 0, duration: this.fadeOut}).then(() => {
                    socialDiv.style.display = "none";
                });
            };
        }
    }
}