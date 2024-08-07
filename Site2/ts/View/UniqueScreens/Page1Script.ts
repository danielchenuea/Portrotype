
export default class Page1Script{
    
    timeoutArr: NodeJS.Timeout[] = []

    constructor(){
        this.SetupEvents();
    }

    SetupEvents(){

    }

    onEnter = () => {
        this.ClearTimeout();

        document.querySelectorAll("#Page1Content .Page1Content_Filler").forEach((el, i) => {
            this.timeoutArr.push(setTimeout(() => {
                el.classList.remove("hidden");
            }, i * 100))
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