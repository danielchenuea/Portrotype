import { ScreenOption } from "../../Utils/GeradorUniqueScreen"

export default class Page3Script implements ScreenOption{

    constructor(){
        // this.SetupEvents();
    }
    screenName: string = "Page3"

    screenSetupEvents = () => {

    }


    onEnter = () => {

        console.log("4 Enter")
    }
    onLeave = () => {
        console.log("4 Leave")
    }

    onEntering = () => {}
    onLeaving = () => {}

    

}