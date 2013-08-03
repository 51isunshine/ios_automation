package com.ringcentral.email;

import java.util.Date;
import java.util.Properties;

/**
 * @author dylan
 * @email dylan.zhang@ringcentral.com
 * @date 2012-7-2
 */
public class EmailInfo {
	// private String auth = "true";
	// private String protocol = "smtp";
	// private String host = "smtp.emailsrvr.com";
	// private String port =25 ;
	private String auth;

	public String getAuth() {
		return auth;
	}

	public void setAuth(String auth) {
		this.auth = auth;
	}

	public String getProtocol() {
		return protocol;
	}

	public void setProtocol(String protocol) {
		this.protocol = protocol;
	}

	public String getPort() {
		return port;
	}

	public void setPort(String port) {
		this.port = port;
	}

	private String protocol;
	private String host;

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	private String port;

	// setup auth, host,port,protocol
	public Properties getProperties() {
		Properties pro = new Properties();
		pro.put("mail.smtp.auth", this.getAuth());
		pro.put("mail.transport.protocol", this.getProtocol());
		pro.put("mail.smtp.host", this.getHost());
		pro.put("mail.smtp.port", this.getHost());
		return pro;
	}

	// setup email info
	private Date sendDate;
	private String subject;
	// email content
	private String text;

	private String userName;
	private String password;

	private String formAddress;
	// receive user
	private String toAddress[];
	// cc user
	private String toCCAddress[];

	public String[] getToCCAddress() {
		return toCCAddress;
	}

	public void setToCCAddress(String[] toCCAddress) {
		this.toCCAddress = toCCAddress;
	}

	private String attachFileNames;

	public String getAttachFileNames() {
		return attachFileNames;
	}

	public void setAttachFileNames(String attachFileNames) {
		this.attachFileNames = attachFileNames;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFormAddress() {
		return formAddress;
	}

	public void setFormAddress(String formAddress) {
		this.formAddress = formAddress;
	}

	public String[] getToAddress() {
		return toAddress;
	}

	public void setToAddress(String toAddress[]) {
		this.toAddress = toAddress;
	}

	public Date getSendDate() {
		return sendDate;
	}

	public void setSendDate(Date sendDate) {
		this.sendDate = sendDate;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

}
