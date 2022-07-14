(function (window) {
  // 定义eventBus对象
  const eventBus={}
  // 数据存储格式
  /*
  {
    add:[atguigu,atguigu],
    delete:[atguigu]
    
  }
  */
  //用来保存所有监听函数的容器
    let listenerContainer = {}
  // 1.on(eventName,listener):绑定事件监听
  eventBus.on = function (eventName,listener) {
    // 得到监听函数的小容器
    let listeners = listenerContainer[eventName]
    // 如果有直接往里面push添加
    if (listeners) {
      listeners.push(listener)
    }else{
      // 
      listenerContainer[eventName] = [listener]
      // console.log()
      
    }
  }
  // 2.emit(eventName,data):分发事件

  eventBus.emit = function (eventName,data) {
     // 得到监听函数的小容器
     let listeners = listenerContainer[eventName]
    //  判断容器存在,并且容器里面有值
     if (listeners && listeners.length>0) {
      listeners.forEach(listener => {
        listener(data)
      });
     }
  }
  // 3.off(eventName):移除事件监听
  eventBus.off = function (eventName) {
    if (eventName === undefined) {
      listenerContainer = {}
    }else{
      delete listenerContainer[eventName]
    }
  }
  // 向外暴露eventbus
  window.eventBus = eventBus
})(window)