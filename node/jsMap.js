/**
 * 
 * User: dylan.zhang
 * Date: 13-4-12
 * Time: 下午6:52
 */
//var fs = require('fs');
function JSMap() {
    this.version = "1.0.1";
    this.elements = new Array();
};
JSMap.prototype = {
    constructor :JSMap ,
    /**
     * get map's length
     * @return {Number}
     */
    size : function() {
    return this.elements.length;
},
/**
 * isEmpty function
 * @return {Boolean}
 */
    isEmpty : function() {
    return (this.elements.length < 1);
},
/**
 * remove all of the element
 */
    removeAll : function() {
    this.elements = new Array();
},
/**
 * put（key, value) to map,must keep key is the unique value in map
 * @param _key
 * @param _value
 * @return {Boolean}
 */
    put : function(_key, _value) {
    if(!this.containsKey(_key)){
        this.elements.push( {
            key : _key,
            value : _value
        });
        return true;;
    }
    return false;
},
/**
 * remove the key which your  appointment
 * @param _key
 * @return {Boolean}
 */
    remove: function(_key) {
    var flag = false;
    try {
        for (var i = 0,length=this.elements.length; i <length; i++) {
            if (this.elements[i].key == _key) {
                this.elements.splice(i, 1);
                flag = true;
                return flag;
            }
        }
    } catch (e) {
        flag = false;
    }
    return flag;
},
/**
 * getValueFromKey
 * @param _key
 * @return {*}
 */
    getValueFromKey : function(_key) {
    try {
        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].key == _key) {
                return this.elements[i].value;
            }
        }
    } catch (e) {
        return null;
    }
},
/**
 * if "Value" is Object ,return true;
 * @param _key
 * @return {Boolean}
 */
    assertValueType : function(_key){
    var valueType = this.getValueFromKey(_key);
    var flag = false;
    if((valueType !== null)&&((typeof valueType)==="object")){
        flag = true;
        return flag;
    }
    return flag;
},
/**
 * get array value of Map.
 *      if want to get key or value ,please using element.key，element.value
 * @param _index
 * @return {*}
 */
    element : function(_index) {
    if (_index < 0 || _index >= this.elements.length) {
        return null;
    }
    return this.elements[_index];
},
/**
 * assert whether include special key
 * @param _key
 * @return {Boolean}
 */
    containsKey : function(_key) {
    var flag = false;
    try {
        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].key == _key) {
                flag = true;
            }
        }
    } catch (e) {
        flag = false;
    }
    return flag;
},

/**
 * assert whether include special key
 * @param _value
 * @return {Boolean}
 */
    containsValue : function(_value) {
    var flag = false;
    try {
        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].value == _value) {
                flag = true;
            }
        }
    } catch (e) {
        flag = false;
    }
    return flag;
},

/**
 *  get all of the values
 * @return {Array}
 */
    values : function() {
    var arr = new Array();
    for (var i = 0; i < this.elements.length; i++) {
        arr.push(this.elements[i].value);
    }
    return arr;
},
/**
 *  get all of the keys
 * @return {Array}
 */
    keys : function() {
    var arr = new Array();
    for (var i = 0; i < this.elements.length; i++) {
        arr.push(this.elements[i].key);
    }
    return arr;
}
};

var map = new JSMap();
map.put(1,"one");
console.log(map.put(1,"one"));
console.log(map.keys());
(function(){
    console.log("hello world");
    console.log(map.version);
})();
var map1 = new JSMap();
map1.put("2","two");
console.log(map.keys());
console.log(map1.keys());
console.log(map1.values()+"  "+ map1.version);
console.log(new JSMap().version);
