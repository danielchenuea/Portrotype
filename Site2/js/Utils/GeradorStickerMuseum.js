export default class GeradorCarrosselImagens {
    constructor(options) {
        this.n_stickers = 0;
        this.stickerAberto = null;
        this.stickerArray = [];
        this.delayDefault = 500;
        this.idDiv = options.idDiv;
        if (options.stickers.length !== 0) {
            this.stickerArray = options.stickers;
            this.n_stickers = options.stickers.length;
        }
    }
    Generate() {
        const div = document.querySelector(`#${this.idDiv}`);
        if (div) {
            this.EventsOnLoad();
        }
        return this;
    }
    EventsOnLoad() {
        let classThis = this;
    }
}
