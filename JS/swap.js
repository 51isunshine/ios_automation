/*
 * @created by dylan
 *      对于一些经常变换的元素，对id与name进行交换
 */
_soureObjectOfIdAndName = {};
_soureObjectOfIdAndName.MenuPopupButton= {
	    	  "byID" : "target.frontMostApp().mainWindow().buttons()[0]",
		      "byName":"target.frontMostApp().mainWindow().buttons()['RCSPCustomTabBarArrowButtonNor']"
                      //"byName":"target.frontMostApp().mainWindow().buttons()['menuBar.popUpBtn']"
	    };
 _soureObjectOfIdAndName.MenuComposeText={
	           "byID" : "target.frontMostApp().mainWindow().buttons()[1]",
		      "byName" : "target.frontMostApp().mainWindow().buttons()['RCSPBarMenuComposeText']"
        };
_soureObjectOfIdAndName.MenuKeypad={
		      "byID" : "target.frontMostApp().mainWindow().buttons()[2]",
		      "byName" : "target.frontMostApp().mainWindow().buttons()['RCSPCustomTabBarCallButtonNorm']"
    }
_soureObjectOfIdAndName.logo={
		      "byID" : "target.frontMostApp().mainWindow().images()[1]",
		      "byName" : "target.frontMostApp().mainWindow().images()['RCSPBottomBarBackground.png']"
    }
_soureObjectOfIdAndName.logoInfo={
		      "byID" : "target.frontMostApp().mainWindow().images()[1]",
		      "byName" : "target.frontMostApp().mainWindow().images()['RCSPBottomBarBackground.png']"
    }
_soureObjectOfIdAndName.logoImage={
		      "byID" : "target.frontMostApp().mainWindow().images()[1]",
		      "byName" : "target.frontMostApp().mainWindow().images()['RCSPBottomBarBackground.png']"
    }
_soureObjectOfIdAndName.back={
	      "byID" : "target.frontMostApp().navigationBar().buttons()[1]",
	      "byName" : "target.frontMostApp().navigationBar().buttons()['Back']"
}

function loopSourceArry(compareelements ){
    return  _soureObjectOfIdAndName.hasOwnProperty(compareelements);
};
function loop_soureObjectOfIdAndName( arguments){
        for(var proto in _soureObjectOfIdAndName){
                if(proto == arguments)
                 {
                    return true;
                }
        }
        return false;
}

//判断是ID还是Name.
function swapIdOrName(node){
    var elementNode = node;    
    var source = "eval(" + "_soureObjectOfIdAndName"  +"."  + elementNode + ".byName" +")";
    
    var bflag = eval(source+".isVisible()");
    
    print("byName isVisible="+bflag);
    var oNodeButton = elementNode + "=" + "eval("+source+")";
 
    if(!bflag){
    	source = "eval(" + "_soureObjectOfIdAndName"  +"."  + elementNode + ".byID" +")";
    	oNodeButton = elementNode + "=" + "eval("+source+")";
    }
    print("source="+source);
   return eval(oNodeButton);
};
