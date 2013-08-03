package com.ringcentral;

import java.util.Date;

import com.ringcentral.email.EmailInfo;
import com.ringcentral.email.SendEmail;
import com.ringcentral.util.NamingUtil;

/**
 * @author dylan
 * @email dylan.zhang@ringcentral.com
 * @date 2012-6-19
 */
public class RunApp {
	/**
	 * main function
	 */
	public static void main(String[] args) {
		/*
		 * send email
		 */
		EmailInfo info = new EmailInfo();
		NamingUtil nameUtil = new NamingUtil();
		info.setSubject("Iphone test Auto: " + nameUtil.getTimeStamp()
				+ " CI log");
		info.setSendDate(new Date());
		info.setAuth("true");
		info.setHost("your host"); // anyway ,just like: smtp.emailsrvr.com
		info.setPort("your port");
		info.setProtocol("smtp");

		info.setFormAddress("dylan.zhang@ringcentral.com");

		// String strTo[] = { "example@example.com"};
		// String strTo[] = { "example2@example.com" };
		String strCC[] = {"example@example.com","jane.lai@example.com"};
		//String strCC[] = { "vicfeiyang@qq.com" };
		String strTo[] = { "example3@example.com" };
		info.setToAddress(strTo);
		info.setToCCAddress(strCC);

		info.setUserName("dylan.zhang@ringcentral.com");
		info.setPassword("your email passworld");

		SendEmail send = new SendEmail();
		boolean flag = send.sendTextEmail(info);
		if (flag) {
			System.out.println("email send success");
		} else {
			System.out.println("email send fail");
		}

	}
}
