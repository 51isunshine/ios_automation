/**
 * @author dylan
 *  测试入口函数
 * @param title
 * @param f
 * @param options
 * @return {Object}
 */
function appTest (title, f, options) {
  try {
    var appTest={
    };
    if (arguments.length == 2) {
      options = {
        logTree: true
      };
    }
    target = UIATarget.localTarget();
    application = target.frontMostApp();
    UIALogger.logStart("The case ' " + title + " ' is running.");

    f(target, application);
    appTest = {
        status: "pass"
    };
    UIALogger.logPass("The case ' " + title + " ' was passed.");
    target.delay(1);
    return appTest;
  } catch (e) {
    if (e instanceof Error) {
      e.log();
    } else {
      UIALogger.logError(e.toString() + " # log.type == error!");
    }
    if (options.logTree) {
      target.logElementTree();
    }
    appTest = {
        status: "fail"
    };
    
    UIALogger.logFail("The case ' " + title + " ' was failed.");
    return appTest;
      
  }
};

function testCase(title,fn,option){
    var testCaseResult={},
        result;
    if(arguments.length==3){
        result=appTest(title,fn,option);
    }else{
        result=appTest(title,fn);
    }
    return result;
}

rc_get = function rc_get(page, element) {
    app = UIATarget.localTarget().frontMostApp();
    print(page + "." + element);
    var command = element + "=" + "eval(" + page + "." + element + ")";
    return eval(command);
};

rc_swap = function rc_get(page, element) {
    var flag = loopSourceArry(element);
    if(!flag){
        app = UIATarget.localTarget().frontMostApp();
        print(page + "." + element);
        var command = element + "=" + "eval(" + page + "." + element + ")";
        //print("command="+command);
        return eval(command);
    }else{
        return swapIdOrName(element);
    }

};

function tapWithLocationXY(page,element){
    var offset = eval(page + "." + element);
    var tapStr = "app.tapWithOptions("+offset+")";
    UIALogger.logMessage("the tapOffset is: "+offset);
    eval(tapStr);
    delay(1);
}

/**
 * @author dylan
 * if a tableview have many cells and you
 *        want to get the index,you can call the function.
 */
/*
 * if you want to use it, you can create a new variable.
 * E.G :
 * var tableCellZero =rc_get_at_index("NewMessagePage","tableCells",0);
 * var tableCellOne =rc_get_at_index("NewMessagePage","tableCells",1);
 */
rc_get_at_index = function rc_get_at_index(page, element, index) {
    app = UIATarget.localTarget().frontMostApp();
    var command = element + "=" + "eval(" + page + "." + element + ")";
    command = command + "[" + index + "]";
    return eval(command);
};
 /*
 EG:
  button_location = {
        //message  -->text --> arrowsButton
    arrowsButton: ".buttons()['userInfo']",
}
    Maybe you can define a file called : button_location.js
*/
rc_get_at_index_buttons = function rc_get_at_index_buttons(page,element,index,button_location) {
    try {
        if(arguments.length==3)
        {
            logError("Parse error:少传了一个参数");
        }
        else {
            function buttons(button_location) {
                return button_location;
            }
        }
        print("您传的下标为：index = "+index);
        app=UIATarget.localTarget().frontMostApp();
        var command=element+"="+ "eval("+page + "." + element + ")";
        command=command+"["+index+"]"+buttons(arguments[3]);

    } catch (e) {
        logError("大方点，少了一个参数喽");
        throw e;
    }
    return eval(command);
}

function node(testSuit,path){
    var jsStr = JSON.stringify(testSuit);
    var target = UIATarget.localTarget(),
        host = target.host();
        //path = "/Users/dylan/Documents/ringcentral/Spartan/LibJS/";  // Please input your "File Path" instead my "File Path"
    var  result = host.performTaskWithPathArgumentsTimeout(path+"result.sh", ["result.js",path,jsStr], 5);
}