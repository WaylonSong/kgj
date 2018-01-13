import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm,Input } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
const Search = Input.Search


const User = ({ location, dispatch, loading }) => {
  return (
            <Search placeholder="搜索" style={{ width: '70%' }} size="large" />
  )
}


export default connect(({ loading }) => ({ loading }))(User)
