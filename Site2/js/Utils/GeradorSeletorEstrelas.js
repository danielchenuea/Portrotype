import CSSHeaderUtils from "./CssHeaderUtils.js";
export default class GeradorSeletorEstrelas {
    constructor(options) {
        this.n_stars = 5;
        this.starHeight = 36;
        this.starWidth = 36;
        this.starColor = "#ffda00";
        this.emptyStarIcon = "fa-star-o";
        this.halfStarIcon = "fa-star-half-o";
        this.fullStarIcon = "fa-star";
        this.enableHalfScore = true;
        this.enableEditScore = true;
        this.scoreArray = [];
        this.displayScoreArray = [];
        this.emptyStar = "fa-star-o";
        this.halfStar = "fa-star-half-o";
        this.fullStar = "fa-star";
        this.iconClassSelector = "scoreUnitTemp";
        this.idDiv = options.idDiv;
        this.scoreArray = Array.from(Array(this.n_stars), () => 0);
        this.displayScoreArray = Array.from(Array(this.n_stars), () => 0);
        if (options.n_stars !== undefined)
            this.n_stars = options.n_stars;
        if (options.starHeight !== undefined)
            this.starHeight = options.starHeight;
        if (options.starWidth !== undefined)
            this.starWidth = options.starWidth;
        if (options.starColor !== undefined)
            this.starColor = options.starColor;
        if (options.emptyStarIcon !== undefined)
            this.emptyStar = options.emptyStarIcon;
        if (options.halfStarIcon !== undefined)
            this.halfStar = options.halfStarIcon;
        if (options.fullStarIcon !== undefined)
            this.fullStar = options.fullStarIcon;
        if (options.enableHalfScore !== undefined)
            this.enableHalfScore = options.enableHalfScore;
        if (options.enableEditScore !== undefined)
            this.enableEditScore = options.enableEditScore;
        this.AddRandom();
        this.GenerateMainHTML();
    }
    AddRandom() {
        const guid = crypto.randomUUID();
        this.iconClassSelector += `_${guid}`;
        return this;
    }
    GenerateMainHTML() {
        const div = document.getElementById(this.idDiv);
        if (div) {
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
            div.classList.add("mainScoreSelectorDiv");
            const style = `
                color: ${this.starColor};
                font-size: ${this.starHeight}px;
                width: ${this.starWidth}px;
                cursor: ${this.enableEditScore ? "pointer" : "default"};
            `;
            for (let i = 0; i < this.n_stars; i++) {
                let starState = "";
                switch (this.scoreArray[i]) {
                    case 0:
                        starState = this.emptyStar;
                        break;
                    case 1:
                        starState = this.halfStar;
                        break;
                    case 2:
                        starState = this.fullStar;
                        break;
                    default:
                        starState = this.emptyStar;
                        break;
                }
                const HTML = `
                    <i class="fa ${starState} scoreUnitIcon ${this.iconClassSelector}" style="${style}" data-star="${i}" aria-hidden="true"></i>
                `;
                div.insertAdjacentHTML("beforeend", HTML);
            }
        }
        this.SetupEvents();
        return this;
    }
    GenerateScoreHTML() {
        var _a;
        const div = document.getElementById(this.idDiv);
        if (div) {
            console.time('Execution Time');
            for (let i = 0; i < this.n_stars; i++) {
                let starState = "";
                switch (this.scoreArray[i]) {
                    case 0:
                        starState = this.emptyStar;
                        break;
                    case 1:
                        starState = this.halfStar;
                        break;
                    case 2:
                        starState = this.fullStar;
                        break;
                    default:
                        starState = this.emptyStar;
                        break;
                }
                const htmlEl = (_a = document.getElementById(this.idDiv)) === null || _a === void 0 ? void 0 : _a.querySelector(`.${this.iconClassSelector}[data-star="${i}"]`);
                htmlEl.classList.remove(this.emptyStar, this.halfStar, this.fullStar);
                htmlEl.classList.add(starState);
            }
            console.timeEnd('Execution Time');
        }
    }
    GenerateDisplayScoreHTML() {
        var _a;
        const div = document.getElementById(this.idDiv);
        if (div) {
            for (let i = 0; i < this.n_stars; i++) {
                let starState = "";
                switch (this.displayScoreArray[i]) {
                    case 0:
                        starState = this.emptyStar;
                        break;
                    case 1:
                        starState = this.halfStar;
                        break;
                    case 2:
                        starState = this.fullStar;
                        break;
                    default:
                        starState = this.emptyStar;
                        break;
                }
                const htmlEl = (_a = document.getElementById(this.idDiv)) === null || _a === void 0 ? void 0 : _a.querySelector(`.${this.iconClassSelector}[data-star="${i}"]`);
                htmlEl.classList.remove(this.emptyStar, this.halfStar, this.fullStar);
                htmlEl.classList.add(starState);
            }
        }
    }
    SetupEvents() {
        var _a, _b, _c;
        this.GetMainCss();
        this.GetIconCss();
        if (this.enableEditScore) {
            (_a = document.getElementById(this.idDiv)) === null || _a === void 0 ? void 0 : _a.addEventListener("mousemove", (e) => {
                const elTarget = e.target.closest(`.${this.iconClassSelector}`);
                const starNum = parseInt(elTarget === null || elTarget === void 0 ? void 0 : elTarget.getAttribute("data-star"));
                if (elTarget) {
                    let score = 2;
                    if (this.enableHalfScore && e.offsetX < this.starWidth / 2)
                        score = 1;
                    this.SetHoverScoreStar(starNum, score);
                }
            });
            (_b = document.getElementById(this.idDiv)) === null || _b === void 0 ? void 0 : _b.addEventListener("mouseleave", (e) => {
                this.ReplaceScoreStar();
            });
            (_c = document.getElementById(this.idDiv)) === null || _c === void 0 ? void 0 : _c.addEventListener("click", (e) => {
                const elTarget = e.target.closest(`.${this.iconClassSelector}`);
                const starNum = parseInt(elTarget === null || elTarget === void 0 ? void 0 : elTarget.getAttribute("data-star"));
                if (elTarget && starNum != undefined) {
                    let score = 2;
                    if (this.enableHalfScore && e.offsetX < this.starWidth / 2)
                        score = 1;
                    this.SetScoreStar(starNum, score);
                }
                ;
            });
        }
    }
    GetMainCss() {
        var head = document.head;
        let filePath = 'css/Utils/Geradores/GeradorSeletorEstrelas.css';
        if (CSSHeaderUtils.CheckLinkExistsByHref(filePath))
            return;
        fetch(filePath).then((response) => {
            if (response.ok) {
                var link = document.createElement("link");
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = filePath;
                head.appendChild(link);
            }
        });
    }
    GetIconCss() {
        var head = document.head;
        var link = document.createElement("link");
        if (CSSHeaderUtils.CheckLinkExistsByHref("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"))
            return;
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css";
        link.integrity = "sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg==";
        link.crossOrigin = "anonymous";
        link.referrerPolicy = "no-referrer";
        head.appendChild(link);
    }
    SetHoverScoreStar(star, starScore = 2) {
        this.ResetHoverScore();
        for (let i = 0; i <= star; i++) {
            this.displayScoreArray[i] = 2;
        }
        this.displayScoreArray[star] = starScore;
        this.GenerateDisplayScoreHTML();
        return this;
    }
    ResetHoverScore() {
        this.displayScoreArray = Array.from(Array(this.n_stars), () => 0);
        return this;
    }
    GetScore() {
        return this.scoreArray.reduce((acc, value) => acc + (this.enableHalfScore ? value : value / 2), 0);
    }
    ;
    SetScore(scoreNum) {
        let _score = scoreNum;
        let _scoreArray = Array.from(Array(this.n_stars), () => 0);
        for (let i = 0; i < _scoreArray.length; i++) {
            if (_score <= 0)
                break;
            if (this.enableHalfScore) {
                if (_score >= 2) {
                    _scoreArray[i] = 2;
                    _score -= 2;
                }
                else if (_score == 1) {
                    _scoreArray[i] = 1;
                    _score -= 1;
                }
            }
            else {
                _scoreArray[i] = 2;
                _score -= 1;
            }
        }
        this.scoreArray = _scoreArray;
        this.GenerateScoreHTML();
        return this;
    }
    SetScoreStar(star, starScore = 2) {
        this.ResetScoreStar();
        for (let i = 0; i <= star; i++) {
            this.scoreArray[i] = 2;
        }
        this.scoreArray[star] = starScore;
        this.GenerateScoreHTML();
        return this;
    }
    ReplaceScoreStar() {
        this.GenerateScoreHTML();
        return this;
    }
    ResetScoreStar() {
        this.scoreArray = Array.from(Array(this.n_stars), () => 0);
        return this;
    }
}
