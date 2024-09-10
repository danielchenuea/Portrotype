import GeradorUniqueScreen from "../Utils/GeradorUniqueScreen.js";
import PageInicialScript from "./UniqueScreens/PageInicialScript.js";
import Page1Script from "./UniqueScreens/Page1Script.js";
import Page2Script from "./UniqueScreens/Page2Script.js";
import Page3Script from "./UniqueScreens/Page3Script.js";
import PageSocialScript from "./UniqueScreens/PageSocialScript.js";
import MainOverlayScript from "./UniqueOverlay/MainOverlayScript.js";
let _MainOverlayScript = new MainOverlayScript();
let _PageInicialScript = new PageInicialScript();
let _Page1Script = new Page1Script();
let _Page2Script = new Page2Script();
let _Page3Script = new Page3Script();
let _PageSocialScript = new PageSocialScript();
let uniqueScreen = new GeradorUniqueScreen({
    idDiv: "UniqueScreenMain",
    overlayEvents: [
        {
            overlayName: "MainOverlay",
            overlaySetupEvents: _MainOverlayScript.SetupEvents,
            onEnter: _MainOverlayScript.onEnter,
            onLeave: _MainOverlayScript.onLeave,
            onEntering: _MainOverlayScript.onEntering,
            onLeaving: _MainOverlayScript.onLeaving,
        }
    ],
    screenEvents: [
        {
            screenName: "PageInicial",
            screenSetupEvents: _PageInicialScript.SetupEvents,
            onEnter: _PageInicialScript.onEnter,
            onLeave: _PageInicialScript.onLeave,
            onEntering: _PageInicialScript.onEntering,
            onLeaving: _PageInicialScript.onLeaving,
        },
        {
            screenName: "Page1",
            screenSetupEvents: _Page1Script.SetupEvents,
            onEnter: _Page1Script.onEnter,
            onLeave: _Page1Script.onLeave,
            onEntering: _Page1Script.onEntering,
            onLeaving: _Page1Script.onLeaving,
        },
        {
            screenName: "Page2",
            screenSetupEvents: _Page2Script.SetupEvents,
            onEnter: _Page2Script.onEnter,
            onLeave: _Page2Script.onLeave,
            onEntering: _Page2Script.onEntering,
            onLeaving: _Page2Script.onLeaving,
        },
        {
            screenName: "Page3",
            screenSetupEvents: _Page3Script.SetupEvents,
            onEnter: _Page3Script.onEnter,
            onLeave: _Page3Script.onLeave,
            onEntering: _Page3Script.onEntering,
            onLeaving: _Page3Script.onLeaving,
        },
        {
            screenName: "PageSocial",
            screenSetupEvents: _PageSocialScript.SetupEvents,
            onEnter: _PageSocialScript.onEnter,
            onLeave: _PageSocialScript.onLeave,
            onEntering: _PageSocialScript.onEntering,
            onLeaving: _PageSocialScript.onLeaving,
        },
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
