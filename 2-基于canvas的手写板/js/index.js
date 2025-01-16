var wIn = window.innerWidth
var remUnit = 6.4
document.documentElement.style.fontSize = wIn / remUnit + 'px'

/**
 * 获取元素距离屏幕左侧和顶部的像素距离
 *
 * @param element
 * @returns {{offsetTop: number, offsetLeft: number}}
 */
function getOffset(element) {
  if (element == null) {
    return { offsetLeft: 0, offsetTop: 0 }
  }

  let parent = element.offsetParent
  let { offsetLeft, offsetTop } = getOffset(parent)
  offsetLeft += element.offsetLeft
  offsetTop += element.offsetTop

  return {
    offsetLeft,
    offsetTop,
  }
}

/**
 * 根据rem值计算像素px值
 * @param rem
 * @returns {number}
 */
function getPixelByRem(rem) {
  return (window.innerWidth / remUnit) * rem
}

/**
 * 禁止默认事件
 * @param e
 */
function removeE(e) {
  e.stopPropagation()
  e.preventDefault()
}

document.addEventListener('touchmove', removeE, { passive: false })

document.getElementById('writing-canvas').width = getPixelByRem(5)
document.getElementById('writing-canvas').height = getPixelByRem(5.14)

var isTouch = 'ontouchstart' in window
var mouseEvents = isTouch
  ? {
      down: 'touchstart',
      move: 'touchmove',
      up: 'touchend',
      out: 'touchcancel',
    }
  : {
      down: 'mousedown',
      move: 'mousemove',
      up: 'mouseup',
      out: 'mouseout',
    }

/**
 * 手写板
 *
 * @param id  canvas元素id
 * @constructor
 */
function Handwriting(id) {
  this.canvas = document.getElementById(id)
  this.ctx = this.canvas.getContext('2d')
  this.ctx.fillStyle = 'rgba(0,0,0,0.25)'
  var _this = this
  this.canvas.addEventListener(
    mouseEvents.down,
    function (e) {
      _this.downEvent(e)
    },
    { passive: false },
  )
  this.canvas.addEventListener(
    mouseEvents.move,
    function (e) {
      _this.moveEvent(e)
    },
    { passive: false },
  )
  this.canvas.addEventListener(
    mouseEvents.up,
    function (e) {
      _this.upEvent(e)
    },
    { passive: false },
  )
  this.canvas.addEventListener(
    mouseEvents.out,
    function (e) {
      _this.upEvent(e)
    },
    { passive: false },
  )

  this.offset = getOffset(this.canvas)

  this.moveFlag = false
  this.upof = {}
  this.has = []
  this.radius = 0
  this.lineMax = 30
  this.lineMin = 10
  this.linePressure = 2.5
  this.smoothness = 1000
}

Handwriting.prototype.downEvent = function (e) {
  this.moveFlag = true
  this.has = []
  this.upof = this.getXY(e)
  this.draw(e)
}

Handwriting.prototype.moveEvent = function (e) {
  if (!this.moveFlag) {
    return
  }
  this.draw(e)
}

Handwriting.prototype.upEvent = function (e) {
  this.moveFlag = false
}

Handwriting.prototype.draw = function (e) {
  var of = this.getXY(e) // 当前的坐标
  var up = this.upof // 开始的坐标
  var ur = this.radius //
  this.has.unshift({ time: new Date().getTime(), dis: this.distance(up, of) })
  var dis = 0
  var time = 0
  for (var n = 0; n < this.has.length - 1; n++) {
    dis += this.has[n].dis
    time += this.has[n].time - this.has[n + 1].time
    if (dis > this.smoothness) break
  }
  var or = 5
  var or = 1
  if (dis > 0) {
    or =
      Math.min((time / dis) * this.linePressure + this.lineMin, this.lineMax) /
      2
  }
  this.radius = or
  this.upof = of
  if (this.has.length < 1) return
  var len = Math.round(this.has[0].dis / 2) + 1
  for (var i = 0; i < len; i++) {
    var x = up.x + ((of.x - up.x) / len) * i
    var y = up.y + ((of.y - up.y) / len) * i
    var r = ur + ((or - ur) / len) * i
    this.ctx.beginPath()
    this.ctx.arc(x, y, r, 0, 2 * Math.PI, true)
    this.ctx.fill()
  }
}

Handwriting.prototype.clear = function (e) {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
}

Handwriting.prototype.distance = function (a, b) {
  var x = b.x - a.x
  var y = b.y - a.y
  return Math.sqrt(x * x + y * y)
}

// 获取事件对象在canvas内的坐标
Handwriting.prototype.getXY = function (e) {
  var eX = e.clientX || e.targetTouches[0].clientX
  var eY = e.clientY || e.targetTouches[0].clientY

  var left = this.offset.offsetLeft
  var top = this.offset.offsetTop
  return {
    x: eX - left,
    y: eY - top,
  }
}

var hw = new Handwriting('writing-canvas')
var nullBase64 = hw.canvas.toDataURL()
var writeResultEl = document.getElementById('writing-result')
var resultCanvas = document.createElement('canvas')
var resultCtx = resultCanvas.getContext('2d')

resultCanvas.width = 586
resultCanvas.height = 706

var bg = new Image()
bg.src = './img/font_bg.png'

document.getElementById('btn-rewrite').addEventListener('click', function () {
  document.addEventListener('touchmove', removeE, { passive: false })
  hw.clear()
  writeResultEl.setAttribute('src', '')
  writeResultEl.style.visibility = 'hidden'
  writeResultEl.style.zIndex = '-1'
})

document.getElementById('btn-next').addEventListener('click', function () {
  document.removeEventListener('touchmove', removeE)
  if (nullBase64 === hw.canvas.toDataURL()) {
    alert('请书写内容！')
    return
  }
  resultCtx.clearRect(0, 0, resultCanvas.width, resultCanvas.height)
  resultCtx.drawImage(bg, 0, 0)
  resultCtx.drawImage(hw.canvas, 16, 135, 500, 514)
  writeResultEl.setAttribute('src', resultCanvas.toDataURL())
  writeResultEl.style.visibility = 'visible'
  writeResultEl.style.zIndex = '999'
})
