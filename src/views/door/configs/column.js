const baseColumn = {
  align: 'center',

};
let columns = [
  Object.assign({ 
    title: '开门时间',
    dataIndex: 'create_time', 
    width: '200px'
  }, baseColumn),
  Object.assign({ 
    title: '开门方式',
    dataIndex: 'type', 
    width: '200px'
  }, baseColumn),
  Object.assign({ 
    title: '开门人手机',
    dataIndex: 'phone',
    width: '200px'
  }, baseColumn),
];

export default columns;