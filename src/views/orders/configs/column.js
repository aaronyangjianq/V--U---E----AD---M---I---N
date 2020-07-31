const baseColumn = {
  align: 'center',

};
let columns = [
  Object.assign({ 
    title: '订单时间',
    dataIndex: 'create_time', 
    width: '200px'
  }, baseColumn),
  Object.assign({ 
    title: '区域',
    dataIndex: 'area_title', 
    width: '160px'
  }, baseColumn),
  Object.assign({ 
    title: '预约时间',
    dataIndex: 'date_title', 
    width: '150px'
  }, baseColumn),
  Object.assign({ 
    title: '订单金额',
    dataIndex: 'price',
    width: '90px'
  }, baseColumn),
  Object.assign({ 
    title: '卡券抵扣',
    dataIndex: 'ucid', 
    width: '100px'
  }, baseColumn),
  Object.assign({ 
    title: '实际支付',
    dataIndex: 'pay_price', 
    width: '90px'
  }, baseColumn),
  Object.assign({ 
    title: '订单状态',
    dataIndex: 'use_status',
    width: '100px'
  }, baseColumn),
  Object.assign({ 
    title: '订单号',
    dataIndex: 'oid',
    width: '200px'
  }, baseColumn),
  Object.assign({ 
    title: '手机号',
    dataIndex: 'phone',
    width: '160px'
  }, baseColumn),
  Object.assign({ 
    title: '操作',
    dataIndex: 'action',
    width: '100px',
    scopedSlots: { customRender: 'action' } 
  }, baseColumn),
];

export default columns;