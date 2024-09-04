export default class Page3Script {
    constructor() {
        this.SetupEvents = () => {
            document.querySelectorAll(".Page3Content_PolaroidPhoto").forEach(el => {
                const photo = el.querySelector(".Page3Content_PolaroidBackground");
                const background = el.querySelector(".Page3Content_PolaroidImageWrapper");
                const randomRotation = (Math.random() * 1.5) + 0.4;
                const randomPosition = Math.floor(Math.random() * 9) >= 5;
                photo.style.transform = `rotate(${randomPosition ? "-" : ""}${randomRotation}deg)`;
                background.style.transform = `rotate(${randomPosition ? "" : "-"}${randomRotation}deg)`;
            });
        };
        this.onEnter = () => {
            console.log("3 Enter");
        };
        this.onLeave = () => {
            console.log("3 Leave");
        };
        this.onEntering = () => { };
        this.onLeaving = () => { };
    }
}
