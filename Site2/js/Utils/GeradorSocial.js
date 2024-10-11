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
export default class GeradorSocialContent {
    constructor(options) {
        this.fadeIn = 0.3;
        this.fadeOut = 0.2;
        this.socialArray = [
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
        this.idDiv = options.idDiv;
        if (options.fadeIn != undefined)
            this.fadeIn = options.fadeIn;
        if (options.fadeOut != undefined)
            this.fadeOut = options.fadeOut;
    }
    Generate() {
        const div = document.querySelector(`#${this.idDiv}`);
        if (div) {
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
            const mainSocialHeader = document.createElement("div");
            mainSocialHeader.classList.add("PageSocialContent_Header");
            mainSocialHeader.insertAdjacentHTML("beforeend", `<div class="PageSocialContent_HeaderOverlay"></div>`);
            const mainSocialContent = document.createElement("div");
            mainSocialContent.classList.add("PageSocialContent_Content");
            for (let i = 0; i < this.socialArray.length; i++) {
                const social = this.socialArray[i];
                mainSocialHeader.insertAdjacentHTML("beforeend", `
                <div class="PageSocialContent_HeaderButton" id="HeaderButton_${social.nome}" data-social="${social.nome}">
                    <i class="${social.icon}" aria-hidden="true"></i>
                </div>`);
            }
            div.appendChild(mainSocialHeader);
            for (let i = 0; i < this.socialArray.length; i++) {
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
    EventsOnLoad() {
        var _a;
        let classThis = this;
        (_a = document.getElementById(this.idDiv)) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (e) {
            const el = e.target;
            const pageEl = el.closest(".PageSocialContent_HeaderButton");
            if (pageEl) {
                const socialId = pageEl.getAttribute("data-social");
                classThis.HideAllSocial().then(() => {
                    classThis.ShowSocial(socialId.toString());
                });
            }
        });
    }
    ShowSocial(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const socialDiv = document.getElementById("Content_" + id);
            if (socialDiv) {
                gsap.set(socialDiv, { opacity: 0 });
                socialDiv.style.display = "";
                yield gsap.to(socialDiv, { opacity: 1, duration: this.fadeIn });
            }
        });
    }
    HideAllSocial() {
        return __awaiter(this, void 0, void 0, function* () {
            const elArr = document.querySelectorAll(".PageSocialContent_Wrapper");
            for (let i = 0; i < elArr.length; i++) {
                const el = elArr[i];
                const socialDiv = el;
                if (socialDiv.style.display != "none") {
                    yield gsap.to(socialDiv, { opacity: 0, duration: this.fadeOut }).then(() => {
                        socialDiv.style.display = "none";
                    });
                }
                ;
            }
        });
    }
}
