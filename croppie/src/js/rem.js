/**
 * rem适配移动端
 */
const rem = (function (doc, win, undefined) {
    const docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
        reCalc = function () {
            const clientWidth = docEl.clientWidth;
            if (clientWidth === undefined) return;
            if (clientWidth < 750) {
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            } else {
                docEl.style.fontSize = '100px';
            }

        };
    if (doc.addEventListener === undefined) return;
    win.addEventListener(resizeEvt, reCalc, false);
    doc.addEventListener('DOMContentLoaded', reCalc, false);
})(document, window);

export default rem;