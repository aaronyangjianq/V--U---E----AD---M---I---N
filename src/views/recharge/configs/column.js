const baseColumn = {
  align: 'center',

};
let columns = [
  Object.assign({ 
    title: '充值时间',
    dataIndex: 'create_time', 
  }, baseColumn),
  Object.assign({ 
    title: '充值类型',
    dataIndex: 'price', 
  }, baseColumn),
  Object.assign({ 
    title: '实际支付',
    dataIndex: 'pay_price',
  }, baseColumn),
  Object.assign({ 
    title: '充值手机号',
    dataIndex: 'phone',
  }, baseColumn),
  Object.assign({ 
    title: '订单号',
    dataIndex: 'oid',
  }, baseColumn),
  Object.assign({ 
    title: '状态',
    dataIndex: 'status',
  }, baseColumn),
];

export default columns;