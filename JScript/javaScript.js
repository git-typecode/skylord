// This example requires the Geometry library. Include the libraries=geometry
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry">
var marker1, marker2;
var poly, geodesicPoly;
var minutes;
var hours;
var TAS = 100;
var feature = '';
var feature2 = '';
var rowsArray = [];
var dataArray = [];
var speedArray = [];
var i = 0;
var options;
var chart;
var data;
var timeFormatChart;
var map;
var someB;
var lineString;
var flightData2;
var config;
var key;
var flightDataArray = [];
var flightInfoObject;
var flightInfoArray = [];
console.log("first",new Date().toString());

//document.addEventListener('DOMContentLoaded', function() {
window.onload = function() {
	//initMap();
	//update();

	console.log("window.onload",new Date().toString());
	
	  // Initialize Firebase
  // TODO: Replace with your project's customized code snippet
  config = {
    apiKey: "AIzaSyBp1b4ZBJ-aC8jG2V2SA1mkropztbbOJkM",
    authDomain: "flighttracker-f9127.firebaseapp.com",
    databaseURL: "https://flighttracker-f9127.firebaseio.com/",
    //storageBucket: "<BUCKET>.appspot.com",
    //messagingSenderId: "<SENDER_ID>",
  };
  firebase.initializeApp(config);
	
	google.charts.load('current', {'packages':['corechart','line']});
	google.charts.setOnLoadCallback(drawChart);


  
  //drawChart();
}
//}, false);





//var data;

//var distance.computeDistanceBetween();


function initMap() {
	console.log("initMap",new Date().toString());
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {
      lat: 56.050,
      lng: 13.110
    }
  });

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(
    document.getElementById('info'));

  marker1 = new google.maps.Marker({
    map: map,
	
    draggable: true,
	title: "Start",
	position: {
      lat: 56.08344,
      lng: 13.19354
    }
  });

  marker2 = new google.maps.Marker({
    map: map,
    draggable: true,
	title: "Stop",
    position: {
      lat: 58.989,
      lng: 16.985
    }
  });

  var bounds = new google.maps.LatLngBounds(
    marker1.getPosition(), marker2.getPosition());
  map.fitBounds(bounds);

  google.maps.event.addListener(marker1, 'position_changed', update);
  google.maps.event.addListener(marker2, 'position_changed', update);

  poly = new google.maps.Polyline({
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 3,
    map: map,
  });

  geodesicPoly = new google.maps.Polyline({
    strokeColor: '#CC0099',
    strokeOpacity: 1.0,
    strokeWeight: 3,
    geodesic: true,
    map: map
  });
  
  // Load GeoJSON.
	//map.data.loadGeoJson('https://flighttracker-f9127.firebaseio.com/features/0.json');

	
  
  
  //drawChart();

	
	//google.charts.load('current', {packages: ['corechart', 'line']});
	//google.charts.setOnLoadCallback(drawBasic);
	
	//this is the airports
	map.data.loadGeoJson('https://flighttracker-f9127.firebaseio.com/name.json');
	
	//this is a route
	//map.data.loadGeoJson('https://flighttracker-f9127.firebaseio.com/features.json');
	//map.data.loadGeoJson('https://flighttracker-f9127.firebaseio.com/732eb9e8-b2a2-4f35-8272-5bc0f2b087a0/features/0.json');
	//map.data.setStyle({strokeColor: 'Red'});
	

	

	
	map.data.setStyle(function(feature) {
		
		feature2 = feature;
		
		//console.log(feature2.getProperty('marker-symbol'));
		
		
		//									  feature.getGeometry()['b'][0].b[0].lat()


		//var tmaColor = '#282828';
		if (feature.getProperty('type') == 'TMA') {
			var opacity = 0;
		}
		if (feature.getProperty('marker-symbol') == 'triangle') {
			
			
			var marker = new google.maps.Marker({
    position: new google.maps.LatLng(feature.getGeometry().getAt(0).b[0].lat(), feature.getGeometry().getAt(0).b[0].lng()),
    icon: {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      scale: 2
    },
    draggable: false,
    map: map
  });
			
			
		}
		return /** @type {google.maps.Data.StyleOptions} */({
			  
		strokeColor: 'black',
		strokeWeight: 1,
		strokeOpacity: 1.0,
		fillOpacity: opacity,
		//icon: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
		fillColor: '#ff99ff'
	});
});
}


      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
function drawChart() {
	console.log("drawChart",new Date().toString());
	var timeFormatChart = new google.visualization.DateFormat({pattern: "HH:mm:ss"});
	chart = new google.charts.Line(document.getElementById('linechart_material'));
	//var element = document.getElementById("table-rows");
	data = new google.visualization.DataTable();
	
	//var tablerow = document.createElement("tr");
	//element.appendChild(tablerow);	
	
		//element.appendChild(tabledata);
		
	//getSomeJson();
	//$.getJSON('https://flighttracker-f9127.firebaseio.com/f521881a-a118-4942-b6b8-454b74402317/features.json',
	//$.getJSON('https://flighttracker-f9127.firebaseio.com/c8a98a9d-13f8-44eb-a550-e79de385d275/features.json',
	//someB = $.getJSON('https://flighttracker-f9127.firebaseio.com/5a71a735-a12e-4e18-aa10-d377020ddbd1/features.json',
	//someB = $.getJSON('https://flighttracker-f9127.firebaseio.com/5a71a735-a12e-4e18-aa10-d377020ddbd1/features.json');
	
	//someB = $.getJSON('https://flighttracker-f9127.firebaseio.com/4f345730-6c03-44bb-a997-c4532de86710/features.json',
	
	//jQuery.getJSON('https://flighttracker-f9127.firebaseio.com/732eb9e8-b2a2-4f35-8272-5bc0f2b087a0/features.json',
	//jQuery.getJSON('https://flighttracker-f9127.firebaseio.com/flightDB.json',
	jQuery.getJSON('https://flighttracker-f9127.firebaseio.com/flightDB/-KmCjMH6DocfGtY6cqHy.json',
		function(flightData, status){
			//flightData2 = flightData;
		//console.log(flightData, status)
		if(status == "success") {
			//Do the work
			//flightDataArray = [flightData];
			
			for (key in flightData) {
				//console.log(flightData);
				//console.log(key);
				//flightInfoArray.push(flightData[key]);
				var theData = flightData[key];
				//$("#table-rows").after('<tr><td>this stuff</td></tr>');
				theData.features.forEach(function(altitude, index) {
					//console.log(altitude);
					//var tablerow = document.createElement("tr");
					var $tableRow = $('<tr>');
					//var $tableData = $('<td>');
					var $tableDataRows = $('<tr>');
					var $element = $("#table-rows");
					if(index == 0) {
				
				var flightInfo = [];
				
				flightInfo = [new Date(altitude.properties.timestamp),altitude.properties.airplane,altitude.properties.pilot,new Date(altitude.properties.takeoff),new Date(altitude.properties.landing)];
				//$element.append($tableData);
				//console.log(flightInfo);
				flightInfo.forEach(function(flightInfoObject) {
				
				var $tableData = $('<td>');
				 
				 $tableDataRows.add($tableData.append(flightInfoObject));
								
				element.append($tableDataRows);
				})
				
			}
			
			
			else {
				dataArray.push([new Date(altitude.properties.utcTime), altitude.geometry.coordinates[2] * 3.28, altitude.properties.speed * 1.94384449]);
			

			}
	
			//dataArray.push([timeFormatChart.formatValue(new Date(altitude.properties.utcTime)),altitude.geometry.coordinates[2]]); 1.94384449
			//speedArray.push([new Date(altitude.properties.utcTime),altitude.properties.speed * 1.94384449]);

			});

			
		//});
			
		}
					
	
					
				}
			
			//console.log(flightInfoArray);
			//flightData[key].features(function(altitude, index) {
				//flightInfoArray.forEach(function(altitude, index) {
			//flightData[key].forEach(function(altitude, index) {
			
			else {
			//Show error message
			
		}

		});

			data.addColumn('datetime', 'Time');
			data.addColumn('number', 'Altitude');
			data.addColumn('number', 'Speed');
			data.addRows(dataArray);

		
		        // Load the Visualization API and the corechart package.
		//google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
        //google.charts.setOnLoadCallback(drawChart);

	  

        // Create the data table.
        

        

      // Set chart options
      options = {
        chart: {
          title: 'Flight Data',
          subtitle: 'Speed and altitude graph'
        },
        width: 1100,
        height: 300,
		hAxis: {
          format: 'HH:mm:ss',
		  //format: 'MM yyyy',
		  //format: 'none',
		  },
		series: {
			0: {axis: 'Altitude'},
			1: {axis: 'Speed'}
		},
		axes: {
			y: {
				Altitude: {label: 'Altitude (feet)'},
				Speed: {label: 'Speed (knots)'}
			}
		},
		legend: 'none',
		crosshair: { trigger: 'both'
					//orientation: 'vertical'
					}
		//crosshair: { orientation: 'vertical' }
	  };
	  
	  
	  //timeFormatChart.format(data,1);
      
      
	  //map.data.loadGeoJson('https://flighttracker-f9127.firebaseio.com/c8a98a9d-13f8-44eb-a550-e79de385d275.json');
	  
	
	//var someB = $.getJSON('https://flighttracker-f9127.firebaseio.com/c8a98a9d-13f8-44eb-a550-e79de385d275/features.json');
	
	//lineString = JSON.parse('{"type":"FeatureCollection","type":"Feature","geometry":{"type":"LineString","coordinates":[]},"properties":{"some":"value"}}');
	//someB.responseJSON[2].geometry.coordinates
	//someB.responseJSON.forEach(function(feature){
	//	lineString.geometry.coordinates.push([
	//		feature.geometry.coordinates[0],feature.geometry.coordinates[1]
	//	])
	//	console.log(feature.geometry.coordinates[0],feature.geometry.coordinates[1])});
		
		
	//	console.log(lineString);
	//map.data.loadGeoJson('https://flighttracker-f9127.firebaseio.com/some.json');
	//map.data.loadGeoJson('https://flighttracker-f9127.firebaseio.com/features.json');
		
		
  
chart.draw(data, options);
}



	  
function getSomeJson() {
	console.log("getSomeJson",new Date().toString());
	//https://flighttracker-f9127.firebaseio.com/features/3
	//https://flighttracker-f9127.firebaseio.com/f521881a-a118-4942-b6b8-454b74402317/features
	$.getJSON('https://flighttracker-f9127.firebaseio.com/f521881a-a118-4942-b6b8-454b74402317/features.json',
		function(dataData) {
		feature = dataData;
		feature.forEach(function(altitude){
			//dataArray.push([timeFormatChart.formatValue(new Date(altitude.properties.utcTime)),altitude.geometry.coordinates[2]]);
			dataArray.push([new Date(altitude.properties.utcTime),altitude.geometry.coordinates[2] * 3.28]);
			});
		});
		//data is the JSON string
		//console.log("DATA JSON: ",data);
		
		//feature.geometry.coordinates[3][2]
		
	
		//console.log(i ,altitude.geometry.coordinates[2]);
		//feature[3].properties.utcTime
		
		//HH:mm:ss
		//formatter3.formatValue(new Date(1490544960000))
		//console.log(timeFormatChart.formatValue(new Date()));
		//var timeFormatChart = new google.visualization.DateFormat({pattern: "HH:mm:ss"});
		
		//dataArray.push([new Date(altitude.properties.utcTime),altitude.geometry.coordinates[2]]);
		//console.log(dataArray.push([i,altitude.geometry.coordinates[2]]));
		//console.log("rowsArray: ",rowsArray.push(dataArray));
		
		//map.data.loadGeoJson('https://flighttracker-f9127.firebaseio.com/f521881a-a118-4942-b6b8-454b74402317/features.json');
		//map.data.loadGeoJson('https://flighttracker-f9127.firebaseio.com/f521881a-a118-4942-b6b8-454b74402317.json');
	}

function offsetDist(d,h) {
		console.log("offsetDist",new Date().toString());
  var time = d/TAS;
  var mper3min;
   
  if(time < 1) {
	  minutes = time * 60;
	  mper3min = d / minutes * 3 * 1852;
	  var a = new google.maps.geometry.spherical.computeOffset(marker1.getPosition(),mper3min,h,6378137);
  console.log(a.toString());
  
  }
  else {
	  hours = Math.floor(time);
	  minutes = d % TAS;
  }
  
 //return mper3min;

}

function update() {
	console.log("update",new Date().toString());
	//someB = $.getJSON('https://flighttracker-f9127.firebaseio.com/c8a98a9d-13f8-44eb-a550-e79de385d275.json');
  var path = [marker1.getPosition(), marker2.getPosition()];
  var distance = google.maps.geometry.spherical.computeDistanceBetween(marker1.getPosition(), marker2.getPosition()) / 1852;
  var heading = google.maps.geometry.spherical.computeHeading(path[0], path[1]);
  offsetDist(distance,heading);
  //var minLatLong = new google.maps.LatLng();
  
  //computeOffset(from:LatLng, distance:number, heading:number, radius?:number)
  
  //minLatLong = a.computeOffset(marker1.getPosition(),9111,26,6378137);
  
  poly.setPath(path);
  geodesicPoly.setPath(path);
  //MVCArray<LatLng>
  //google.maps.MVCArray<LatLng>
  var latLngArray = new google.maps.MVCArray();
  
  latLngArray = poly.getPath();
  //console.log(latLngArray.getLength());

  

  var lat = marker1.getPosition().lat();
  var lng = marker1.getPosition().lng();

  var latDegreesM1 = Math.floor(marker1.getPosition().lat());
  var latMinutesM1 = Math.floor(marker1.getPosition().lat() % 1 * 60);
  var lngDegreesM1 = Math.floor(marker1.getPosition().lng());
  var lngMinutesM1 = Math.floor(marker1.getPosition().lng() % 1 * 60);

  var latDegreesM2 = Math.floor(marker2.getPosition().lat());
  var latMinutesM2 = Math.floor(marker2.getPosition().lat() % 1 * 60);
  var lngDegreesM2 = Math.floor(marker2.getPosition().lng());
  var lngMinutesM2 = Math.floor(marker2.getPosition().lng() % 1 * 60);

  //Marker1
  if (latDegreesM1 < 0) {
    latDegreesM1 = Math.abs(Math.floor(latDegreesM1));
  }
  if (lngDegreesM1 < 0) {
    lngDegreesM1 = Math.abs(Math.floor(lngDegreesM1));
  }

  if (latMinutesM1 < 0) {
    latMinutesM1 = Math.abs(latMinutesM1);
  }
  if (lngMinutesM1 < 0) {
    lngMinutesM1 = Math.abs(lngMinutesM1);
  }

  if (latDegreesM1.toString().length < 2) {
    var latBuf = latDegreesM1;
    latDegreesM1 = '0' + latBuf.toString();
  }

  if (latMinutesM1.toString().length < 2) {
    var minbuf = latMinutesM1;
    latMinutesM1 = '0' + minbuf;
    //console.log(latMinutes.toString());
  }
  if (lngDegreesM1.toString().length < 2) {
    var lngBuf = lngDegreesM1;
    lngDegreesM1 = '00' + lngBuf.toString();
  } else if (lngDegreesM1.toString().length < 3) {
    var lngBuf = lngDegreesM1;
    lngDegreesM1 = '0' + lngBuf.toString();

  }

  if (lngMinutesM1.toString().length < 2) {
    var lngminbuf = lngMinutesM1;
    lngMinutesM1 = '0' + lngminbuf;
    console.log(lngMinutesM1.toString());
  }
  //Marker2 
  if (latDegreesM2 < 0) {
    latDegreesM2 = Math.abs(Math.floor(latDegreesM2));
  }
  if (lngDegreesM2 < 0) {
    lngDegreesM2 = Math.abs(Math.floor(lngDegreesM2));
  }

  if (latMinutesM2 < 0) {
    latMinutesM2 = Math.abs(latMinutesM2);
  }
  if (lngMinutesM2 < 0) {
    lngMinutesM2 = Math.abs(lngMinutesM2);
  }

  if (latDegreesM2.toString().length < 2) {
    var latBufM2 = latDegreesM2;
    latDegreesM2 = '0' + latBufM2.toString();
  }

  if (latMinutesM2.toString().length < 2) {
    var minbufM2 = latMinutesM2;
    latMinutesM2 = '0' + minbufM2;

  }
  if (lngDegreesM2.toString().length < 2) {
    var lngBufM2 = lngDegreesM2;
    lngDegreesM2 = '00' + lngBufM2.toString();
  } else if (lngDegreesM2.toString().length < 3) {
    var lngBufM2 = lngDegreesM2;
    lngDegreesM2 = '0' + lngBufM2.toString();
  }

  if (lngMinutesM2.toString().length < 2) {
    var lngminbufM2 = lngMinutesM2;
    lngMinutesM2 = '0' + lngminbufM2;
    //console.log(lngMinutesM2.toString());
  }

  var headingPos;
  if (heading < 0) {

    var diff = 360 - Math.abs(heading);

    document.getElementById('heading').value = Math.floor(diff);
  } else {
    document.getElementById('heading').value = Math.floor(heading);
  }

  document.getElementById('origin').value = path[0].toString();
  document.getElementById('destination').value = path[1].toString();
  document.getElementById('nm').value = distance.toFixed(2);
  document.getElementById('latlong').value = latDegreesM1.toString() + latMinutesM1.toString() + 'N' + lngDegreesM1.toString() + lngMinutesM1.toString() + 'E' + ' ' +
  latDegreesM2.toString() + latMinutesM2.toString() + 'N' + lngDegreesM2.toString() + lngMinutesM2.toString() + 'E';
}