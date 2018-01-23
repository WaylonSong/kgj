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
  ...accessoriesModalProps
}) => {
  // getFieldDecorator('keys', { initialValue: [] });
  return (
    <Modal {...accessoriesModalProps} width={1000} style={{}}>
      <Card key={'license'} style={{width: '100%'}} title='营业执照' bordered={false} >
        <Upload defaultFileList={getFileList(item.accessories.license , "license")}>
        </Upload>
      </Card>
      <Card key={'credential'} style={{width: '100%'}} title='保密资质' bordered={false} >
        <Upload defaultFileList={getFileList(item.accessories.credential, "credential")}>
        </Upload>
      </Card>
      <Card key={'regulations'} style={{width: '100%'}} title='公司章程' bordered={false} >
        <Upload defaultFileList={getFileList(item.accessories.regulations, "regulations")}>
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
