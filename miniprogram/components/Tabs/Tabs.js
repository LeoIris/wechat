// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      tabs:{
        type:Array,
        value:[]
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleitemtap:function(e){
      // console.log(e.target.dataset)
      const { index } = e.target.dataset
      // console.log({ index }, index) //{index: 1} 1

      // 触发父组件中的事件 自定义
      this.triggerEvent("tabsitemchange",index)
    }
  }
})
