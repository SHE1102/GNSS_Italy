$(function(){
	
	var $lat=23;
	var $lon=113;
	var $zoom=5;
	
	var mymap = L.map('OSM').setView([$lat, $lon], $zoom);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?access_token={accessToken}', {
				    attribution: '',
				    minZoom:2,
				    maxZoom: 18,
				    id: 'mapbox.streets',
				    accessToken: 'your.mapbox.access.token'
				}).addTo(mymap);
	
	$.getJSON("../Config",{method:"read"}, function(json){
		$lat = json.centerLat;
		$lon = json.centerLon;
		$zoom = json.mapZoom;
		mymap.setView([$lat, $lon], $zoom);
	})
	
	$.getJSON("../Station", {userType: "Tourist"},function(json){
		showMarker(json);
	})
	
	function showMarker(json){
		for(var i=0;i<json.station.length;i++){
			var station = json.station[i];
			
			var $htmlcontext = "<img src='../img/blue.png'/><span style='background-color:#999;color:white;'>"+station.id+"</span>";
			var $icon = L.divIcon({
				className:'iconDiv',
				html:$htmlcontext,
				iconSize: [32, 32]
			})
			var marker = L.marker([station.latitude, station.longitude],{
				icon: $icon
			}).addTo(mymap);
			
			marker.bindPopup(station.name).closePopup();
			marker.on("click",function(){	
				this.closePopup();
				var $stationName = this.getPopup().getContent();
				var $href = "../Monograph?name="+$stationName;
				window.open($href, '_blank');
			});
			
			var $table = $("<table style='text-align:center;border-collapse:collapse;background:#EEE;'></table>");
			
			var $idTd = $("<td style='border:1px solid #bbb;'></td>").text(station.id);
			var $nameTd = $("<td style='border:1px solid #bbb;'></td>").text(station.name);
			var $latTd = $("<td style='border:1px solid #bbb;'></td>").text(station.latitudeFormat);
			var $lonTd = $("<td style='border:1px solid #bbb;'></td>").text(station.longitudeFormat);
			var $heightTd = $("<td style='border:1px solid #bbb;'></td>").text(station.altitude);
			var $antennaTypeTd = $("<td style='border:1px solid #bbb;'></td>").text(station.antennaType);
			var $L1Td = $("<td style='border:1px solid #bbb;'></td>").text(station.HL1);
			var $L2Td = $("<td style='border:1px solid #bbb;'></td>").text(station.HL2);
			
			$table.append($("<tr style='border:1px solid #bbb;'></tr>").append($("<th>Id</th>")).append($("<th>City</th>")).append($("<th></th>")));
			$table.append($("<tr style='border:1px solid #bbb;'></tr>").append($idTd).append($nameTd).append($("<td></td>")));
			$table.append($("<tr style='border:1px solid #bbb;'></tr>").append($("<th>Latitude</th>")).append($("<th>Longitude</th>")).append($("<th>Altitude(m)</th>")));
			$table.append($("<tr style='border:1px solid #bbb;'></tr>").append($latTd).append($lonTd).append($heightTd));
			$table.append($("<tr style='border:1px solid #bbb;'></tr>").append($("<th>Antenna Type</th>")).append($("<th>H L1(m)</th>")).append($("<th>H L2(m)</th>")));
			$table.append($("<tr style='border:1px solid #bbb;'></tr>").append($antennaTypeTd).append($L1Td).append($L2Td));
			$divContainer = $("<div></div>").append($table);
			
			var toolTips = $divContainer.html();
			marker.bindTooltip(toolTips);
		}
	}
	
})