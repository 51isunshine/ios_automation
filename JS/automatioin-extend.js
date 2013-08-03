
function delay(time) {
	if (time == null) {
		time = 1;
	}
	UIATarget.localTarget().delay(time);
}

function print(msg) {
	UIALogger.logMessage(msg);
}

function logWarning(msg) {
	//UIALogger.logWarning(msg+"###CaseWarning");
	logError(msg);
}
/*
UIALogger.prototype.logError = logError;
UIALogger.prototype.logWarning = logWarning;
UIALogger.prototype.logFail = logError;
*/

function logError(msg) {
        UIALogger.logError((function(){throw "###"+msg })());
        //UIALogger.logError(msg);
}

function extend(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
};

function getNumberFromString(tmpstr){
    var phonenumber = "";
    for ( var int = 0; int < tmpstr.length; int++) {
        var tmp = tmpstr.charAt(int) + "";
        if (tmp.match(/[0-9]/)) {
            phonenumber += tmp;
        }
    }
    return phonenumber;
}
function getDateDisplayString(dateTimeStr) {
    //mm/dd/yy hh:mm AM/PM      3/22/12 3:11 PM
    var dateAndTime=dateTimeStr.split(" ");
    var date=dateAndTime[0],
        time=dateAndTime[1],
        amOrPm=dateAndTime[2];

    var d1=new Date(Date.parse(date)),
        d2=new Date(),
        r=d2-d1;
    var difDays=Math.floor(r/86400000);

    var displayStr;
    switch(difDays){
        case 0:
            displayStr=time+" "+amOrPm;
            break;
        case 1:
            displayStr="Yesterday";
            break;
        case 2:case 3:case 4:case 5:case 6:
        var s=d1.getDay();
        switch (s){
            case 0:displayStr="Sunday";
                break;
            case 1:displayStr="Monday";
                break;
            case 2:displayStr="Tuesday";
                break;
            case 3:displayStr="Wednesday";
                break;
            case 4:displayStr="Thursday";
                break;
            case 5:displayStr="Friday";
                break;
            case 6:displayStr="Saturday";
                break;
        }
        break;
        default:
            displayStr=date;
            break;
    }
    return displayStr;
}


/**
 *  The 'object' and 'attr' param come from "element.js" file
 * @param object
 * @param attr
 */
pullDownToFresh = function pullDownToFresh(object,attr) {

    print("pull down to fresh");
    var source = object.abbr;  // rc_get 应该 也可以扩展
    source.waitForValid(10);
    source.dragInsideWithOptions({
        startOffset : {
            x : 0.43,
            y : 0.42
        },
        endOffset : {
            x : 0.44,
            y : 0.93
        },
        duration : 0.5
    });
    delay(5);

}

/**
 *  The 'object' and 'attr' param come from "element.js" file
 * @param object
 * @param attr
 */
pullUpToFresh = function pullUpToFresh(object,attr) {
    print("pull up to fresh");
    var source = object.abbr;
    source.waitForValid(10);
    source.dragInsideWithOptions({
        startOffset : {
            x : 0.44,
            y : 0.93
        },
        endOffset : {
            x : 0.43,
            y : 0.42
        },
        duration : 0.5
    });
    delay(5);
}

extend(UIALogger.prototype,{
    logError:logError,
    logWarning: logWarning,
    logFail : logError
})

extend(UIAElement.prototype, {
	// Poll till the item becomes visible, up to a specified timeout
	waitForValid : function(timeout, step) {
		if (step == null) {
			step = 0.5;
		}
		var stop = timeout / step;

		for ( var i = 0; i < stop; i++) {
			delay(step); // for the animation
			if (this.isVisible() && this.isValid()) {
				return;
			}
		}
		this.logElement();
		logError('Not valid');
	},
	/**
	 * 验证控件对象是否包含期盼的文本，主要通过元素的name和label进行匹配判断 expectContain为期盼包含的字符
	 * 未作异常处理，参数不满足预期类型系统抛出异常被appTest捕获。
	 * 注：这里可以扩大匹配范围，遍历包含的element，逐个进行校验返回结果。暂时不支持 return 0 not found return 1
	 * found
	 */
	containText : function(expectContain) {

		var name = this.name();
		var labelText = this.label();
		var value = this.value();
		var isTrue1 = name == null ? false
				: (name.search(expectContain) != -1 ? true : false);
		var isTrue2 = labelText == null ? false : (labelText
				.search(expectContain) != -1 ? true : false);
		var isTrue3 = value == null ? false
				: (value.search(expectContain) != -1 ? true : false);
		if (isTrue1 || isTrue2 || isTrue3) {
			return 1;
		} else {
			return 0;
		}
	},
	
	print : function() {
		this.logElementTree();
	},
	vtap : function() {
		this.waitForValid(10, 0.25);
		this.tap();
	},
	/**
	 * 处理元素的doubletap
	 */
	doDoubleTap : function() {
		this.waitForValid(10, 0.25);
		this.doubleTap();

	},
	/**
	 * A shortcut for touching an element and waiting for it to disappear.
	 */
	tapAndWaitForInvalid : function() {
		this.tap();
		this.waitForInvalid();
	},
	/**
	 * Move the width & height function out of rect()
	 */
	width : function() {
		return this.rect().size.width;
	},
	height : function() {
		return this.rect().size.height;
	}
});
/**
 * 设置wheel 的值，假如为datepicker 这里的value类型为数字，否则为类型为字符串
 */
UIAPickerWheel.prototype.doSelectValue = function(value) {

	var message = "设置pickerWheel 的值为: # " + value + " #";

	this.selectValue(value);
	delay(1);
	(new Error("Message", message)).log();
}

/**
 * 获取Picker 显示的value值 遍历Picker 的 wheels ，分别取出其value，拼接后返回
 */
UIAPicker.prototype.getValue = function() {

	var wheelsArray = this.wheels();
	var value = "";
	for ( var i = 0; i < wheelsArray.length; i++) {
		value += wheelsArray[i].value().split('.')[0];
	}
	;
	return value;
}
/**
 * 验证Switch控件的当前开关状态。state =1 代表 on 状态，state =0 代表 off状态 state 为要验证的状态
 */
UIASwitch.prototype.assertState = function(state) {

	var actualState = "error";
	try {
		var value = this.value();
		value ? actualState = "on" : actualState = "off";
		if (value == state) {
			var msg = "Switch控件的实际状态为 # " + actualState + " # 与期望的状态  # "
					+ state + " # 相符";
			UIALogger.logMessage(msg);
		} else {
			var errorMsg = "Switch控件的实际状态为 # " + actualState + " # 与期望的状态  # "
					+ state + " # 不符";
			// throw (new Error("Fail", errorMsg));
			logError(errorMsg);
		}
	} catch (e) {
		throw e + " #Switch控件状态验证异常";
	}
}

/**
 * 处理滑动 向上滑动一个范围，200单位 即大概半个屏幕的高度
 */
function scrollUp() {
	try {
		UIATarget.localTarget().dragFromToForDuration({
			x : 150,
			y : 300
		}, {
			x : 150,
			y : 100
		}, 1);
		var msg = "向上滑动窗口半屏高度";
		UIALogger.logMessage(msg);
	} catch (e) {
		throw e + " #scrollUp 滑动窗口异常 ";
	}
	delay(1);
}

/**
 * 向下滑动滑动一个范围，200单位 即大概半个屏幕的高度
 */
function scrollDown() {
	try {
		UIATarget.localTarget().dragFromToForDuration({
			x : 150,
			y : 100
		}, {
			x : 150,
			y : 300
		}, 1);
		var msg = "向下滑动窗口半屏高度";
		UIALogger.logMessage(msg);
	} catch (e) {
		throw e + " #scrollDown 滑动窗口异常 ";
	}
	delay(1);
}

/**
 * 360*480 向左边滑动滑动一个范围，200
 */
function scrollLeft() {
	try {
		UIATarget.localTarget().dragFromToForDuration({
			x : 260,
			y : 200
		}, {
			x : 60,
			y : 200
		}, 1);
		var msg = "向左边滑动窗口200单位.";
		UIALogger.logMessage(msg);
	} catch (e) {
		throw e + " #scrollLeft 滑动窗口异常 ";
	}
	delay(1);
}
/**
 * 向右边滑动滑动一个范围，200
 */
function scrollRight() {
	try {
		UIATarget.localTarget().dragFromToForDuration({
			x : 60,
			y : 200
		}, {
			x : 260,
			y : 200
		}, 1);
		var msg = "向右滑动窗口200单位.";
		UIALogger.logMessage(msg);
	} catch (e) {
		throw e + " #scrollRight 滑动窗口异常 ";
	}
	delay(1);
}
extend(UIAApplication.prototype, {
	navigationTitle : function(index) {
		if (arguments.length == 0) {
			index = 0;
		}
		var title = this.mainWindow().navigationBar().staticTexts()[index]
				.value();
		if (title) {
			return title;
		}
		return null;
	},
	isPortraitOrientation : function() {
		var orientation = this.interfaceOrientation();
		return orientation == UIA_DEVICE_ORIENTATION_PORTRAIT
				|| orientation == UIA_DEVICE_ORIENTATION_PORTRAIT_UPSIDEDOWN;
	},
	isLandscapeOrientation : function() {
		var orientation = this.interfaceOrientation();
		return orientation == UIA_DEVICE_ORIENTATION_LANDSCAPELEFT
				|| orientation == UIA_DEVICE_ORIENTATION_LANDSCAPERIGHT;
	}
});

extend(UIANavigationBar.prototype, {
	assertLeftButtonNamed : function(name) {
		assertEquals(name, this.leftButton().name());
	},
	assertRightButtonNamed : function(name) {
		assertEquals(name, this.rightButton().name());
	}
});
extend(UIATableView.prototype, {
	cellNamed : function(name) {
		return this.cells().firstWithName(name);
	},
	cellContainText : function(name) {
		if (arguments.length == 1) {
			for ( var int = 0; int < this.cells().length; int++) {
				this.cells()[int].print();
				if (this.cells()[int].containText(name)) {
					return this.cells()[int];
				}
			}
		}
		return null;
	},
	assertCellNamed : function(name) {
		assertNotNull(this.cellNamed(name), "No table cell found named '"
				+ name + "'");
	}
});

extend(UIATableCell.prototype, {
	swipeToDelete : function() {
		this.flickInsideWithOptions({
			startOffset : {
				x : 0.1,
				y : 0.5
			},
			endOffset : {
				x : 0.9,
				y : 0.3
			}
		});
	}
});
extend(UIASlider.prototype, {
	isMoving : function(timedelay) {
		var value1 = this.value();
		if (arguments.length == 0) {
			timedelay = 1;
		}
		delay(timedelay);

		var value2 = this.value();
		if (value1 == value2) {

			return 0;
		}

		return 1;
	}
});
extend(
		UIAKeyboard.prototype,
		{
			KEYBOARD_TYPE_UNKNOWN : -1,
			KEYBOARD_TYPE_ALPHA : 0,
			KEYBOARD_TYPE_ALPHA_CAPS : 1,
			KEYBOARD_TYPE_NUMBER_AND_PUNCTUATION : 2,
			KEYBOARD_TYPE_NUMBER : 3,
			keyboardType : function() {
				if (this.keys().length < 12) {
					return this.KEYBOARD_TYPE_NUMBER;
				} else if (this.keys().firstWithName("a").toString() != "[object UIAElementNil]")
					return this.KEYBOARD_TYPE_ALPHA;
				else if (this.keys().firstWithName("A").toString() != "[object UIAElementNil]")
					return this.KEYBOARD_TYPE_ALPHA_CAPS;
				else if (this.keys().firstWithName("1").toString() != "[object UIAElementNil]")
					return this.KEYBOARD_TYPE_NUMBER_AND_PUNCTUATION;
				else
					return this.KEYBOARD_TYPE_UNKNOWN;
			}

		});
var typeString = function(pstrString, pbClear) {
	pstrString += ''; // convert number to string
	if (!this.hasKeyboardFocus())
		this.tap();
	// delay(0.5);
	if (pbClear || pstrString.length == 0)
		this.clear();
	if (pstrString.length > 0) {
		var app = UIATarget.localTarget().frontMostApp();
		var keyboard = app.keyboard();
		var keys = app.keyboard().keys();
		var buttons = app.keyboard().buttons();
		for (i = 0; i < pstrString.length; i++) {
			var intKeyboardType = keyboard.keyboardType();
			var bIsAllCaps = (intKeyboardType == keyboard.KEYBOARD_TYPE_ALPHA_CAPS); // Handles
			var intNewKeyboardType = intKeyboardType;
			var strChar = pstrString.charAt(i);
			if ((/[a-z]/.test(strChar))
					&& intKeyboardType == keyboard.KEYBOARD_TYPE_ALPHA_CAPS
					&& !bIsAllCaps) {
				buttons.firstWithName("shift").tap();
				intKeyboardType = keyboard.KEYBOARD_TYPE_ALPHA;
			} else if ((/[A-Z]/.test(strChar))
					&& intKeyboardType == keyboard.KEYBOARD_TYPE_ALPHA) {
				buttons.firstWithName("shift").tap();
				intKeyboardType = keyboard.KEYBOARD_TYPE_ALPHA_CAPS;
			} else if ((/[A-z]/.test(strChar))
					&& intKeyboardType == keyboard.KEYBOARD_TYPE_NUMBER_AND_PUNCTUATION) {
				buttons.firstWithName("more, letters").tap();
				intKeyboardType = keyboard.KEYBOARD_TYPE_ALPHA;
			} else if ((/[0-9.]/.test(strChar))
					&& intKeyboardType != keyboard.KEYBOARD_TYPE_NUMBER_AND_PUNCTUATION
					&& intKeyboardType != keyboard.KEYBOARD_TYPE_NUMBER) {
				buttons.firstWithName("more, numbers").tap();
				intKeyboardType = keyboard.KEYBOARD_TYPE_NUMBER_AND_PUNCTUATION;
			}

			if ((/[a-z]/.test(strChar))
					&& intKeyboardType == keyboard.KEYBOARD_TYPE_ALPHA_CAPS)
				strChar = strChar.toUpperCase();
			if (strChar == " ")
				keys["space"].tap();
			else if (/[0-9]/.test(strChar)) // Need to change strChar to the
			// index key of the number because
			// strChar = "0" will tap "1" and
			// strChar = "1" will tap "2"
			{
				if (strChar == "0")
					if (intKeyboardType == keyboard.KEYBOARD_TYPE_NUMBER_AND_PUNCTUATION) {
						strChar = "9";
					} else {
						strChar = "10";
					}
				else
					strChar = (parseInt(strChar) - 1).toString();

				keys[strChar].tap();
			} else {
				keys[strChar].tap(); // TODO: this line is super slow when
				// there are many keys
			}
			// delay(0.5);

		}
	}
};

extend(UIATextField.prototype, {
	typeString : typeString
});
extend(UIATextView.prototype, {
	typeString : typeString
});
