export default class Page2Script {
    constructor() {
        this.timeoutArr = [];
        this.SetupEvents = () => {
            var _a, _b;
            (_a = document.getElementById("Page2Content")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
                const el = e.target;
                const elTarget = el.closest(`.Page2Content_Column`);
                const dataIndex = parseInt(el.getAttribute("data-index"));
                if (elTarget) {
                    this.SetInfoMode(dataIndex);
                }
            });
            (_b = document.getElementById("Page2Content")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (e) => {
                const el = e.target;
                const elTarget = el.closest(`#HeaderBackButton`);
                if (elTarget) {
                    this.ResetInfoMode(true);
                }
            });
            document.querySelectorAll("#Page2Content .Page2Content_Column").forEach((column, i) => {
                const el = column;
                el.style.transition = `400ms all ease-in-out, ${i * 100}ms top ease-in-out`;
            });
        };
        this.onEnter = () => {
            this.ClearTimeout();
            this.ShowColumns();
        };
        this.onLeave = () => {
            this.ClearTimeout();
            this.ResetInfoMode(false);
            this.HideColumns({ hideModel: "alternate", instant: true });
        };
        this.onEntering = () => { };
        this.onLeaving = () => {
        };
        this.SetInfoMode = (dataIndex) => {
            const el = document.querySelector(`#Page2Content .Page2Content_Column[data-index='${dataIndex}']`);
            const textElement = document.querySelector(`#Page2Content .Page2Content_TextBox`);
            this.HideColumns({ hideModel: "after", exclude: dataIndex });
            setTimeout(() => {
                el.style.top = `-${el.clientHeight * (dataIndex)}px`;
                setTimeout(() => {
                    textElement.classList.remove("hidden");
                }, (dataIndex * 100) + 200);
            }, 300);
        };
        this.ResetInfoMode = (useDelay) => {
            document.querySelectorAll("#Page2Content .Page2Content_Column").forEach((column, i) => {
                var _a;
                const el = column;
                const textElement = document.querySelector(`#Page2Content .Page2Content_TextBox`);
                textElement.classList.add("hidden");
                setTimeout(() => {
                    el.style.top = "";
                    this.ShowColumns();
                }, useDelay ? (parseInt((_a = textElement.getAttribute("data-index")) !== null && _a !== void 0 ? _a : "0") * 100) + 400 : 0);
            });
        };
        this.ShowColumns = () => {
            document.querySelectorAll("#Page2Content .Page2Content_Column").forEach((el, i) => {
                this.timeoutArr.push(setTimeout(() => {
                    el.classList.remove("hiddenBefore", "hiddenAfter");
                }, i * 50));
            });
        };
        this.HideColumns = (options) => {
            document.querySelectorAll("#Page2Content .Page2Content_Column").forEach((el, i) => {
                var _a;
                if (options.exclude !== undefined) {
                    const excludedAttr = parseInt((_a = el.getAttribute("data-index")) !== null && _a !== void 0 ? _a : "0");
                    if (excludedAttr == options.exclude)
                        return;
                }
                ;
                if (options.instant !== undefined && options.instant === true) {
                    el.style.transition = "0ms all ease-in-out";
                }
                if (options.hideModel !== undefined) {
                    switch (options.hideModel) {
                        case "alternate":
                            if (i % 2 == 0) {
                                el.classList.add("hiddenBefore");
                                el.classList.remove("hiddenAfter");
                            }
                            else {
                                el.classList.add("hiddenAfter");
                                el.classList.remove("hiddenBefore");
                            }
                            break;
                        case "alternate2":
                            if (i % 2 == 0) {
                                el.classList.add("hiddenAfter");
                                el.classList.remove("hiddenBefore");
                            }
                            else {
                                el.classList.add("hiddenBefore");
                                el.classList.remove("hiddenAfter");
                            }
                            break;
                        case "after":
                            el.classList.remove("hiddenBefore");
                            el.classList.add("hiddenAfter");
                            break;
                        case "before":
                        default:
                            el.classList.add("hiddenBefore");
                            el.classList.remove("hiddenAfter");
                            break;
                    }
                }
                else {
                    if (i % 2 == 0) {
                        el.classList.add("hiddenBefore");
                        el.classList.remove("hiddenAfter");
                    }
                    else {
                        el.classList.add("hiddenAfter");
                        el.classList.remove("hiddenBefore");
                    }
                }
                if (options.instant !== undefined && options.instant === true) {
                    el.style.transition = `400ms all ease-in-out, ${i * 100}ms top ease-in-out`;
                }
            });
        };
        this.ClearTimeout = () => {
            this.timeoutArr.forEach(el => clearTimeout(el));
            this.timeoutArr = [];
        };
    }
}
