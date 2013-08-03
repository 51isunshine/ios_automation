/**
 * 可以根据应用的模块把一些元素抽离出来，然后通过rc_get系列方法，进行调用。
 *      例如： MessagesAllPage,它是Object
 * @type {{}}
 */
MessagesAllPage={};
MessagesAllPage.title   = "app.mainWindow().navigationBar().staticTexts()[0]";
MessagesAllPage.MessageAll   = "app.mainWindow().images()[1].segmentedControls()[0].buttons()[0]";
MessagesAllPage.MessageVoice = "app.mainWindow().images()[1].segmentedControls()[0].buttons()[1]";
MessagesAllPage.MessageFax   = "app.mainWindow().images()[1].segmentedControls()[0].buttons()[2]";
MessagesAllPage.MessageText  = "app.mainWindow().images()[1].segmentedControls()[0].buttons()[3]";