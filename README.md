简单介绍：
JS:  对原生UIAutomation类库的一些封装。其中借鉴不少开源项目，例如：taobao athrun框架.
  appTest.js文件中的appTest()方法是测试入口函数方法；
	assertion.js 包括一些常用的验证方法；
	automation-extend.js 包含常用的扩展方法；
	log.js 是统一日志处理文件，可选项；
	swap.js 是用于id或name的交换匹配；
	app_info.js 包含一些对device、app基础信息获取的方法。
	imports.js 用于导入

node:
	result.js 采用node.js的fs与path模块，配合result.sh可以进行文件的读写操作；
	result.sh 结合result.js
	test.js 是个测试文件；
	目前 只完成了基础读写功能，可以结合更多的node模块进行扩展；并且只能Instruments GUI界面上有测试，
	还没有在终端上测试；生成的结果存放data目录下；

	采用node.js的原由：
		统一语言，同为js; 
		node.js强大的io操作能力；
		更易维护，结果更为清晰；
		shell与ReportToolset 有点复杂，有点乱；

reset_simulator：
	用于模拟器，重置等；不适合device; 
testCase:
	element.js：存放元素；
	ｍodul.js : 存放测试脚本函数；
	modul_test.js : 是个test case集合；统一存放appTest；

shell 与 ReportToolset 是用于在终端远行脚本，进行持续集成操作的；
	shell : 
			start.sh : 设置测试目录与装载测试文件
			test.sh ： 启动instrument。
			testLogFile.sh 是处理log 文件；

	ReprortToolset ： 
			是个Java project.
			主要用成xml文件，生成饼图，发送email；
	由start.sh ---> test.sh ---> testLogFile.sh
	所有捕捉到终端的远行log 存放在module_log目录，会自动建立；之后由testLogFile.sh进行分解；
	PictureAndXML目录用于存放图与xml文件；

author: dylan zhang
email : dylan.zhang@ringcentral.com or vicfeiyang@qq.com
