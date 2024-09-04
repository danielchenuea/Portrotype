import * as lodash from 'lodash';
import gsap from "gsap";
export default class PageInicialScript {
    constructor() {
        this.delayOn = false;
        this.SetupEvents = () => {
            console.log(12);
            const mask = document.getElementById("pageInicialMask");
            document.addEventListener("mouseleave", (event) => {
                console.log("exit");
                gsap.to(mask, {
                    "--circle-size1": `0%`,
                    "--circle-size2": `0%`,
                    "--circle-size3": `0%`,
                    duration: 0.1,
                    ease: 'sine.in',
                });
            });
            document.addEventListener("mouseenter", (event) => {
                console.log("enter");
                gsap.to(mask, {
                    "--circle-size1": `14%`,
                    "--circle-size2": `20%`,
                    "--circle-size3": `20.4%`,
                    duration: 0.2,
                    ease: 'sine.in',
                });
            });
            window.addEventListener("mousemove", lodash.throttle((event) => {
                console.log(123);
                const mask = document.getElementById("pageInicialMask");
                const { clientX, clientY } = event;
                const x = Math.round((clientX / window.innerWidth) * 100);
                const y = Math.round((clientY / window.innerHeight) * 100);
                gsap.to(mask, {
                    '--x-position': `${x}%`,
                    '--y-position': `${y}%`,
                    duration: 0.2,
                    ease: 'sine.in',
                });
            }, 100));
            this.InitiatePage();
        };
        this.onEnter = () => {
            this.InitiatePage();
        };
        this.onLeave = () => {
            const mask = document.getElementById("pageInicialMask");
            gsap.fromTo(mask, {
                "--circle-size1": `14%`,
                "--circle-size2": `20%`,
                "--circle-size3": `20.4%`,
            }, {
                "--circle-size1": `0%`,
                "--circle-size2": `0%`,
                "--circle-size3": `0%`,
                duration: 0.2,
            });
        };
        this.onEntering = () => {
        };
        this.onLeaving = () => {
        };
        this.ClearTimeout = () => {
        };
    }
    InitiatePage() {
        const mask = document.getElementById("pageInicialMask");
        gsap.to(mask, {
            '--x-position': `90%`,
            '--y-position': `82%`,
            duration: 0,
        });
        gsap.fromTo(mask, {
            "--circle-size1": `0%`,
            "--circle-size2": `0%`,
            "--circle-size3": `0%`,
        }, {
            "--circle-size1": `14%`,
            "--circle-size2": `20%`,
            "--circle-size3": `20.4%`,
            duration: 0.2,
        });
    }
}
