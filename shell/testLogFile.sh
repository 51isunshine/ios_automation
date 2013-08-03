#! /bin/bash
echo "Test log file"
echo  $(pwd)/../

# Created by dylan

SRCNAME=$(pwd)/../
echo "$SRCNAME"

function split(){
#cp $1  $SRCNAME/logFile/
    #1、pass and fail 
    grep -E 'Pass:|Fail:' $1 |sed  's/+0800//g' >passAndFail.txt
    #print row number,total
    echo "executed case has : " >>passAndFail.txt 
    count=`grep -Ec 'Pass:|Fail:' $1`;echo "count="$count >>passAndFail.txt

    #single pass
    grep  'Pass:' $1 |sed  's/+0800//g' >pass.txt
    #total
    count=`grep -c 'Pass:' $1`;echo "count="$count  >>pass.txt

    #2、single fail
    grep  'Fail:' $1 |sed  's/+0800//g' >fail.txt
    #total
    count=`grep -c 'Fail:' $1`;echo "count="$count >>fail.txt

    #3、pass 、fail and error
    #through error log ,we can see check the error reason
    grep -E 'Fail:|Error:' $1 |sed  's/+0800//g' >failAndError.txt
    #total 
    count=`grep -Ec 'Fail:|Error:' $1`;echo "count="$count   >>failAndError.txt

    #4、warning 
    grep  'Warning:' $1 |sed  's/+0800//g' >warning.xml
    #total
    count=`grep -c 'Warning:' $1`;echo "count="$count  >>warning.xml

    #clear previous data
    >hudsonLog.txt

    echo "pass">>hudsonLog.txt;cat pass.txt>>hudsonLog.txt;echo "pass" >>hudsonLog.txt

    echo "fail">>hudsonLog.txt;cat fail.txt>>hudsonLog.txt;echo "fail" >>hudsonLog.txt

    echo "failAndError">>hudsonLog.txt;cat failAndError.txt>>hudsonLog.txt;echo "failAndError" >>hudsonLog.txt
    
    if(test -d "$SRCNAME/PictureAndXML") then
        echo "exist PictureAndXML"
    else 
        mkdir $SRCNAME/PictureAndXML
    fi

    #go to the ReportToolset directory
        cd $SRCNAME/ReportToolset
        #compile and run code source
        chmod 777 build.xml
        ant -file build.xml
    #cd /AppTestLog
    #cp $SRCNAME/ReportToolset/testCaseLog.xml testCaseLog.xml
        cd $SRCNAME
        cp -r ./PictureAndXML/ ./log
}
split $1

