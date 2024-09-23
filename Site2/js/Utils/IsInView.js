export function inView(elm, threshold = 0) {
    const rect = elm.getBoundingClientRect();
    const vpWidth = window.innerWidth;
    const vpHeight = window.innerHeight;
    const above = rect.bottom - threshold <= 0;
    const below = rect.top - vpHeight + threshold >= 0;
    const left = rect.right - threshold <= 0;
    const right = rect.left - vpWidth + threshold >= 0;
    const inside = !above && !below && !left && !right;
    return { above, below, left, right, inside };
}
export default inView;
