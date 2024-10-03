import gsap from 'gsap';
// import * as lodash from 'lodash';
import { ScreenOption } from '../../Utils/GeradorUniqueScreen';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface HideColumns_Options{
    hideModel?: "alternate" | "alternate2" | "before" | "after"
    exclude?: number
    instant?: boolean
}

export default class Page2Script implements ScreenOption{
    
    timeoutArr: NodeJS.Timeout[] = []
    
    screenName: string = "Page2";

    constructor(){
        gsap.registerPlugin(ScrollTrigger);
    }
    
    screenSetupEvents = () => {
        gsap.timeline({
            scrollTrigger: {
                trigger: "#Page2Content",
                start: "top 50%",
                end: "top 55%",
                toggleActions: "play none none reverse",
                // scrub: true,
                markers: true
            },

        }).to("#Page2Content", {
            onStart: () => {
                this.onEnter();
            },
            onReverseComplete: () => {
                this.onLeave();
            }
        })

        document.getElementById("Page2Content")?.addEventListener("click", (e) => {
            const el = (e.target as HTMLElement);
            const elTarget = el.closest(`.Page2Content_Column`);
            const dataIndex = parseInt(el.getAttribute("data-index")!);
            if (elTarget) {
                this.SetInfoMode(dataIndex)
            }
        })
        document.getElementById("Page2Content")?.addEventListener("click", (e) => {
            const el = (e.target as HTMLElement);
            const elTarget = el.closest(`#HeaderBackButton`);
            if (elTarget) {
                this.ResetInfoMode(true)
            }
        })

        // // Add custom css to each Column
        // document.querySelectorAll("#Page2Content .Page2Content_Column").forEach((column, i) => {
        //     const el = column as HTMLElement;
        //     el.style.transition = `400ms all ease-in-out, ${i*100}ms top ease-in-out`
        // })

    }

    onEnter = () => {
        this.ClearTimeout();

        this.ShowColumns();
    }
    onLeave = () => {
        this.ClearTimeout();
        this.ResetInfoMode(false);
        this.HideColumns({hideModel: "alternate", instant: true});
    }

    onEntering = () => {}
    onLeaving = () => {
    }

    SetInfoMode = (dataIndex: number) => {
        const el = document.querySelector(`#Page2Content .Page2Content_Column[data-index='${dataIndex}']`) as HTMLElement
        const textElement = document.querySelector(`#Page2Content .Page2Content_TextBox`) as HTMLElement
        this.HideColumns({hideModel: "after", exclude: dataIndex});
        
        let tl = gsap.timeline();
        tl.to(el, {
            top: `-${el.clientHeight * (dataIndex)}px`,
            duration: (dataIndex * .05) + 0.1,
            delay: 0.3,
            ease: "sine.inOut"
        })
        tl.to(textElement, {
            delay: 0.2,
            'height': "80%",
            duration: 0.2,
            ease: 'sine.inOut',
        })
        // setTimeout(() => {
        //     el.style.top = `-${el.clientHeight * (dataIndex)}px`
        //     setTimeout(() => {
        //         textElement.classList.remove("hidden");

        //     }, (dataIndex * 100) + 200);
        // }, 300);
    }
    
    ResetInfoMode = (useDelay: boolean) => {
        document.querySelectorAll("#Page2Content .Page2Content_Column").forEach((column, i) => {
            if(column.classList.contains("hiddenAfter") || column.classList.contains("hiddenBefore")) return;

            const el = column as HTMLElement;
            const textElement = document.querySelector(`#Page2Content .Page2Content_TextBox`) as HTMLElement;
            const dataIndex = parseInt(column.getAttribute("data-index") ?? "0")

            let tl = gsap.timeline();
            tl.to(textElement, {
                'height': "0",
                duration: 0.15,
                ease: 'sine.inOut',
            })
            .to(el, {
                duration: (dataIndex * 0.05) + 0.1,
                delay: 0.2,
                top: "0px",
                ease: 'sine.inOut',
                onComplete: () => {
                    this.ShowColumns();
                }
            })
        })
    }

    ShowColumns = () => {
        document.querySelectorAll("#Page2Content .Page2Content_Column").forEach((el, i) => {
            this.timeoutArr.push(setTimeout(() => {
                el.classList.remove("hiddenBefore", "hiddenAfter");
            }, i * 50))
        })
    }
    

    HideColumns = (options: HideColumns_Options) => {
        document.querySelectorAll("#Page2Content .Page2Content_Column").forEach((el, i) => {
            if(options.exclude !== undefined){
                const excludedAttr = parseInt(el.getAttribute("data-index") ?? "0");
                if(excludedAttr == options.exclude) return;
            };

            if(options.instant !== undefined && options.instant === true){
                (el as HTMLElement).style.transition = "0ms all ease-in-out"
            }
            if (options.hideModel !== undefined){
                switch (options.hideModel) {
                    case "alternate":
                        if (i % 2 == 0) {
                            el.classList.add("hiddenBefore");
                            el.classList.remove("hiddenAfter");
                        } else { 
                            el.classList.add("hiddenAfter");
                            el.classList.remove("hiddenBefore");
                        }
                        break;
                    case "alternate2":
                        if (i % 2 == 0) {
                            el.classList.add("hiddenAfter")
                            el.classList.remove("hiddenBefore");
                        } else {
                            el.classList.add("hiddenBefore")
                            el.classList.remove("hiddenAfter");
                        }
                        break;
                    case "after":
                        el.classList.remove("hiddenBefore");
                        el.classList.add("hiddenAfter");
                        break;
                    case "before":
                    default:
                        el.classList.add("hiddenBefore");
                        el.classList.remove("hiddenAfter");
                        break;
                }
            }else{
                if (i % 2 == 0) {
                    el.classList.add("hiddenBefore");
                    el.classList.remove("hiddenAfter");
                } else { 
                    el.classList.add("hiddenAfter");
                    el.classList.remove("hiddenBefore");
                }
            }

            if(options.instant !== undefined && options.instant === true){
                // (el as HTMLElement).style.transition = `400ms all ease-in-out, ${i*100}ms top ease-in-out`
            }
        })
    }

    ClearTimeout = () => {
        this.timeoutArr.forEach(el => clearTimeout(el));
        this.timeoutArr = [];
    }
}