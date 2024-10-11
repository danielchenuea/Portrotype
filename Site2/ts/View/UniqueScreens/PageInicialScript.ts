import gsap from 'gsap';
import * as lodash from 'lodash';
import { ScreenOption } from '../../Utils/GeradorUniqueScreen';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import gsap from 'gsap';

export default class PageInicialScript implements ScreenOption{
    
    delayTimeout?: NodeJS.Timeout
    delayOn: boolean = false

    choosePhrase: string[] = ["Huh","Wow","Hey","Sup","Yo","Hello","Oh","Olá"];
    randomPhrases: string[] = [];
    chosenPhrase: string = "";

    constructor(){
        // this.SetupEvents();
        gsap.registerPlugin(ScrollTrigger);
    }

    screenName: string = "PageInicial";

    FirstTime = () => {
        this.randomPhrases = this.choosePhrase
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
            .slice(0, 3);
        this.chosenPhrase = this.randomPhrases.pop()!;
    }

    ShowScreenRoutine = async () => {
        const mask = document.getElementById("pageInicialMask") as HTMLDivElement;
        gsap.to(mask, {
            '--x-position': `51%`,
            '--y-position': `66%`,
            duration: 0,
        })
        await this.RotateArray();
        await gsap.fromTo(mask, {
            "--circle-size1": `0%`,
            "--circle-size2": `0%`,
            "--circle-size3": `0%`,
        }, {
            "--circle-size1": `30%`,
            "--circle-size2": `34%`,
            "--circle-size3": `34.4%`,
        duration: 0.2,
        });
    }

    RotateArray = async () => {
        const headerMain = document.getElementById("headerMainChange") as HTMLParagraphElement;
        const headerMaskChange = document.getElementById("headerMaskChange") as HTMLParagraphElement;

        await this.RotateWord(headerMaskChange, this.randomPhrases[0])
        await this.RotateWord(headerMaskChange, this.randomPhrases[1])
        await this.RotateWord(headerMaskChange, this.chosenPhrase)
        headerMain.innerText = this.chosenPhrase;
    }

    RotateWord = async (htmlWord: HTMLElement, word: string) => {
        let tl = gsap.timeline();
        await tl.to(htmlWord, {
            'transform': "translate(0, 100px)",
            'opacity': "0",
            duration: 0.2,
            ease: 'sine.in',
        }).to(htmlWord, {
            'transform': "translate(0, -100px)",
            duration: 0,
            onComplete: () => {
                htmlWord.innerText = word
            }
        }).to(htmlWord, {
            'transform': "translate(0, 0px)",
            'opacity': "1",
            duration: 0.2,
            ease: 'sine.in',
        }).addPause(0.8)
    }

    screenSetupEvents = () => {
        // this.FirstTime();
        const mask = document.getElementById("pageInicialMask") as HTMLDivElement; 

        let tlShow = gsap.timeline({
            scrollTrigger: {
                trigger: "#pageInicialMask",
                start: "80% 50%",
                end: "80% 55%",
                toggleActions: "play none none reverse",
                // scrub: true,
                // markers: true
            },

        });
        tlShow.to("#pageInicialMask", {
            "--circle-size1": `0%`,
            "--circle-size2": `0%`,
            "--circle-size3": `0%`,
            duration: 0.4
        });
        tlShow.to("#headerMask", {
            opacity: 0,
            duration: 0.4,
        });
        tlShow.to("#headerMain", {
            opacity: 0,
            duration: 0.4,
        });
        
        const xTo = gsap.quickTo('.pageInicial_flyingRocket', "x", {duration: 0.6, ease: "power3"});
        const yTo = gsap.quickTo('.pageInicial_flyingRocket', "y", {duration: 0.6, ease: "power3"});

        // window.addEventListener("mousemove", lodash.throttle((event: MouseEvent) => {
        //     xTo(event.clientX - 50);
        //     yTo(event.clientY - 50);
        // }, 50));

        mask.addEventListener("mousemove", lodash.throttle((event: MouseEvent) => {
            const mask = document.getElementById("pageInicialMask") as HTMLDivElement; 
            const {left, top} = ((event.target as HTMLDivElement).closest(".pageInicial_BackgroundMask") as HTMLDivElement).getBoundingClientRect();
            const x = (event.clientX - left).toFixed(0);
            const y = (event.clientY - top).toFixed(0);
            gsap.to(mask, {
                '--x-position': `${x}px`,
                '--y-position': `${y}px`,
                duration: 0.3,
                ease: 'sine.out',
            })

            xTo(event.clientX - left - 50);
            yTo(event.clientY - top - 50);

            // let maskBoundingRect = mask.getBoundingClientRect();
            // let maskCenter= {
            //     x: maskBoundingRect.left + maskBoundingRect.width/2, 
            //     y: maskBoundingRect.top + maskBoundingRect.height/2
            // };
            // let angle = Math.atan2(event.pageX - maskCenter.x, - (event.pageY - maskCenter.y) )*(180 / Math.PI);      
            // (document.querySelector(".pageInicial_flyingRocket")! as HTMLDivElement).style!.transform = `rotate(${angle}deg)`;  
        }, 50))
        this.InitiatePage();
        // this.GenerateStars();
    }


    InitiatePage(){
        const mask = document.getElementById("pageInicialMask") as HTMLDivElement; 
        gsap.to(mask, {
            '--x-position': `51%`,
            '--y-position': `66%`,
            duration: 0,
        })
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

    onEnter = () => {
        const headerMask = document.getElementById("headerMask") as HTMLParagraphElement;
        let tl = gsap.timeline();
        tl.to(headerMask, {
            "opacity": 1,
            duration: 0.2,
            onComplete: () => {
                this.FirstTime();
                this.ShowScreenRoutine();
            }
        })
    }
    onLeave = () => {
    }
    
    onEntering = () => {
        
    }
    onLeaving = () => {
        const mask = document.getElementById("pageInicialMask") as HTMLDivElement;
        const headerMain = document.getElementById("headerMain") as HTMLParagraphElement;
        const headerMask = document.getElementById("headerMask") as HTMLParagraphElement;
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
        })
    }

}