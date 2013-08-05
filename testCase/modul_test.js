/**
 *根据应用的模块，专门用于测试
 * run test-script under commond line mode with node.js.So please install node.js first.
 */
#import "./JS/imports.js"
var testSuit={};
testSuit.exampleTwo=appTest("exampleTwo",exampleTwo);
testSuit.exampleTwo1=appTest("exampleTwo1",exampleTwo1)
// a lots appTest
/**
 * invoke node()
 */
var path="/Users/dylan/Documents/ringcentral/Spartan/LibJS/"; // Please input your "File Path" instead my "File Path"
node(testSuit,path);


/**
 * if you want to run test-script in instruments,please invoking this file .
 * Run test-script under 'instruemnts' mode
 */
 #import "./JS/imports.js"
appTest("exampleTwo",exampleTwo);
appTest("exampleTwo1",exampleTwo1)
