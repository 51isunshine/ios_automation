/**
 *根据应用的模块，编写相应的脚本function:  Testcase
 */
#import "element.js"
#import  "imports.js"
function exampleTwo(target,app){
    var target = UIATarget.localTarget(),
        application = target.frontMostApp();
    application.logElementTree();

    /*
    rc_get("MessagesAllPage","MessageAll");
    MessageAll.vtap();
    */
}

function exampleTwo1(target,app){
    var target = UIATarget.localTarget(),
        application = target.frontMostApp();
    application.logElementTree();
    logError(" error");
}