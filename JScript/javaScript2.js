function getSideWindComp(windAngle, knots) {
	
	var sideWindComp = Math.round(Math.sin(windAngle * Math.PI / 180) * knots);
	
	return sideWindComp;
}

function getWindAngle(runway, wind) {
	//80 * Math.PI / 180

	var windAngle = Math.abs(runway - wind);
	var windInRadians = windAngle * Math.PI / 180;
	
	var maxRad = Math.PI * 2; //360
	var maxRad2 = maxRad - Math.PI / 2; //360-90
	
	console.log("3,141 1,5707", windInRadians);

	if(windInRadians => Math.PI || windInRadians <= Math.PI / 2) {
		//3,141 1,5707
		return windAngle;
	}
	else {
		return windAngle = -1;
	}
}