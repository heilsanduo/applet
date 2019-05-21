// components/Iou/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideBaitiao:{
      type:Boolean,
      value:true
    },
    baitiao: {
      type:Array
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 将index的值存到这里，方便调用
    selectIndex : 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击X的时候，隐藏弹窗
    hideBaitiaoView(e) {
      if(e.target.dataset.target == "self"){
        this.setData({
          hideBaitiao:true
        })
      }
    },
    selectItem(e) {
      // 从接受的数据中获取绑定的index
      let index = e.currentTarget.dataset.index;
      // 从接受的数据中获取baitiao的全部数据
      let baitiao = this.data.baitiao;
      // 遍历baitiao的所有数据，使白条的select全部为false
      for(let i = 0; i< baitiao.length; i++){
        baitiao[i].select = false;
      }
      // 使当前点击的分期取反
      baitiao[index].select = !baitiao[index].select;
      this.setData({
        baitiao:baitiao,
        selectIndex:index
      })
    },
    // 点击打白条的时候，更改数据hideBaitiao，hideBaitiao为真时，使弹窗关闭
    makeBaitiao() {
      this.setData({
        hideBaitiao:true
      })
      // 拿到当前点击的数据
      const selectItem = this.data.baitiao[this.data.selectIndex];
      // 注册组件，传递数据给父级
      this.triggerEvent("updateSelect",selectItem)
    }
  }
})
