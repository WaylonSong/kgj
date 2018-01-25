import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm, Tabs } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
const options = ['province']

const resourceName = "statistics";
const TabPane = Tabs.TabPane

const Obj = (props) => {
  var {dispatch, loading, location } = props;
  var obj = props[resourceName];
  const { list, pagination, isMotion } = obj
  const { pageSize } = pagination
  const { pathname } = location
  const query = queryString.parse(location.search);
  
  
  const listProps = {
    resourceName,
    dataSource: list,
    loading: loading.effects[`${resourceName}/query`],
    pagination,
    location,
    isMotion,
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
  return (
    <Page inner>
      <Filter {...filterProps} />
      <List {...listProps} />
    </Page>
  )
}
Obj.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ statistics, loading }) => ({ statistics, loading }))(Obj)
