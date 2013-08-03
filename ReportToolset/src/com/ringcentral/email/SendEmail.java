package com.ringcentral.email;

import java.util.Date;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import com.ringcentral.jfreechart.CreatePicture;
import com.ringcentral.util.PathUtil;
import com.ringcentral.xml.CreateXML;

/**
 * @author dylan
 * @email dylan.zhang@ringcentral.com
 * @date 2012-7-2
 */

public class SendEmail {
	private String getMailList(String[] mailArray) {
		StringBuffer toList = new StringBuffer();
		int length = mailArray.length;
		if (mailArray != null && length < 2) {
			toList.append(mailArray[0]);
		} else {
			for (int i = 0; i < length; i++) {
				toList.append(mailArray[i]);
				if (i != (length - 1)) {
					toList.append(",");
				}
			}
		}
		return toList.toString();
	}

	public boolean sendTextEmail(EmailInfo info) {
		boolean flag = false;

		try {
			Session session = Session.getInstance(info.getProperties(), null);
			Transport tran = session.getTransport();
			// session.setDebug(true);
			Message msg = new MimeMessage(session);

			InternetAddress from = new InternetAddress();
			from.setAddress(info.getFormAddress());
			// InternetAddress to = new InternetAddress();
			// to.setAddress(info.getToAddress());
			msg.setFrom(from);
			// msg.setRecipient(Message.RecipientType.TO, to);
			String toReceive = getMailList(info.getToAddress());
			InternetAddress to[] = InternetAddress.parse(toReceive);
			msg.setRecipients(Message.RecipientType.TO, to);

			String toCC = getMailList(info.getToCCAddress());
			InternetAddress toCCInt[] = InternetAddress.parse(toCC);
			msg.setRecipients(Message.RecipientType.CC, toCCInt);

			msg.setSubject(info.getSubject());
			msg.setSentDate(info.getSendDate());

			MimeMultipart multipart = new MimeMultipart("related");

			// first part (the html)
			BodyPart messageBodyPart = new MimeBodyPart();
			String htmlFormat = "<html> <head> <body> Hello: <div>  <p>  This is our run result picture  ："
					+ "</p>"
					+ "</div>  <div>  <img src=\"cid:image0\"> <br/><font style='color:red;font-size:12px;'> <p> </p></font>"
					+ "</div>   <div><font style='color:green;font-size:12px;'> This email is auto send after run ! <br />time = "
					+ new Date()
					+ " !"
					+ "<br /> if you want to more info ,please see the attach file !<br /> if you have any question ,please contact with Dylan zhang !<br />"
					+ "</font><div> Thanks <br /> Dylan zhang !<div/>"
					+ "</div>" + "</body>" + "</head>" + "</html>";
			// String htmlText =
			// "<H3>Hello:<br />这是测试结果图，由远行完之后自动发出：</H3><img src=\"cid:image\">";
			String htmlText = htmlFormat;
			messageBodyPart.setContent(htmlText, "text/html;charset=utf-8");
			// add it
			multipart.addBodyPart(messageBodyPart);
			// second part (the image)
			/*
			 * get the xml's name and picture's path
			 */
			CreatePicture picture = new CreatePicture();
			/*
			 * First : new CreatePicture object ,then call createCasePieChart
			 * function to create picture.
			 */
			String picturePath[] = picture.returnPicturePath(picture
					.outputeAllCasePieChart());

			messageBodyPart = new MimeBodyPart();
			DataSource fds = new FileDataSource(picturePath[0]);
			messageBodyPart.setDataHandler(new DataHandler(fds));
			// String image0 = "<image" + 0 + ">";
			messageBodyPart.setHeader("Content-ID", "<image0>");
			// add it
			multipart.addBodyPart(messageBodyPart);

			// add attachment file
			messageBodyPart = new MimeBodyPart();
			CreateXML XMLName = new CreateXML();
			String xmlName = XMLName.returnXmlName();

			DataSource fda = new FileDataSource(xmlName);
			messageBodyPart.setDataHandler(new DataHandler(fda));

			messageBodyPart.setFileName("log.xml");
			multipart.addBodyPart(messageBodyPart);

			String logFile = PathUtil.TEST_LOG_FILE;
			;
			messageBodyPart = new MimeBodyPart();
			DataSource fda1 = new FileDataSource(logFile);
			messageBodyPart.setDataHandler(new DataHandler(fda1));
			messageBodyPart.setFileName("TestlogFile.txt");
			multipart.addBodyPart(messageBodyPart);

			// put everything together
			msg.setContent(multipart);
			tran.connect(info.getHost(), info.getUserName(), info.getPassword());
			tran.sendMessage(msg, msg.getAllRecipients());
			flag = true;
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			flag = false;
		}

		return flag;
	}
}
