
/**
 * User: dylan
 * Date: 3/19/13 ,Modify 3/20/13
 * Time: 2:22 PM
 */

//node.js
//var jsonDataTest = { 'id1':"pass",'id2': "fail"};

var fs = require('fs');
var path = require('path');

function saveFile(jsonData){
    path.exists('./data',function(exist){
        exist ? "it's here" : fs.mkdir('./data',function(err){
            if(err){
                console.error(err);
                return ;
            }
        });

        var jsonPath = './data/data.json';

        //open a file,if not exist,then create it.
        fs.open(jsonPath,'w+',function(err,fd){
            if(err){
                console.error(err);
                return ;
            }
            fs.writeFile(jsonPath,JSON.stringify(jsonData),'utf-8',function(err){
                if(err){
                    console.error(err);
                    return;
                }

            })
        })
    });
};

process.argv.forEach(function(val,index,array){
  if(index == array.length-1){
      var str = JSON.parse(array[index]);
      saveFile(str);
  }
})

