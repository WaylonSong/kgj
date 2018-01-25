const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const collectionName = "applications"
const { apiPrefix } = config

let ordersListData2 = Mock.mock({
  'data|20-40': [
    {id: '@id', 
   
    'status|+1': ['未处理', '通过', '不受理', '未处理', '未通过', '不受理', '未处理', '受理', '不受理', ],
    
    // 'source|+1': ['导入','人工录入'],
    'source': '导入',
    //现场审查分数
    'score|+1': ['','', '', '90', '50'],
    //提交时间
    'createTime|+1': ['2018-01-21', '2018-01-22', '2018-01-23', '2018-01-24', '2018-01-23', '2018-01-18', '2018-01-19', '2018-01-19'],
    //审查时间与结果
    'acceptResult|+1':  ['','受理',       '不受理'],
    'acceptReason|+1':  ['', '', '材料不全', ],
    'acceptTime|+1':    ['','2018-01-24', '2018-01-23', '', '2018-01-22', '2018-01-23'],
    'writtenResult|+1': ['','通过', '', '','未通过',      '', '','',      ''],
    'writtenReason|+1': ['', '', '', '', '手续不全', '', '', '', '', ],
    'reason|+1':        ['','',      '', '','提交材料不全', ''],
    'writtenTime|+1': ['', '2018-01-13', '',  '', '2018-01-23', '', '','',      ''],
    //导入附件内容，三个文件夹
    accessories: {regulations:['/图片/1.jpg'],license:[],credential:['/图片/3.jpg']}, //章程，执照，保密资质
    //上传处理结果内容
    upload: {suggestionFile:'/图片/1.jpg', recordFile:'/图片/3.jpg'}, //不受理意见及通知导入  书面审查记录单导入
    //以下来自上传Json
    "meetingMng":"过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元","testMng":"过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元","applyReason":"若列头与内容不对齐或出现列重复，请指定列的宽度 width。\n建议指定 scroll.x 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 scroll.x。","basicSystem":"多萨的法国法国发生过的交换机哭一哭i元多萨的法国法国发生过的交换机哭一哭i元","centralizingMng":"若列头与内容不对齐或出现列重复，请指定列的宽度 width。\n建议指定 scroll.x 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 scroll.x。","chargeOfSecretLeader":"若列头与内容不对齐或出现列重复，请指定列的宽度 width。\n建议指定 scroll.x 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 scroll.x。","collaborationMng":["过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元","过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元"],"companyCreateTime":"2017-12-28","companyName":"国防科工局","companyPersonCount":11,"companyType":"国企","countriesSys":"多萨的法国法国发生过的交换机哭一哭i元","creditCode":"HDSAJHDKA111","denseProductMng":"多萨的法国法国发生过的交换机哭一哭i元","equityStructure":"无法第三方","fixedAssets":"11111","foreignNationals":"过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元","foreignRelations":"若列头与内容不对齐或出现列重复，请指定列的宽度 width。\n建议指定 scroll.x 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 scroll.x。","isShangshi":"1","kpAndRewardsAndPunishments":"过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元","legalBody":"11","mailingAddress":"北京市北京市北京市","mianLegalBody":"若列头与内容不对齐或出现列重复，请指定列的宽度 width。\n建议指定 scroll.x 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 scroll.x。","mtcsol":[["11","33","分萨芬","发的是","发的是","发送"],["啊啊啊","啊啊","啊啊","地方","打算","发送"],["","","","","",""]],"newsMng":"过的交换机哭一哭i元过的交换机哭一哭i元","officeAddress":"北京市北京市北京市北京市","otherLeader":"若列头与内容不对齐或出现列重复，请指定列的宽度 width。\n建议指定 scroll.x 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 scroll.x。","phone":15555558778,"postalCode":"112341","punishments":"若列头与内容不对齐或出现列重复，请指定列的宽度 width。\n建议指定 scroll.x 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 scroll.x。","regAddress":"北京市","regMoney":"1111","secretCheck":"过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元","secretCommit":"多萨的法国法国发生过的交换机哭一哭i元","secretCommittee":[["1","1","2"],["fffffffff","fffffffffffffffffffffff","fffffff"],["222444","4444","4444"]],"secretDepartment":"若列头与内容不对齐或出现列重复，请指定列的宽度 width。\n建议指定 scroll.x 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 scroll.x。","secretPerson":"若列头与内容不对齐或出现列重复，请指定列的宽度 width。\n建议指定 scroll.x 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 scroll.x。","secretPersonCount":11,"secretSituation":"多萨的法国法国发生过的交换机哭一哭i元多萨的法国法国发生过的交换机哭一哭i元多萨的法国法国发生过的交换机哭一哭i元","secretStaffMng":{"content":"多萨的法国法国发生过的交换机哭一哭i元","counts":[44,55,555]},"specialSystem":"多萨的法国法国发生过的交换机哭一哭i元v","summaryOfCompany":"若列头与内容不对齐或出现列重复，请指定列的宽度 width。\n建议指定 scroll.x 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 scroll.x。","sysAndEquiAndStorageMng":["多萨的法国法国发生过的交换机哭一哭i元","多萨的法国法国发生过的交换机哭一哭i元","多萨的法国法国发生过的交换机哭一哭i元","vv过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元","过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元","过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元"],"theImportSecretMng":["多萨的法国法国发生过的交换机哭一哭i元","多萨的法国法国发生过的交换机哭一哭i元"],"tightMng":["多萨的法国法国发生过的交换机哭一哭i元","多萨的法国法国发生过的交换机哭一哭i元","多萨的法国法国发生过的交换机哭一哭i元","多萨的法国法国发生过的交换机哭一哭i元"],"workFileMng":"过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元","workSituation":["若列头与内容不对齐或出现列重复，请指定列的宽度 width。\n建议指定 scroll.x 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 scroll.x。","若列头与内容不对齐或出现列重复，请指定列的宽度 width。\n建议指定 scroll.x 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 scroll.x。"],"workingFundsMng":["过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元","过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元过的交换机哭一哭i元"]},
  ],
})


let database = ordersListData2.data


const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}

module.exports = {

  [`GET ${apiPrefix}/${collectionName}`] (req, res) {
    // res.status(500).end()
    // return;
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          // if ({}.hasOwnProperty.call(item, key)) {
            var itemValue = '';
            if (key.indexOf('.')>-1) {
              itemValue = String(item[key.split('.')[0]][key.split('.')[1]]).trim();
            }  
            else if (key === 'createTime') {
              const start = new Date(other[key][0]).getTime()
              const end = new Date(other[key][1]).getTime()
              const now = new Date(item[key]).getTime()
              if (start && end) {
                return now >= start && now <= end
              }
              return true
            }else{
              itemValue = item[key];
            }
            return String(itemValue).trim().indexOf(decodeURI(other[key]).trim()) > -1
        })
      }
    }

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },

  [`POST ${apiPrefix}/${collectionName}`] (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    database.unshift(newData)
    res.status(200).end()
  },

  [`POST ${apiPrefix}/${collectionName}`] (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.id = Mock.mock('@id')
    database.unshift(newData)
    res.status(200).end()
  },

  [`DELETE ${apiPrefix}/${collectionName}`] (req, res) {
    const { ids } = req.body
    database = database.filter(item => !ids.some(_ => _ === item.id))
    res.status(204).end()
  },


  [`GET ${apiPrefix}/${collectionName}/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`POST ${apiPrefix}/${collectionName}/handleWrittenResult`] (req, res) {
    let isExist = false
    const editItem = req.body
    console.log(editItem);
    database = database.map((item) => {
      if (item.id === editItem.id) {
        isExist = true
        editItem.status = editItem.writtenResult||editItem.acceptResult||"未处理"
        return Object.assign({}, item, editItem)
      }
      return item
    })

    if (isExist) {
      res.status(201).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },


  [`POST ${apiPrefix}/${collectionName}/handleAcceptResult`] (req, res) {
    let isExist = false
    const editItem = req.body
    console.log(editItem);
    database = database.map((item) => {
      if (item.id === editItem.id) {
        isExist = true
        editItem.status = editItem.writtenResult||editItem.acceptResult||"未处理"
        return Object.assign({}, item, editItem)
      }
      return item
    })

    if (isExist) {
      res.status(201).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
  [`DELETE ${apiPrefix}/${collectionName}/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      database = database.filter(item => item.id !== id)
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`PUT ${apiPrefix}/${collectionName}/:id`] (req, res) {
    const { id } = req.params
    const editItem = req.body
    let isExist = false

    database = database.map((item) => {
      if (item.id === id) {
        isExist = true
        return Object.assign({}, item, editItem)
      }
      return item
    })

    if (isExist) {
      res.status(201).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  }
}
