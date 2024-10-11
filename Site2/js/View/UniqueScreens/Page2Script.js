import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export default class Page2Script {
    constructor() {
        this.timeoutArr = [];
        this.screenName = "Page2";
        this.screenSetupEvents = () => {
        };
        this.onEnter = () => {
            this.ClearTimeout();
            this.ShowColumns();
        };
        this.onLeave = () => {
            this.ClearTimeout();
            this.ResetInfoMode(true);
            this.HideColumns({ hideModel: "alternate", instant: false });
        };
        this.onEntering = () => { };
        this.onLeaving = () => {
        };
        this.SetInfoMode = (dataIndex) => {
            const el = document.querySelector(`#Page2Content .Page2Content_Column[data-index='${dataIndex}']`);
            const textElement = document.querySelector(`#Page2Content .Page2Content_TextBox`);
            this.HideColumns({ hideModel: "after", exclude: dataIndex });
            let tl = gsap.timeline();
            tl.to(el, {
                top: `-${el.clientHeight * (dataIndex)}px`,
                duration: (dataIndex * .05) + 0.1,
                delay: 0.3,
                ease: "sine.inOut"
            });
            tl.to(textElement, {
                delay: 0.2,
                'height': "80%",
                duration: 0.2,
                ease: 'sine.inOut',
            });
        };
        this.ResetInfoMode = (useDelay) => {
            document.querySelectorAll("#Page2Content .Page2Content_Column").forEach((column, i) => {
                var _a;
                if (column.classList.contains("hiddenAfter") || column.classList.contains("hiddenBefore"))
                    return;
                const el = column;
                const textElement = document.querySelector(`#Page2Content .Page2Content_TextBox`);
                const dataIndex = parseInt((_a = column.getAttribute("data-index")) !== null && _a !== void 0 ? _a : "0");
                let tl = gsap.timeline();
                tl.to(textElement, {
                    height: "0",
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
                });
            });
        };
        this.ShowColumns = () => {
            document.querySelectorAll("#Page2Content .Page2Content_Column").forEach((el, i) => {
                this.timeoutArr.push(setTimeout(() => {
                    el.classList.remove("hiddenBefore", "hiddenAfter");
                }, i * 50));
            });
        };
        this.HideColumns = (options) => {
            document.querySelectorAll("#Page2Content .Page2Content_Column").forEach((el, i) => {
                var _a;
                if (options.exclude !== undefined) {
                    const excludedAttr = parseInt((_a = el.getAttribute("data-index")) !== null && _a !== void 0 ? _a : "0");
                    if (excludedAttr == options.exclude)
                        return;
                }
                ;
                if (options.instant !== undefined && options.instant === true) {
                    el.style.transition = "0ms all ease-in-out";
                }
                if (options.hideModel !== undefined) {
                    switch (options.hideModel) {
                        case "alternate":
                            if (i % 2 == 0) {
                                el.classList.add("hiddenBefore");
                                el.classList.remove("hiddenAfter");
                            }
                            else {
                                el.classList.add("hiddenAfter");
                                el.classList.remove("hiddenBefore");
                            }
                            break;
                        case "alternate2":
                            if (i % 2 == 0) {
                                el.classList.add("hiddenAfter");
                                el.classList.remove("hiddenBefore");
                            }
                            else {
                                el.classList.add("hiddenBefore");
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
                }
                else {
                    if (i % 2 == 0) {
                        el.classList.add("hiddenBefore");
                        el.classList.remove("hiddenAfter");
                    }
                    else {
                        el.classList.add("hiddenAfter");
                        el.classList.remove("hiddenBefore");
                    }
                }
                if (options.instant !== undefined && options.instant === true) {
                }
            });
        };
        this.ClearTimeout = () => {
            this.timeoutArr.forEach(el => clearTimeout(el));
            this.timeoutArr = [];
        };
        gsap.registerPlugin(ScrollTrigger);
    }
}
