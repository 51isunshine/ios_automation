#! /bin/bash

# Created by dylan

SRCNAME="$1"
echo "srcname = $SRCNAME"
cd $SRCNAME
chmod 777 $SRCNAME/test.sh
#delBuildDir ----> create_log_file ---> loop_log_file ----> exce_testLogFile

#module_log是个目录，存放终端输出的远行log
if(test -d "$SRCNAME/module_log") then
    echo "module_log exist"
else 
    mkdir $SRCNAME/module_log
fi

function delBuildDir(){
        cd ..
        echo `pwd`
        if(test -d "./AppTestLog") then
            echo "AppTestLog exist"
        else
            mkdir AppTestLog
        fi

        cd $SRCNAME
        tmpdir=$(basename `pwd`);  echo "$tmpdir"
        cd .. ; cd AppTestLog
        mkdir "$tmpdir"

        cd "$tmpdir"

        echo "now the dir is ? `pwd`"
        now=$(date "+%m-%d_%H-%M-%S")

        cp -r $SRCNAME/PictureAndXML  .
        mv PictureAndXML $now" chartlog"

        cp -r $SRCNAME/module_log .
        mv module_log $now" runLog"

        cd $SRCNAME
    
#     rm -rf $SRCNAME/module_log/*.*
#     rm -rf $SRCNAME/logFile/*.*
}
delBuildDir

function create_log_file(){
    cd $SRCNAME
# ./test.sh $SRCNAME/yourTestCaseScript > module_log/your moduleName.xml
#messages model  #### 单目录
####（例如，运行把Messages模块下的脚本，并且把运行log输出到module_log下的messages.xml中）
    ./test.sh $SRCNAME/Tests/messages >module_log/messages.xml
    sleep 5

####  如果是多目录，可以copy一份，仿p0.sh   ####
    file_=`find $SRCNAME/module_log -name "*.xml" -depth 1`
    mkdir $SRCNAME/tmp
        for log_file in $file_ 
        do
            cat $log_file >> $SRCNAME/tmp/all.xml
        done
    /bin/mv $SRCNAME/tmp/all.xml module_log/
    rm -rf $SRCNAME/tmp
    sleep 5
}
create_log_file
function exce_testLogFile(){
        cd $SRCNAME/logFile
        if(test -f "$SRCNAME/logFile/testLogFile.sh") then
            echo "exist testLogFile.sh"
        else 
            chmod 777 $SRCNAME/testLogFile.sh
            cp $SRCNAME/testLogFile.sh $SRCNAME/logFile
            chmod 777 $SRCNAME/logFile/testLogFile.sh
        fi
        ./testLogFile.sh $1
        echo "$1 has exceuteed end !"
}
function loop_log_file(){
    _file=`find $SRCNAME/module_log -name "*.xml" -depth 1`
    for log_file in $_file 
    do
        exce_testLogFile $log_file
    done
}
loop_log_file 


