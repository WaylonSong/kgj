import React, { Component, PropTypes } from 'react';
import { Form, Input,InputNumber, DatePicker, Upload, Button, Modal,Select, Cascader, Row, Col, Card, Icon, Tooltip} from 'antd'
import path from 'path'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;
const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
var districtMap = {}
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
}

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
        }
        this.suggestionChangeUrl = `/api/upload`;
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
        if (errors) {
          return
        }
        var url;
        if(this.state.suggestionFileList.length == 0)
          url = '';
        else{
          url = (this.state.suggestionFileList[0].response&&this.state.suggestionFileList[0].response.url)||this.state.suggestionFileList[0].url;
        }
        console.log(url);
        const data = {
          ...this.form.getFieldsValue(),
          // upload: {suggestionFile:'/图片/1.jpg', recordFile:''}, //不受理意见及通知导入  书面审查记录单导入
          suggestionFile: url,
          id: this.item.id,
        }
        // data.acceptTime = moment(data.acceptTime).format('l');
        data.acceptTime = moment(data.acceptTime).format('YYYY-MM-DD');
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
                    <Upload action={this.suggestionChangeUrl} onChange={this.suggestionChange.bind(this)} fileList={this.state.suggestionFileList}>
                      <Button>
                        <Icon type="upload" /> 上传
                      </Button>
                    </Upload>
                  </Card>
                </Col>
                <Col xs={{ span: 22, offset: 1}} lg={{ span: 10, offset: 1}}>
                  <Card key={'2'} title='受理审查处理' bordered={true} >
                    <Form layout="horizontal">
                      <FormItem label="受理审查结果"  {...formItemLayout}>
                        {this.form.getFieldDecorator('acceptResult', {
                          initialValue: this.item.acceptResult,
                          rules: [{
                            required: true, message: '不能为空',
                          }],
                        })(
                          <Select>
                            <Option value='受理'>受理</Option>
                            <Option value='不受理'>不受理</Option>
                          </Select>
                        )}
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="受理审查时间"
                      >   
                        {this.form.getFieldDecorator('acceptTime', {
                          initialValue: this.item.acceptTime&&moment(this.item.acceptTime),
                          rules: [{
                            required: true, message: '不能为空',
                          }],
                        })(
                            <DatePicker  style={{width:'100%'}}/>                 
                        )}            
                      </FormItem>
                      <FormItem label="意见"  {...formItemLayout}>
                        {this.form.getFieldDecorator('acceptReason', {
                          initialValue: this.item.acceptReason,
                        })(
                          <Input/>
                        )}
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

