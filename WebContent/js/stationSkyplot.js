$(function(){
	
	
	initialChart();
	var $canvas = $("#Skyplot");
	//$canvas[0].width = $("#SkyplotDiv").width();
	//$canvas[0].height = $("#SkyplotDiv").height();
	
	$(window).resize(function() {
		//$canvas[0].width = $("#SkyplotDiv").width();
		//paintBackground();
		//changeStation();
	});

	paintBackground();
	
	$.getJSON("../Station",{userType: "Tourist"}, function(json){
		showList(json);
	})
	
	function showList(json){
		var $option = $("<option></option>").val(0).text("--select--");
		$("#StationList").append($option);
		
		for(var i=0;i<json.station.length;i++){
			var station = json.station[i];
			
			var $option = $("<option></option>").val(1).text(station.id + "-" + station.name);
			$("#StationList").append($option);
		}
	}
	
	$("#StationList").change(function(){
		changeStation();
	})
	
	setInterval(function(){
		changeStation();
	}, 30*1000);
	
	function changeStation(){
		var $name = $("#StationList option:selected").text();
		var $val = $("#StationList option:selected").val();
		paintBackground();
		
		if($val == 0){
			return;
		}
		
		var $arr = $name.split("-");
		
		$.getJSON("../Skyplot",{stationName: $arr[1]},function(json){
			paintSkyplot(json);
			paintGraph(json);
		});
	}
	
	function paintBackground() {
		 var $canvas = $("#Skyplot");
		 
		 var width = $canvas.width();
		 var height = $canvas.height();
		 
		 var centerx = width/2;
		 var centery = height/2;
		 
		 var R,nR;
		 if(width > height) {
			 R = (height-100)*2/5;
		 } else {
			 R = (width-100)*2/5;
		 }
		 nR = R/3;
		 
		 var context = $canvas.get(0).getContext("2d");
		 //var context = document.getElementById("Skyplot").getContext("2d");
		 context.clearRect(0,0,width,height);
		 context.beginPath();
		 context.arc(centerx,centery,nR,0,2*Math.PI);
		 context.fillStyle = "#333333";
		 context.strokeStyle = "#333333";
		 context.stroke();
		 
		 context.beginPath();
		 context.arc(centerx,centery,2*nR,0,2*Math.PI);
		 context.stroke();
		 
		 context.beginPath();
		 context.arc(centerx,centery,3*nR,0,2*Math.PI);
		 context.stroke();
		 
		 var dRateAngle,ptx,pty,text_x,text_y, text;
		 
		 for(var i=0;i<12;i++) {
			 dRateAngle = 30.0*i*Math.PI/180.0;
			 
			 ptx = centerx + R*Math.sin(dRateAngle);
			 pty = centery - R*Math.cos(dRateAngle);
			 
			 context.moveTo(centerx,centery);
			 context.lineTo(ptx, pty);
			 context.stroke();
			 
			 text_x = centerx + (R+15)*Math.sin(dRateAngle);
			 text_y = centery - (R+15)*Math.cos(dRateAngle);
			 
			 text = 30*i;
			 context.font = "15px normal";
			 context.textAlign="center";
			 context.textBaseline="middle";
			 context.fillText(text, text_x, text_y);
		 }
		 
		 var left,top,right,bottom,rectWidth,rectHeight;
		 rectWidth = 80
		 rectHeight = 30;
		 
		 left = width-50 - rectWidth;
		 top = 10;
		 
		 context.fillStyle = "#0000FF";
		 context.fillRect(left,top,rectWidth,rectHeight);
		 context.fillStyle = "#333333";
		 context.font = "15px normal";
		 context.textAlign="center";
		 context.textBaseline="middle";
		 context.fillText("GPS", left+rectWidth/2, top+rectHeight/2);
		 
		 top = top+rectHeight + 10;
		 context.fillStyle = "#FF0000";
		 context.fillRect(left,top,rectWidth,rectHeight);
		 context.fillStyle = "#333333";
		 context.fillText("GLONASS", left+rectWidth/2, top+rectHeight/2);
		 
		 top = top+rectHeight + 10;
		 context.fillStyle = "#00FF00";
		 context.fillRect(left,top,rectWidth,rectHeight);
		 context.fillStyle = "#333333";
		 context.fillText("BeiDou", left+rectWidth/2, top+rectHeight/2);
		 
		 top = top+rectHeight + 10;
		 context.fillStyle = "#FF0080";
		 context.fillRect(left,top,rectWidth,rectHeight);
		 context.fillStyle = "#333333";
		 context.fillText("Galileo", left+rectWidth/2, top+rectHeight/2);
		 
		 top = top+rectHeight + 10;
		 context.fillStyle = "#808080";
		 context.fillRect(left,top,rectWidth,rectHeight);
		 context.fillStyle = "#333333";
		 context.fillText("SBAS", left+rectWidth/2, top+rectHeight/2);
	 }
	 
	
	
	 function paintSkyplot(satelliteJson) {
		 var $canvas = $("#Skyplot");
		 
		 var context = $canvas.get(0).getContext("2d");
		 
		 var width = $canvas.width();
		 var height = $canvas.height();
		 
		 var R,nR;
		 if(width > height) {
			 R = (height-100)*2/5;
		 } else {
			 R = (width-100)*2/5;
		 }
		 nR = 20;
		 
		 var nameLeft,nameTop,nameWidth,nameHeight;
		 nameLeft = width-50-80-20-100;
		 nameTop = 10;
		 nameWidth = 100;
		 nameHeight = 30;
		 
		 //context.fillStyle = "#80CCFF";
		 //context.fillRect(nameLeft,nameTop,nameWidth,nameHeight);
		 //context.fillStyle = "#446fee";
		 //context.font = "15px normal";
		 //context.textAlign="center";
		 //context.textBaseline="middle";
		 //context.fillText(satelliteJson.stationName, nameLeft + nameWidth/2, nameTop + nameHeight/2);
		 
		 var xdown, ydown,satpoint_x,satpoint_y;
		 var left,right,top,bottom;
		 for(var i=0;i<satelliteJson.satellite.length;i++){
				var Sat = satelliteJson.satellite[i];
				
				var dRate=0;
				dRate = Sat.elevation/90.0;
				
				xdown = R*Math.sin(Sat.azimuth*Math.PI/180.0)*(1-dRate);
				ydown = R*Math.cos(Sat.azimuth*Math.PI/180.0)*(1-dRate);
				
				if (Math.sqrt(xdown*xdown + ydown*ydown) > (R+3))
				{
					continue;
				}
				
				satpoint_x =width/2-R + R + xdown;
				satpoint_y = height/2 - R +R - ydown;
				
				top = satpoint_y - nR;
				bottom = satpoint_y + nR;
				left = satpoint_x - nR;
				right = satpoint_x + nR;
				
				context.beginPath();
				if(Sat.type == 0){
					context.fillStyle = "#0000FF";
				}
				else if(Sat.type == 1) {
					context.fillStyle = "#FF0000";
				}
				else if(Sat.type == 2) {
					context.fillStyle = "#00FF00";
				}
				else if(Sat.type == 3) {
					context.fillStyle = "#FF0080";
				}
				else {
					context.fillStyle = "#008000";
				}
				
				//context.arc(left+nR/2,top+nR/2,nR,0,2*Math.PI);
				context.arc(satpoint_x,satpoint_y,nR,0,2*Math.PI);
				context.fill();
				 
				context.fillStyle = "#000000";
				//context.fillText(Sat.id, left+nR/2, top+nR/2);
				context.fillText(Sat.id, satpoint_x, satpoint_y);
		 }
	 }
	 
	 function paintGraph(satelliteJson){
		 var $categoriesG = new Array();
		 var $dataG1 = new Array();
		 var $dataG2 = new Array();
		 
		 var $categoriesR = new Array();
		 var $dataR1 = new Array();
		 var $dataR2 = new Array();
		 
		 var $categoriesC = new Array();
		 var $dataC1 = new Array();
		 var $dataC2 = new Array();
		 
		 for(var i=0;i<satelliteJson.satellite.length;i++){
				var Sat = satelliteJson.satellite[i];
				
				if(Sat.type == 0){
					$categoriesG.push(Sat.id);
					$dataG1.push(Number(Sat.snr0));
					$dataG2.push(Number(Sat.snr1));		
				} else if(Sat.type == 1){
					$categoriesR.push(Sat.id);
					$dataR1.push(Number(Sat.snr0));
					$dataR2.push(Number(Sat.snr1));			
				} else if(Sat.type == 2){
					$categoriesC.push(Sat.id);
					$dataC1.push(Number(Sat.snr0));
					$dataC2.push(Number(Sat.snr1));				
				}	
		 }
		 
		 paintChartGraph(true, $categoriesG, $dataG1, $dataG2, 0);
		 paintChartGraph(false, $categoriesR, $dataR1, $dataR2, 1);
		 paintChartGraph(false, $categoriesC, $dataC1, $dataC2, 2);
		 
	}
	 
	 function initialChart(){
		 var $categories = new Array();
		 var $data1 = new Array();
		 var $data2 = new Array();

		 for(var i=0; i<7; i++){
			 $categories.push(" ");
			 $data1.push(0);
			 $data2.push(0);
		 }
		 
		 paintChartGraph(true, $categories, $data1, $data2, 0);
		 paintChartGraph(false, $categories, $data1, $data2, 1);
		 paintChartGraph(false, $categories, $data1, $data2, 2);
	 }
	 
	 function paintChartGraph(showY, $categories, $data1, $data2, type){
		 var $chartWidth;
		 if($categories.length == 0){
			 $chartWidth = 7*50;
		 } else {
			 $chartWidth = $categories.length*50
		 }
			var chart = {
			      type: 'column',
			      width:$chartWidth
			   };
			   var title = {
			      text: ''   
			   };
			   var subtitle = {
			      text: ''  
			   };
			    
			   var xAxis = {
			      categories:$categories,
			      crosshair: true
			   };
			   var yAxis = {
			      min: 0,
			      title: {
			         text: ''         
			      },
			      labels:{
			          enabled: showY
			      }
			   };
			   var tooltip = {
			      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
			         '<td style="padding:0"><b>{point.y:.f} </b></td></tr>',
			      footerFormat: '</table>',
			      shared: true,
			      useHTML: true
			   };
			   var plotOptions = {
			      column: {
			    	 pointWidth: 13,
			         pointPadding: 0.2,
			         borderWidth: 0
			      }
			   };
			   var credits = {
			      enabled: false
			   };
			   
			   var $name1,$name2;
			   var $color1,$color2;
			   
			   if(type == 0){
				   $name1 = "L1";
				   $name2 = "L2"; 
				   $color1 = "#4472C4";
				   $color2 = "#5B9BD5";
			   } else if(type == 1){
				   $name1 = "G1";
				   $name2 = "G2"; 
				   $color1 = "#C00000";
				   $color2 = "#ED7D31";
			   } else if(type == 2){
				   $name1 = "B1";
				   $name2 = "B2"; 
				   $color1 = "#00FF00";
				   $color2 = "#99FF99";
			   }
			   
			   var series= [
			        {
			            name: $name1,
			            color: $color1,
			            data: $data1
			        },
			        {
			            name: $name2,
			            color: $color2,
			            data: $data2
			        }
			   ];
			      
			   var json = {};
			   json.chart = chart;
			   json.title = title;
			   json.subtitle = subtitle;
			   json.tooltip = tooltip;
			   json.xAxis = xAxis;
			   json.yAxis = yAxis;
			   json.series = series;
			   json.plotOptions = plotOptions;
			   json.credits = credits;
			   
			   if(type == 0){
				   $('#GChart').highcharts(json);
			   } else if (type == 1){
				   $('#RChart').highcharts(json);
			   } else if (type == 2){
				   $('#CChart').highcharts(json);
			   }
		}
})