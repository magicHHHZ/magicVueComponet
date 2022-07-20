/**
 * 一个包含N个间接数据更新方法的对象
 */
import axios from 'axios'
import { 
  REQUESTING,
  REQ_SUCCESS,
  REQ_ERROR
 } from "./mutations-type";
export default {
  // 搜索的异步action:包含了异步代码的action
  async search({commit},searchName){
    // 在发请求前,提交请求中的mutation
    commit(REQUESTING)
    // 发异步ajax请求获取数据
  try{const response = await axios('https://api.github.com/search/users',{params:{q:searchName}})
    //如果成功了,提交请求成功的mutation
      const result = response.data
      const users = result.items.map(item => ({
        userName : item.login,
        url: item.html_url,
        avatar_url: item.avatar_url
      }))
      commit(REQ_SUCCESS,users)
      
      }
      catch(error) {
            // 如果失败了,提交请求失败的mutation
        commit(REQ_ERROR, error.message)
      }
    

    
  }
}