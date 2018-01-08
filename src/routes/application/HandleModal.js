import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input,InputNumber, Upload, Button, Modal,Select, Cascader, Row, Col, Card, Icon, Tooltip} from 'antd'
import city from '../../utils/city'
import ACInput from '../../components/Map/ACInput'
import Price from '../../components/Map/Price'
import DistanceHandler from '../../components/Map/DistanceHandler'
import FirstForm from './FirstForm'
const Option = Select.Option;
const FormItem = Form.Item;

var districtMap = {}
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}


const modal = ({
  item,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...accessariesModalProps
}) => {
  const props1 = {
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  defaultFileList: [{
    uid: 1,
    name: 'xxx.png',
    status: 'done',
    reponse: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/xxx.png',
  }, {
    uid: 2,
    name: 'yyy.png',
    status: 'done',
    url: 'http://www.baidu.com/yyy.png',
  }, {
    uid: 3,
    name: 'zzz.png',
    status: 'error',
    reponse: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/zzz.png',
  }],
};

const props2 = {
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  defaultFileList: [{
    uid: 1,
    name: 'xxx.png',
    status: 'done',
    reponse: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/xxx.png',
  }, {
    uid: 2,
    name: 'yyy.png',
    status: 'done',
    url: 'http://www.baidu.com/yyy.png',
  }, {
    uid: 3,
    name: 'zzz.png',
    status: 'error',
    reponse: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/zzz.png',
  }],
};
  // getFieldDecorator('keys', { initialValue: [] });
  return (
    <div>
      <Modal {...accessariesModalProps} width={1000} style={{}}>
        <Row>
          <Col xs={{ span: 22, offset: 1}} lg={{ span: 10, offset: 1}}>
            <Card key={'1'} title='不受理意见及通知导入' bordered={true} >
              <Upload {...props1}>
                <Button>
                  <Icon type="upload" /> 上传
                </Button>
              </Upload>
            </Card>
          </Col>
          <Col xs={{ span: 22, offset: 1}} lg={{ span: 11, offset: 1}}>
            <Card key={'2'} title='书面审查记录单导入' bordered={true} >
              <Upload {...props2}>
                <Button>
                  <Icon type="upload" /> 上传
                </Button>
              </Upload>
            </Card>
          </Col>
        </Row>
        <Row style={{marginTop:20}}>
          <Col xs={{ span: 22, offset: 1}} lg={{ span: 22, offset: 1}}>
            <Card key={'2'} title='认证结果' bordered={true} >
              <Form layout="horizontal">
                <FormItem label="认证结果"  {...formItemLayout}>
                  {getFieldDecorator('result', {
                    initialValue: item.result,
                  })(
                    <Select>
                      <Option value='受理'>受理</Option>
                      <Option value='不受理'>不受理</Option>
                      <Option value='已通过书面审查'>已通过书面审查</Option>
                      <Option value='未通过书面审查'>未通过书面审查</Option>
                    </Select>
                  )}
                </FormItem><FormItem label="现场审查总分得分情况"  {...formItemLayout}>
                  {getFieldDecorator('score', {
                    initialValue: item.score,
                  })(<InputNumber min={0} max={100}/>)}
                </FormItem>
              </Form>
            </Card>
          </Col>
        </Row>
    </Modal>
    </div>
  )
}
modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
