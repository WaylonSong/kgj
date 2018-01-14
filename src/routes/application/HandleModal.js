import React, { Component, PropTypes } from 'react';
import { Form, Input,InputNumber, Upload, Button, Modal,Select, Cascader, Row, Col, Card, Icon, Tooltip} from 'antd'
import FirstForm from './FirstForm'
import path from 'path'
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
const props1 = {
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
    if (file.status == 'uploading') {
      console.log(file, fileList);
    }
  },
};

const props2 = {
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
};

const getFileList = (file, prefix)=>{
  if(typeof file === 'undefined' || file === '')
    return [];
  var list = [];
  var file =  {
    uid: prefix+'1',
    name: path.basename(file),
    status: 'done',
    url: file,
  }
  list.push(file);
  return list;
}

class modal extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        // var accessariesModalProps = {};
        var {
          item,
          form,
          onOk,
          ...accessariesModalProps
        } = this.props;
        this.accessariesModalProps = accessariesModalProps;
        this.form = form;
        this.item = item;
        this.onOk = onOk;
        this.state ={
          suggestionFileList:getFileList(this.item && this.item.upload && this.item.upload.suggestionFile, 'suggestionFile'),
          recordFileList:getFileList(this.item && this.item.upload && this.item.upload.recordFile, 'recordFile'),
        }
    }
    suggestionChange({ file, fileList }) {
      if(fileList.length==2){
        this.setState({
          suggestionFileList: fileList.splice(1,1)
        });
      }else{
        this.setState({
          suggestionFileList: fileList
        });
      }
    }

    handleOk = () => {
      this.form.validateFields((errors) => {
        // if (errors) {
        //   return
        // }
        const data = {
          ...this.form.getFieldsValue(),
          id: this.item.id,
        }
        this.onOk(data)
      })
    }

    recordChange({ file, fileList }) {
      if(fileList.length==2){
        this.setState({
          recordFileList: fileList.splice(1,1)
        });
      }else{
        this.setState({
          recordFileList: fileList
        });
      }
    }

    render() {
        return (
          <div>
            <Modal {...this.accessariesModalProps} onOk={this.handleOk.bind(this)} width={1000} style={{}}>
              <Row>
                <Col xs={{ span: 22, offset: 1}} lg={{ span: 10, offset: 1}}>
                  <Card key={'1'} title='不受理意见及通知导入' bordered={true} >
                    <Upload action='//jsonplaceholder.typicode.com/posts/' onChange={this.suggestionChange.bind(this)} fileList={this.state.suggestionFileList}>
                      <Button>
                        <Icon type="upload" /> 上传
                      </Button>
                    </Upload>
                  </Card>
                </Col>
                <Col xs={{ span: 22, offset: 1}} lg={{ span: 11, offset: 1}}>
                  <Card key={'2'} title='书面审查记录单导入' bordered={true} >
                    <Upload action='//jsonplaceholder.typicode.com/posts/' onChange={this.recordChange.bind(this)} fileList={this.state.recordFileList}>
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
                        {this.form.getFieldDecorator('result', {
                          initialValue: this.item.result,
                        })(
                          <Select>
                            <Option value='受理'>受理</Option>
                            <Option value='不受理'>不受理</Option>
                            <Option value='已通过书面审查'>已通过书面审查</Option>
                            <Option value='未通过书面审查'>未通过书面审查</Option>
                          </Select>
                        )}
                      </FormItem><FormItem label="现场审查总分得分情况"  {...formItemLayout}>
                        {this.form.getFieldDecorator('score', {
                          initialValue: this.item.score,
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

}

export default Form.create()(modal)

