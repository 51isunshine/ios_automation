package com.ringcentral.util;


import java.text.SimpleDateFormat;

/**
 * @author dylan
 * @email dylan.zhang@ringcentral.com
 * @date  2012-6-19
 */
/*
 * 通过IP地址，日期，以及三个随机数，来为上传的名字名称。
 */
public class NamingUtil {
   private String ip;
   public NamingUtil()
   {	   
   }
   public NamingUtil(String ip){
	   this.ip=ip;//设置IP地址
   }
   //设置时间的格式。
   public String getTimeStamp()
   {
	   String temp=null;
	   //String str="yyyyMMddHHmmssSSS";
	   SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss");
	   temp=sdf.format(new java.util.Date());
	   return temp;
   }
   //得数随机数。
   public String getTimeStampRandom()
   {
	   StringBuffer stbf=new StringBuffer();
	   //拆分IP地址
	   if(this.ip!=null)
	   {
		   String strIP[]=this.ip.split("\\.");
		   for(int i=0;i<strIP.length;i++)
		   {
			   stbf.append(this.addZero(strIP[i], 3));
		   }
	   }
	   stbf.append(this.getTimeStamp());
	   //生成随机数。
	  // Random rand=new Random();
	   //循环生成
//	   for(int i=0;i<3;i++)
//	   {
//		   stbf.append(rand.nextInt(10));
//	   }
	   return stbf.toString();//以字符串输出。
   }
   //如果IP地址不足三位数，则补0
   public String addZero(String str,int i)
   {
	   StringBuffer stbf=new StringBuffer();
	   stbf.append(str);
	   while(str.length()<i)
	   {
		   stbf.insert(0, "0");
	   }
	   return stbf.toString();
	   
   }

}

