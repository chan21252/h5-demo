// 加载素材
import {
  p1Arr,
  p2Arr,
  p2Arr2,
  p3Arr,
  p4Arr,
  p5Arr,
  scene1Object,
  scene2Object,
  scene3Object,
  scene4Object,
  spriteGroupBgObject,
  spriteGroupLastObject
} from "./data.js"

PIXI.loader
    .add(p1Arr)
    .add(p2Arr)
    .add(p2Arr2)
    .add(p3Arr)
    .add(p4Arr)
    .add(p5Arr)
    .on("progress", function (loader, resource) {
      console.log(loader.progress)
    })
    .load(setup)

let app = null

function setup() {
  app = new PIXI.Application({
    width: 750,
    height: 1448
  })

  document.getElementById('stage').appendChild(app.view)

  let spriteGroupBg = new PIXI.Container()
  spriteGroupBg.position.set(0, 0)
  spriteGroupBg.name = 'spriteGroupBg'
  app.stage.addChild(spriteGroupBg)

  let spriteGroupScenes = new PIXI.Container()
  spriteGroupScenes.position.set(0, 0)
  spriteGroupScenes.name = 'spriteGroupScenes'
  app.stage.addChild(spriteGroupScenes)

  let scene1 = new PIXI.Container()
  scene1.position.set(1784, 621)
  scene1.pivot.set(1784, 621)
  scene1.name = 'scene1'

  let scene2 = new PIXI.Container()
  scene2.position.set(1773, 0)
  scene2.alpha = 0
  scene2.name = 'scene2'

  let scene3 = new PIXI.Container()
  scene3.position.set(4906, 0)
  scene3.name = 'scene3'

  let scene4 = new PIXI.Container()
  scene4.position.set(7902, 0)
  scene4.name = 'scene4'

  spriteGroupScenes.addChild(scene1)
  spriteGroupScenes.addChild(scene2)
  spriteGroupScenes.addChild(scene3)
  spriteGroupScenes.addChild(scene4)

  let spriteGroupLast = new PIXI.Container()
  spriteGroupLast.position.set(-203, 0)
  spriteGroupLast.name = "spriteGroupLast"
  app.stage.addChild(spriteGroupLast)

  let spritesObject = []
  spritesObject.push(...spriteGroupBgObject)
  spritesObject.push(...scene1Object)
  spritesObject.push(...scene2Object)
  spritesObject.push(...scene3Object)
  spritesObject.push(...scene4Object)
  spritesObject.push(...spriteGroupLastObject)

  for (let sprite of spritesObject) {
    addSpriteToGroup(sprite)
  }

  // touchAction()
  scrollAction()
  tweenAction()
}

function addSpriteToGroup(spriteObject) {
  let {img, x, y, alpha, sprName, sprGroup} = spriteObject
  let sprite = PIXI.Sprite.from(img)
  sprite.position.set(x, y)
  sprite.alpha = alpha
  sprite.name = sprName

  let groupArr = sprGroup.split('/')
  let spriteGroup = app.stage.getChildByName(groupArr[0])
  if (groupArr.length > 1) {
    for (let i = 1; i < groupArr.length; i++) {
      spriteGroup = spriteGroup.getChildByName(groupArr[i])
    }
  }
  spriteGroup.addChild(sprite)
}

/*************************** 滑动绑定 BEGIN ****************************/
const maxLong = -(10800 - 750) // 设计稿总长度 - 一屏宽度
function touchAction() {
  const phyTouch = new PhyTouch({
    touch: 'body',
    vertical: true,
    target: {y: 0},
    property: "y",
    step: 50,
    min: maxLong,
    max: 0,
    bindSelf: false,
    maxSpeed: 0.8,
    value: 0,
    change: function (value) {
      let progress = value / maxLong
      if (value > maxLong && value <= 0) {

      }
      allTimeline.seek(progress)
      animationPlay(progress)
      console.log(value)
    }
  })
}

function scrollAction() {
  ScrollTrigger.create({
    trigger: '#stage canvas',
    start: 'left left',
    horizontal: true,
    end: '+=10800',
    onUpdate: (self) => {
      console.log(self.progress)
    }
  })
}


/*************************** 滑动绑定 END ****************************/

/*************************** 时间轴动画 BEGIN ****************************/
const allTimeline = new TimelineMax({paused: true})

function tweenAction() {
  const scenes = app.stage.getChildByName('spriteGroupScenes')
  const scenesTimeline = new TimelineMax({delay: 0})
  const sceneTween = new TweenMax(scenes.position, 1, {x: maxLong})
  scenesTimeline.add(sceneTween)
  allTimeline.add(scenesTimeline, 0)

  let scene1 = scenes.getChildByName('scene1')
  // 星星显现 spriteGroupScenes/scene1/p1Star
  let star = scene1.getChildByName('p1Star')
  let starStartTime = -15 / maxLong
  let starDuration = -25 / maxLong
  let starTimeline = new TimelineMax({delay: starStartTime})
  let starTween = TweenMax.to(star, starDuration, {alpha: 1})
  scenesTimeline.add(starTween, 0)
  allTimeline.add(starTimeline, 0)

  // 房子放大
  let house = scene1
  let houseStartTime = -600 / maxLong
  let houseDuration = -200 / maxLong
  let houseTimeline = new TimelineMax({delay: houseStartTime})
  let houseTween = TweenMax.to(house.scale, houseDuration, {x: 3, y: 3})
  let houseTween2 = TweenMax.to(house, houseDuration, {alpha: 0})
  houseTimeline.add(houseTween, 0)
  houseTimeline.add(houseTween2, 0)
  scenesTimeline.add(houseTimeline, 0)

  let scene2 = app.stage.getChildByName('spriteGroupScenes').getChildByName('scene2')
  let scene2StartTime = -680 / maxLong
  let scene2Duration = -100 / maxLong
  let scene2Timeline = new TimelineMax({delay: scene2StartTime})
  let scene2Tween = TweenMax.to(scene2, scene2Duration, {alpha: 1})
  scene2Timeline.add(scene2Tween, 0)
  allTimeline.add(scene2Timeline, 0)

  // 音符向右飘动
  let yinfu = getSpriteNamespace('spriteGroupScenes/scene2/p2Yinfu')
  let yinfuStartTime = -2440 / maxLong
  let yinfuDuration = -100 / maxLong
  let yinfuTimeline = new TimelineMax({delay: yinfuStartTime})
  let yinfuTween = TweenMax.to(yinfu.position, yinfuDuration, {x: 3400, y: 300})
  let yinfuTween2 = TweenMax.to(yinfu, yinfuDuration, {alpha: 0})
  yinfuTimeline.add(yinfuTween, 0)
  yinfuTimeline.add(yinfuTween2, 0)
  allTimeline.add(yinfuTimeline, 0)

  // 黑夜缩小到窗户
  let night = getSpriteNamespace('spriteGroupScenes/scene3/p32')
  let nightStartTime = -2580 / maxLong
  let nightDuration = -800 / maxLong
  let nightTimeline = new TimelineMax({delay: nightStartTime})
  let nightTween = TweenMax.from(night.scale, nightDuration, {x: 5, y: 5})
  let nightTween2 = TweenMax.from(night.position, nightDuration, {x: 0, y: -20})
  nightTimeline.add(nightTween, 0)
  nightTimeline.add(nightTween2, 0)
  allTimeline.add(nightTimeline, 0)

  // 写作业的孩子出现
  let boyWorking = getSpriteNamespace('spriteGroupScenes/scene3/p31')
  let boyWorkingStartTime = -2780 / maxLong
  let boyWorkingDuration = -600 / maxLong
  let boyWorkingTimeline = new TimelineMax({delay: boyWorkingStartTime})
  let boyWorkingTween = TweenMax.to(boyWorking, boyWorkingDuration, {alpha: 1})
  boyWorkingTimeline.add(boyWorkingTween, 0)
  allTimeline.add(boyWorkingTimeline, 0)

  // 旋涡显示
  let xn = app.stage.getChildByName('spriteGroupLast').getChildByName('bgLast')
  let xnStartTime = -6610 / maxLong
  let xnDuringTime = -50 / maxLong
  let xnTimeline = new TimelineMax({delay: xnStartTime})
  let xnTween = TweenMax.to(xn, xnDuringTime, {alpha: 1})
  xnTimeline.add(xnTween, 0)
  allTimeline.add(xnTimeline, 0)
}


/*************************** 时间轴动画 END ****************************/

/*************************** 序列帧动画 BEGIN ****************************/
function animationPlay(progress) {

  // 孩子序列帧动画
  let childStartTime = -900 / maxLong
  let childDuration = -1300 / maxLong
  let childNum = p2Arr2.length
  if (progress > childStartTime) {
    let index = Math.floor(childNum * (progress - childStartTime) / childDuration)
    if (index >= 0 && index < childNum) {
      let child = getSpriteNamespace('spriteGroupScenes/scene2/p2Child')
      child.texture = PIXI.Texture.fromImage(p2Arr2[index])
    }
  }

  // 旋涡动画
  let xuanStartTime = -6610 / maxLong
  let xuanDuration = -2000 / maxLong
  let xuanNum = p5Arr.length
  if (progress > xuanStartTime) {
    let index = Math.floor(xuanNum * (progress - xuanStartTime) / xuanDuration)
    if (index >= 0 && index < xuanNum) {
      let xuan = getSpriteNamespace('spriteGroupLast/bgLast')
      xuan.texture = PIXI.Texture.fromImage(p5Arr[index])
    }
  }
}

/*************************** 序列帧动画 END ****************************/

function getSpriteNamespace(namespace) {
  if (typeof namespace === 'undefined' && namespace.length === 0) {
    return null
  }
  let nameArr = namespace.split('/')
  let sprite = app.stage.getChildByName(nameArr[0])
  if (nameArr.length > 1) {
    for (let i = 1; i < nameArr.length; i++) {
      sprite = sprite.getChildByName(nameArr[i])
    }
  }
  return sprite
}
