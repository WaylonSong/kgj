// import modelExtend from 'dva-model-extend'
// import { query } from 'services/posts'
// import { pageModel } from 'models/common'
// import queryString from 'query-string'
// 申请书
import { crudModelGenerator } from './common'
import { queryAll, query, queryById, deleteAll, create, remove, update } from 'services/crud'
const resourceName = "application"
const collectionName = "applications"
var application = crudModelGenerator(resourceName, collectionName)
application.effects['editItem'] = function *({ payload}, { call, put }){
  // payload.currentItemId
  const data = yield call(query, {id:payload.currentItemId}, `${collectionName}`)
  if(data){
    yield put({
        type: `showModal`,
        payload: {
          modalType: payload.modalType,
          currentItem: data,
        },
      })
  }
}
export default application


/*export default modelExtend(pageModel, {

  namespace: 'post',

  subscriptions: {
    setup ({ dispatch, history }) {
      console.log(location);
      history.listen((location) => {
        if (location.pathname === '/post') {
          dispatch({ type: 'query',
            payload: {
              status: 2,
              ...queryString.parse(location.search),
            } })
        }
      })
    },
  },

  effects: {
    * query ({
      payload,
    }, { call, put }) {
      const data = yield call(query, payload)
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      } else {
        throw data
      }
    },
  },
})*/
