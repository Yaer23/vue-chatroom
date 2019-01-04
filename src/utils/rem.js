(function (doc, win) {
  var docEl = doc.documentElement,
    //  手机竖屏事件
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    //  计算根元素字体大小
    recalc = function () {

      var clientWidth = docEl.clientWidth;

      if (!clientWidth) return;
      docEl.style.fontSize = 16 * (clientWidth / 375) + 'px';
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);