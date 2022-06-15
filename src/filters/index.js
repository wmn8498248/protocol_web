/**
 * 千分位+保留两位数
 * @param {*} value
 */
export function toThousandFilter(val) {
  /* eslint-disable */
  if (val === '' || val == null) return '--';
  val = val.toString().replace(/\$|\,/g, '');
  if (isNaN(val)) {
    val = '0';
  }
  let sign = val == (val = Math.abs(val));
  val = Math.floor(val * 100 + 0.50000000001);
  let cents = val % 100;
  val = Math.floor(val / 100).toString();
  if (cents < 10) {
    cents = '0' + cents;
  }
  for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
    val =
      val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3));
  }

  return (sign ? '' : '-') + val + '.' + cents;
  /* eslint-disable */
}

// 年月日时分
export const dateFormat = function (dateTime, symbol) {
  const dateStr = new Date(dateTime);
  const year = dateStr.getFullYear();
  const month = (dateStr.getMonth() + 1).toString().padStart(2, 0);
  const day = dateStr.getDate().toString().padStart(2, '0');
  const hour = dateStr.getHours().toString().padStart(2, '0');
  const minute = dateStr.getMinutes().toString().padStart(2, '0');
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
};

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    return value.toString().padStart(2, '0');
  });
  return time_str;
}
