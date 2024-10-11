import GeradorSocialContent from "../../Utils/GeradorSocial";
export default class Page3Script {
    constructor() {
        this.socialContent = null;
        this.screenName = "PageSocial";
        this.screenSetupEvents = () => {
            this.socialContent = new GeradorSocialContent({
                idDiv: "PageSocial_Wrapper"
            }).Generate();
        };
        this.onEnter = () => {
            console.log("4 Enter");
        };
        this.onLeave = () => {
            console.log("4 Leave");
        };
        this.onEntering = () => { };
        this.onLeaving = () => { };
    }
}
