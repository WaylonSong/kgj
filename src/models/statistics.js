// import modelExtend from 'dva-model-extend'
// import { query } from 'services/posts'
// import { pageModel } from 'models/common'
// import queryString from 'query-string'
// 申请书
import { crudModelGenerator } from './common'
import { queryAll, query, queryById, remove, update } from 'services/crud'
const resourceName = "statistics"
const collectionName = "statistics"
var statistics = crudModelGenerator(resourceName, collectionName)
//redux-saga 处理异步请求
statistics.effects['listRefresh'] = function *({ payload}, { call, put }){
  // payload.currentItemId
  yield put({ type: 'query' })
}
export default statistics
