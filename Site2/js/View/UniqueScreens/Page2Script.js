export default class Page2Script {
    constructor() {
        this.timeoutArr = [];
        this.onEnter = () => {
            this.ClearTimeout();
            document.querySelectorAll("#Page2Content .Page2Content_Filler").forEach((el, i) => {
                this.timeoutArr.push(setTimeout(() => {
                    el.classList.remove("hiddenTop", "hiddenBottom");
                    console.log(i);
                }, i * 70));
            });
        };
        this.onLeave = () => {
            console.log("2 Leave");
            this.ClearTimeout();
            document.querySelectorAll("#Page2Content .Page2Content_Filler").forEach((el, i) => {
                if (i % 2 == 0) {
                    el.classList.add("hiddenTop");
                }
                else {
                    el.classList.add("hiddenBottom");
                }
            });
        };
        this.onEntering = () => { };
        this.onLeaving = () => {
        };
        this.ClearTimeout = () => {
            this.timeoutArr.forEach(el => clearTimeout(el));
            this.timeoutArr = [];
        };
        this.SetupEvents();
    }
    SetupEvents() {
    }
}
