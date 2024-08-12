
export default class Page3Script{

    constructor(){
        this.SetupEvents();
    }

    SetupEvents = () => {
        document.querySelectorAll(".Page3Content_PolaroidPhoto").forEach(el => {
            const photo = (el.querySelector(".Page3Content_PolaroidBackground") as HTMLElement);
            const background = (el.querySelector(".Page3Content_PolaroidImageWrapper") as HTMLElement);
            const randomRotation = (Math.random() * 1.5) + 0.4;
            const randomPosition = Math.floor(Math.random() * 9) >= 5 ;

            photo.style.transform = `rotate(${randomPosition ? "-" : ""}${randomRotation}deg)`;
            background.style.transform = `rotate(${randomPosition ? "" : "-"}${randomRotation}deg)`;
        })
    }

    onEnter = () => {
        console.log("3 Enter")
    }
    onLeave = () => {
        console.log("3 Leave")
    }

    onEntering = () => {}
    onLeaving = () => {}

    

}