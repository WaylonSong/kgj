import React, { Component, PropTypes } from 'react';
import { Form, Input, InputNumber, Radio, Modal,Select, Cascader, Row, Col, Card, Icon, Tooltip} from 'antd'
import ArtificialForm from './ArtificialForm'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class ArtificialModal extends Component {
    handleOk(){
      var self = this;
      this.refs['applicationForm'].validateFieldsAndScroll((err, values) => {
        if (!err) {
          values.companyCreateTime = moment(values.companyCreateTime).format('YYYY-MM-DD');
          if(values.acceptTime)
            values.acceptTime = moment(values.acceptTime).format('YYYY-MM-DD');
          if(values.writtenTime)
            values.writtenTime = moment(values.writtenTime).format('YYYY-MM-DD');
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
            <ArtificialForm data={this.props.item} ref={'applicationForm'}/>
          </Modal>
        );
    }
}

export default ArtificialModal;
