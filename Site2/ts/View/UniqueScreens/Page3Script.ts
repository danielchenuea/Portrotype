
export default class Page3Script{

    constructor(){
        this.SetupEvents();
    }

    SetupEvents(){

    }
    
    onEnter() {
        console.log("3 Enter")
    }
    onLeave = () => {
        console.log("3 Leave")
    }

    onEntering = () => {}
    onLeaving = () => {}
}