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
const List = ({ resourceName, onDeleteItem, onEditItem, viewAccessories, handleAccept, handleWritten, isMotion, location, ...tableProps }) => {
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record, 'update')
    } else if (e.key === '2') {
      viewAccessories(record.id)
    } else if (e.key === '3') {
      handleAccept(record.id)
    } else if (e.key === '4') {
      handleWritten(record.id)
    } else if (e.key === '5') {
      confirm({
        title: '确认删除么？',
        onOk () {
          onDeleteItem(record.id)
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
      width: 30,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} 
        menuOptions={[{ key: '1', name: '申请表详情' }, { key: '2', name: '浏览附件' }, { key: '3', name: '受理审查' }, { key: '4', name: '书面审查' }, { key: '5', name: '删除' }]} />
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
      title: '提交时间',
      dataIndex: 'createTime',
      width: 100,
      key: 'createTime',
      render: (text) => <span>{text}</span>,
    }, {
      title: '受理审查时间',
      dataIndex: 'acceptTime',
      width: 100,
      key: 'acceptTime',
      render: (text) => <span>{text}</span>,
    }, {
      title: '受理审查结果',
      dataIndex: 'acceptResult',
      width: 100,
      key: 'acceptResult',
      render: (text) => <span>{text}</span>,
    }, {
      title: '书面审查时间',
      dataIndex: 'writtenTime',
      width: 100,
      key: 'writtenTime',
      render: (text) => <span>{text}</span>,
    }, {
      title: '书面审查结果',
      dataIndex: 'writtenResult',
      width: 100,
      key: 'writtenResult',
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
        rowClassName={record => getRowStyle(record)}
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
