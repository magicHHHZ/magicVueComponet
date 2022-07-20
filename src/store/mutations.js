/**
 * 一个包含N个直接更新数据的方法的对象模块
 * 不要包含逻辑处理和异步代码
 */

 import { 
  REQUESTING,
  REQ_SUCCESS,
  REQ_ERROR
 } from "./mutations-type";
 
export default {
  [REQUESTING](state){
    // 请求中
    state.firstView = false,
    state.loading = true
  },
  //请求成功
  [REQ_SUCCESS](state,users){
    state.loading = false
    state.users = users
  },
  // 请求失败
  [REQ_ERROR](state,errorMsg){
    state.loading = false
    state.errorMsg = errorMsg
  }
}