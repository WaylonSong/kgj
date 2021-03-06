import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom'
import { Form, Row, Col, Card, Input, Button, Modal, Select, Icon ,Radio ,InputNumber,Affix, DatePicker,Layout } from 'antd';
import { Router, Route, hashHistory } from 'react-router';
import EditableTable from './EditableTable';
import WrappedInlineTable from './InlineTable';
import SecretPersonMng from './SecretPersonMng';
import MultLineTable from './MultLineTable';
import styles from './FirstForm.less'
import classnames from 'classnames'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const { Header, Footer, Sider, Content } = Layout;
const dateFormat = 'YYYY-MM-DD';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const WrappedSecretPersonMng = Form.create()(SecretPersonMng);
const WrappedMultLineTable = Form.create()(MultLineTable);
class FirstForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
         col3:"col3",
         col6:"col6",
         result:[]
      } 
  }
  componentWillMount(){
      var dt=this.props.data;
      // console.log(dt);
      if(dt){
        var values = {}
        for (var i in dt) {
          values[i] = {
            value: dt[i]
          }
        }
        values["companyCreateTime"] = this.safeTransferToMoment(values["companyCreateTime"]);
        values["createTime"] = this.safeTransferToMoment(values["createTime"]);
        values["acceptTime"] = this.safeTransferToMoment(values["acceptTime"]);
        values["writtenTime"] = this.safeTransferToMoment(values["writtenTime"]);
        this.props.form.setFields(values); 
      }
  }

  safeTransferToMoment(obj){
    if(typeof obj == "undefined" || obj == null)
      return {value:''};
    if(typeof obj.value == "undefined" || obj.value == null)
      return {value:''};
    if(obj.value)
      return {value:moment(obj.value)};
    return {value:''};
  }

  genSingleLineTable(data){
      const { getFieldDecorator } = this.props.form;
      //console.log(this.props.form)
      const singleRowLayout = {
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 },
        },
      };
      var self=this;
      var rows=data.map(function(row,index){
          return(
              <tr className={styles.trStyle}>
                  <td className={styles.tdLable}>{row.title}</td>
                  <td className={styles.tdInput}>
                    <div>
                        <span style={{'position':'relative',top:0,left:8}}>{row.headings}{row.headings?<br/>:""}主要填写：</span>
                        <FormItem {...singleRowLayout}>
                          {getFieldDecorator(row.colName, {
                              rules: [{
                                required: true, message: '不能为空',
                              }],
                          })(
                              <TextArea  style={{backgroundColor:'transparent'}}  placeholder={row.placeholder} autosize={{ minRows: 8, maxRows: 10 }}/>  
                          )}
                        </FormItem>                                
                    </div>
                  </td>
              </tr>
          )
      });
      return rows
  }
  genMultLineTable(data,title,colName,checkRowCount){
      const { getFieldDecorator } = this.props.form;
      const singleRowLayout = {
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 },
        },
      };
      return(
          <tr className={styles.trStyle}>
              <td className={styles.tdLable}>{title}</td>
              <td className={styles.tdInput}>
                  <FormItem {...singleRowLayout}>
                      {getFieldDecorator(colName, {
                          rules: [{
                            required: true, message: '不能为空',
                          }, {
                            validator: this.checkMultLineTable.bind(this,checkRowCount)
                        }],
                      })(
                          <WrappedMultLineTable data={data} />
                      )}
                  </FormItem>    
              </td>
          </tr>
      )
  }
  retrieveFormData(){
    var result = {};
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        result = values;
      }else{
        Modal.warning({
          title: '提示信息',
          content: '导出时，表格中不能有漏填项',
        });
      }
    });
    return result;
  }
  onChange(result){
    this.setState({result:result});
  }
  checkPostalCode(rule,data,callback){
     var reg= /^[1-9][0-9]{5}$/;
     if(!reg.test(data)){
        callback('请正确填写邮政编码')
     }
     callback()
  }
  echo(val){
    console.log(val)
  }
  //验证电话号码的
  // checkPhone(rule,data,callback){
  //    var reg = /^1[3|4|5|7|8][0-9]{9}$/;
  //    if(!reg.test(data)){
  //       callback('请正确填写手机号码')
  //    }
  //    callback()
  // }
  checkTable(checkRowCount,rule,data,callback){ 
    // console.log(minRowCount,minColCount,rule,data,callback)
    //console.log(checkRowCount,data)
    for(var i=0;i<checkRowCount;i++){
      if(data){
        for(var j in data[i]){
          if(data[i][j].trim()==""){
              callback('至少填满'+checkRowCount+'行')
          }
        }
      }     
    }       
    callback()
  }
  checkSecretPersonMng(rule,data,callback){
    //console.log(data);
    var hasError=false;
    if(data){
      for(var i in data.counts){
          if(!data.counts[i]){
            hasError=true;
            break;
          }
      }
      if(data.content.trim()==""){
         hasError=true;
      }
    }   
    if(hasError){
       callback('不能为空')
    }
    callback()
  }
  checkMultLineTable(checkRowCount,rule,data,callback){
    //console.log(data);
    if(data){
      var numberOfEle=0;
      for(var i in data){
        if(data[i]){
           numberOfEle+=1;
        }
      }
      //console.log(numberOfEle)
      if(numberOfEle<checkRowCount){
         callback('不能为空')
      }      
    }      
    callback()
  }
  handleSubmit(e){
    e.preventDefault();    
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Modal.info({
          title: '提示信息',
          content: '保存成功',
        });
      }else{
        Modal.info({
          title: '提示信息',
          content: '保存成功，但仍有未填写项',
        });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    var br="<br>";
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const singleRowLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
    };
    const smallFormItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    const exportButtonLayout1 = {
      wrapperCol: {
        xs: {
          span: 6,
          offset: 18,
        },
        sm: {
          span: 6,
          offset: 18,
        },
      },
    };
    const ButtonLayout2 = {
      wrapperCol: {
        xs: {
          span: 6,
          offset: 20,
        },
        sm: {
          span: 6,
          offset: 20,
        },
      },
    };
    return (
         <Content>
            <Form id="content" style={{position:'relative'}} onSubmit={this.handleSubmit.bind(this)}>
              <div style={{border:'1px solid #888'}} >
                <FormItem
                  {...formItemLayout}
                  label="单位名称"
                >
                  {getFieldDecorator('companyName', {
                    rules: [{
                      required: true, message: '不能为空;',    
                    }],
                  })(
                      <TextArea  placeholder="应填写全称，与单位合法身份证明文件相一致"  autosize/>              
                  )}
                </FormItem>  
                <FormItem
                  {...formItemLayout}
                  label="社会统一信用代码"
                >
                  {getFieldDecorator('creditCode', {
                    rules: [{
                      required: true, message: '不能为空;',    
                    }],
                  })(
                      <TextArea  placeholder=""  autosize={{ minRows: 2, maxRows:4 }}/>              
                  )}
                </FormItem>          
                <Row>
                  <Col span={12}  style={{ 'block' : 'none' }}>
                    <FormItem
                      {...smallFormItemLayout}
                      label="单位性质"
                    >
                      {getFieldDecorator('companyType', {
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                      })(
                        <Select
                            showSearch
                            placeholder="==请选择=="
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          >
                            <Option value="国有企业">国有企业</Option>
                            <Option value="国有控股企业">国有控股企业</Option>
                            <Option value="合资企业">合资企业</Option>
                            <Option value="私营企业">私营企业</Option>
                          </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}  style={{ 'block' : 'none' }}>
                    <FormItem
                      {...smallFormItemLayout}
                      label="法定代表人"
                    >
                      {getFieldDecorator('legalBody', {
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                    })(
                        <Input  />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}  style={{ 'block' : 'none' }}>
                    <FormItem
                      {...smallFormItemLayout}
                      label="单位人数"
                    >
                      {getFieldDecorator('companyPersonCount', {
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                      })(
                        <InputNumber  min={0}  style={{width:'100%'}} />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}  style={{ 'block' : 'none' }}>
                    <FormItem
                      {...smallFormItemLayout}
                      label="涉密人员数"
                    >
                      {getFieldDecorator('secretPersonCount', {
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                    })(
                        <InputNumber min={0} style={{width:'100%'}} />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <FormItem
                  {...formItemLayout}
                  label="注册地址"
                >
                  {getFieldDecorator('regAddress', {
                    rules: [{
                      required: true, message: '不能为空;',    
                    }],
                  })(
                      <TextArea  placeholder=""  autosize/>              
                  )}
                </FormItem> 
                <FormItem
                  {...formItemLayout}
                  label="科研生产(办公)地址"
                >
                  {getFieldDecorator('officeAddress', {
                    rules: [{
                      required: true, message: '不能为空;',    
                    }],
                  })(
                      <TextArea  placeholder=""  autosize={{ minRows: 2, maxRows:4 }}/>              
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="通信地址"
                >
                  {getFieldDecorator('mailingAddress', {
                    rules: [{
                      required: true, message: '不能为空;',    
                    }],
                  })(
                      <TextArea  placeholder=""  autosize={{ minRows: 2, maxRows:4 }}/>              
                  )}
                </FormItem>  
                <Row>
                  <Col span={12}  style={{ 'block' : 'none' }}>
                    <FormItem
                      {...smallFormItemLayout}
                      label="邮政编码"
                    >
                      {getFieldDecorator('postalCode', {
                        rules: [{
                          required: true, message: '不能为空',
                        },{
                          validator: this.checkPostalCode.bind(this)
                        }],
                      })(
                        <Input  />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}  style={{ 'block' : 'none' }}>
                    <FormItem
                      {...smallFormItemLayout}
                      label="联系电话"
                    >
                      {getFieldDecorator('phone', {
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                    })(
                        <InputNumber  style={{width:'100%'}}/>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}  style={{ 'block' : 'none' }}>
                    <FormItem
                      {...smallFormItemLayout}
                      label="单位创建时间"
                    >   
                      {getFieldDecorator('companyCreateTime',{
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                      })(
                          <DatePicker  style={{width:'100%'}}/>                 
                      )}            
                    </FormItem>
                  </Col>
                  <Col span={12}  style={{ 'block' : 'none' }}>
                    <FormItem
                      {...smallFormItemLayout}
                      label="是否为上市公司"
                      style={{'overflow':'auto'}}
                    >
                      {getFieldDecorator('isShangshi', {
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                      })(
                        <RadioGroup>
                          <RadioButton value="1">是</RadioButton>
                          <RadioButton value="0">否</RadioButton>
                        </RadioGroup>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}  style={{ 'block' : 'none' }}>
                    <FormItem
                      {...smallFormItemLayout}
                      label="注册资金"
                    >
                      {getFieldDecorator('regMoney', {
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                      })(
                        <Input  />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}  style={{ 'block' : 'none' }}>
                    <FormItem
                      {...smallFormItemLayout}
                      label="固定总资产"
                    >
                      {getFieldDecorator('fixedAssets', {
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                    })(
                       <Input  />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <FormItem
                      {...formItemLayout}
                      label="股权结构"
                    >
                      {getFieldDecorator('equityStructure', {
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                    })(
                        <Input  />
                      )}
                </FormItem>
                <FormItem
                      {...formItemLayout}
                      label="外国国籍、境外永久居留或者长期居留许可及涉外婚姻关系情况"
                    >
                      {getFieldDecorator('foreignRelations', {
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                    })(
                         <TextArea  placeholder=""  autosize={{ minRows: 5, maxRows:6 }}/>      
                      )}
                </FormItem>
                <FormItem
                      {...formItemLayout}
                      label="证劵监管机构的行政处罚情况"
                    >
                      {getFieldDecorator('punishments', {
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                    })(
                         <TextArea  placeholder=""  autosize={{ minRows: 3, maxRows:6 }}/>      
                      )}
                </FormItem>
                <Row>
                  <Col span={12}  style={{ 'block' : 'none' }}>
                    <FormItem
                      {...smallFormItemLayout}
                        label="填报来源"
                      >
                        {getFieldDecorator('source', {
                          initialValue: '人工录入',
                          rules: [{
                            required: true, message: '不能为空',
                          }],
                      })(
                           <Input disabled={true}/>      
                        )}
                    </FormItem>
                  </Col>
                  <Col span={12}  style={{ 'block' : 'none' }}>
                    <FormItem
                      {...smallFormItemLayout}
                      label="提交申请时间"
                    >   
                      {getFieldDecorator('createTime',{
                        rules: [{
                          required: true, message: '不能为空',
                        }],
                      })(
                          <DatePicker  style={{width:'100%'}}/>                 
                      )}            
                    </FormItem>
                  </Col>
                </Row>
                
                
              </div>
              <Col style={{marginTop:20}} xs={{ span: 22, offset: 1}} lg={{ span: 22, offset: 1}}>
                  <Card key={'2'} title='受理审查处理' bordered={true} >
                    <FormItem label="受理审查结果"  {...formItemLayout}>
                      {getFieldDecorator('acceptResult', {
                        // initialValue: item.acceptResult,
                        /*rules: [{
                          required: true, message: '不能为空',
                        }],*/
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
                      {getFieldDecorator('acceptTime', {
                        // initialValue: item.acceptTime&&moment(this.item.acceptTime),
                        /*rules: [{
                          required: true, message: '不能为空',
                        }],*/
                      })(
                          <DatePicker  style={{width:'100%'}}/>                 
                      )}            
                    </FormItem>
                    <FormItem label="意见"  {...formItemLayout}>
                      {getFieldDecorator('acceptReason', {
                        // initialValue: item.acceptReason,
                      })(
                        <Input/>
                      )}
                    </FormItem>
                  </Card>
                </Col>
                <Col style={{marginTop:20}} xs={{ span: 22, offset: 1}} lg={{ span: 22, offset: 1}}>
                  <Card key={'2'} title='书面审查处理' bordered={true} >
                      <FormItem label="书面审查结果"  {...formItemLayout}>
                        {getFieldDecorator('writtenResult', {
                          /*rules: [{
                            required: true, message: '不能为空',
                          }],*/
                        })(
                          <Select>
                            <Option value='通过'>通过</Option>
                            <Option value='未通过'>未通过</Option>
                          </Select>
                        )}
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="书面审查时间"
                      >   
                        {getFieldDecorator('writtenTime',{
                          /*rules: [{
                            required: true, message: '不能为空',
                          }],*/
                        })(
                            <DatePicker  style={{width:'100%'}}/>                 
                        )}            
                      </FormItem>
                      <FormItem label="意见"  {...formItemLayout}>
                        {getFieldDecorator('writtenReason', {
                        })(
                          <Input/>
                        )}
                      </FormItem>
                  </Card>
                </Col>
            </Form>
         </Content>
    );
  }
}

const WrappedFirstForm = Form.create()(FirstForm);
// ReactDOM.render(<WrappedFirstForm />, document.getElementById("session"));
export default WrappedFirstForm
