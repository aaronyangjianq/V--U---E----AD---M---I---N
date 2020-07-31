const baseColumn = {
  align: 'center',

};
let columns = [
  Object.assign({ 
    title: '用户ID',
    dataIndex: 'uid', 
  }, baseColumn),
  Object.assign({ 
    title: '用户名称',
    dataIndex: 'user_name', 
  }, baseColumn),
  Object.assign({ 
    title: '用户手机号',
    dataIndex: 'phone', 
  }, baseColumn),
  Object.assign({ 
    title: '用户注册时间',
    dataIndex: 'create_time', 
  }, baseColumn),
  Object.assign({ 
    title: '账户余额',
    dataIndex: 'money',
    sortDirections: ['ascend', 'descend'],
    sorter: true, 
  }, baseColumn),
  Object.assign({ 
    title: '累计学习时长',
    dataIndex: 'total', 
    sortDirections: ['ascend', 'descend'],
    sorter: true, 
  }, baseColumn),
  Object.assign({ 
    title: '可兑换时长',
    dataIndex: 'total_time', 
    sortDirections: ['ascend', 'descend'],
    sorter: true, 
  }, baseColumn),
  Object.assign({ 
    title: '点击查看',
    dataIndex: '', 
    scopedSlots: { customRender: 'action'}
  }, baseColumn),
];

export {
  columns
};