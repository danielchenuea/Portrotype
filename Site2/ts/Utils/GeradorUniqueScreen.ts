import { uniqueSort } from "jquery";

export interface GeradorUniqueScreen_Options{
    idDiv: string
    screenEvents: ScreenOption[]

    pageTransitionDelay?: number
}

export interface ScreenOption {
    screenName: string
    onEntering?: () => void;
    onEnter?: () => void;
    onLeaving?: () => void;
    onLeave?: () => void;
}
export type AllowedScreenCommands = "onEntering" | "onEnter" | "onLeaving" | "onLeave"

export default class GeradorUniqueScreen{
    private idDiv: string;
    
    private screenNames: string[] = []
    private screenEvents: ScreenOption[]

    private numPages: number = 0;

    lastPage = 0;
    currentPage = 0;

    isScrolling = false;
    enableScroll = true;
    
    pageTransitionDelay: number = 600;
    
    private touchScreenY: number = 0;

    constructor(options: GeradorUniqueScreen_Options){
        this.idDiv = options.idDiv;
        this.screenEvents = options.screenEvents;

        this.SetupHTML()
            .SetupEvents();

    }

    SetupHTML(){
        const div = document.querySelector(`#${this.idDiv}`);

        if (div) {
            div.classList.add("UniqueScreenWrapper");
            
            const screensDiv = div.innerHTML;

            const mainContentDiv = document.createElement("div");
            mainContentDiv.classList.add("UniqueScreenContainer");
            mainContentDiv.id = "UniqueScreenContainer";
            mainContentDiv.innerHTML = screensDiv;

            for (let i = 0; i < mainContentDiv.children.length; i++) {
                const element = mainContentDiv.children[i];
                element.classList.add("UniqueScreenPage");
            }
            
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
            div.appendChild(mainContentDiv);

            document.querySelectorAll('.UniqueScreenPage').forEach((el) => {  
                const htmlFile = el.id;
                let file = 'views/UniqueScreens/' + htmlFile + '.html'
                this.screenNames.push(htmlFile);
                this.numPages += 1;
    
                fetch(file).then((response) => {
                    if(response.ok){
                        response.text().then((body) => {
                            el.innerHTML = body;
                        });
                    }
                })
            })
        }
        return this;
    }

    SetupEvents(){
        
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

        // Resize Event
        window.addEventListener('resize', (e) => {
            this.ScrollToCurrent();
        })

        return this;
    }

    ExecuteOnCommand(pageId: string, command: AllowedScreenCommands){
        let currScreen = this.GetScreenScript(pageId);
        if(currScreen == undefined) return;

        if(currScreen[command] == undefined) return;
        currScreen[command]!();
    }
    GetScreenScript(pageId: string) : ScreenOption | undefined {
        return this.screenEvents.find(el => el.screenName == pageId)
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
        
        this.ExecuteOnCommand(this.screenNames[this.lastPage], "onLeaving")
        this.ExecuteOnCommand(this.screenNames[this.currentPage], "onEntering")

        const div = document.getElementById(`UniqueScreenContainer`) as HTMLElement;
        div!.style.transition = `${this.pageTransitionDelay}ms all ease-in-out`;
        div!.style.transform = `translate(0px, -${newPage * window.innerHeight}px)`;

        setTimeout(() => {
            this.StopScrolling();
            this.ExecuteOnCommand(this.screenNames[this.lastPage], "onLeave")
            this.ExecuteOnCommand(this.screenNames[this.currentPage], "onEnter")
    
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
}