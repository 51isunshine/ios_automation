#import "imports.js"
/*
test("test: ", function(){
  UIALogger.logMessage("hello World");
});
var target = UIATarget.localTarget(),
    host = target.host(),
    result = host.performTaskWithPathArgumentsTimeout("/Users/dylan/Documents/ringcentral/Spartan/LibJS/test.sh",["data.js"],15);
UIALogger.logMessage(result);
UIALogger.logMessage("test over");
    result = host.performTaskWithPathArgumentsTimeout("/usr/bin/whoami",["null"],21);
UIALogger.logMessage(result);
result = host.performTaskWithPathArgumentsTimeout("/bin/sh",["/Users/dylan/Documents/ringcentral/Spartan/LibJS/test.sh"],15); */
/**
 *    for some test .
 *    Example one:
 */

/*
var jsonDataTest = { 'id1':"pass",'id2': "fail","id3":"pass"};  // Static Data source
var jsStr = JSON.stringify(jsonDataTest);     // Parse to "String"  type.
var target = UIATarget.localTarget(),
    host = target.host(),
    path = "/Users/dylan/Documents/ringcentral/Spartan/LibJS/";   // Please input your "File Path" instead my "File Path"
var result = host.performTaskWithPathArgumentsTimeout(path+"result.sh", ["result.js",path,jsStr], 5);
UIALogger.logDebug("exitCode: " + result.exitCode);
UIALogger.logDebug("stdout: " + result.stdout);
UIALogger.logDebug("stderr: " + result.stderr);

*/

/**
 * Example two:
 *             dynamic Data source
 */

function exampleTwo(target,app){
    var target = UIATarget.localTarget(),
            application = target.frontMostApp();
    application.logElementTree();
}

function exampleTwo1(target,app){
  var target = UIATarget.localTarget(),
          application = target.frontMostApp();
  application.logElementTree();
  logError(" error");
}

/**
 *
 * 把脚本文件存放在modul.js文件中，而另起一个单独的测试文件，存放在modul_test.js中；
 */
/**  Here: A lot of testCase, please save it in modul_test.js **/
var testSuit={};
testSuit.exampleTwo=appTest("exampleTwo",exampleTwo);
testSuit.exampleTwo1=appTest("exampleTwo1",exampleTwo1)

var jsStr = JSON.stringify(testSuit);
var target = UIATarget.localTarget(),
    host = target.host(),
    path = "/Users/dylan/Documents/ringcentral/Spartan/LibJS/";  // Please input your "File Path" instead my "File Path"
var result = host.performTaskWithPathArgumentsTimeout(path+"result.sh", ["result.js",path,jsStr], 5);