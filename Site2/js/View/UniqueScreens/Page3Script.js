import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export default class Page3Script {
    constructor() {
        this.screenName = "Page3";
        this.screenSetupEvents = () => {
            document.querySelectorAll(".Page3Content_PolaroidPhoto").forEach(el => {
                const photo = el.querySelector(".Page3Content_PolaroidBackground");
                const background = el.querySelector(".Page3Content_PolaroidImageWrapper");
                const randomRotation = (Math.random() * 1.5) + 0.4;
                const randomPosition = Math.floor(Math.random() * 9) >= 5;
                photo.style.transform = `rotate(${randomPosition ? "-" : ""}${randomRotation}deg)`;
                background.style.transform = `rotate(${randomPosition ? "" : "-"}${randomRotation}deg)`;
            });
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#Page3Content",
                    start: "top 50%",
                    end: "top 55%",
                    toggleActions: "play none none reverse",
                    markers: true,
                },
            })
                .fromTo(".Page3Content_PolaroidPhoto", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<")
                .fromTo(".Page3Content_PolaroidDescriptionTitle", { x: -5, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<")
                .fromTo(".Page3Content_PolaroidDescriptionText", { x: -5, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<");
        };
        this.onEnter = () => {
            console.log("3 Enter");
        };
        this.onLeave = () => {
            console.log("3 Leave");
        };
        this.onEntering = () => { };
        this.onLeaving = () => { };
        gsap.registerPlugin(ScrollTrigger);
    }
}
