
const weekMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
let datesInWeekly = function() {
  let weekDays = [];
  for (var i = 0; i < 7; i++) {
    let today = new Date();
    let day = today.getDate() + i;
    today.setDate(day);
    weekDays.push({
      date: today,
      y: today.getFullYear(),
      m: today.getMonth(),
      d: today.getDate(),
      w: weekMap[today.getDay()],
    });
  }
  return weekDays;
};

export default datesInWeekly;