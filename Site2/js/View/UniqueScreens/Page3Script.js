import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GeradorRoletaImagens from '../../Utils/GeradorRoletaImagens';
export default class Page3Script {
    constructor() {
        this.roletaImagens = null;
        this.screenName = "Page3";
        this.screenSetupEvents = () => {
            this.roletaImagens = new GeradorRoletaImagens({
                idDiv: "Page3Content_PolaroidWrapper",
                idController: "Page3Content_BottomBarWrapper",
                columns: 2,
                rows: 2,
            }).Generate();
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#Page3Content",
                    start: "top 50%",
                    end: "top 55%",
                    toggleActions: "play none none reverse",
                    markers: true,
                    onEnter: () => {
                        var _a;
                        (_a = this.roletaImagens) === null || _a === void 0 ? void 0 : _a.StartTimer();
                        console.log("3 Enter");
                    },
                    onEnterBack: () => {
                        console.log("3 Leave");
                    },
                    onLeave: () => {
                        var _a;
                        (_a = this.roletaImagens) === null || _a === void 0 ? void 0 : _a.StopTimer();
                    }
                },
            })
                .fromTo(".Page3Content_PolaroidPhoto", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<")
                .fromTo(".Page3Content_PolaroidDescriptionTitle", { x: -5, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<")
                .fromTo(".Page3Content_PolaroidDescriptionText", { x: -5, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<");
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
