
assertTrue=function(expression, message) {
	if(arguments.length==1){
		message="";
	}
	if (!expression) {
		logError(message + "校验失败");
		return 0;
	} else {
		UIALogger.logMessage(message + "校验成功");
		return 1;
	}
}

function assertFalse(expression, message) {
  return assertTrue(! expression, message);
}

function assertNull(actual, message) {
  var defMessage = "期盼值 == null , 但是实际值 <" + actual + ">"; 
  // TODO: string-matching on UIAElementNil makes my tummy feel bad. Fix it.
  return assertTrue(actual === null || actual.toString() == "[object UIAElementNil]",
             message ? message + ": " + defMessage : defMessage);
}

function assertNotNull(actual, message) {
  var defMessage = "期盼值 != null";
  return assertTrue(actual !== null && actual.toString() != "[object UIAElementNil]", 
             message ? message + ": " + defMessage : defMessage);
}

function assertEquals(actual, expect, message) {
	var msg = "实际值 # " + actual + " # 与期盼值 # " + expect + " # ";
  	return assertTrue(expect == actual, message ? message + ": " + msg : msg);
}

function assertNotEquals(actual, expect, message) {
	var msg = "实际值 # " + actual + " # 与期盼值 # " + expect + " # ";
  	return assertTrue(expect != actual, message ? message + ": " + msg : msg);
}

/**
 * 正则表达式验证
 * 第一个参数 regexp 为自己设定的正则表达式，第二个参数 expression 为要验证的文本(比如控件的name或者value值)
 * 判断要验证的文本是否符合给定的正则表达式。
 * message为要写入的日志信息
 */
function assertRegExptest(regExp, expression, message) {

	if(regExp.test(expression)) {
		var passMsg = expression + " 正则表达式:"+ regExp  +"匹配,验证通过. @" + (!message ? "" : message);
		UIALogger.logMessage(passMsg);
		return 1;
	} else {
		var errorMsg = expression + " 正则表达式:"+ regExp+"不匹配,验证失败.";
		//throw (new Error("Fail", errorMsg));
		logError(errorMsg);	
		return 0;
	}
}

/**
 * 正则表达式验证
 * 第一个参数 regexp 为自己设定的正则表达式，第二个参数 expression 为要验证的文本(比如控件的name或者value值)
 * 判断要验证的文本是否符合给定的正则表达式。
 * message为要写入的日志信息
 * 可以验证给定的字符是否能匹配到表达式
 */
function assertRegExpMatch(regExp, expression, message) {

	if(expression.match(regExp) != null) {
		var passMsg = expression + " 满足表达式:"+ regExp +"匹配,验证通过. @" + (!message ? "" : message);
		UIALogger.logMessage(passMsg);
		return 1;
	} else {
		var errorMsg = expression + " 不满足表达式"+ regExp +"匹配,验证失败.";
		//throw (new Error("Fail", errorMsg));
		logError(errorMsg);
		return 0;
	}
}

/**
 * 验证传入的控件对象是否包含期盼的文本，主要通过元素的name和label进行匹配判断
 * obj为传入的UIAElement，expectContain为期盼包含的字符，message为验证通过时添加的日志信息
 * 未作异常处理，参数不满足预期类型系统抛出异常被appTest捕获。
 * 注：这里可以扩大匹配范围，遍历传入obj中包含的element，逐个进行校验返回结果。暂时不支持
 * return 0 not found
 * return 1 if found
 */
function assertContainText(obj, expectContain, message) {

	var name = obj.name();
	var labelText = obj.label();
	var value = obj.value();
	var isTrue1 = name ==null? false:(name.search(expectContain) != -1 ? true : false);
	var isTrue2 = labelText==null? false:(labelText.search(expectContain) != -1 ? true : false);
	var isTrue3 = value ==null? false:(value.search(expectContain) != -1 ? true : false);
	if(isTrue1 || isTrue2 || isTrue3) {
		var msg = "对象的name｜label｜value值中包含期盼值的字符 # " + expectContain + " #. @";
		msg += (!message ? "" : message);
		UIALogger.logMessage(msg);
		return 1;
	} else {
		var errorMsg = "对象的name|label|value值#"+name+"#中不包含期盼值的字符 # " + expectContain + " #.@";
		errorMsg += (!message ? "" : message);
		logError(errorMsg);
		//throw (new Error("Fail", "包含校验失败!"));
		return 0;
	}
}
/**
 * 验证传入的控件对象是否bu包含期盼的文本，主要通过元素的name和label进行匹配判断
 * obj为传入的UIAElement，expectContain为期盼包含的字符，message为验证通过时添加的日志信息
 * 未作异常处理，参数不满足预期类型系统抛出异常被appTest捕获。
 * 注：这里可以扩大匹配范围，遍历传入obj中包含的element，逐个进行校验返回结果。暂时不支持
 */
function assertNotContainText(obj, expectContain, message) {

	var name = obj.name();
	var labelText = obj.label();
	var value = obj.value();
	var isTrue1 = name ==null? false:(name.search(expectContain) != -1 ? true : false);
	var isTrue2 = labelText==null? false:(labelText.search(expectContain) != -1 ? true : false);
	var isTrue3 = value ==null? false:(value.search(expectContain) != -1 ? true : false);
	if(!isTrue1 && !isTrue2 && !isTrue3) {
		var msg = "对象的name|label|value值#"+name+"#中不包含期盼值的字符 # " + expectContain + " #.@";

		msg += (!message ? "" : message);
		UIALogger.logMessage(msg);
		return 1;
	} else {
		var errorMsg = "对象的name｜label｜value值中包含期盼值的字符 # " + expectContain + " #. @";
		errorMsg += (!message ? "" : message);
		logError(errorMsg);
		//throw (new Error("Fail", "包含校验失败!"));
		return 0;
	}
}

/**
 * 验证元素的有效性，obj:为待验证元素， message:验证的日志信息.
 */
function assertIsValid(obj, message) {

	if(obj.checkIsValid()) {
		var passMsg = "被检测元素 # " + typeof (obj) + " # 有效. @" + (!message ? "" : message);
		UIALogger.logMessage(passMsg);
		return 1;
	} else {
		var errorMsg = "被检测元素 # " + obj + " # 是无效的.";
		//throw (new Error("Fail", errorMsg));
		logError(errorMsg);
		return 0;
	}
}
/**
 * 验证元素的有效性，obj:为待验证元素， message:验证的日志信息.
 */
function assertIsNotValid(obj, message) {

	if(!obj.checkIsValid()) {
		var errorMsg = "被检测元素 # " + obj + " # 是无效的.";
		UIALogger.logMessage(passMsg);
		return 1;
	} else {
		var passMsg = "被检测元素 # " + typeof (obj) + " # 有效. @" + (!message ? "" : message);
		logError(errorMsg);
		return 0;
	}
}

/**
 *全局变量 代表弹窗的对话框
 */
var alertWindow = null;

UIATarget.onAlert = function onAlert(alert) {
	alertWindow = alert;
	UIATarget.localTarget().delay(1);
	var msg = "There is a  popWindow  appeared and the title is " + alert.name();
//	if (false) {
//		logError(msg);
//	}
	print(msg);
	return true;
//	return false;
}

/**
 * 验证弹出的弹出框是否为期望的，通过popWindow的title进行判断
 */
function assertPopWindowTitle(expectTitle, message) {

	delay(5);
	var actualTitle = alertWindow.name();
	if(expectTitle == actualTitle) {
		var passMsg = "The popWindow's is expected. @" + (!message ? "" : message);
		UIALogger.logMessage(passMsg);
	} else {
		var msg = "The popWindow's title is" + actualTitle + " and is not the  expected " + expectTitle + ". @" + (!message ? "" : message);
		//throw (new Error("Fail", msg));
		logError(msg);
	}
}

/**
 * 验证Switch控件的当前开关状态。state =1 代表 on 状态，state =0 代表 off 状态
 * obj 为要验证的Switch控件，state 为要验证的状态
 */
function assertSwitchState(obj, state) {
	var actualState = "error";
	try {
		var value = obj.value();
		value ? actualState = "on" : actualState = "off";
		if(value == state) {
			var msg = "Switch控件的实际状态为 # " + actualState + " # 与期望的状态  # " + state + " # 相符";
			UIALogger.logMessage(msg);
		} else {
			var errorMsg ="Switch控件的实际状态为 # " + actualState + " # 与期望的状态  # " + state + " # 不符";
			//throw (new Error("Fail", errorMsg));
			logError(errorMsg);
		}
	} catch(e) {
		throw e + " #Switch控件状态验证异常";
	}
}

