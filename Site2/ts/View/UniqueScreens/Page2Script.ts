import gsap from 'gsap';
// import * as lodash from 'lodash';
import { ScreenOption } from '../../Utils/GeradorUniqueScreen';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GeradorStickerMuseum from '../../Utils/GeradorStickerMuseum';

interface HideColumns_Options{
    hideModel?: "alternate" | "alternate2" | "before" | "after"
    exclude?: number
    instant?: boolean
}

export default class Page2Script implements ScreenOption{
    
    timeoutArr: NodeJS.Timeout[] = []
    
    screenName: string = "Page2";

    constructor(){
        gsap.registerPlugin(ScrollTrigger);
    }
    roletaImagens: GeradorStickerMuseum | null = null;

    screenSetupEvents = () => {
        // this.setupNavbarText()

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

    }
    
    onEnter = () => {
    }
    onLeave = () => {
    }

    onEntering = () => {}
    onLeaving = () => {}
}