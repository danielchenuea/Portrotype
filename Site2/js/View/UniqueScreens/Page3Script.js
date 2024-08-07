export default class Page3Script {
    constructor() {
        this.onLeave = () => {
            console.log("3 Leave");
        };
        this.onEntering = () => { };
        this.onLeaving = () => { };
        this.SetupEvents();
    }
    SetupEvents() {
    }
    onEnter() {
        console.log("3 Enter");
    }
}
