import React, { Component, PropTypes } from 'react';
import { Form, Input, InputNumber, Radio, Modal,Select, Cascader, Row, Col, Card, Icon, Tooltip} from 'antd'
import FirstForm from './FirstForm'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class modal extends Component {
    handleOk(){
      var self = this;
      this.refs['applicationForm'].validateFieldsAndScroll((err, values) => {
        if (!err) {
          values.companyCreateTime = moment(values.companyCreateTime).format('YYYY-MM-DD');
          values.createTime = moment(values.createTime).format('YYYY-MM-DD');
          self.props.onOk({id:self.props.item.id ,...values});
        }else{
          Modal.info({
            title: '提示信息',
            content: '填写有误，请核对后提交。',
          });
        }
      });
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <Modal {...this.props} onOk={this.handleOk.bind(this)} width={1000} style={{}}>
            <FirstForm data={this.props.item} ref={'applicationForm'}/>
          </Modal>
        );
    }
}

export default modal;
