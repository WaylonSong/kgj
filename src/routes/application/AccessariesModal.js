import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Upload, InputNumber, Radio, Modal,Select, Cascader, Row, Col, Card, Icon, Tooltip} from 'antd'
import FirstForm from './FirstForm'
import path from 'path'

var districtMap = {}

const getFileList = (files, prefix)=>{
  if(typeof files === 'undefined' || files.length == 0)
    return [];
  var list = [];
  for(var i in files){
    var file =  {
      uid: prefix+i,
      name: path.basename(files[i]),
      status: 'done',
      url: files[i],
    }
    list.push(file);
  }
  return list;
}

const modal = ({
  item, 
  ...accessariesModalProps
}) => {
  // getFieldDecorator('keys', { initialValue: [] });
  return (
    <Modal {...accessariesModalProps} width={1000} style={{}}>
      <Card key={'license'} style={{width: '100%'}} title='营业执照' bordered={false} >
        <Upload listType='picture' defaultFileList={getFileList(item.accessaries.license , "license")}>
        </Upload>
      </Card>
      <Card key={'credential'} style={{width: '100%'}} title='保密资质' bordered={false} >
        <Upload listType='picture' defaultFileList={getFileList(item.accessaries.credential, "credential")}>
        </Upload>
      </Card>
      <Card key={'regulations'} style={{width: '100%'}} title='公司章程' bordered={false} >
        <Upload listType='picture' defaultFileList={getFileList(item.accessaries.regulations, "regulations")}>
        </Upload>
      </Card>
    </Modal>
  )
}
modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
