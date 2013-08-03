/*
 *@created by dylan	
 */
var info = {
    "device":{
		"name" : function(){
          return UIATarget.localTarget().name();
      },
		"modul" : function(){
          return UIATarget.localTarget().model();
      },
		"bundleID": function(){
          return UIATarget.localTarget().frontMostApp().bundleID();
      },
		"systemName": function(){
          return UIATarget.localTarget().systemName();
      },
		"systemVersion": function(){
          return UIATarget.localTarget().systemVersion();
      }
    },
    "App":{
      "version" : function(){
        return UIATarget.localTarget().frontMostApp().version();
      }
    }
    
}

/*
UIALogger.logMessage(info['App'].version());

UIALogger.logMessage(info['device']. modul());

UIALogger.logMessage(info['device']. systemVersion());

UIALogger.logMessage(info['device']. systemName());

UIALogger.logMessage(info['device']. name());

UIALogger.logMessage(info['device']. bundleID());
*/
