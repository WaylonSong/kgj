import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm, Tabs } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import ArtificialModal from './ArtificialModal'
import AccessoriesModal from './AccessoriesModal'
import AcceptModal from './AcceptModal'
import WrittenModal from './WrittenModal'
const options = ['companyName', 'creditCode']

const resourceName = "application";
const TabPane = Tabs.TabPane

const Obj = (props) => {
  var {dispatch, loading, location } = props;
  var obj = props[resourceName];
  const { list, pagination, currentItem, modalVisible, artificialModalVisible, artificialModalType, accessoriesModalVisible, acceptModalVisible, writtenModalVisible, modalType, isMotion, selectedRowKeys, itemIndexes } = obj
  const { pageSize } = pagination
  const { pathname } = location
  const query = queryString.parse(location.search);
  
  const modalProps = {
    item: currentItem,
    visible: props[resourceName].modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects[resourceName+'/update'],
    modalType: props[resourceName].modalType,
    title: '申请表详情',
    wrapresourceName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `${resourceName}/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: resourceName+'/hideModal',
      })
    },
  }

  const artificialModalProps = {
    item: artificialModalType=="post"?{}:currentItem,
    visible: props[resourceName].artificialModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects[resourceName+'/update'],
    title: '人工填报申请表',
    type: artificialModalType,
    wrapresourceName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: resourceName+'/create',
        payload: data
      })
    },
    onCancel () {
      dispatch({
        type: resourceName+'/hideArtificialModal',
      })
    },
  }

  const accessoriesModalProps = {
    item: currentItem,
    visible: props[resourceName].accessoriesModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects[resourceName+'/update'],
    title: '浏览附件',
    wrapresourceName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: resourceName+'/hideAccessoriesModal',
      })
    },
    onCancel () {
      dispatch({
        type: resourceName+'/hideAccessoriesModal',
      })
    },
  }

  const acceptModalProps = {
    item: currentItem,
    visible: props[resourceName].acceptModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects[resourceName+'/update'],
    title: '受理审查处理',
    wrapresourceName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: resourceName+'/handleAcceptResult',
        payload: data
      })
    },
    onCancel () {
      dispatch({
        type: resourceName+'/hideAcceptModal',
      })
    },
  }
  const writtenModalProps = {
    item: currentItem,
    visible: props[resourceName].writtenModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects[resourceName+'/update'],
    title: '书面审查处理',
    wrapresourceName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: resourceName+'/handleWrittenResult',
        payload: data
      })
    },
    onCancel () {
      dispatch({
        type: resourceName+'/hideWrittenModal',
      })
    },
  }
  
  const listProps = {
    resourceName,
    dataSource: list,
    loading: loading.effects[`${resourceName}/query`],
    pagination,
    location,
    isMotion,
    onChange (page) {
      dispatch(routerRedux.push({
        pathname,
        search: queryString.stringify({
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        }),
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: `${resourceName}/delete`,
        payload: id,
      })
    },
    onEditItem (record, type) {
      if(record.source == "导入"){
        dispatch({
          type: `${resourceName}/editItem`,
          payload: {
            modalType: type,
            currentItemId: record.id,
          },
        })
      }else{
        dispatch({
          type: `${resourceName}/editItem`,
          payload: {
            modalType: 'put',
            currentItemId: record.id,
          },
        })
      }
    },
    viewAccessories (recordId) {
      dispatch({
        type: `${resourceName}/viewAccessories`,
        payload: {
          currentItemId: recordId,
        },
      })
    },
    handleAccept(recordId) {
      dispatch({
        type: `${resourceName}/handleAccept`,
        payload: {
          currentItemId: recordId,
        },
      })
    },
    handleWritten(recordId) {
      dispatch({
        type: `${resourceName}/handleWritten`,
        payload: {
          currentItemId: recordId,
        },
      })
    }
  }
  const handleTabClick = (key) => {
    var routes = {
      pathname,
      search: queryString.stringify({...query, status:key, page:1}),
      // query: ({status:key}),
    }
    dispatch(routerRedux.push(routes))
  }
  
  const filterProps = {
    listRefresh(){
      dispatch({
        type: `${resourceName}/listRefresh`,
      })
    },
    addItem(){
      dispatch({
        type: `${resourceName}/createArtificialModal`,
      })
    },
    onFilterChange (fields) {
      var params = {...query}
      for(var i in options){
        delete params[options[i]]
      }
      if(typeof(fields['field'])!='undefined')
        params[fields['field']] = fields['value']
      delete fields['field']
      delete fields['value']
      params = {...params, page:1, ...fields, pageSize }
      dispatch(routerRedux.push({
        search: queryString.stringify(params)
      }))
    },
  }


  var activeKey = query.status||'';
  const parsed = queryString.parse(location.search);
  return (
    <Page inner>
      <Filter {...filterProps} />
      {artificialModalVisible && <ArtificialModal {...artificialModalProps} />}
      {modalVisible && <Modal {...modalProps} />}
      {accessoriesModalVisible && <AccessoriesModal {...accessoriesModalProps} />}
      {acceptModalVisible && <AcceptModal {...acceptModalProps} />}
      {writtenModalVisible && <WrittenModal {...writtenModalProps} />}
      <Tabs activeKey={activeKey} onTabClick={handleTabClick}>
        <TabPane tab="全部" key={""}>
          <List {...listProps} />
        </TabPane>
        <TabPane tab="未处理" key={'未处理'}>
          <List {...listProps} />
        </TabPane>
        <TabPane tab="受理中" key={'受理'}>
          <List {...listProps} />
        </TabPane>
        <TabPane tab="不受理" key={'不受理'}>
          <List {...listProps} />
        </TabPane>
        <TabPane tab="通过" key={'通过'}>
          <List {...listProps} />
        </TabPane>
        <TabPane tab="未通过" key={'未通过'}>
          <List {...listProps} />
        </TabPane>
      </Tabs>
    </Page>
  )
}
Obj.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ application, loading }) => ({ application, loading }))(Obj)
