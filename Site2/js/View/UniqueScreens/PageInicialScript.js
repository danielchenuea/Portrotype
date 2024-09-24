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
import * as lodash from 'lodash';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export default class PageInicialScript {
    constructor() {
        this.delayOn = false;
        this.choosePhrase = ["Huh", "Wow", "Hey", "Sup", "Yo", "Hello", "Oh", "Olá"];
        this.randomPhrases = [];
        this.chosenPhrase = "";
        this.screenName = "PageInicial";
        this.FirstTime = () => {
            this.randomPhrases = this.choosePhrase
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
                .slice(0, 3);
            this.chosenPhrase = this.randomPhrases.pop();
        };
        this.ShowScreenRoutine = () => __awaiter(this, void 0, void 0, function* () {
            const mask = document.getElementById("pageInicialMask");
            gsap.to(mask, {
                '--x-position': `51%`,
                '--y-position': `66%`,
                duration: 0,
            });
            yield this.RotateArray();
            yield gsap.fromTo(mask, {
                "--circle-size1": `0%`,
                "--circle-size2": `0%`,
                "--circle-size3": `0%`,
            }, {
                "--circle-size1": `30%`,
                "--circle-size2": `34%`,
                "--circle-size3": `34.4%`,
                duration: 0.2,
            });
        });
        this.RotateArray = () => __awaiter(this, void 0, void 0, function* () {
            const headerMain = document.getElementById("headerMainChange");
            const headerMaskChange = document.getElementById("headerMaskChange");
            yield this.RotateWord(headerMaskChange, this.randomPhrases[0]);
            yield this.RotateWord(headerMaskChange, this.randomPhrases[1]);
            yield this.RotateWord(headerMaskChange, this.chosenPhrase);
            headerMain.innerText = this.chosenPhrase;
        });
        this.RotateWord = (htmlWord, word) => __awaiter(this, void 0, void 0, function* () {
            let tl = gsap.timeline();
            yield tl.to(htmlWord, {
                'transform': "translate(0, 100px)",
                'opacity': "0",
                duration: 0.2,
                ease: 'sine.in',
            }).to(htmlWord, {
                'transform': "translate(0, -100px)",
                duration: 0,
                onComplete: () => {
                    htmlWord.innerText = word;
                }
            }).to(htmlWord, {
                'transform': "translate(0, 0px)",
                'opacity': "1",
                duration: 0.2,
                ease: 'sine.in',
            }).addPause(0.8);
        });
        this.screenSetupEvents = () => {
            ScrollTrigger.create({
                trigger: "#pageInicialMask",
                start: "top top",
                end: "bottom bottom",
                onEnter: () => {
                    console.log("enter");
                },
                onLeave: () => {
                    console.log("leave");
                }
            });
            const mask = document.getElementById("pageInicialMask");
            document.addEventListener("mouseleave", (event) => {
            });
            document.addEventListener("mouseenter", (event) => {
                const mask = document.getElementById("pageInicialMask");
                const { clientX, clientY } = event;
                const x = ((clientX / window.innerWidth) * 100).toFixed(3);
                const y = ((clientY / window.innerHeight) * 100).toFixed(3);
                gsap.to(mask, {
                    '--x-position': `${x}%`,
                    '--y-position': `${y}%`,
                    duration: 0.2,
                    ease: 'sine.in',
                });
            });
            window.addEventListener("mousemove", lodash.throttle((event) => {
                const mask = document.getElementById("pageInicialMask");
                const { clientX, clientY } = event;
                const x = ((clientX / window.innerWidth) * 100).toFixed(5);
                const y = ((clientY / window.innerHeight) * 100).toFixed(5);
                gsap.to(mask, {
                    '--x-position': `${x}%`,
                    '--y-position': `${y}%`,
                    duration: 0.2,
                    ease: 'sine.in',
                });
            }, 50));
            this.InitiatePage();
        };
        this.onEnter = () => {
            const headerMask = document.getElementById("headerMask");
            let tl = gsap.timeline();
            tl.to(headerMask, {
                "opacity": 1,
                duration: 0.2,
                onComplete: () => {
                    this.FirstTime();
                    this.ShowScreenRoutine();
                }
            });
        };
        this.onLeave = () => {
        };
        this.onEntering = () => {
        };
        this.onLeaving = () => {
            const mask = document.getElementById("pageInicialMask");
            const headerMain = document.getElementById("headerMain");
            const headerMask = document.getElementById("headerMask");
            gsap.fromTo(mask, {
                "--circle-size1": `30%`,
                "--circle-size2": `34%`,
                "--circle-size3": `34.4%`,
            }, {
                "--circle-size1": `0%`,
                "--circle-size2": `0%`,
                "--circle-size3": `0%`,
                duration: 0.2,
            });
            gsap.to(headerMask, {
                "opacity": 0,
                duration: 0.2
            });
        };
        gsap.registerPlugin(ScrollTrigger);
    }
    InitiatePage() {
        const mask = document.getElementById("pageInicialMask");
        gsap.to(mask, {
            '--x-position': `51%`,
            '--y-position': `66%`,
            duration: 0,
        });
        gsap.fromTo(mask, {
            "--circle-size1": `0%`,
            "--circle-size2": `0%`,
            "--circle-size3": `0%`
        }, {
            "--circle-size1": `30%`,
            "--circle-size2": `34%`,
            "--circle-size3": `34.4%`,
            duration: 0.2,
        });
    }
}
