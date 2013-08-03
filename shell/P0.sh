#! /bin/bash

# Created by dylan
SRCNAME="$1"
echo "srcname = $SRCNAME"
cd $SRCNAME

chmod 777 $SRCNAME/test.sh
#delBuildDir ----> create_log_file ---> loop_log_file ----> exce_testLogFile

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
    
      rm -rf $SRCNAME/module_log/*.*
      rm -rf $SRCNAME/logFile/*.*
}
delBuildDir
P0_dir=$SRCNAME/Tests/P0
function create_log_file(){
    killall -9 'Instruments'
    killall -9 Instruments
    cd $SRCNAME
    for file_dir in ` ls $P0_dir `
    do
       
        if [ $file_dir != "P0.sh" ]
        then
            ./test.sh $SRCNAME/Tests/P0/$file_dir >module_log/$file_dir.xml
            sleep 5
        fi
    done
    file_=`find $SRCNAME/module_log -name "*.xml" -depth 1`
    mkdir $SRCNAME/tmp
        for log_file in $file_ 
        do
            cat $log_file >> $SRCNAME/tmp/P0.xml
        done
    if(test -f "$SRCNAME/module_log/P0.xml") then
        rm -rf $SRCNAME/module_log/P0.xml
    fi
    /bin/mv $SRCNAME/tmp/P0.xml module_log/
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


