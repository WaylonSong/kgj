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
import AccessariesModal from './AccessariesModal'
import HandleModal from './HandleModal'
const options = ['companyName', 'creditCode']

const resourceName = "application";
const TabPane = Tabs.TabPane

const Obj = (props) => {
  var {dispatch, loading, location } = props;
  var obj = props[resourceName];
  const { list, pagination, currentItem, modalVisible, accessariesModalVisible, handleModalVisible, modalType, isMotion, selectedRowKeys, itemIndexes } = obj
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

  const accessariesModalProps = {
    item: currentItem,
    visible: props[resourceName].accessariesModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects[resourceName+'/update'],
    title: '浏览附件',
    wrapresourceName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: resourceName+'/hideAccessariesModal',
      })
    },
    onCancel () {
      dispatch({
        type: resourceName+'/hideAccessariesModal',
      })
    },
  }

  const handleModalProps = {
    item: currentItem,
    visible: props[resourceName].handleModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects[resourceName+'/update'],
    title: '处理申请',
    wrapresourceName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: resourceName+'/handleResult',
        payload: data
      })
    },
    onCancel () {
      dispatch({
        type: resourceName+'/hideHandleModal',
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
    onEditItem (recordId, type) {
      dispatch({
        type: `${resourceName}/editItem`,
        payload: {
          modalType: type,
          currentItemId: recordId,
        },
      })
    },
    viewAccessaries (recordId) {
      dispatch({
        type: `${resourceName}/viewAccessaries`,
        payload: {
          currentItemId: recordId,
        },
      })
    },
    handleApplication(recordId) {
      dispatch({
        type: `${resourceName}/handleApplication`,
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
      {modalVisible && <Modal {...modalProps} />}
      {accessariesModalVisible && <AccessariesModal {...accessariesModalProps} />}
      {handleModalVisible && <HandleModal {...handleModalProps} />}
      <Tabs activeKey={activeKey} onTabClick={handleTabClick}>
        <TabPane tab="全部" key={""}>
          <List {...listProps} />
        </TabPane>
        <TabPane tab="未处理" key={'未处理'}>
          <List {...listProps} />
        </TabPane>
        <TabPane tab="处理中" key={'处理中'}>
          <List {...listProps} />
        </TabPane>
        <TabPane tab="已完成" key={'已完成'}>
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
