// pages/decode/decode.js
var i = require('../../utils/iching.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    image:'',
    result:'',
    windowW:'',
    windowH:'',
    w:'',
    h:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowW: 150,
          windowH: res.windowHeight
        
        })
      },
    })


  },
  canvasDraw: function (e) {


  },

  getImage(type = 'camera') { //选取图片
    const that = this
    wx.chooseImage({
      sizeType: ['compressed'], //original 原图，compressed 压缩图
      c: ['album', 'camera'],//album 从相册选图，camera 使用相机
      success(res) {
        const image = res.tempFiles[0]
        console.log(image)
        wx.getImageInfo({
          src: image.path,
          success(img){
            that.setData({
              w: img.w,
              h: img.h

            })
          
        }})


        const ctx = wx.createCanvasContext('Canvas1', )
        ctx.drawImage(image.path, 0, 0, 200, 200 * that.data.h / that.data.w);

        ctx.draw(false, function () {
          //回调方法
          console.log('decoding')
          wx.canvasGetImageData({
            canvasId: 'Canvas1',
            x: 0,
            y: 0,
            width: 200,
            height: 200 * that.data.h / that.data.w,
            success(a) {
              console.log(a.width) // 100
              console.log(a.height) // 100
              console.log(a.data) // true
              console.log(a.data.length)
              var d = i.decode(a.data, 200, 200 * that.data.h / that.data.w)// 100 * 100 * 4
              that.setData({
                result: d.data,
              })
            },
            fail(a) {
              console.log('wtf')
            }
          })
        })
      
      },
      

      
    })

    
  },
getDecode(){

},


  handleCamera() {
    this.getImage()
//拍照
  },
  // 因为我在 wx.chooseImage 那的 wx.chooseImage 两个都选择了，所以无论是点击还是长按，都是可以拍照和从相册选图的
  handleChoose() {
    this.getImage('album')
//选取照片
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    if (this.data.result) {
      return { title: `` }
    }
  },
  handleDecode(){
    console.log('decoding')
    const that = this
    wx.canvasGetImageData({
      canvasId: 'Canvas1',
      x: 0,
      y: 0,
      width: 200,
      height: 200,
      success(a) {
        console.log(a.width) // 100
        console.log(a.height) // 100
        console.log(a.data) // true
        console.log(a.data.length)
        var d = i.decode(a.data, 200, 200)// 100 * 100 * 4
        that.setData({
          result: d.data,
        })
      },
      fail(a) {
        console.log('wtf')
      }
    })
  }
  
})
