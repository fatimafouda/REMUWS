var maxSolar = {
		name : "",
		classId : "",
		output: 0,
}

var maxWind = {
		name : "",
		classId : "",
		output: 0,
}

$(document).ready(function(){
				
	// AJAX call to retrieve energy information from the Java servlet
	$.get( "http://localhost:8080/Energy_Mapper/energy_info", function( d ) {
					
			// Parse JSON onto HTML elements
		
			for(var i = 0 ; i < d.data.length ; i++){
						
				var avg3Year = Math.round((d.data[i].solar[0][0] + d.data[i].solar[1][0] + d.data[i].solar[2][0])/3.0);
						
				$("."+d.data[i].city+"-solar-3year").text(avg3Year+" KW");
						
				$("."+d.data[i].city+"-solar-y1").text(d.data[i].solar[0][0]);
				$("."+d.data[i].city+"-solar-y1q1").text(d.data[i].solar[0][1]);
				$("."+d.data[i].city+"-solar-y1q2").text(d.data[i].solar[0][2]);
				$("."+d.data[i].city+"-solar-y1q3").text(d.data[i].solar[0][3]);
				$("."+d.data[i].city+"-solar-y1q4").text(d.data[i].solar[0][4]);
						
				$("."+d.data[i].city+"-solar-y2").text(d.data[i].solar[1][0]);
				$("."+d.data[i].city+"-solar-y2q1").text(d.data[i].solar[1][1]);
				$("."+d.data[i].city+"-solar-y2q2").text(d.data[i].solar[1][2]);
				$("."+d.data[i].city+"-solar-y2q3").text(d.data[i].solar[1][3]);
				$("."+d.data[i].city+"-solar-y2q4").text(d.data[i].solar[1][4]);
						
				$("."+d.data[i].city+"-solar-y3").text(d.data[i].solar[2][0]);
				$("."+d.data[i].city+"-solar-y3q1").text(d.data[i].solar[2][1]);
				$("."+d.data[i].city+"-solar-y3q2").text(d.data[i].solar[2][2]);
				$("."+d.data[i].city+"-solar-y3q3").text(d.data[i].solar[2][3]);
				$("."+d.data[i].city+"-solar-y3q4").text(d.data[i].solar[2][4]);
						
				if(avg3Year > maxSolar.output){
					maxSolar.name = $("#"+d.data[i].city+"-dialog").attr("title");
					maxSolar.classId = d.data[i].city;
					maxSolar.output = avg3Year;
				}
						
				avg3Year = Math.round((d.data[i].wind[0][0] + d.data[i].wind[1][0] + d.data[i].wind[2][0])/3.0);
						
				$("."+d.data[i].city+"-wind-3year").text(avg3Year+" KW");
						
				$("."+d.data[i].city+"-wind-y1").text(d.data[i].wind[0][0]);
				$("."+d.data[i].city+"-wind-y1q1").text(d.data[i].wind[0][1]);
				$("."+d.data[i].city+"-wind-y1q2").text(d.data[i].wind[0][2]);
				$("."+d.data[i].city+"-wind-y1q3").text(d.data[i].wind[0][3]);
				$("."+d.data[i].city+"-wind-y1q4").text(d.data[i].wind[0][4]);
						
				$("."+d.data[i].city+"-wind-y2").text(d.data[i].wind[1][0]);
				$("."+d.data[i].city+"-wind-y2q1").text(d.data[i].wind[1][1]);
				$("."+d.data[i].city+"-wind-y2q2").text(d.data[i].wind[1][2]);
				$("."+d.data[i].city+"-wind-y2q3").text(d.data[i].wind[1][3]);
				$("."+d.data[i].city+"-wind-y2q4").text(d.data[i].wind[1][4]);
						
				$("."+d.data[i].city+"-wind-y3").text(d.data[i].wind[2][0]);
				$("."+d.data[i].city+"-wind-y3q1").text(d.data[i].wind[2][1]);
				$("."+d.data[i].city+"-wind-y3q2").text(d.data[i].wind[2][2]);
				$("."+d.data[i].city+"-wind-y3q3").text(d.data[i].wind[2][3]);
				$("."+d.data[i].city+"-wind-y3q4").text(d.data[i].wind[2][4]);
						
				if(avg3Year > maxWind.output){
					maxWind.name = $("#"+d.data[i].city+"-dialog").attr("title");
					maxWind.classId = d.data[i].city;
					maxWind.output = avg3Year;
				}
			}
					
			$(".max-solar-name").text(maxSolar.name);
			$(".max-solar-output").text(maxSolar.output + " KW");
			$(".max-wind-name").text(maxWind.name);
			$(".max-wind-output").text(maxWind.output + " KW");
					
		});
});