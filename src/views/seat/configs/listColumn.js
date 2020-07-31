const baseColumn = {
  align: 'center',

};
let columns = [
  Object.assign({ 
    title: '区域',
    dataIndex: 'area', 
  }, baseColumn),
  Object.assign({ 
    title: '桌子号码',
    dataIndex: 'title', 
  }, baseColumn),
  Object.assign({ 
    title: '状态',
    dataIndex: 'status',
    scopedSlots: {
      customRender: 'status'
    }
  }, baseColumn),
  Object.assign({ 
    title: '价格',
    dataIndex: 'price', 
  }, baseColumn),
  // Object.assign({ 
  //   title: '下一个预约时间',
  //   dataIndex: 'nextPreTime',
  //   sortDirections: ['ascend', 'descend'],
  //   sorter: true, 
  // }, baseColumn),
  Object.assign({ 
    title: '当前电源状态',
    dataIndex: 'electrState', 
    sortDirections: ['ascend', 'descend'],
    scopedSlots: {
      customRender: 'electrState'
    },
  }, baseColumn),
  Object.assign({ 
    title: '电源控制',
    dataIndex: 'electrControl', 
    scopedSlots: { customRender: 'action'},
  }, baseColumn),
];

export default columns;
