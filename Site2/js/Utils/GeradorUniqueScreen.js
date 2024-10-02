export default class GeradorUniqueScreen {
    constructor(options) {
        this.screenNames = [];
        this.overlayNames = [];
        this.backgroundEvent = () => { };
        this.numPages = 0;
        this.lastPage = 0;
        this.currentPage = 0;
        this.isScrolling = false;
        this.enableScroll = true;
        this.enableFreeScroll = false;
        this.pageTransitionDelay = 600;
        this.touchScreenY = 0;
        this.idDiv = options.idDiv;
        this.screenEvents = options.screenEvents;
        this.overlayEvents = options.overlayEvents;
        if (options.enableFreeScroll != undefined)
            this.enableFreeScroll = options.enableFreeScroll;
        if (options.backgroundEvent != null)
            this.backgroundEvent = options.backgroundEvent;
        this.SetupHTML()
            .SetupEvents();
    }
    SetupHTML() {
        const div = document.getElementById(`${this.idDiv}`);
        const screensDiv = div === null || div === void 0 ? void 0 : div.querySelector(`#UniqueScreenPages`);
        const overlayDiv = div === null || div === void 0 ? void 0 : div.querySelector(`#UniqueScreenOverlay`);
        if (div) {
            div.classList.add("UniqueScreenWrapper");
            if (screensDiv) {
                const mainContentDiv = document.createElement("div");
                mainContentDiv.classList.add("UniqueScreenContainer");
                mainContentDiv.id = "UniqueScreenContainer";
                mainContentDiv.innerHTML = screensDiv.innerHTML;
                if (!this.enableFreeScroll)
                    mainContentDiv.style.overflowY = "hidden";
                for (let i = 0; i < mainContentDiv.children.length; i++) {
                    const element = mainContentDiv.children[i];
                    if (element.hasAttribute("spacer")) {
                    }
                    else {
                        element.classList.add("UniqueScreenPage");
                        const htmlFile = element.id;
                        let file = 'views/UniqueScreens/' + htmlFile + '.html';
                        this.screenNames.push(htmlFile);
                        this.numPages += 1;
                        fetch(file).then((response) => {
                            if (response.ok) {
                                response.text().then((body) => {
                                    element.innerHTML = body;
                                    this.ExecuteScreenCommand(htmlFile, "screenSetupEvents");
                                });
                            }
                        });
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
                    let file = 'views/UniqueOverlay/' + htmlFile + '.html';
                    this.overlayNames.push(htmlFile);
                    fetch(file).then((response) => {
                        if (response.ok) {
                            response.text().then((body) => {
                                element.innerHTML = body;
                                this.SetOverlayScript(htmlFile, this.ChangeToPage.bind(this));
                                this.ExecuteOverlayCommand(htmlFile, "overlaySetupEvents");
                            });
                        }
                    });
                }
                while (overlayDiv.firstChild) {
                    overlayDiv.removeChild(overlayDiv.firstChild);
                }
                overlayDiv.appendChild(overlayContentDiv);
            }
            if (this.backgroundEvent != null)
                this.backgroundEvent(document.getElementById("UniqueScreenBackground"));
        }
        return this;
    }
    SetupEvents() {
        if (!this.enableFreeScroll) {
            document.addEventListener("wheel", (event) => {
                if (this.enableScroll && !this.isScrolling) {
                    this.StartScrolling();
                    if (event.deltaY > 0 && this.IsAtBottom(this.GetCurrentPageHTML())) {
                        this.NextPage();
                    }
                    else if (event.deltaY < 0 && this.IsAtTop(this.GetCurrentPageHTML())) {
                        this.PreviousPage();
                    }
                    else {
                        this.StopScrolling();
                    }
                }
            }, false);
            document.addEventListener('touchstart', (e) => {
                this.touchScreenY = e.touches[0].clientY;
            });
            document.addEventListener('touchend', (e) => {
                if (this.enableScroll && !this.isScrolling) {
                    this.StartScrolling();
                    var te = e.changedTouches[0].clientY;
                    if (this.touchScreenY > te + 5 && this.IsAtBottom(this.GetCurrentPageHTML())) {
                        this.NextPage();
                    }
                    else if (this.touchScreenY < te - 5 && this.IsAtTop(this.GetCurrentPageHTML())) {
                        this.PreviousPage();
                    }
                    else {
                        this.StopScrolling();
                    }
                }
            });
        }
        window.addEventListener('resize', (e) => {
            this.ScrollToCurrent();
        });
        return this;
    }
    ExecuteAllScripts(command) {
        this.screenEvents.forEach(currScreen => {
            if (currScreen[command] == undefined)
                return;
            currScreen[command]();
        });
    }
    ExecuteScreenCommand(pageId, command) {
        let currScreen = this.GetScreenScript(pageId);
        if (currScreen == undefined)
            return;
        if (currScreen[command] == undefined)
            return;
        currScreen[command]();
    }
    GetScreenScript(pageId) {
        return this.screenEvents.find(el => el.screenName == pageId);
    }
    SetOverlayScript(pageId, command) {
        let currOverlay = this.GetOverlayScript(pageId);
        if (currOverlay == undefined)
            return;
        currOverlay.PageChangerHandler = command;
    }
    ExecuteOverlayCommand(pageId, command) {
        let currOverlay = this.GetOverlayScript(pageId);
        if (currOverlay == undefined)
            return;
        if (currOverlay[command] == undefined)
            return;
        currOverlay[command]();
    }
    GetOverlayScript(pageId) {
        return this.overlayEvents.find(el => el.overlayName == pageId);
    }
    IsAtTop(element) {
        return element.scrollTop === 0;
    }
    IsAtBottom(element) {
        return Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 3.0;
    }
    GetCurrentPageHTML() {
        return document.getElementById(this.GetCurrentPageName());
    }
    GetCurrentPageName() {
        return this.screenNames[this.currentPage];
    }
    NextPage() {
        this.MovePage(1);
    }
    PreviousPage() {
        this.MovePage(-1);
    }
    MovePage(deltaPage) {
        let newPage = this.currentPage + deltaPage;
        if (newPage < 0 || newPage >= this.numPages) {
            this.StopScrolling();
            return;
        }
        ;
        this.ChangeToPage(newPage);
    }
    ChangeToPage(newPage) {
        if (newPage < 0 || newPage >= this.numPages) {
            this.StopScrolling();
            return;
        }
        ;
        this.lastPage = this.currentPage;
        this.currentPage = newPage;
        this.ExecuteScreenCommand(this.screenNames[this.lastPage], "onLeaving");
        this.ExecuteScreenCommand(this.screenNames[this.currentPage], "onEntering");
        const div = document.getElementById(`UniqueScreenContainer`);
        div.style.transition = `${this.pageTransitionDelay}ms all ease-in-out`;
        div.style.transform = `translate(0px, -${newPage * window.innerHeight}px)`;
        setTimeout(() => {
            this.StopScrolling();
            this.ExecuteScreenCommand(this.screenNames[this.lastPage], "onLeave");
            this.ExecuteScreenCommand(this.screenNames[this.currentPage], "onEnter");
        }, this.pageTransitionDelay);
    }
    ScrollToCurrent() {
        const div = document.getElementById(`UniqueScreenContainer`);
        div.style.transition = `50ms all ease-in-out`;
        div.style.transform = `translate(0px, -${this.currentPage * window.innerHeight}px)`;
    }
    EnableScrolling() {
        this.enableScroll = true;
    }
    DisableScrolling() {
        this.enableScroll = false;
    }
    StartScrolling() {
        this.isScrolling = true;
    }
    StopScrolling() {
        this.isScrolling = false;
    }
    Test() {
        console.log(this.idDiv);
    }
}
