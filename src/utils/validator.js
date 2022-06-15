// 使用了策略设计模式
import { regExp } from '@/utils/const';

// 这个一个规则的数据
const rules = {
  isNonEmpty(value, errorMsg) {
    //判断非空
    if (typeof value === 'undefined' || value === null || value === '') {
      return errorMsg;
    } else {
      return void 0;
    }
  },
  isNonEmptys(value, errorMsg) {
    //判断非空(可以为0)
    return !value == '' ? errorMsg : void 0;
  },
  isNonAry(value, errorMsg) {
    //判断非空(可以为0)
    return value.length > 0 ? void 0 : errorMsg;
  },
  minLength(value, length, errorMsg) {
    //判断字符长度
    return value.length < length ? errorMsg : void 0;
  },
  isMobile(value, errorMsg) {
    //判断手机号
    return !regExp.mobile.test(value) ? errorMsg : void 0;
  },
  isEmail(value, errorMsg) {
    //判断电子邮件
    return !regExp.email.test(value) ? errorMsg : void 0;
  },
  isQQ(value, errorMsg) {
    //判断qq
    return !regExp.qq.test(value) ? errorMsg : void 0;
  },
  idCard(value, errorMsg) {
    //判断身份证
    return !regExp.idCard.test(value) ? errorMsg : void 0;
  },
  isBankcard(value, errorMsg) {
    //判断银行卡
    return !regExp.bankcard.test(value) ? errorMsg : void 0;
  },
  isNum(value, errorMsg) {
    //判断是否为正整数
    return !regExp.num.test(value) ? errorMsg : void 0;
  },
  isPrice(value, errorMsg) {
    //判断是否为价格
    return !regExp.price.test(value) ? errorMsg : void 0;
  },
  isPassword(value, errorMsg) {
    //判断是否为注册密码
    return !regExp.password.test(value) ? errorMsg : void 0;
  },
  isName(value, errorMsg) {
    return !regExp.name.test(value) ? errorMsg : void 0;
  },
	isValidNum(value, errorMsg) {
		//判断是否为有效数字
	  return !regExp.validNum.test(value) ? errorMsg : void 0;
	},
};

class Validator {
  // 缓存的规则项
  checks = [];
  addRule(name, rule) {
    rules[name] = rule;
  }
  // 增加校验
  add(element, rule, param = true) {
    if (!param && !element) {
      return true;
    }
    this.checks.push(function () {
      let val = element;
      let name = rule.shift();
      rule.unshift(val); // ["val", "活动名称不能为空"] ["val",6, "密码长度不能少于6位"]
      console.log(element, rule, "rules[name] && rules[name].apply(element, rule)")
      return rules[name] && rules[name].apply(element, rule);
    });
  }
  
  numberAdd( element, rule, param = true){

    if (!param && !element) {
      return true;
    }
    this.checks.push(function () {
      let val = element;
      let name = rule.shift();
      rule.unshift(val); // ["val", "活动名称不能为空"] ["val",6, "密码长度不能少于6位"]
      console.log(rules[name] && rules[name].apply(element, rule),"rules[name] && rules[name].apply(element, rule)")
      return rules[name] && rules[name].apply(element, rule);
    });

  }
  // 开始校验
  start() {
    for (let i = 0; i < this.checks.length; i++) {
      let check = this.checks[i];
      let msg = check();
      if (msg) {
        return msg;
      }
    }
  }
}

export default Validator;
