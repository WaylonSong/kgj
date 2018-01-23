// import modelExtend from 'dva-model-extend'
// import { query } from 'services/posts'
// import { pageModel } from 'models/common'
// import queryString from 'query-string'
// 申请书
import { crudModelGenerator } from './common'
import { queryAll, query, queryById, remove, update,  } from 'services/crud'
import { handleWrittenResult, handleAcceptResult } from 'services/application'
const resourceName = "application"
const collectionName = "applications"
var application = crudModelGenerator(resourceName, collectionName)
//redux-saga 处理异步请求
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

application.effects['create'] = function *({ payload}, { call, put }){
  // payload.currentItemId
  const data = yield call(create, payload, collectionName)
  if (data.success) {
    yield put({ type: 'hideModal' })
    yield put({ type: 'hideArtificialModal' })
    yield put({ type: 'query' })
  } else {
    throw data
  }
} 

application.reducers['showAccessoriesModal'] = function (state, { payload }){
  // payload.currentItemId
  return { ...state, ...payload, accessoriesModalVisible: true }
} 
application.reducers['hideAccessoriesModal'] = function (state, { payload }){
  // payload.currentItemId
  return { ...state, ...payload, accessoriesModalVisible: false }
}    

application.reducers['createArtificialModal'] = function (state, { payload }){
  // payload.currentItemId
  return { ...state, ...payload, artificialModalVisible: true, artificialModalType: "post" }
} 
application.reducers['editArtificialModal'] = function (state, { payload }){
  // payload.currentItemId
  return { ...state, ...payload, artificialModalVisible: true, artificialModalType: "edit" }
} 
application.reducers['hideArtificialModal'] = function (state, { payload }){
  // payload.currentItemId
  return { ...state, ...payload, artificialModalVisible: false }
}  

application.effects['viewAccessories'] = function *({ payload}, { call, put }){
  // payload.currentItemId
  const data = yield call(query, {id:payload.currentItemId}, `${collectionName}`)
  if(data){
    yield put({
        type: `showAccessoriesModal`,
        payload: {
          currentItem: data,
        },
      })
  }
}

application.reducers['showAcceptModal'] = function (state, { payload }){
  // payload.currentItemId
  return { ...state, ...payload, acceptModalVisible: true }
} 
application.reducers['showWrittenModal'] = function (state, { payload }){
  // payload.currentItemId
  return { ...state, ...payload, writtenModalVisible: true }
} 

application.reducers['hideAcceptModal'] = function (state, { payload }){
  // payload.currentItemId
  return { ...state, ...payload, acceptModalVisible: false }
}

application.reducers['hideWrittenModal'] = function (state, { payload }){
  // payload.currentItemId
  return { ...state, ...payload, writtenModalVisible: false }
} 

application.effects['handleAccept'] = function *({ payload}, { call, put }){
  // payload.currentItemId
  const data = yield call(query, {id:payload.currentItemId}, `${collectionName}`)
  if(data){
    yield put({
        type: `showAcceptModal`,
        payload: {
          currentItem: data,
        },
    })
  }
}

application.effects['handleAcceptResult'] = function *({ payload}, { call, put }){
  // payload.currentItemId
  console.log('handleResult')
  console.log(payload);
  const data = yield call(handleAcceptResult, payload)
  yield put({ type: `hideAcceptModal`})
  yield put({ type: 'query' })
}

application.effects['handleWritten'] = function *({ payload}, { call, put }){
  // payload.currentItemId
  const data = yield call(query, {id:payload.currentItemId}, `${collectionName}`)
  if(data){
    yield put({
        type: `showWrittenModal`,
        payload: {
          currentItem: data,
        },
      })
  }
}

application.effects['handleWrittenResult'] = function *({ payload}, { call, put }){

  // payload.currentItemId
  console.log('handleResult')
  console.log(payload);
  const data = yield call(handleWrittenResult, payload)
  yield put({ type: `hideWrittenModal`})
  yield put({ type: 'query' })
}



application.effects['listRefresh'] = function *({ payload}, { call, put }){
  // payload.currentItemId
  yield put({ type: 'query' })
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
