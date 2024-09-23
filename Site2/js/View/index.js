import GeradorUniqueScreen from "../Utils/GeradorUniqueScreen.js";
import PageInicialScript from "./UniqueScreens/PageInicialScript.js";
import Page1Script from "./UniqueScreens/Page1Script.js";
import Page2Script from "./UniqueScreens/Page2Script.js";
import Page3Script from "./UniqueScreens/Page3Script.js";
import PageSocialScript from "./UniqueScreens/PageSocialScript.js";
import MainOverlayScript from "./UniqueOverlay/MainOverlayScript.js";
export const uniqueScreen = new GeradorUniqueScreen({
    idDiv: "UniqueScreenMain",
    enableFreeScroll: true,
    overlayEvents: [
        new MainOverlayScript
    ],
    screenEvents: [
        new PageInicialScript,
        new Page1Script,
        new Page2Script,
        new Page3Script,
        new PageSocialScript,
    ],
    backgroundEvent: (backgroundDIV) => {
        const nbElements = 50;
        const shapes = ['sparkle', 'star'];
        const sizes = ['plus', 'medium', 'small'];
        const styles = ['normal', 'alt', 'alt2'];
        const animations = ['pulse', 'pulse-1', 'pulse-2', 'pulse-3'];
        const Rand = (min, max) => {
            return Math.floor((Math.random() * max) + min);
        };
        for (var i = 0; i < nbElements; i++) {
            const newStar = document.createElement("div");
            newStar.classList.add(shapes[Rand(0, shapes.length)], sizes[Rand(0, sizes.length)], styles[Rand(0, styles.length)], animations[Rand(0, animations.length)]);
            newStar.style.top = `${Rand(0, 100)}%`;
            newStar.style.left = `${Rand(0, 100)}%`;
            backgroundDIV.appendChild(newStar);
        }
    },
});
uniqueScreen.Test();
