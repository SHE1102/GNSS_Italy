<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>站点地图</title>
        <link rel="SHORTCUT ICON" href="img/btn.jpg"/>
        
        <link rel="stylesheet" type="text/css" href="css/Frame.css"/>
        <script type="text/javascript" src="js/jquery-1.9.0.min.js" ></script>
        <link rel="stylesheet" type="text/css" href="css/leaflet.css" >
        <script src="js/leaflet.js"></script>
        
        <style>
            #OSM{width:98%;height:850px;margin-left:15px;}
            span#SelectMap{float:right;border:20px solid transparent;border-right-color: #DDD;}
        </style>
    </head>
    <body>
    	<%@ include file="header.jsp" %>
    	
    	<div class="Body">
    		<%@ include file="menu.jsp" %>
    		
    		<div class="Content"  >
    			 <div id="OSM"></div>
    		</div>
    		
    	</div>
    	
    	<div class="Foot"></div>
 	</body>
 	<script src="js/main.js" type="text/javascript"></script>
 	<script src="js/stationMap.js" type="text/javascript"></script>
</html>