var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import gsap from 'gsap';
export default class MainOverlayScript {
    constructor() {
        this.isOpen = false;
        this.SetupEvents = () => {
            var _a;
            const mask = document.getElementById("MainOverlay_Mask");
            if (mask)
                mask.style.setProperty("--overlay-size", "0%");
            (_a = document.getElementById("MainOverlay_Button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (el) => {
                this.ClickOverlay();
            });
            this.GenerateMeteors();
        };
        this.onEnter = () => {
        };
        this.onLeave = () => {
        };
        this.onEntering = () => {
        };
        this.onLeaving = () => {
        };
        this.ClickOverlay = () => __awaiter(this, void 0, void 0, function* () {
            if (this.isOpen) {
                this.isOpen = !this.isOpen;
                this.CloseOverlay();
            }
            else {
                this.isOpen = !this.isOpen;
                this.OpenOverlay();
            }
        });
        this.OpenOverlay = () => __awaiter(this, void 0, void 0, function* () {
            const mask = document.getElementById("MainOverlay_Mask");
            if (mask)
                mask.style.display = "";
            yield gsap.fromTo(mask, {
                "--overlay-size": `0%`,
            }, {
                "--overlay-size": `100%`,
                ease: 'sine.inOut',
                duration: 0.3
            });
        });
        this.CloseOverlay = () => __awaiter(this, void 0, void 0, function* () {
            const mask = document.getElementById("MainOverlay_Mask");
            yield gsap.fromTo(mask, {
                "--overlay-size": `100%`,
            }, {
                "--overlay-size": `0%`,
                ease: 'sine.inOut',
                duration: 0.3,
                onComplete: () => {
                    if (mask)
                        mask.style.display = "none";
                }
            });
        });
        this.GenerateMeteors = () => {
            const nbElements = 10;
            const sizes = ['plus', 'medium', 'small'];
            const speed = ['fast', 'normal', 'slow'];
            const colors = ['c_blue', 'c_red', 'c_green', 'c_yellow'];
            const Rand = (min, max) => {
                return Math.floor((Math.random() * max) + min);
            };
            for (var i = 0; i < nbElements; i++) {
                const newStar = document.createElement("div");
                newStar.innerHTML = `<img src="../../src/meteor.png"/>`;
                newStar.classList.add("MainOverlay_RandomMeteor", sizes[Rand(0, sizes.length)], speed[Rand(0, speed.length)], colors[Rand(0, colors.length)]);
                newStar.style.top = `${Rand(-20, -1)}%`;
                newStar.style.left = `${Rand(-20, -1)}%`;
                const overlayBackground = document.getElementById("MainOverlay_Mask");
                overlayBackground.appendChild(newStar);
            }
        };
    }
}
