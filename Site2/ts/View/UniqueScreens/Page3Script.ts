import gsap from 'gsap';
// import * as lodash from 'lodash';
import { ScreenOption } from '../../Utils/GeradorUniqueScreen';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GeradorRoletaImagens from '../../Utils/GeradorRoletaImagens';

export default class Page3Script implements ScreenOption{

    constructor(){
        // this.SetupEvents();
        gsap.registerPlugin(ScrollTrigger);
    }

    roletaImagens: GeradorRoletaImagens | null = null;

    screenName: string = "Page3";
    screenSetupEvents = () => {

        this.roletaImagens = new GeradorRoletaImagens({
            idDiv: "Page3Content_PolaroidWrapper",
            idController: "Page3Content_BottomBarWrapper",
            columns: 2,
            rows: 2,
        }).Generate();

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#Page3Content",
                start: "top 50%",
                end: "top 55%",
                toggleActions: "play none none reverse",
                // scrub: 0.5,
                markers: true,
                onEnter: () => {
                    this.roletaImagens?.StartTimer();
                    console.log("3 Enter")
                },
                onEnterBack: () => {
                    console.log("3 Leave")
                },
                onLeave: () => {
                    this.roletaImagens?.StopTimer();
                }
            },
        })
        .fromTo(".Page3Content_PolaroidPhoto", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<")
        .fromTo(".Page3Content_PolaroidDescriptionTitle", { x: -5, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<")
        .fromTo(".Page3Content_PolaroidDescriptionText", { x: -5, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "<")
            
    }

    onEnter = () => {
    }
    onLeave = () => {
    }

    onEntering = () => {}
    onLeaving = () => {}

    

}