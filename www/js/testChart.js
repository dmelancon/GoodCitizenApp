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

function createBarChart(valArray, chartType){
	var data = {
	  labels: ['1 Week Ago', null, null, null, null, 'Today', null],
	  series: [valArray]
	};
	  
	var options = {
	  high: 350,
	  low: 0,
	  width: 360,
	  height: 170,
	  showArea: true,
	  axisX: {
	    showGrid: false,
	    showLabel: false
	  },
	  axisY: {
	    showGrid: false,
	    showLabel: false
	  },
		lineSmooth: Chartist.Interpolation.simple({
	    divisor: 100	  }),
	};
	var chart = new Chartist.Line('#'+chartType, data, options);
	chart.on('draw', function(data){
		if (data.type == 'label'){
			data.element.attr({
				'style' :'font-size: 8px; color:white;'
			});
		}
		if (data.type == 'line'){
			data.element.attr({
				'style' :'stroke: white; stroke-width: 1px; opacity:.5;stroke-dasharray: 5px; animation: dash 1s linear ;'
			});
		}
		if (data.type == 'point'){
			data.element.attr({
				'style' : 'stroke: white; opacity:.5;stroke-width: 6px;'
			});
		}
		if (data.type == 'area'){
			data.element.attr({
				'style' : 'fill: white; opacity:1;'
			});
		}
	});
}
var newRating = function(){
//    console.log("ok this is happening");
    // navigator.vibrate(2000);
    document.getElementById("centerChart").style.visibility = "visible";
//    value = 1;
//    values =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
};
var resetRating = function(){
//     console.log("ok this is happening");
    // navigator.vibrate(2000);
    document.getElementById("centerChart").style.visibility = "visible";
    value = 1;
    values =  [0, 0, 0, 0, 0, 0, 0];
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
};

document.getElementById('rating2').addEventListener("touchstart", function(){
    $.getJSON( 'http://128.122.6.57:3000/data', function( data ) {
        mData.score = data.score;
      });
    resetRating();
});


document.addEventListener("ratingChange", newRating);


var testData = [0, 0, 0, 0, 0, 0, 0];
var values =    [0, 0, 0, 0, 0, 0, 0];
var value = 1;
var inc = 1;
var inc2 = 3;

function animate() {
	if (brush.week){
		testData = brush.week;
		// console.log(brush.week);
	}
	if (value >= 100 || value <=0){
		value = 0;
		document.getElementById("centerChart").style.visibility = "hidden";
	}else{
		document.getElementById("toothChart").value = value;
		createPieChart(value);
		value += inc;
	}
	for(var i = 0; i<testData.length; i++){
		if (values[i]<testData[i]){
			values[i] += inc2;
		}
	}
	var chart = 'toothChart';
	createBarChart(values,chart);
	window.requestAnimationFrame(animate);
}

animate();
