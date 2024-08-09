export default class GeradorUniqueScreen {
    constructor(options) {
        this.screenNames = [];
        this.numPages = 0;
        this.lastPage = 0;
        this.currentPage = 0;
        this.isScrolling = false;
        this.enableScroll = true;
        this.pageTransitionDelay = 600;
        this.touchScreenY = 0;
        this.idDiv = options.idDiv;
        this.screenEvents = options.screenEvents;
        this.SetupHTML()
            .SetupEvents();
    }
    SetupHTML() {
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
                let file = 'views/UniqueScreens/' + htmlFile + '.html';
                this.screenNames.push(htmlFile);
                this.numPages += 1;
                fetch(file).then((response) => {
                    if (response.ok) {
                        response.text().then((body) => {
                            el.innerHTML = body;
                            this.ExecuteScreenCommand(htmlFile, "screenSetupEvents");
                        });
                    }
                });
            });
        }
        return this;
    }
    SetupEvents() {
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
}
