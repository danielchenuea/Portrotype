

export default class CSSHeaderUtils{

    static CheckLinkExistsByHref(href: string): boolean{
        var head = document.head;

        head.querySelectorAll("link").forEach(el => {
            if (el.href == href) return true;
        });

        return false;
    }

}