import { uniqueSort } from "jquery";

export interface GeradorUniqueScreen_Options{
    idDiv: string

    screenEvents: ScreenOption[]
    overlayEvents: OverlayOption[]

    backgroundEvent?: (backgroundDIV: HTMLDivElement) => void;

    pageTransitionDelay?: number
    enableFreeScroll?: boolean;

    overlayScreen?: ScreenOption;
}

export interface ScreenOption {
    screenName: string
    screenSetupEvents: () => void
    onEntering?: () => void;
    onEnter?: () => void;
    onLeaving?: () => void;
    onLeave?: () => void;
}
export interface OverlayOption {
    overlayName: string
    overlaySetupEvents: () => void
    onEntering?: () => void;
    onEnter?: () => void;
    onLeaving?: () => void;
    onLeave?: () => void;
    PageChangerHandler?: (newPage: number) => void;
}
export type AllowedScreenCommands = "screenSetupEvents" | "onEntering" | "onEnter" | "onLeaving" | "onLeave"
export type AllowedOverlayCommands = "overlaySetupEvents" | "onEntering" | "onEnter" | "onLeaving" | "onLeave"

export default class GeradorUniqueScreen{
    private idDiv: string;
    
    private screenNames: string[] = [];
    private screenEvents: ScreenOption[];
    private overlayNames: string[] = [];
    private overlayEvents: OverlayOption[];

    backgroundEvent: (backgroundDIV: HTMLDivElement) => void = () => {}

    private numPages: number = 0;

    lastPage = 0;
    currentPage = 0;

    isScrolling = false;
    enableScroll = true;
    enableFreeScroll = false;
    
    pageTransitionDelay: number = 600;
    
    private touchScreenY: number = 0;

    constructor(options: GeradorUniqueScreen_Options){
        this.idDiv = options.idDiv;
        this.screenEvents = options.screenEvents;
        this.overlayEvents = options.overlayEvents;
        
        if (options.enableFreeScroll != undefined) this.enableFreeScroll = options.enableFreeScroll
        if (options.backgroundEvent != null) this.backgroundEvent = options.backgroundEvent;

        this.SetupHTML()
            .SetupEvents();

    }

    SetupHTML(){
        const div = document.getElementById(`${this.idDiv}`);
        const screensDiv = div?.querySelector(`#UniqueScreenPages`);
        const overlayDiv = div?.querySelector(`#UniqueScreenOverlay`);

        if (div) {
            div.classList.add("UniqueScreenWrapper");
            
            if (screensDiv){
                    const mainContentDiv = document.createElement("div");
                    mainContentDiv.classList.add("UniqueScreenContainer");
                    mainContentDiv.id = "UniqueScreenContainer";
                    mainContentDiv.innerHTML = screensDiv.innerHTML;
                    if (!this.enableFreeScroll) mainContentDiv.style.overflowY = "hidden";
        
                    for (let i = 0; i < mainContentDiv.children.length; i++) {
                        const element = mainContentDiv.children[i];
                        if (element.hasAttribute("spacer")){
                            // const spacerHeight = element.getAttribute("spacerHeight") ?? "100px";
                            // (<HTMLDivElement>element).style.height = `${spacerHeight}`;
                            // mainContentDiv.insertBefore(spacer, element);
                            // element.innerHTML = spacer.outerHTML;
                        } else {
                            element.classList.add("UniqueScreenPage");
                            const htmlFile = element.id;
                            let file = 'views/UniqueScreens/' + htmlFile + '.html'
                            this.screenNames.push(htmlFile);
                            this.numPages += 1;
                
                            fetch(file).then((response) => {
                                if(response.ok){
                                    response.text().then((body) => {
                                        element.innerHTML = body;
                                        this.ExecuteScreenCommand(htmlFile, "screenSetupEvents")
                                    });
                                }
                            })
                        }
                    }
                    
                    while (screensDiv.firstChild) {
                        screensDiv.removeChild(screensDiv.firstChild);
                    }
                    screensDiv.appendChild(mainContentDiv);
            }

            if (overlayDiv) {
                const overlayContentDiv = document.createElement("div");
                overlayContentDiv.classList.add("UniqueOverlayContainer");
                overlayContentDiv.id = "UniqueOverlayContainer";
                overlayContentDiv.innerHTML = overlayDiv.innerHTML;
    
                for (let i = 0; i < overlayContentDiv.children.length; i++) {
                    const element = overlayContentDiv.children[i];
                    element.classList.add("UniqueOverlayPage");
                    const htmlFile = element.id;
                    let file = 'views/UniqueOverlay/' + htmlFile + '.html'
                    this.overlayNames.push(htmlFile);
        
                    fetch(file).then((response) => {
                        if(response.ok){
                            response.text().then((body) => {
                                element.innerHTML = body;
                                this.SetOverlayScript(htmlFile, this.ChangeToPage.bind(this))
                                this.ExecuteOverlayCommand(htmlFile, "overlaySetupEvents")
                                // this.SetOverlayScript(htmlFile, this.ChangeToPage.bind(this))
                            });
                        }
                    })
                }
                
                while (overlayDiv.firstChild) {
                    overlayDiv.removeChild(overlayDiv.firstChild);
                }
                overlayDiv.appendChild(overlayContentDiv);
            }

            if (this.backgroundEvent != null) this.backgroundEvent(document.getElementById("UniqueScreenBackground") as HTMLDivElement);

        }

        return this;
    }

    SetupEvents(){
        
        // gsap.timeline({
        //     scrollTrigger
        // });

        if (!this.enableFreeScroll){

            // Normal Wheel Event
            document.addEventListener("wheel", (event) => {
                if (this.enableScroll && !this.isScrolling){
                    this.StartScrolling();
    
                    if (event.deltaY > 0 && this.IsAtBottom(this.GetCurrentPageHTML())) {
                        this.NextPage();
                    } else if (event.deltaY < 0 && this.IsAtTop(this.GetCurrentPageHTML())) {
                        this.PreviousPage();    
                    } else {
                        this.StopScrolling();
                    }
                }
            }, false)
    
            // Mobile Wheel Event
            document.addEventListener('touchstart', (e) => {
               this.touchScreenY = e.touches[0].clientY;
            });
            document.addEventListener('touchend', (e) => {
                if (this.enableScroll && !this.isScrolling){
                    this.StartScrolling();
                    
                    var te = e.changedTouches[0].clientY;
                    if(this.touchScreenY > te+5 && this.IsAtBottom(this.GetCurrentPageHTML())){
                        this.NextPage();
                    } else if (this.touchScreenY < te-5 && this.IsAtTop(this.GetCurrentPageHTML())){
                        this.PreviousPage();
                    } else {
                        this.StopScrolling();
                    }
                }
            });
        }


        // Resize Event
        window.addEventListener('resize', (e) => {
            this.ScrollToCurrent();
        })

        return this;
    }

    ExecuteAllScripts(command: AllowedScreenCommands){
        this.screenEvents.forEach(currScreen => {
            if(currScreen[command] == undefined) return;
            currScreen[command]!();
        })
    }
    ExecuteScreenCommand(pageId: string, command: AllowedScreenCommands){
        let currScreen = this.GetScreenScript(pageId);
        if(currScreen == undefined) return;

        if(currScreen[command] == undefined) return;
        currScreen[command]!();
    }
    GetScreenScript(pageId: string) : ScreenOption | undefined {
        return this.screenEvents.find(el => el.screenName == pageId)
    }
    
    SetOverlayScript(pageId: string, command: (numberPage: number) => void){
        let currOverlay = this.GetOverlayScript(pageId);
        if(currOverlay == undefined) return;

        currOverlay.PageChangerHandler = command;
    }
    ExecuteOverlayCommand(pageId: string, command: AllowedOverlayCommands){
        let currOverlay = this.GetOverlayScript(pageId);
        if(currOverlay == undefined) return;

        if(currOverlay[command] == undefined) return;
        currOverlay[command]!();
    }
    GetOverlayScript(pageId: string) : OverlayOption | undefined {
        return this.overlayEvents.find(el => el.overlayName == pageId)
    }

    // ===== PAGINATION =====

    IsAtTop(element: HTMLDivElement): boolean{
        return element.scrollTop === 0;
    }

    IsAtBottom(element: HTMLDivElement): boolean{
        return Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 3.0
    }

    GetCurrentPageHTML(): HTMLDivElement{
        return document.getElementById(this.GetCurrentPageName()) as HTMLDivElement;
    }
    GetCurrentPageName(): string{
        return this.screenNames[this.currentPage];
    }

    NextPage(){
        this.MovePage(1);
    }
    PreviousPage(){
        this.MovePage(-1);
    }
    MovePage(deltaPage: number){
        let newPage = this.currentPage + deltaPage;
        if (newPage < 0 || newPage >= this.numPages) {
            this.StopScrolling();
            return;
        };
        this.ChangeToPage(newPage)
    }
    ChangeToPage(newPage: number){
        if (newPage < 0 || newPage >= this.numPages) {
            this.StopScrolling();
            return;
        };
        
        this.lastPage = this.currentPage;
        this.currentPage = newPage;
        
        this.ExecuteScreenCommand(this.screenNames[this.lastPage], "onLeaving")
        this.ExecuteScreenCommand(this.screenNames[this.currentPage], "onEntering")

        const div = document.getElementById(`UniqueScreenContainer`) as HTMLElement;
        div!.style.transition = `${this.pageTransitionDelay}ms all ease-in-out`;
        div!.style.transform = `translate(0px, -${newPage * window.innerHeight}px)`;

        setTimeout(() => {
            this.StopScrolling();
            this.ExecuteScreenCommand(this.screenNames[this.lastPage], "onLeave")
            this.ExecuteScreenCommand(this.screenNames[this.currentPage], "onEnter")
    
        }, this.pageTransitionDelay)
    }

    ScrollToCurrent(){
        const div = document.getElementById(`UniqueScreenContainer`) as HTMLElement;

        div!.style.transition = `50ms all ease-in-out`;
        div!.style.transform = `translate(0px, -${this.currentPage * window.innerHeight}px)`;
    }

    EnableScrolling(){
        this.enableScroll = true;
    }
    DisableScrolling(){
        this.enableScroll = false;
    }

    StartScrolling(){
        this.isScrolling = true;
    }
    StopScrolling(){
        this.isScrolling = false;
    }
    Test(){
        console.log(this.idDiv);
    }
}