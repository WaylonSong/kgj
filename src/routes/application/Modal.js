import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal,Select, Cascader, Row, Col, Card, Icon, Tooltip} from 'antd'
import city from '../../utils/city'
import ACInput from '../../components/Map/ACInput'
import Price from '../../components/Map/Price'
import DistanceHandler from '../../components/Map/DistanceHandler'
import FirstForm from './FirstForm'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
var districtMap = {}

const modal = ({
  item,
  modalType,
  itemIndexes,
  onOk,
  onAddBlankTo,
  // onCancel,
  onMinusTo = ()=>console.log("Minus To"),
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    getFieldValue,
    setFieldsValue
  },
  ...modalProps
}) => {
  const handleOk = () => {
    if(modalType == "view")
      onOk("");
    else{
      validateFields((errors) => {
        if (errors) {
          return
        }
        var formData = getFieldsValue();
        const data = {
          ...formData,
          key: item.key,
        }
        console.log(data)
        onOk(data)
      })
    }
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 16, offset: 5 },
    },
  };
  
  const safeGetFieldValue = (name)=>{
    if(getFieldValue(name))
      return getFieldValue(name)
    else
      return ""
  }
  
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  var disableFlag = {disabled:modalType=='view'}

  const types = ["箱货", "货车", "平板", "面包车", "冷藏车"]

  const getDom = ()=>{
    return <Input {...disableFlag}/>;
  }

  const genToList = () => {
    var list = [];
    return list;
  }
  // getFieldDecorator('keys', { initialValue: [] });
  return (
    <Modal {...modalOpts} width={1000} style={{}}>
      <FirstForm data={item}/>
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
