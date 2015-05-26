
var lineChart = function(valArray,divId){
	this.divId = divId;
	this.valArray = valArray;
	this.brushArray = valArray;
	this.tpArray = valArray;
	this.fridgeArray = valArray;
	this.values = [0,0,0,0,0,0,0];
	this.maxVal = 0; 
	this.chart;

}


lineChart.prototype.createBarChart = function(){
	var data = {
	  labels: ['1 Week Ago', null, null, null, null, 'Today', null],
	  series: [this.values]
	};
	var tempMax = 0; 
    this.maxVal = 0; 
	for (var i = 0; i<this.valArray.length; i++){
		if (this.valArray[i]>this.maxVal){
		 this.maxVal = this.valArray[i];
		}
	}
	if (this.maxVal>0){
		 tempMax = 1.25*this.maxVal;
	}
	var options = {
	  high: tempMax,
	  low: 0,
	  // width: 320,
	  // height: 170,
	  showArea: true,
	  axisX: {
	    showGrid: false,
	    showLabel: false
	  },
	  axisY: {
	    showGrid: false,
	    showLabel: false,
	    offset: 0
	  },
		lineSmooth: Chartist.Interpolation.simple({
	    divisor: 100	  })
	};
	this.chart = new Chartist.Line('#'+this.divId, data, options);
	this.chart.on('draw', function(data){
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

lineChart.prototype.update = function(){
	console.log(this.values);
	var data = {
	  labels: ['1 Week Ago', null, null, null, null, 'Today', null],
	  series: [this.values]
	};
	var tempMax = 0;
	for (var i = 0; i<this.valArray.length; i++){
		if (this.valArray[i]>this.maxVal){
		 this.maxVal = this.valArray[i];
		}
	}
	console.log(this.maxVal);

	if (this.maxVal>0){
		 tempMax = 1.25*this.maxVal;
	}
	console.log(tempMax);
	var options = {
	  high: tempMax,
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
	    divisor: 100	  })
	};
	this.chart.update(data, options, true);
}	

lineChart.prototype.animate = function(inc){
	for(var i = 0; i<this.valArray.length; i++){
		if (this.values[i]<this.valArray[i]){
			this.values[i] += inc;
		}
		if (this.values[i]>this.valArray[i]){
			this.values[i] -= inc;
		}
	}
}


function createPieChart(value, divId){
	var chart2 = new Chartist.Pie('#' + divId, {
	    series: [value]
		  }, {
		    donut: true,
		    startAngle: 270,
		    donutWidth: 200,
		    total: 100,
		    showLabel: false,
		    axisX: {
      			offset: -10
   			},
		    labelInterpolationFnc: function(value) {
    				return value + '%';
  			}
		  }).on('draw', function(data) {
		    if(data.type === 'slice') {
		      var deg = data.value / 100 * 360;
		      data.element.attr({
		      	'style' : 'stroke: white; opacity:'+ (1.0-(data.value/100))+';stroke-width: 35px',
		      });
		    }
	});
}

