#! /bin/bash
echo "Begin IPhone test automation"
echo "script: $1"

# Created by dylan

logPath=/AppTestLog

SRCNAME=`pwd`
echo "$SRCNAME"
cd $SRCNAME
cd ..
#appName=`pwd`/RCAPP/RCMobile_Change.app
#### app name path , you can set up your custom path;
appName=/Users/dylan/Documents/ringcentral/iPhone-INCOMING-VOIP-SMS-TA/src/SMS/RCAPP/RCMobile_Change.app

cd $SRCNAME
xcodepath=`xcode-select -print-path`

#judge AppTestLog directory
if(test -d "/AppTestLog") then
echo "exist AppTestLog"
else 
mkdir /AppTestLog
fi

function verifyXcodeVersion(){

        echo "Verify Xcode verion"
        xcodeversion=`xcodebuild -version | grep "Xcode 4.5"`
        echo "xcodeversion=$xcodeversion"
        if [ -z"${xcodeversion}" != "z" ] ;then
        TRACETEMPLATE="$xcodepath/../Applications/Instruments.app/Contents/PlugIns/AutomationInstrument.bundle/Contents/Resources/Automation.tracetemplate"
        else
        TRACETEMPLATE="$xcodepath/Platforms/iPhoneOS.platform/Developer/Library/Instruments/PlugIns/AutomationInstrument.bundle/Contents/Resources/Automation.tracetemplate"
        fi
#traceTemplate=$(find ${xcodepath%/*} -type f -name "Automation.tracetemplate")
        if [ z"${DEVICE_UDID}" != "z" ]
        then
                appName=`pwd`/RCAPP/RCMobile.app
                cmd="instruments -w $DEVICE_UDID -t $TRACETEMPLATE $appName -e UIASCRIPT $one -e UIARESULTSPATH $logPath"
                echo "$cmd"
        else
                cmd="instruments -t $TRACETEMPLATE $appName -e UIASCRIPT $one -e UIARESULTSPATH $logPath"
                echo "$cmd"
        fi
        $cmd
        sleep 15
#  cmd="instruments -t $TRACETEMPLATE $appName -e UIASCRIPT $one -e UIARESULTSPATH $logPath/logSMS"
#  echo "$cmd"
    echo "over!!!"
}


#Through the test_file.txt,check which case has tested .
function init_dir()
{

    for file in ` ls $1 `
    do
        if (test -d $1"/"$file )  then
        #ls  $file
        init_dir $1"/"$file
        else		
            find $1"/"$file -name '*_test.js' -print >> test_file.txt
            dir="$1/$file"
            one=`ls $dir | grep "_test.js"`
            echo $one
            if [ -n "$one" ];then 
                verifyXcodeVersion
            fi
        fi
    done
}
#call  the init_dir function.
init_dir $1
echo "excute complete"		

cp -r $SRCNAME/*.trace $logPath
delCmd="rm -rf $SRCNAME/*.trace"
$delCmd
rm -rf $logPath/logSMS

echo "$1 script run end!"
if(test -d "$SRCNAME/logFile") then
    echo "exist"
else 
    mkdir $SRCNAME/logFile
fi

cd $SRCNAME

