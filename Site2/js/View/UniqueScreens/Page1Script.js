export default class Page1Script {
    constructor() {
        this.timeoutArr = [];
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
    }
    SetupEvents() {
    }
}
