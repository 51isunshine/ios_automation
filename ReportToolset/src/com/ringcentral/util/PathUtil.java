package com.ringcentral.util;

import java.io.FileInputStream;
import java.util.Properties;

/**
 * @author dylan
 * @email dylan.zhang@ringcentral.com
 * @date 2012-6-19
 * @modify 2012-8-13
 */

public class PathUtil {
	private static Properties prop;

	public static String get(String key) {
		// System.out.println("dir="+System.getProperty("user.dir"));
		// String
		// filePath1=System.getProperty("user.dir")+"/src/ringcentral.properties";
		// System.out.println("filePath1="+filePath1);
		if (prop == null) {
			prop = new Properties();
			try {

				// String file = new PathUtil().getClass()
				// .getResource(System.getProperty("user.dir")+"src/ringcentral.properties").toURI()
				// .getPath();
				// System.out.println("file="+file);
				String file = System.getProperty("user.dir")
						+ "/src/ringcentral.properties";
				System.out.println(file);
				prop.load(new FileInputStream(file));
			} catch (Exception e) {
				throw new Error(
						"Can't find the \"ringcentral.properties\" file,please add it ");
			}
		}
		String value = prop.getProperty(key);
		if (value == null || value.trim() == "") {
			return null;
		}

		return value.trim();
	}

	public static final String sysFilePath = System.getProperty("user.dir");
	public static final String sysFilePath_logFile = sysFilePath
			+ "/../logFile/";
	public static final String sysFilePath_reportLog = sysFilePath + "/../";

	public static final String path[] = {
			sysFilePath_logFile + PathUtil.get("Pass"),
			sysFilePath_logFile + PathUtil.get("Fail"),
			sysFilePath_logFile + PathUtil.get("FailAndError") };
	public static final String PICTURE_PATH = sysFilePath_reportLog
			+ PathUtil.get("PICTURE_PATH");
	public static final String TEST_LOG_FILE = sysFilePath_reportLog
			+ PathUtil.get("TEST_LOG_FILE");
	public static final String XML_PATH = sysFilePath_reportLog
			+ PathUtil.get("PICTURE_PATH");;

	public static final String keyWorlds[] = { "pass", "fail", "failAndError" };
	public static final String logType[] = { "Pass: ", "Fail: ", "Error: " };

	public static final String fail1logInOutGoType[] = {
			"The case ' Login: ' was failed.",
			"The case ' logout:  ' was failed.",
			"The case ' gobackToMainMenuPage ' was failed.",
			"The case ' login ' was failed." };
	public static final String pass0logInOutGoType[] = {
			"The case ' Login: ' was passed.",
			"The case ' logout:  ' was passed.",
			"The case ' gobackToMainMenuPage ' was passed.",
			"The case ' logoutAndLogin ' was passed.",
			"The case ' login ' was passed.",
			"The case ' logout ' was passed.",
			"The case ' logout: ' was passed." };
}
