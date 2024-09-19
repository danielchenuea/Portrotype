
import gsap from 'gsap';
import { OverlayOption } from '../../Utils/GeradorUniqueScreen';

interface OverlayButton{

}

export default class MainOverlayScript implements OverlayOption{
    
    isOpen = false;

    constructor(){
        // this.SetupEvents();
    }

    OverlayButtons: OverlayButton[] = []
    PageChangerHandler?: (pageNumber: number) => void;

    overlayName: string = "MainOverlay";
    overlaySetupEvents = () => {
        const anchorContainer = document.getElementById("MainOverlay_AnchorWrapper");
        const uniqueContainer = document.getElementById("UniqueScreenContainer");
        for (let i = 0; i < uniqueContainer!.children.length; i++) {
            const element = uniqueContainer!.children[i];
            element.classList.add("UniqueScreenPage");
            const htmlFile = element.id;
            let file = 'views/UniqueScreens/' + htmlFile + '.html'
            
            const buttonAnchor = document.createElement("div");
            buttonAnchor.classList.add("MainOverlay_AnchorLink");
            buttonAnchor.setAttribute("page-id", `${i}`);
            buttonAnchor.innerHTML = `
                <div class="MainOverlay_AnchorIcon"></div>
                <div class="MainOverlay_AnchorText">${htmlFile}</div>`;
            anchorContainer!.appendChild(buttonAnchor);
        }

        const mask = document.getElementById("MainOverlay_Mask");
        if (mask) mask.style.setProperty("--overlay-size", "0%");

        document.getElementById("MainOverlay_Button")?.addEventListener("click", (el) => {
            this.ClickOverlay();
        });
        this.GenerateMeteors();

        document.querySelectorAll(".MainOverlay_AnchorLink").forEach(el => {
            el.addEventListener("click", (e) => {
                const target = el as HTMLDivElement;

                this.CloseOverlay().then(() => {
                    if (this.PageChangerHandler) this.PageChangerHandler(parseInt(target.getAttribute("page-id") ?? "0"));
                })
            })
        })
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
            // this.isOpen = !this.isOpen;
            this.CloseOverlay();
        } else { // Open
            // this.isOpen = !this.isOpen;
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
            duration: 0.3,
            onComplete: () => {
                this.isOpen = true;
            }
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
                this.isOpen = false
            }
        });
    }

    GenerateMeteors = () => {
        const nbElements = 60; // Number of stars & sparkles
        // CSS Classes available
        // const shapes = ['sparkle', 'star'];
        const sizes = ['plus', 'medium', 'small'];
        const speed = ['fast', 'normal', 'slow', 'normal', 'slow'];
        const colors = ['c_blue', 'c_red', 'c_green', 'c_yellow'];
        
        const Rand = (min: number, max: number) => {
          return Math.floor((Math.random() * max) + min);
        }
        
        // Random generating elements
        for(var i = 0; i < nbElements; i++){
            // Random styles
            const newStar = document.createElement("div");
            newStar.innerHTML = `<img src="../../src/meteor.png"/>`;
            newStar.classList.add(
                "MainOverlay_RandomMeteor",
                // shapes[Rand(0,shapes.length)],
                sizes[Rand(0,sizes.length)],
                speed[Rand(0,speed.length)],
                colors[Rand(0,colors.length)]
            )
            if (i < nbElements / 2){
                newStar.style.top = `${Rand(0, 70) - 25}%`;
                newStar.style.left = `${Rand(0, 10) - 25}%`;
                
            } else {
                newStar.style.top = `${Rand(0, 10) - 25}%`;
                newStar.style.left = `${Rand(0, 110) - 25}%`;
            }
            newStar.style.animationDelay = `${Rand(0, 30) - 40}s`;
            // newStar.style.animat

            
            const overlayBackground = document.getElementById("MainOverlay_Mask")!;
            // overlayBackground.appendChild(newStar);
        }
    }
}