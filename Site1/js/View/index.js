import GeradorCarrosselImagens from "../Utils/GeradorCarrosselImagens.js";
let geradorCarrossel = null;
$(function () {
    preLoadPage();
});
function preLoadPage() {
    document.querySelectorAll('[data-include]').forEach((el) => {
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
    let file = 'views/MainPageView/' + el.getAttribute('data-include') + '.html';
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
    let filePath = 'css/View/MainPageView/' + el.getAttribute('data-include') + '.css';
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
    let filePath = 'js/View/MainPageView/' + el.getAttribute('data-include') + '.js';
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
