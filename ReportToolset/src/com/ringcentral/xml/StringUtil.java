package com.ringcentral.xml;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.ringcentral.util.PathUtil;

/**
 * @author dylan
 * @email dylan.zhang@ringcentral.com
 * @date 2012-6-19
 */
public class StringUtil {
	GetEveryLineString lineStr = new GetEveryLineString();
	public String passStr = lineStr.selectFile()[0];
	public String failStr = lineStr.selectFile()[1];
	public String failErrorStr = lineStr.selectFile()[2];
	public CreateXML createXML = new CreateXML();

	/**
	 * accord keyWorlds split String
	 * 
	 * @param String
	 *            strSplit = 'passStr' | 'failStr' | 'failErrorStr'
	 */

	public List<Object> StrSplit(String strSplit) {
		List<Object> strList = new ArrayList<Object>();
		String split[] = strSplit.split("\n");
		for (int i = 0; i < split.length - 1; i++) {
			// System.out.println(split[i]);
			// distinguish file's String type
			if (strSplit.equals(passStr)) {
				/*
				 * use List save Array data,split(Pass); EG: 2012-06-15 14:30:14
				 * The case Login: was passed.
				 */

				strList.add(split[i].split(PathUtil.logType[0]));
			}
			if (strSplit.equals(failStr)) {
				// split(Fail:);
				strList.add(split[i].split(PathUtil.logType[1]));
			}
			if (strSplit.equals(failErrorStr)) {
				if ((i + 1) % 2 == 0) {
					// keyWorlds is 'Fail:'
					strList.add(split[i].split(PathUtil.logType[1]));
					// System.out.println(split[i].split(logType[1])[1]);
				} else {
					// else if is 'Error: Type'
					String time = split[i].substring(0, 20);

					String secondStr = split[i].substring(21);
					int index = secondStr.indexOf(":");
					String type = secondStr.substring(0, index);

					type = secondStr.substring(index + 1);

					String errorType[] = { time, type };
					// System.out.println("time="+time+"   type="+type);
					strList.add(errorType);
					// strList.add(split[i].split(logType[2]));
					// System.out.println(split[i].split(logType[2])[1]);
				}

			}
		}
		return strList;
	}

	//
	public List<Map<String, String>> lineArrayString(List<?> list) {
		List<Map<String, String>> listMap = new ArrayList<Map<String, String>>();
		// loop print
		Iterator<?> it = list.iterator();
		String str[];
		while (it.hasNext()) {
			// cast to String[]
			str = (String[]) it.next();
			listMap.add(mapNameSet(lineArray(str)));
			// System.out.println(mapNameSet(lineArray(str)));
			// createXML.createXML(lineArray(str));

		}
		return listMap;
	}

	public Map<String, String> lineArray(String[] str) {
		// length always equals 2
		int length = str.length;
		Map<String, String> mapLine = new HashMap<String, String>();

		for (int i = 0; i < length; i++) {
			if (str.length == 1) {
				String Str0 = str[0].substring(0, 20);
				String Str1 = str[0].substring(21);
				mapLine.put(Str0, Str1);
			} else {
				mapLine.put(str[0], str[1]);
			}

		}
		return mapLine;
	}

	public Map<String, String> mapNameSet(Map<String, String> mapName) {
		// use Set to output 'key'
		// Set<String> mapKey = mapName.keySet();
		// use Collection to output 'value'
		// Collection mapValue = mapName.values();
		// save data;
		Map<String, String> scendmapLine = new HashMap<String, String>();
		Set<Map.Entry<String, String>> keyValue = mapName.entrySet();
		Iterator<Entry<String, String>> it = keyValue.iterator();
		while (it.hasNext()) {
			Map.Entry<String, String> me = (Entry<String, String>) it.next();
			// System.out.println(me.getKey()+" ---> "+me.getValue());
			scendmapLine.put(me.getKey(), me.getValue());
		}
		return scendmapLine;
	}
}
