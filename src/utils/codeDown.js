// 倒计时
// time: 倒计时时间（秒），
// fc: 回调函数
export const codeDown = (codeMsg, time, backFn) => {

  let seconds = time;
  if (timer) {
    clearInterval(timer)
  }
  let timer = setInterval(() => {
    seconds--;
    if (seconds > 0) {
      backFn(seconds + 's');
    } else {
      backFn(codeMsg);
      clearInterval(timer);
    }
  }, 1000);
  return timer;
};