<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>卫星信息</title>
        <link rel="SHORTCUT ICON" href="../img/btn.jpg"/>
        
        <link rel="stylesheet" type="text/css" href="../css/Frame.css"/>
        <link rel="stylesheet" type="text/css" href="../css/satelliteInfo.css"/>
        <script type="text/javascript" src="../js/jquery-1.9.0.min.js" ></script>
        <script type="text/javascript" src="../js/highcharts.js" ></script>
        <link rel="stylesheet" type="text/css" href="../css/leaflet.css" >
        <script src="../js/leaflet.js"></script>
        
    </head>
    <body>
    	<%@ include file="header.jsp" %>
    	<%@ include file="menuHor.jsp" %>
    	
    	<div class="Body">
    		<div class="Content"  >
	    		<div id="SkyplotDiv" >
	    		     <select id="StationList" ></select>
	    		     <div id="Paint" class="FlexDiv">
	    		         <div>
	    		             <div id="ChartTitle">Signal to Noise Ratio[dBHz]</div>
	    		             <div id="ChartDiv" class="FlexDiv">
			    		         <div id="GChart" class="Chart"></div>
			    		         <div id="RChart" class="Chart"></div>
			    		         <div id="CChart" class="Chart"></div>
	    		             </div>
	    		         </div>
	    		         <canvas id="Skyplot"  width="800px" height="800px"></canvas>
	    		     </div>
	    		</div>
    		</div>
    	</div>
    	
    	<%@ include file="foot.jsp" %>
 	</body>
 	<script src="../js/main.js" type="text/javascript"></script>
 	<script src="../js/stationSkyplot.js" type="text/javascript"></script>
</html>