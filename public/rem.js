/* eslint-disable @typescript-eslint/no-extra-semi */
;((doc, win) => {
    const docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = () => {
            const clientWidth = docEl.clientWidth
            // 设定最小宽度 1366
            const minClientWidth = Math.max(clientWidth, 1366)
            docEl.style.fontSize = 100 * (minClientWidth / 1920) + 'px'
        }
    if (!doc.addEventListener) {
        return
    }
    win.addEventListener(resizeEvt, recalc, false)
    doc.addEventListener('DOMContentLoaded', recalc, false)
    recalc()
})(document, window)
