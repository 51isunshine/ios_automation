package com.ringcentral.xml;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.ringcentral.util.NamingUtil;
import com.ringcentral.util.PathUtil;

/**
 * @author dylan
 * @email dylan.zhang@ringcentral.com
 * @date 2012-6-19 * @modify 2012-8-13
 */

public class CreateXML {
	private static Document document;
	private static String xmlName = "testCaseLog.xml";
	/*
	 * get Document object
	 */
	static {
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		try {
			DocumentBuilder builder = factory.newDocumentBuilder();
			document = builder.newDocument();
		} catch (ParserConfigurationException e) {
			System.out.println(e.getClass() + " exception  " + e.getMessage());
		}
	}

	public int[] createXML() {
		int caseCount[] = keyWorldsXML();
		// output xml file
		printXML();

		return caseCount;
	}

	public int[] keyWorldsXML() {
		// create root element
		int total = 0;
		int pass = 0;
		int fail = 0;
		Element testsuits = document.createElement("testsuits");
		testsuits.setAttribute("name", "IPhone test automation");
		document.appendChild(testsuits);
		// create logType element

		StringUtil util = new StringUtil();
		GetEveryLineString lineStr = new GetEveryLineString();
		for (int i = 0; i < lineStr.selectFile().length; i++) {
			Element logType = document.createElement("testcase");
			int id = 1;
			String str = lineStr.selectFile()[i];
			if (str.equals(lineStr.selectFile()[0])) {
				testsuits.appendChild(logType);
				logType.setAttribute("status", "Passed");
			}
			// if(str.equals(lineStr.selectFile()[1])){
			// testsuite.appendChild(logType);
			// logType.setAttribute("name",FileStringInterface.logType[1]);
			// logType.setAttribute("status","Failure" );
			// }
			if (str.equals(lineStr.selectFile()[2])) {
				testsuits.appendChild(logType);
				// logType.setAttribute("name", PathUtil.logType[1]);
				logType.setAttribute("status", "Failure");
			}
			List<Map<String, String>> listMap = util.lineArrayString(util
					.StrSplit(str));
			Iterator<Map<String, String>> it = listMap.iterator();
			Map<String, String> mapLine;

			while (it.hasNext()) {

				mapLine = it.next();
				Set<Map.Entry<String, String>> keyValue = mapLine.entrySet();
				Iterator<Entry<String, String>> it_Two = keyValue.iterator();
				while (it_Two.hasNext()) {
					Map.Entry<String, String> me = (Entry<String, String>) it_Two
							.next();
					Element keyWorldType = null;
					String theCaseOfPass = null;
					if (str.equals(lineStr.selectFile()[0])) {
						if (!(me.getValue().equalsIgnoreCase(
								PathUtil.pass0logInOutGoType[0])
								|| me.getValue().equalsIgnoreCase(
										PathUtil.pass0logInOutGoType[1])
								|| me.getValue().equalsIgnoreCase(
										PathUtil.pass0logInOutGoType[2]) || me
								.getValue().equalsIgnoreCase(
										PathUtil.pass0logInOutGoType[3])
										||me.getValue().equalsIgnoreCase(PathUtil.pass0logInOutGoType[4])
										||me.getValue().equalsIgnoreCase(PathUtil.pass0logInOutGoType[5])
										||me.getValue().equalsIgnoreCase(PathUtil.pass0logInOutGoType[6]))) {
							theCaseOfPass = me.getValue();
							keyWorldType = CreateXML.document
									.createElement("pass");
							keyWorldType.setAttribute("id", "" + id);
							if (id == 1) {
								keyWorldType.appendChild(CreateXML.document
										.createTextNode(theCaseOfPass
												+ "   --Start time-- "
												+ me.getKey()));
							} else {
								keyWorldType.appendChild(CreateXML.document
										.createTextNode(theCaseOfPass));
							}

							// put the 'pass' to logType
							logType.appendChild(keyWorldType);
							id++;
						}

					}
					// if(str.equals(lineStr.selectFile()[1])){
					// keyWorldType =
					// CreateXML.document.createElement("failure");
					// keyWorldType.setAttribute("id", ""+id);
					// //create date element
					// Element date = CreateXML.document.createElement("date");
					// //set value;
					// date.appendChild(CreateXML.document.createTextNode(me.getKey()));
					// //add 'date'
					// keyWorldType.appendChild(date);
					// //create describe element
					// Element describe =
					// CreateXML.document.createElement("caseName");
					// //set value
					// describe.appendChild(CreateXML.document.createTextNode(me.getValue()));
					// //add 'describe'
					// keyWorldType.appendChild(describe);
					// //put the 'pass' to logType
					// logType.appendChild(keyWorldType);
					// id++;
					// // }
					if (str.equals(lineStr.selectFile()[2])) {
						if (!(me.getValue().equalsIgnoreCase(
								PathUtil.fail1logInOutGoType[0])
								|| me.getValue().equalsIgnoreCase(
										PathUtil.fail1logInOutGoType[1]) 
										|| me.getValue().equalsIgnoreCase(
										PathUtil.fail1logInOutGoType[2])
										||me.getValue().equalsIgnoreCase(PathUtil.fail1logInOutGoType[3]))) {
							if (!(id % 2 == 0)) {
								keyWorldType = CreateXML.document
										.createElement("CaseName");

								keyWorldType.appendChild(CreateXML.document
										.createTextNode(me.getValue()));
							} else {
								keyWorldType = CreateXML.document
										.createElement("ErrorMessage");
								keyWorldType.setAttribute("id", "" + (id + 1)
										/ 2);

								keyWorldType.appendChild(CreateXML.document
										.createTextNode(me.getKey() + " -- "
												+ me.getValue()));
							}
							logType.appendChild(keyWorldType);
							id++;
						}

					}
				}
			}
			if (str.equals(lineStr.selectFile()[0])) {

				logType.setAttribute("tests", "" + (id - 1));
				pass = id - 1;
			}
			// if(str.equals(lineStr.selectFile()[1])){
			// logType.setAttribute("tests",""+(id-1) );
			// fail = id-1;
			// }
			if (str.equals(lineStr.selectFile()[2])) {
				logType.setAttribute("tests", "" + (id - 1) / 2);
				fail = (id - 1) / 2;
			}
		}
		total = pass + fail;
		testsuits.setAttribute("total", "" + total);
		testsuits.setAttribute("passed", "" + pass);
		testsuits.setAttribute("failed", "" + fail);
		int caseCount[] = { pass, fail };
		return caseCount;
		// caseTotals.setTextContent(""+total);
	}

	// 保留方法
	public void findErrorFromXML() {
		// create root element
		int error = 0;
		Element testsuits = document.createElement("testsuits");
		Element testsuite = document.createElement("testsuite");
		testsuite.setAttribute("name", "IPhone test automation");
		testsuits.appendChild(testsuite);
		document.appendChild(testsuits);

		StringUtil util = new StringUtil();
		GetEveryLineString lineStr = new GetEveryLineString();
		for (int i = 0; i < lineStr.selectFile().length; i++) {
			Element logType = document.createElement("testcase");
			int id = 1;
			String str = lineStr.selectFile()[i];
			if (str.equals(lineStr.selectFile()[2])) {
				testsuite.appendChild(logType);
				logType.setAttribute("name", PathUtil.logType[2]);
			}
			List<Map<String, String>> listMap = util.lineArrayString(util
					.StrSplit(str));
			Iterator<Map<String, String>> it = listMap.iterator();
			Map<String, String> mapLine;

			while (it.hasNext()) {
				// System.out.println(it.next());
				mapLine = it.next();
				Set<Map.Entry<String, String>> keyValue = mapLine.entrySet();
				Iterator<Entry<String, String>> it_Two = keyValue.iterator();
				while (it_Two.hasNext()) {
					Map.Entry<String, String> me = (Entry<String, String>) it_Two
							.next();
					// System.out.println(me.getKey()+" ---> "+me.getValue());
					Element keyWorldType = null;
					if (str.equals(lineStr.selectFile()[2])) {

						if (id % 2 == 0) {
							keyWorldType = CreateXML.document
									.createElement("CaseName");

							keyWorldType.appendChild(CreateXML.document
									.createTextNode(me.getValue()));
						} else {
							keyWorldType = CreateXML.document
									.createElement("ErrorMessage");
							keyWorldType.setAttribute("id", "" + (id + 1) / 2);

							keyWorldType.appendChild(CreateXML.document
									.createTextNode(me.getKey() + " -- "
											+ me.getValue()));
						}
						logType.appendChild(keyWorldType);
						id++;
					}

				}

			}
			if (str.equals(lineStr.selectFile()[2])) {
				// logType.setAttribute("tests",""+(id-1)/2 );
				error = id - 1;
			}
		}
		testsuits.setAttribute("total", "" + error / 2);
	}

	public void outputErrorXML() {
		findErrorFromXML();
		// output xml file
		printXML();
	}

	public void printXML() {
		TransformerFactory tf = TransformerFactory.newInstance();
		NamingUtil nameUtil = new NamingUtil();
		// rename xmlName;
		xmlName = PathUtil.XML_PATH + nameUtil.getTimeStamp() + "CIlog.xml";
		try {
			Transformer transformer = tf.newTransformer();
			DOMSource source = new DOMSource(CreateXML.document);
			transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
			transformer.setOutputProperty(OutputKeys.INDENT, "yes");
			transformer.setOutputProperty(
					"{http://xml.apache.org/xslt}indent-amount", "2");
			PrintWriter pw = new PrintWriter(new FileOutputStream(xmlName));
			StreamResult result = new StreamResult(pw);
			transformer.transform(source, result);
			System.out.println("create XML success!");
		} catch (TransformerConfigurationException e) {
			System.out.println(e.getMessage());
		} catch (IllegalArgumentException e) {
			System.out.println(e.getMessage());
		} catch (FileNotFoundException e) {
			System.out.println(e.getMessage());
		} catch (TransformerException e) {
			System.out.println(e.getMessage());
		}
	}

	public String returnXmlName() {
		return xmlName;
	}
}
