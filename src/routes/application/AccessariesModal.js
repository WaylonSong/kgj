import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal,Select, Cascader, Row, Col, Card, Icon, Tooltip} from 'antd'
import city from '../../utils/city'
import ACInput from '../../components/Map/ACInput'
import Price from '../../components/Map/Price'
import DistanceHandler from '../../components/Map/DistanceHandler'
import FirstForm from './FirstForm'

var districtMap = {}

const modal = ({
  ...accessariesModalProps
}) => {
  // getFieldDecorator('keys', { initialValue: [] });
  return (
    <Modal {...accessariesModalProps} width={1000} style={{}}>
      <Card key={'license'} style={{width: '100%'}} title='营业执照' bordered={false} >
        
      </Card>
      <Card key={'credential'} style={{width: '100%'}} title='保密资质' bordered={false} >
        
      </Card>
      <Card key={'regulations'} style={{width: '100%'}} title='公司章程' bordered={false} >
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
