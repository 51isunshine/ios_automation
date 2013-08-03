/**
 *根据应用的模块，专门用于测试
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