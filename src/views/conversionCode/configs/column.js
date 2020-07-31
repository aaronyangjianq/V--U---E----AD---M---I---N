const baseColumn = {
  align: 'center',

};
let columns = [
  Object.assign({ 
    title: '申请时间',
    dataIndex: 'create_time', 
  }, baseColumn),
  Object.assign({ 
    title: '审核时间',
    dataIndex: 'use_time', 
  }, baseColumn),
  Object.assign({ 
    title: '手机号',
    dataIndex: 'phone', 
  }, baseColumn),
  Object.assign({ 
    title: '兑换码',
    dataIndex: 'code',
    scopedSlots: { customRender: 'code'},
  }, baseColumn),
  Object.assign({ 
    title: '操作',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status'},
  }, baseColumn),
  // Object.assign({ 
  //   title: '操作',
  //   dataIndex: 'status',
  //   scopedSlots: { customRender: 'status'},
  //   customRender: function(text, record, index){
  //     const status = record.status;
  //     if(status === 1) {
  //       return '待审核';
  //     } else if (status === 2) {
  //       return '审核通过';
  //     } else if (status === 3) {
  //       return '审核失败';
  //     }
  //    },
  // }, baseColumn),
  Object.assign({ 
    title: '审核结果',
    dataIndex: 'status_name', 
  }, baseColumn),
  Object.assign({ 
    title: '卡券类型',
    dataIndex: 'cate', 
  }, baseColumn),
];

export default columns;