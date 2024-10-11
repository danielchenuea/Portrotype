import GeradorSocialContent from "../../Utils/GeradorSocial";
import { ScreenOption } from "../../Utils/GeradorUniqueScreen"

export default class Page3Script implements ScreenOption{

    constructor(){
        // this.SetupEvents();
    }

    socialContent: GeradorSocialContent | null = null;

    screenName: string = "PageSocial"

    screenSetupEvents = () => {
        this.socialContent = new GeradorSocialContent({
            idDiv: "PageSocial_Wrapper"
        }).Generate();
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