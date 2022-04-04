// 创建 store 对象
import { createStore, applyMiddleware } from "redux";
// 引入 reducer
import searchReducer from './searchReducer'
import thunk from 'redux-thunk';
// 使用中间件
export default createStore(searchReducer, applyMiddleware(thunk));