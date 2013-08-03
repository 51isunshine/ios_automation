package com.ringcentral.xml;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import com.ringcentral.util.PathUtil;

/**
 * @author dylan
 * @email dylan.zhang@ringcentral.com
 * @date 2012-6-19
 * @modify 2012-8-13
 */
public class GetEveryLineString {
	public boolean assertFileIsExist() {
		boolean flag = false;
		for (int i = 0; i < PathUtil.path.length; i++) {
			File file = new File(PathUtil.path[i]);
			if (file.exists()) {
				flag = true;
			}
		}
		return flag;
	}

	public String[] selectFile() {
		String strCount[] = new String[PathUtil.path.length];
		if (!assertFileIsExist()) {
			return strCount;
		}

		File file = null;
		int i = 0;
		while (i < PathUtil.path.length) {
			file = new File(PathUtil.path[i]);
			if (i == 0) {
				strCount[i] = readLine(file);
			}
			if (i == 1) {
				strCount[i] = readLine(file);
			}
			if (i == 2) {
				strCount[i] = readLine(file);
			}
			i++;
		}
		return strCount;
	}

	// return string
	public String readLine(File file) {
		StringBuffer stb = new StringBuffer();
		try {
			// call pathFile() function
			FileReader fr = new FileReader(file);
			BufferedReader buf = new BufferedReader(fr);
			String readLine;
			while ((readLine = buf.readLine()) != null) {
				stb.append(readLine + "\n");
			}
		} catch (FileNotFoundException e) {
			System.out.println(e.getClass() + " exception  " + e.getMessage());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return stb.toString();
	}

}
