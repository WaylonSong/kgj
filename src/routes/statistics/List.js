import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import moment from 'moment'
import styles from './List.less'

const confirm = Modal.confirm
const List = ({ resourceName, isMotion, location, ...tableProps }) => {
  location.query = queryString.parse(location.search)
  const columns = [
    {
      title: '省份/直辖市',
      dataIndex: 'province',
      key: 'province',
      width: 80,
    }, {
      title: '申请总数',
      dataIndex: 'total',
      width: 100,
      key: 'total',
      render: (text) => <span>{text}</span>,
    }, {
      title: '受理数量',
      dataIndex: 'accepted',
      width: 100,
      key: 'accepted',
      render: (text) => <span>{text}</span>,
    }, {
      title: '不受理数量',
      dataIndex: 'unaccepted',
      width: 100,
      key: 'unaccepted',
      render: (text) => <span>{text}</span>,
    }, {
      title: '通过数量',
      dataIndex: 'passed',
      width: 100,
      key: 'passed',
      render: (text) => <span>{text}</span>,
    }, {
      title: '未通过数量',
      dataIndex: 'unpassed',
      width: 100,
      key: 'unpassed',
      render: (text) => <span>{text}</span>,
    }
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = (body) => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 800 }}
        columns={columns}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
        size='small'
      />
      <ul style={{height:20}}>
        <li style={{float:'left',marginRight:20}}><i style={{display:'inline-block',borderRadius:3,position:'relative',top:3,width:30,height:15,backgroundColor:"#CCD0FF",marginRight:5}}></i>工作到期前3-5天</li>
        <li style={{float:'left',marginRight:20}}><i style={{display:'inline-block',borderRadius:3,position:'relative',top:3,width:30,height:15,backgroundColor:"#F8FFC3",marginRight:5}}></i>工作到期前1-2天</li>
        <li style={{float:'left',marginRight:20}}><i style={{display:'inline-block',borderRadius:3,position:'relative',top:3,width:30,height:15,backgroundColor:"#FFD0CC",marginRight:5}}></i>工作到期当天</li>
        <li style={{float:'left'}}><i style={{display:'inline-block',borderRadius:3,position:'relative',top:3,width:30,height:15,backgroundColor:"#CACACA",marginRight:5}}></i>工作过期未办理</li>
      </ul>
    </div>
  )

}
List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
