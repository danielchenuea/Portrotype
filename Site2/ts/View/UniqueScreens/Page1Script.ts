import gsap from 'gsap';
// import * as lodash from 'lodash';
import { ScreenOption } from '../../Utils/GeradorUniqueScreen';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default class Page1Script implements ScreenOption{
    
    timeoutArr: NodeJS.Timeout[] = []

    constructor(){
        gsap.registerPlugin(ScrollTrigger);
    }

    screenName: string = "Page1";
    screenSetupEvents = () => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#Page1Content",
                start: "top 50%",
                end: "top 55%",
                toggleActions: "play none none reverse",
                // scrub: true,
                markers: true,
                onEnter: () => {
                    tl.timeScale(1.0);
                    console.log('enter')
                  },
                  
                  onEnterBack: () => {
                    tl.timeScale(5.0);
                    console.log('enter back')
                  },
            },

        }).to("#Page1_Scope", {
            transform: "rotateZ(30deg)"
        // }).fromTo("#Page1_RightText", {
        //     opacity: 0,
        //     x: -100,
        // }, {
        //     opacity: 1,
        //     x: 0
        })
        .fromTo("#Page1_HeaderText_1", { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.2 })
        .fromTo(".Page1_TextBox", { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.2, stagger: 0.2 })
            
        // });

    }
    onEnter = () => {
        this.ClearTimeout();

        document.querySelectorAll("#Page1Content .Page1Content_Filler").forEach((el, i) => {
            this.timeoutArr.push(setTimeout(() => {
                el.classList.remove("hidden");
            }, i * 30))
        })
    }
    onLeave = () => {
    }
    
    onEntering = () => {
        
    }
    onLeaving = () => {
        this.ClearTimeout();

        document.querySelectorAll("#Page1Content .Page1Content_Filler").forEach((el, i) => {
            this.timeoutArr.push(setTimeout(() => {
                el.classList.add("hidden");
            }, i * 20))
        })
    }

    ClearTimeout = () => {
        this.timeoutArr.forEach(el => clearTimeout(el));
        this.timeoutArr = [];
    }
}