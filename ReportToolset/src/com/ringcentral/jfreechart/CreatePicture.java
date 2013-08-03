package com.ringcentral.jfreechart;

import com.ringcentral.util.NamingUtil;
import com.ringcentral.util.PathUtil;
import com.ringcentral.xml.*;

import java.awt.Color;
import java.awt.Font;
import java.io.*;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import org.jfree.data.general.DefaultPieDataset;
import org.jfree.data.general.PieDataset;
import org.jfree.chart.*;
import org.jfree.chart.labels.StandardPieSectionLabelGenerator;
import org.jfree.chart.plot.*;

/**
 * @author dylan
 * @email  dylan.zhang@ringcentral.com
 * @date 2012-6-19
 */

/**
 * 该类用于演示最简单的柱状图生成
 */
public class CreatePicture {
	private static String pathPicture = null;

	public String[] outputeAllCasePieChart() {
		CreateXML createXML = new CreateXML();
		int caseCount[] = createXML.createXML();
		//String pathTestScript = createCasePieChart(getDataOnlySet(new DefaultPieDataset(), caseCount),"PassFailPercent_Chart");
		String pathAllCase = createCasePieChart(
				getDataSet(new DefaultPieDataset(), caseCount), "LogAllChart");
		String pathAllAndTestScriptPicture[] = {  pathAllCase };
		return pathAllAndTestScriptPicture;
	}

	private String createCasePieChart(PieDataset pieDataset, String name) {
		NamingUtil nameUtil = new NamingUtil();
		JFreeChart chart = ChartFactory.createPieChart3D(name + " ",
				pieDataset, true, false, false);

		PiePlot pp = (PiePlot3D) chart.getPlot();
		pp.setLabelFont(new Font("宋体", 0, 12));
		// pp.setNoDataMessage("无数据显示");
		pp.setCircular(true);
		pp.setSectionOutlinesVisible(false);
		pp.setLabelGap(0.03D);
		pp.setStartAngle(40D);
		pp.setSectionPaint("pass", Color.green);
		pp.setSectionPaint("failure", Color.red);
		pp.setLabelGenerator(new StandardPieSectionLabelGenerator(
				"{0}={1}({2})", NumberFormat.getNumberInstance(),
				new DecimalFormat("0.00%")));
		pp.setMaximumLabelWidth(0.0);
		pp.setNoDataMessage("No data");
		pathPicture = PathUtil.PICTURE_PATH + nameUtil.getTimeStamp() + name
				+ ".jpg";
		File fos_jpg = null;
		try {
			fos_jpg = new File(pathPicture);
			ChartUtilities.saveChartAsJPEG(fos_jpg, chart, 500, 300);
			System.out.println("create picture success");
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
		return pathPicture;
	}

	// 保留方法
	public String[] returnPicturePath(String path[]) {
		return path;
	}

	/**
	 * 数据源 这是总数据。
	 * 
	 * @return PieDataset type 饼图数据
	 */
	private static PieDataset getDataSet(DefaultPieDataset dataset,
			int[] caseCount) {
		dataset.setValue("pass", caseCount[0]);
		dataset.setValue("failure", caseCount[1]);
		return dataset;
	}

//	/*
//	 * 这是扣除login.logout.gotomainpage而得到的单纯case数据。
//	 */
//	private static PieDataset getDataOnlySet(DefaultPieDataset dataset,
//			int[] caseCount) {
//		ReadFileAndSplit typeNumber = new ReadFileAndSplit();
//		dataset.setValue(
//				"failure",
//				caseCount[1]
//						- typeNumber.getFailNumber(PathUtil.path[1],
//								PathUtil.fail1logInOutGoType));
//		dataset.setValue(
//				"pass",
//				caseCount[0]
//						- typeNumber.getPassNumber(PathUtil.path[0],
//								PathUtil.pass0logInOutGoType));
//
//		// writer the number of failure or pass to casenumber.txt
//		//int failure_number = caseCount[1]- typeNumber.getFailNumber(PathUtil.path[1],PathUtil.fail1logInOutGoType);
//		//int pass_number = caseCount[0]- typeNumber.getPassNumber(PathUtil.path[0],PathUtil.pass0logInOutGoType);
//		
//		
//
//		return dataset;
//	}
}