let p1Arr=[
  './images/bg.jpg', //0
  './images/ewm.png',
  './images/logo.png',
  './images/musicoff.png',
  './images/musicon.png',
  './images/p1-bg.png', //5
  './images/p1-cloud1.png',
  './images/p1-cloud2.png',
  './images/p1-grass1.png',
  './images/p1-grass2.png',
  './images/p1-house.png', //10
  './images/p1-p1.png',
  './images/p1-star.png',
  './images/p1-tree.png'
]

let p2Arr=[
  './images/p2-1.png', //0
  './images/p2-boy.png',
  './images/p2-huati.png',
  './images/p2-lotsofyinfu.png',
  './images/p2-mother.png',
  './images/p2-school.png', //5
  './images/p2-shitou.png',
  './images/p2-tree4.png',
  './images/p2-wutai.png',
  './images/p2-yinfu.png'
]

let p2Arr2=[]
for(let i1=1;i1<=34;i1++){
  let temp='./images/w'+i1+'.png'
  p2Arr2.push(temp)
}

let p3Arr=[
  './images/p3-1.png',
  './images/p3-2.png',
  './images/p3-3.png',
  './images/p3-childbirth.png',
]

let p4Arr=[
  './images/p4-1.png',
  './images/p4-bg.png',
  './images/p4-house3.png',
  './images/p4-start.png',
]

let p5Arr=[]
for(let i2=1;i2<=52;i2++){
  let temp2='./images/x'+i2+'.png'
  p5Arr.push(temp2)
}

export { p1Arr, p2Arr, p2Arr2, p3Arr, p4Arr, p5Arr }

//spriteGroupBg
let spriteGroupBgObject=[
  {
    'img':p1Arr[0],
    'x':0,
    'y':0,
    'alpha':1,
    'sprName':'bgSpr',
    'sprGroup':'spriteGroupBg'
  }
]

//spriteGroupScenes  (scene1-scene4)
let scene1Object=[
  {
    'img':p1Arr[5],
    'x':0,
    'y':0,
    'alpha':1,
    'sprName':'p1Bg',
    'sprGroup':'spriteGroupScenes/scene1'
  },
  {
    'img':p1Arr[6],
    'x':-20,
    'y':177,
    'alpha':1,
    'sprName':'p1Cloud1',
    'sprGroup':'spriteGroupScenes/scene1'
  },
  {
    'img':p1Arr[7],
    'x':725,
    'y':0,
    'alpha':1,
    'sprName':'p1Cloud2',
    'sprGroup':'spriteGroupScenes/scene1'
  },
  {
    'img':p1Arr[10],
    'x':732,
    'y':0,
    'alpha':1,
    'sprName':'p1House',
    'sprGroup':'spriteGroupScenes/scene1'
  },
  {
    'img':p1Arr[12],
    'x':424,
    'y':419,
    'alpha':0,
    'sprName':'p1Star',
    'sprGroup':'spriteGroupScenes/scene1'
  },
  {
    'img':p1Arr[9],
    'x':836,
    'y':1161,
    'alpha':1,
    'sprName':'p1Grass2',
    'sprGroup':'spriteGroupScenes/scene1'
  },
  {
    'img':p1Arr[8],
    'x':0,
    'y':1093,
    'alpha':1,
    'sprName':'p1Grass1',
    'sprGroup':'spriteGroupScenes/scene1'
  },
  {
    'img':p1Arr[11],
    'x':996,
    'y':600,
    'alpha':1,
    'sprName':'p1P1',
    'sprGroup':'spriteGroupScenes/scene1'
  },
  {
    'img':p1Arr[13],
    'x':-20,
    'y':604,
    'alpha':1,
    'sprName':'p1Tree',
    'sprGroup':'spriteGroupScenes/scene1'
  },
]

let scene2Object=[
  {
    'img':p2Arr[5],
    'x':613,
    'y':31,
    'alpha':1,
    'sprName':'p2School',
    'sprGroup':'spriteGroupScenes/scene2'
  },
  {
    'img':p2Arr[2],
    'x':1298,
    'y':414,
    'alpha':1,
    'sprName':'p2Huati',
    'sprGroup':'spriteGroupScenes/scene2'
  },
  {
    'img':p2Arr[1],
    'x':1508,
    'y':262,
    'alpha':1,
    'sprName':'p2Boy',
    'sprGroup':'spriteGroupScenes/scene2'
  },
  {
    'img':p2Arr[0],
    'x':0,
    'y':816,
    'alpha':1,
    'sprName':'p21',
    'sprGroup':'spriteGroupScenes/scene2'
  },
  {
    'img':p2Arr[4],
    'x':144,
    'y':768,
    'alpha':1,
    'sprName':'p2Mother',
    'sprGroup':'spriteGroupScenes/scene2'
  },
  {
    'img':p2Arr[6],
    'x':1200,
    'y':1149,
    'alpha':1,
    'sprName':'p2Shitou',
    'sprGroup':'spriteGroupScenes/scene2'
  },
  {
    'img':p2Arr[7],
    'x':1932,
    'y':49,
    'alpha':1,
    'sprName':'p2Tree4',
    'sprGroup':'spriteGroupScenes/scene2'
  },
  {
    'img':p2Arr[8],
    'x':2243,
    'y':349,
    'alpha':1,
    'sprName':'p2Wutai',
    'sprGroup':'spriteGroupScenes/scene2'
  },
  {
    'img':p2Arr[9],
    'x':3009,
    'y':273,
    'alpha':1,
    'sprName':'p2Yinfu',
    'sprGroup':'spriteGroupScenes/scene2'
  },
  {
    'img':p2Arr[3],
    'x':1932,
    'y':307,
    'alpha':1,
    'sprName':'p2Lotsofyinfu',
    'sprGroup':'spriteGroupScenes/scene2'
  },
  {
    'img':p2Arr2[0],
    'x':0,
    'y':0,
    'sprName':'p2Child',
    'alpha':1,
    'sprGroup':'spriteGroupScenes/scene2'
  },
]

let scene3Object=[
  {
    'img':p3Arr[1],
    'x':826,
    'y':142,
    'sprName':'p32',
    'alpha':1,
    'sprGroup':'spriteGroupScenes/scene3'
  },
  {
    'img':p3Arr[0],
    'x':0,
    'y':80,
    'sprName':'p31',
    'alpha':0,
    'sprGroup':'spriteGroupScenes/scene3'
  },
  {
    'img':p3Arr[2],
    'x':971,
    'y':24,
    'alpha':1,
    'sprName':'p33',
    'sprGroup':'spriteGroupScenes/scene3'
  },
  {
    'img':p3Arr[3],
    'x':2397,
    'y':453,
    'alpha':1,
    'sprName':'p3Childbirth',
    'sprGroup':'spriteGroupScenes/scene3'
  },
]

let scene4Object=[
  {
    'img':p4Arr[0],
    'x':691,
    'y':529,
    'alpha':1,
    'sprName':'p41',
    'sprGroup':'spriteGroupScenes/scene4'
  },
  {
    'img':p4Arr[1],
    'x':588,
    'y':0,
    'alpha':1,
    'sprName':'p4Bg',
    'sprGroup':'spriteGroupScenes/scene4'
  },
  {
    'img':p4Arr[2],
    'x':0,
    'y':0,
    'alpha':1,
    'sprName':'p2House3',
    'sprGroup':'spriteGroupScenes/scene4'
  },
  {
    'img':p4Arr[3],
    'x':1398,
    'y':0,
    'alpha':1,
    'sprName':'p2Start',
    'sprGroup':'spriteGroupScenes/scene4'
  },
]



//spriteGroupLast
let spriteGroupLastObject=[
  {
    'img':p5Arr[0],
    'x':0,
    'y':0,
    'alpha':0,
    'sprName':'bgLast',
    'sprGroup':'spriteGroupLast'
  }
]

export { spriteGroupBgObject,scene1Object,scene2Object,scene3Object,scene4Object,spriteGroupLastObject }
