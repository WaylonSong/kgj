import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Upload, message, Icon, Form, Button, Row, Col, DatePicker, Input, Cascader, Switch, Select} from 'antd'
import city from '../../utils/city'
import ACInput from '../../components/Map/ACInput'

const InputGroup = Input.Group;
const Option = Select.Option;
const Search = Input.Search
const { RangePicker } = DatePicker
const options = [{'companyName':'申请单位名称'}, {'creditCode':'统一信用代码'},]
const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const Filter = ({
  addOrder, 
  onFilterChange,
  listRefresh,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件导入成功`);
        listRefresh();
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件导入失败`);
      }
    },
  }
  const handleFields = (fields) => {
    const { createTime, field, value} = fields
    if (createTime&&createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)

  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit();
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
  }
  return (
    <div>
    <Row gutter={24} style={{marginBottom:10}}>
      
    </Row>
    <Row gutter={24}>
      <Col xl={{ span: 3 }} md={{ span: 3 }} lg={{ span: 3 }}>
        <Upload {...props}>
          <Button size='large'>
            <Icon type="upload" /> 导入文件
          </Button>
        </Upload>
      </Col>
      <Col {...ColProps}  xl={{ span: 8 }} md={{ span: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {getFieldDecorator('field')(
          <Select style={{ width: '30%' }} size="large" placeholder="选择查询属性">
            {options.map(function(item, index){
              return <Option key={`option_${index}`} value={Object.keys(item)[0]}>{item[Object.keys(item)[0]]}</Option>
            })}
          </Select>
          )}
          {getFieldDecorator('value')(
            <Search placeholder="搜索" style={{ width: '70%' }} size="large" onSearch={handleSubmit} />
          )}
        </div>
      </Col>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }}>
        <div style={{  justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <FilterItem label="申请时间">
            {getFieldDecorator('createTime')(
              <RangePicker style={{ width: '100%' }} size="large" onChange={handleChange.bind(null, 'createTime')}/>
            )}
          </FilterItem>
        </div>
      </Col>
      <Col xl={{ span: 2 }} md={{ span: 2 }}>
        <Button size="large" type={'primary'} style={{marginRight: 10}} onClick={handleSubmit}>查询</Button>
      </Col>
      <Col xl={{ span: 2 }} md={{ span: 2 }}>
        <Button size="large" onClick={handleReset}>重置</Button>
      </Col>
    </Row>

    </div>
  )
}
Filter.propTypes = {
  // onAdd: PropTypes.func,
  // isMotion: PropTypes.bool,
  // switchIsMotion: PropTypes.func,
  // form: PropTypes.object,
  // filter: PropTypes.object,
  // onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
