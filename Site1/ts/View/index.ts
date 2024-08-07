import GeradorCarrosselImagens from "../Utils/GeradorCarrosselImagens.js";
import GeradorSeletorEstrelas from "../Utils/GeradorSeletorEstrelas.js";


let geradorCarrossel: GeradorCarrosselImagens | null = null;
let starSelector: GeradorSeletorEstrelas | null = null;

preLoadPage();
afterLoadPage();
starSelector = new GeradorSeletorEstrelas({idDiv: "estrelaSelector"})
document.getElementById("setStar")?.addEventListener("click", () => {
  starSelector.SetScore(18);
});
document.getElementById("getStar")?.addEventListener("click", () => {
  console.log(starSelector.GetScore());
});
// $(function() {
// });

function preLoadPage(){
  document.querySelectorAll('[page-section]').forEach((el) => {
    addHtml(el);
    addCss(el);
    addJavaScript(el);
  })
}

function afterLoadPage(){
  geradorCarrossel = new GeradorCarrosselImagens({
    idDiv: "pageCarrossel",
    imagens: []
  }).Generate();
}

function addHtml(el: Element) {
  const htmlFile = el.getAttribute('html-include') ?? el.getAttribute('data-include');

  let file = 'views/MainPageView/' + htmlFile + '.html'

  if(el.getAttribute('data-noHtml') === "") return;

  fetch(file).then((response) => {
    if(response.ok){
      response.text().then((body) => {
        el.innerHTML = body;
      });
    }
  })
}

function addCss(el: Element) {
  const cssFile = el.getAttribute('css-include') ?? el.getAttribute('data-include');
    console.log(cssFile);
  let filePath = 'css/View/MainPageView/' + cssFile + '.css';

  if(el.getAttribute('data-noCss') === "") return;
  
  fetch(filePath).then((response) => {
    if(response.ok){
      var head = document.head;
      var link = document.createElement("link");
    
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = filePath;
    
      head.appendChild(link);
    }
  });
}

function addJavaScript(el: Element) {
  const jsFile = el.getAttribute('js-include') ?? el.getAttribute('data-include');

  let filePath = 'js/View/MainPageView/' + jsFile + '.js';

  if(el.getAttribute('data-noJs') === "") return;
  
  fetch(filePath).then((response) => {
    if(response.ok){
      var body = document.body;
      var script = document.createElement("script");
    
      script.type = "module";
      script.src = filePath;
    
      body.appendChild(script);
    }
  });
}