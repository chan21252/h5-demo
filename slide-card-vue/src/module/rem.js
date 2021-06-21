/**
 * rem
 *
 * @param doc document
 * @param win window
 */
const rem = (doc, win) => {
    const docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
        reCalc = function () {
            const clientWidth = docEl.clientWidth;
            if (clientWidth === undefined) return;
            if (clientWidth < 690) {
                docEl.style.fontSize = 100 * (clientWidth / 690) + 'px';
            } else {
                docEl.style.fontSize = '100px';
            }

        };
    if (doc.addEventListener === undefined) return;
    win.addEventListener(resizeEvt, reCalc, false);
    doc.addEventListener('DOMContentLoaded', reCalc, false);
}

export default rem;