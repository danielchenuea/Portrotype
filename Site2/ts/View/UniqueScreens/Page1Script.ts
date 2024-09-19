import { ScreenOption } from "../../Utils/GeradorUniqueScreen";

export default class Page1Script implements ScreenOption{
    
    timeoutArr: NodeJS.Timeout[] = []

    constructor(){
        // this.SetupEvents();
    }

    screenName: string = "Page1";
    screenSetupEvents = () => {

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