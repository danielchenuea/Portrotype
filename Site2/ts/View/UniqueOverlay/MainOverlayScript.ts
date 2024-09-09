
import gsap from 'gsap';

export default class MainOverlayScript{
    
    isOpen = false;

    constructor(){
        // this.SetupEvents();
    }

    SetupEvents = () => {
        const mask = document.getElementById("MainOverlay_Mask");
        if (mask) mask.style.setProperty("--overlay-size", "0%");

        document.getElementById("MainOverlay_Button")?.addEventListener("click", (el) => {
            this.ClickOverlay();
        });
    }

    onEnter = () => {

    }
    onLeave = () => {
    }
    
    onEntering = () => {
        
    }
    onLeaving = () => {

    }

    ClickOverlay = async () => {
        if (this.isOpen){ // Close
            this.isOpen = !this.isOpen;
            this.CloseOverlay();
        } else { // Open
            this.isOpen = !this.isOpen;
            this.OpenOverlay();
        }
    }

    OpenOverlay = async () => {
        const mask = document.getElementById("MainOverlay_Mask");
        if (mask) mask.style.display = "";
        
        await gsap.fromTo(mask, {
            "--overlay-size": `0%`,
        }, {
            "--overlay-size": `100%`,
            ease: 'sine.inOut',
            duration: 0.3
        })
    }

    CloseOverlay = async () => {
        const mask = document.getElementById("MainOverlay_Mask");

        await gsap.fromTo(mask, {
            "--overlay-size": `100%`,
        }, {
            "--overlay-size": `0%`,
            ease: 'sine.inOut',
            duration: 0.3,
            onComplete: () => {
                if (mask) mask.style.display = "none";
            }
        });
    }
}