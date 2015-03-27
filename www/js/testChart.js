function createPieChart(value){
	var chart2 = new Chartist.Pie('#centerChart', {
	    series: [value]
		  }, {
		    donut: true,
		    startAngle: 270,
		    donutWidth: 110,
		    total: 100,
		    labelInterpolationFnc: function(value) {
    				return value + '%';
  			}
		  }).on('draw', function(data) {
		    if(data.type === 'slice') {
		      var deg = data.value / 100 * 360;
		      data.element.attr({
		      	'style' : 'stroke: white; opacity:'+ (1.0-(data.value/100))+';stroke-width: 15px',
		      });
		    }
		  });
}

function createBarChart(valArray){
	var data = {
	  labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S',null,null,'S', 'M', 'T', 'W', 'T', 'F', 'S'],
	  series: [valArray]
	};
	  
	var options = {
	  high: 9,
	  low: 0,
	  width: 350,
	  height: 140,
	  axisX: {
	    showGrid: false,
	    showLabel: true
	  },
	  axisY: {
	    showGrid: false,
	    showLabel: false
	  }
	};
	var chart = new Chartist.Bar('#barChart', data, options);
	chart.on('draw', function(data){
		if (data.type == 'bar'){
			data.element.attr({
				'style' : 'stroke: white; opacity:'+ (.5-data.value/25)+';stroke-width: 12px',
			});
		}
	});
}


document.body.addEventListener("touchstart",function(){ 
	document.getElementById("centerChart").style.visibility = "visible";
	value = 1;
	values =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	$( "#darkCanvas" ).css({opacity: .6, "z-index": 100});
	$('#darkCanvas').show();
	$( "#darkText" ).css({opacity: .9, "z-index": 100});

	$('#darkText').show();
	$( "#darkCanvas" ).animate({opacity: 0.0}, 2500, function(){
			$( "#darkCanvas" ).hide();
			$( "#darkText" ).animate({opacity: 0.0}, 500, function(){
				$( "#darkText" ).hide();
			});
	       	$( "#darkCanvas" ).css({opacity: .6, "z-index": 1});  
	     });
	});


var testData = [1, 2, 4, 2, 6, 1, 2, 0, 0, 1, 2, 4, 9, 6, 8, 2];
var values =    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var value = 1;
var inc = 1;
var inc2 = .1;

function animate() {
	if (value >= 100 || value <=0){
		value = 0;
		document.getElementById("centerChart").style.visibility = "hidden";
	}else{
		document.getElementById("barChart").value = value;
		createPieChart(value);
		value += inc;
	}
	for(var i = 0; i<testData.length; i++){
		if (values[i]<testData[i]){
			values[i] += inc2;
		}
	}
	createBarChart(values);
	window.requestAnimationFrame(animate);
}

animate();
