import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export default class Page1Script {
    constructor() {
        this.timeoutArr = [];
        this.screenName = "Page1";
        this.screenSetupEvents = () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#Page1Content",
                    start: "top 50%",
                    end: "top 55%",
                    toggleActions: "play none none reverse",
                    markers: true
                },
            })
                .to("#Page1_Scope", { transform: "rotateZ(40deg)", duration: 0.4, ease: "sine.in" })
                .to("#Page1_PhotoBackground", { transform: "rotateZ(10deg)", duration: 0.4, ease: "bounce", yoyo: true }, "<0.1")
                .to("#Page1_PhotoFrame", { transform: "rotateZ(6deg)", duration: 0.4, ease: "bounce", yoyo: true }, "<")
                .fromTo(".Page1_TextBox", { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, stagger: 0.1 }, "<=0.5");
        };
        this.onEnter = () => {
            this.ClearTimeout();
            document.querySelectorAll("#Page1Content .Page1Content_Filler").forEach((el, i) => {
                this.timeoutArr.push(setTimeout(() => {
                    el.classList.remove("hidden");
                }, i * 30));
            });
        };
        this.onLeave = () => {
        };
        this.onEntering = () => {
        };
        this.onLeaving = () => {
            this.ClearTimeout();
            document.querySelectorAll("#Page1Content .Page1Content_Filler").forEach((el, i) => {
                this.timeoutArr.push(setTimeout(() => {
                    el.classList.add("hidden");
                }, i * 20));
            });
        };
        this.ClearTimeout = () => {
            this.timeoutArr.forEach(el => clearTimeout(el));
            this.timeoutArr = [];
        };
        gsap.registerPlugin(ScrollTrigger);
    }
}
