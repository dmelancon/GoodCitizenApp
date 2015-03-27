function createChart(value){
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
		    // console.log(data);
		    if(data.type === 'slice') {
		      var deg = data.value / 100 * 360;
		      data.element.attr({
		      	'style' : 'stroke: white; opacity:'+ (data.value/100)+';stroke-width: 15px',
		      });
		    }
		  });
}

var value = 1,
    inc = 1;
function animate() {
  
  if (value == 100){
  	value = 0;
  }else if (value == 0 ) {
    value = 0;

  }else{
  	value += inc;
  }
 
  
  createChart(value);
  window.requestAnimationFrame(animate);
}

animate();