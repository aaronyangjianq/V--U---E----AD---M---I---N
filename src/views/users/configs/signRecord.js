const baseColumn = {
  align: 'center',

};
let columns = [
  Object.assign({ 
    title: '打卡区域',
    dataIndex: 'area', 
  }, baseColumn),
  Object.assign({ 
    title: '打卡日期',
    dataIndex: 'day', 
  }, baseColumn),
  Object.assign({ 
    title: '支付方式',
    dataIndex: 'channel', 
  }, baseColumn),
  Object.assign({ 
    title: '开始时间',
    dataIndex: 'create_time', 
  }, baseColumn),
  Object.assign({ 
    title: '结束时间',
    dataIndex: 'end_time',
  }, baseColumn),
];

export {
  columns
};