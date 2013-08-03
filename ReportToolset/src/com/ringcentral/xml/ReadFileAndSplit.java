package com.ringcentral.xml;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

/**
 * @author dylan
 * @email dylan.zhang@ringcentral.com
 * @date 2012-6-19
 */

public class ReadFileAndSplit {
	public int readFile(String fileName, String fileLogType[]) {
		File file = new File(fileName);
		int number = 0;
		try {
			FileReader fileR = new FileReader(file);
			BufferedReader br = new BufferedReader(fileR);

			String fileLine;
			while ((fileLine = br.readLine()) != null) {
				// System.out.println(fileLine);
				if (fileLine.indexOf(fileLogType[0]) != -1
						|| (fileLine.indexOf(fileLogType[1]) != -1)
						| (fileLine.indexOf(fileLogType[2]) != -1)) {
					number++;
				}
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			System.out.println(e.getCause() + "   " + e.getMessage());
		}
		return number;
	}

	public int getFailNumber(String fileName, String fileLogType[]) {
		int numberFail = readFile(fileName, fileLogType);
		return numberFail;

	}

	public int getPassNumber(String fileName, String fileLogType[]) {
		int numberPass = readFile(fileName, fileLogType);
		return numberPass;
	}

}
