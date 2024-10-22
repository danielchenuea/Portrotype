import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GeradorStickerMuseum from '../../Utils/GeradorStickerMuseum';
export default class Page2Script {
    constructor() {
        this.timeoutArr = [];
        this.screenName = "Page2";
        this.roletaImagens = null;
        this.screenSetupEvents = () => {
            this.roletaImagens = new GeradorStickerMuseum({
                idDiv: "Page2Content",
                stickers: [
                    {
                        url: '1',
                        src: '1',
                        name: '1',
                        leftPosition: 10,
                        topPosition: 10,
                        description: ''
                    },
                    {
                        url: '2',
                        src: '2',
                        name: '2',
                        leftPosition: 74,
                        topPosition: 20,
                        description: ''
                    },
                    {
                        url: '3',
                        src: '3',
                        name: '3',
                        leftPosition: 40,
                        topPosition: 60,
                        description: ''
                    },
                ]
            }).Generate();
        };
        this.onEnter = () => {
        };
        this.onLeave = () => {
        };
        this.onEntering = () => { };
        this.onLeaving = () => { };
        gsap.registerPlugin(ScrollTrigger);
    }
}
