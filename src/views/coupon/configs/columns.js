const baseColumn = {
  align: 'center',
};
let columns = [
  Object.assign({ 
    title: '区域',
    dataIndex: 'area_type_name', 
  }, baseColumn),
  Object.assign({ 
    title: '卡券名称',
    width: '200px',
    dataIndex: 'name', 
    scopedSlots: {
      customRender: 'name'
    },
  }, baseColumn),
  Object.assign({ 
    title: '时间跨度',
    dataIndex: 'exp_time_name'
  }, baseColumn),
  Object.assign({ 
    title: '现价',
    dataIndex: 'price', 
  }, baseColumn),
  Object.assign({ 
    title: '修改价格',
    scopedSlots: {
      customRender: 'new_price'
    },
  }, baseColumn),
  Object.assign({ 
    title: '状态',
    dataIndex: 'status',
    scopedSlots: {
      customRender: 'status'
    },
    customRender: function(text, record, index){
     const status = record.status;
     return status === 1 ? '在售' : '停止销售';
    },
    sorter: true, 
  }, baseColumn),
  Object.assign({ 
    title: '操作',
    width: '250px',
    scopedSlots: {
      customRender: 'action'
    },
  }, baseColumn),
];

export default columns;
