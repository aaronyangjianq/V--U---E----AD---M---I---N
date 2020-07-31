const baseColumn = {
  align: 'center',

};
let columns = [
  Object.assign({ 
    title: '区域',
    dataIndex: 'area_type', 
  }, baseColumn),
  Object.assign({ 
    title: '类型',
    dataIndex: 'cate', 
  }, baseColumn),
  Object.assign({ 
    title: '卡券获得时间',
    dataIndex: 'create_time', 
  }, baseColumn),
  Object.assign({ 
    title: '卡券过期时间',
    dataIndex: 'end_time', 
  }, baseColumn),
  Object.assign({ 
    title: '卡券状态',
    dataIndex: 'status',
  }, baseColumn),
  Object.assign({ 
    title: '卡券获得渠道',
    dataIndex: 'channel', 
  }, baseColumn)
];

export {
  columns
};