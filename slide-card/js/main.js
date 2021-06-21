//rem
(function (doc, win, undefined) {
    const docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
        reCalc = function () {
            const clientWidth = docEl.clientWidth;
            if (clientWidth === undefined) return;
            // 移动端广告位设计稿 690px
            docEl.style.fontSize = 100 * (clientWidth / 690) + 'px';
        };
    if (doc.addEventListener === undefined) return;
    win.addEventListener(resizeEvt, reCalc, false);
    doc.addEventListener('DOMContentLoaded', reCalc, false);
})(document, window);

const slideData = {
    isClick: true,
    startX: 0,
    endX: 0,
    moveX: 0,
    disX: 0,
    slideDistance: 40,
    currentIndex: 0,
    slideDirection: 0,  //0-右滑，1-左滑
    slideFinishDistance: 300
};

//生成卡片
for (let i = 0; i < cardList.length; i++) {
    let card = cardList[i];
    let zIndex = 999 - i;
    $(".container").append(`<div class="card" id="card-${i}"
        style="z-index: ${zIndex}; transform: scale(${card.scale}) translate3d(${card.translateX}, 0px, 0px); transition: transform ${card.transitionTime}s ease 0s">
        <div class="card-item" style="background: url('${card.cover}'); background-size: 100% 100%;"></div>
        </div>`);
}

//滑动事件
$(".container").bind('touchstart', function (event) {
    slideData.isClick = true;
    slideData.startX = event.touches[0].clientX;
    console.log(`开始滑动位置${slideData.startX}`);
});


$(".container").bind('touchmove', function (event) {
    slideData.isClick = true;
    slideData.moveX = event.touches[0].clientX;
    slideData.disX = slideData.startX - slideData.moveX;
    //console.log(slideData.disX);

    if (slideData.disX < 0) {   //右滑
        slideData.slideDirection = 0;

        //前一个卡片
        if (cardList[slideData.currentIndex - 1]) {
            let item0 = $(`#card-${slideData.currentIndex - 1}`);
            let translateX0 = -window.innerWidth - slideData.disX + 'px';
            let transitionTime0 = 0;
            let scale0 = (0.1 / slideData.slideFinishDistance) * slideData.disX + 0.9;
            item0.css('transform', `translate3d(${translateX0}, 0px, 0px)`);
            item0.css('transform', `scale(${scale0})`);
            item0.css('transition', `transform ${transitionTime0}s ease 0s"`);
        }

        let item1 = $(`#card-${slideData.currentIndex}`);
        let translateX1 =-(9 / this.slideFinishDistance) * this.disX + 'vw';
        let transitionTime1 = 0;
        let scale1 = (0.1 / this.slideFinishDistance) * this.disX + 1;
        item1.css('transform', `scale(1) translate3d(${slideData.disX}px, 0px, 0px)`);
        item1.css('transition', `transform 0s ease 0s"`);

    } else if (slideData.disX > 0) {    //左滑
        slideData.slideDirection = 1;
        let item1 = $(`#card-${slideData.currentIndex}`);
        let translateX1 = -(9 / slideData.slideFinishDistance) * slideData.disX + 9;
        let transitionTime1 = 0;
        let scale2 = (0.1 / this.slideFinishDistance) * this.disX + 0.9;
        item1.css('transform', `scale(1) translate3d(${slideData.disX}px, 0px, 0px)`);
        item1.css('transition', `transform 0s ease 0s"`);

        if (cardList[slideData.currentIndex + 1]) {
            let item2 = $(`#card-${slideData.currentIndex + 1}`);
            let translateX2 = -(9 / slideData.slideFinishDistance) * slideData.disX + 9;
            let transitionTime2 = 0;
            let scale2 = (0.1 / this.slideFinishDistance) * this.disX + 0.9;
            item2.css('transform', `translate3d(${translateX2}vw, 0px, 0px)`);
            item2.css('transform', `scale(${scale2})`);
            item2.css('transition', `transform ${transitionTime2}s ease 0s"`);
        }

        if (cardList[slideData.currentIndex + 2]) {
            let item3 = $(`#card-${slideData.currentIndex + 2}`);
            let translateX3 = -(5 / slideData.slideFinishDistance) * slideData.disX + 15;
            let transitionTime3 = 0;
            let scale3 = (0.05 / this.slideFinishDistance) * this.disX + 0.85;
            item3.css('transform', `translate3d(${translateX3}vw, 0px, 0px)`);
            item3.css('transform', `scale(${scale3})`);
            item3.css('transition', `transform ${transitionTime3}s ease 0s"`);
        }

        if (cardList[slideData.currentIndex + 3]) {
            let item4 = $(`#card-${slideData.currentIndex + 3}`);
            let translateX4 = -(26 / slideData.slideFinishDistance) * slideData.disX + 40;
            let transitionTime4 = 0;
            let scale4 = (0.35 / this.slideFinishDistance) * this.disX + 0.5;
            item4.css('transform', `translate3d(${translateX4}vw, 0px, 0px)`);
            item4.css('transform', `scale(${scale4})`);
            item4.css('transition', `transform ${transitionTime4}s ease 0s"`);
        }
    }
});

$(".container").bind('touchend', function (event) {
    console.log("end")
});