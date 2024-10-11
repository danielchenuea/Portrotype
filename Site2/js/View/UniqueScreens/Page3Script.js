import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GeradorRoletaImagens from '../../Utils/GeradorRoletaImagens';
export default class Page3Script {
    constructor() {
        this.roletaImagens = null;
        this.screenName = "Page3";
        this.screenSetupEvents = () => {
            this.setupNavbarText();
            this.roletaImagens = new GeradorRoletaImagens({
                idDiv: "Page3Content_PolaroidWrapper",
                idController: "Page3Content_BottomBarWrapper",
                columns: 2,
                rows: 2,
            }).Generate();
            const tl = gsap.timeline()
                .fromTo(".Page3Content_NavBarIndividualText", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, stagger: 0.02 })
                .fromTo(".Page3Content_NavBarUnderline", { clipPath: "inset(0 100%)" }, { clipPath: "inset(0 0%)", duration: 0.5 }, "<0.15")
                .fromTo(".Page3Content_PolaroidPhoto", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<0.15")
                .fromTo(".Page3Content_PolaroidDescriptionTitle", { x: -5, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<")
                .fromTo(".Page3Content_PolaroidDescriptionText", { x: -5, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<");
            tl.reverse();
            ScrollTrigger.create({
                trigger: "#Page3Content",
                start: "top 50%",
                end: "bottom 55%",
                markers: true,
                onEnter: () => {
                    tl.play().then(_ => {
                        var _a;
                        (_a = this.roletaImagens) === null || _a === void 0 ? void 0 : _a.StartTimer();
                    });
                },
                onEnterBack: () => {
                    tl.play().then(_ => {
                        var _a;
                        (_a = this.roletaImagens) === null || _a === void 0 ? void 0 : _a.StartTimer();
                    });
                },
            });
            ScrollTrigger.create({
                trigger: "#Page3Content",
                start: "top 50%",
                end: "bottom 55%",
                markers: true,
                onLeave: () => {
                    var _a;
                    (_a = this.roletaImagens) === null || _a === void 0 ? void 0 : _a.StopTimer();
                    tl.reverse().then(_ => {
                        var _a;
                        (_a = this.roletaImagens) === null || _a === void 0 ? void 0 : _a.ResetPaginaInicial();
                    });
                },
                onLeaveBack: () => {
                    var _a;
                    (_a = this.roletaImagens) === null || _a === void 0 ? void 0 : _a.StopTimer();
                    tl.reverse(0).then(_ => {
                        var _a;
                        (_a = this.roletaImagens) === null || _a === void 0 ? void 0 : _a.ResetPaginaInicial();
                    });
                }
            });
        };
        this.setupNavbarText = () => {
            const navbarText = document.getElementById("Page3Content_NavBarText");
            if (navbarText) {
                const textToTransform = navbarText.innerText;
                navbarText.innerHTML = "";
                for (let i = 0; i < textToTransform.length; i++) {
                    const char = textToTransform[i];
                    const HTML = `<span class="Page3Content_NavBarIndividualText">${char == " " ? "&nbsp;" : char}</span>`;
                    navbarText.insertAdjacentHTML("beforeend", HTML);
                }
            }
        };
        this.onEnter = () => {
        };
        this.onLeave = () => {
        };
        this.onEntering = () => { };
        this.onLeaving = () => { };
        gsap.registerPlugin(ScrollTrigger);
    }
}
