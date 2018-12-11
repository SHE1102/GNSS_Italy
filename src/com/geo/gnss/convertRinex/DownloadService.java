package com.geo.gnss.convertRinex;

import org.apache.ibatis.session.SqlSession;

import com.geo.gnss.mybatis.MybatisUtils;

public class DownloadService {

	public void save(DownloadInforDao inforDao){
		SqlSession session = MybatisUtils.getSession();
		session.insert("insertDownloadLog", inforDao);
		session.commit();
		session.close();
	}
}
