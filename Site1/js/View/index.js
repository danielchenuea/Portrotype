var _a, _b;
import GeradorCarrosselImagens from "../Utils/GeradorCarrosselImagens.js";
import GeradorSeletorEstrelas from "../Utils/GeradorSeletorEstrelas.js";
let geradorCarrossel = null;
let starSelector = null;
preLoadPage();
afterLoadPage();
starSelector = new GeradorSeletorEstrelas({ idDiv: "estrelaSelector" });
(_a = document.getElementById("setStar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    starSelector.SetScore(18);
});
(_b = document.getElementById("getStar")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    console.log(starSelector.GetScore());
});
function preLoadPage() {
    document.querySelectorAll('[page-section]').forEach((el) => {
        addHtml(el);
        addCss(el);
        addJavaScript(el);
    });
}
function afterLoadPage() {
    geradorCarrossel = new GeradorCarrosselImagens({
        idDiv: "pageCarrossel",
        imagens: []
    }).Generate();
}
function addHtml(el) {
    var _a;
    const htmlFile = (_a = el.getAttribute('html-include')) !== null && _a !== void 0 ? _a : el.getAttribute('data-include');
    let file = 'views/MainPageView/' + htmlFile + '.html';
    if (el.getAttribute('data-noHtml') === "")
        return;
    fetch(file).then((response) => {
        if (response.ok) {
            response.text().then((body) => {
                el.innerHTML = body;
            });
        }
    });
}
function addCss(el) {
    var _a;
    const cssFile = (_a = el.getAttribute('css-include')) !== null && _a !== void 0 ? _a : el.getAttribute('data-include');
    console.log(cssFile);
    let filePath = 'css/View/MainPageView/' + cssFile + '.css';
    if (el.getAttribute('data-noCss') === "")
        return;
    fetch(filePath).then((response) => {
        if (response.ok) {
            var head = document.head;
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = filePath;
            head.appendChild(link);
        }
    });
}
function addJavaScript(el) {
    var _a;
    const jsFile = (_a = el.getAttribute('js-include')) !== null && _a !== void 0 ? _a : el.getAttribute('data-include');
    let filePath = 'js/View/MainPageView/' + jsFile + '.js';
    if (el.getAttribute('data-noJs') === "")
        return;
    fetch(filePath).then((response) => {
        if (response.ok) {
            var body = document.body;
            var script = document.createElement("script");
            script.type = "module";
            script.src = filePath;
            body.appendChild(script);
        }
    });
}
