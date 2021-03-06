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
const List = ({ resourceName, onDeleteItem, onEditItem, viewAccessaries,handleApplication, isMotion, location, ...tableProps }) => {
  location.query = queryString.parse(location.search)

  const handleMenuClick = (recordId, e) => {
    if (e.key === '1') {
      onEditItem(recordId, 'update')
    } else if (e.key === '4') {
      confirm({
        title: '确认删除么？',
        onOk () {
          onDeleteItem(recordId)
        },
      })
    }
  }

  const dasOff =(beg) =>{
    let result = moment(beg).startOf('days').fromNow(true)
    if(result.indexOf("小时")>-1){
      return 0;
    }
    if(result.indexOf("天") == -1){
      return 100;
    }
    return parseInt(result.substr(0, result.indexOf(' ')))-1
  }

  const getRowStyle =(record) =>{
    let days = dasOff(record.createTime)
    if(record.status == '已完成'){
      return styles.nonebg
    }
    if(days > 5){
      return styles.greybg
    }
    if(days == 5){
      return styles.redbg
    }
    if(days >= 3){
      return styles.yellowbg
    }
    return styles.bluebg
  }


  const viewItem = (record, e)=>{
    onEditItem(record, 'view');
  }
  const columns = [
    {
      title: '操作',
      key: 'operation',
      width: 50,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record.id, e)} 
        menuOptions={[{ key: '1', name: '详情查看' }, { key: '4', name: '删除' }]} />
      },
    },{
      title: '申请单位名称',
      dataIndex: 'companyName',
      key: 'companyName',
      width: 80,
    }, {
      title: '社会统一信用代码',
      dataIndex: 'creditCode',
      width: 100,
      key: 'creditCode',
      render: (text) => <span>{text}</span>,
    }, {
      title: '单位性质',
      dataIndex: 'companyType',
      width: 60,
      key: 'companyType',
      render: (text) => <span>{text}</span>,
    },{
      title: '法定代表人',
      dataIndex: 'legalBody',
      width: 60,
      key: 'legalBody',
      render: (text) => <span>{text}</span>,
    },{
      title: '注册地址',
      dataIndex: 'regAddress',
      width: 100,
      key: 'regAddress',
      render: (text) => <span>{text}</span>,
    },{
      title: '联系电话',
      dataIndex: 'phone',
      width: 80,
      key: 'phone',
      render: (text) => <span>{text}</span>,
    },
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
        rowClassName={record => getRowStyle(record)}
        size='small'
      />
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
