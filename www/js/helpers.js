//this comes from Data Server
var testData = [100,50,56,70, 40, 71, 23];
var tranValue = 100;

var tC = 'toothChart';
var lineChart = new lineChart(testData,tC);

document.addEventListener("brushChange", function(){
    if (brush.week)lineChart.brushArray = brush.week;
});
document.addEventListener("rollChange", function(){
    if (roll.week)lineChart.rollArray = roll.week;
});
document.addEventListener("fridgeChange", function(){
    if (fridge.week)lineChart.fridgeArray = fridge.week;
});


var inc = 1;

function animate(){
	if (increaseValue >= 100 || increaseValue <=0){
		increaseValue = 100;
    document.getElementById("centerChart").style.visibility = "hidden";
	}else{
		increaseValue += inc;
    var chartInc = lineChart.maxVal/100; 
    lineChart.animate(chartInc);
    lineChart.createBarChart();
    createPieChart(increaseValue,'centerChart');   
	}
	window.requestAnimationFrame(animate);
};

animate();

function transition(){
  if (tranValue >= 100 || tranValue <=0){
    tranValue = 100;
  }else{
    tranValue += inc;
    var chartInc = lineChart.maxVal/100; 
    lineChart.animate(chartInc);
    lineChart.createBarChart();
  }
      window.requestAnimationFrame(transition);
};

transition();


document.getElementById('fridgeAnimation').addEventListener("touchstart", function(){
    lineChart.valArray  = lineChart.fridgeArray;
    $('#toothBrush h1').html("Refrigerator");
    tranValue = 1;
      $('.rollAnim').addClass('small');
     $('.fridgeAnim').toggleClass('small');
     $('.brushAnim').addClass('small');
      $('.fridgeAnim').css({
        top: $(this).offset().top * -1,
        left: $(this).offset().left * -1
      });

});
document.getElementById('tpAnimation').addEventListener("touchstart", function(){
    lineChart.valArray  = lineChart.rollArray;
    $('#toothBrush h1').html("Toilet Paper");
    tranValue = 1;
     $('.rollAnim').toggleClass('small');
     $('.fridgeAnim').addClass('small');
     $('.brushAnim').addClass('small');

});
document.getElementById('brushAnimation').addEventListener("touchstart", function(){
    lineChart.valArray  = lineChart.brushArray;
    $('#toothBrush h1').html("Toothbrush");
    tranValue = 1;

      $('.rollAnim').addClass('small');
     $('.fridgeAnim').addClass('small');
     $('.brushAnim').toggleClass('small');
});


// //////Resetting the Rating


document.getElementById('rating2').addEventListener("touchstart", function(){
    resetRating();
});

document.addEventListener("ratingChange", newRating);

//rating handlers

var newRating = function(){
    navigator.vibrate(2000);
    document.getElementById("centerChart").style.visibility = "visible";
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
    navigator.vibrate(2000);
    document.getElementById("centerChart").style.visibility = "visible";
    lineChart.values = [0,0,0,0,0,0,0];
    increaseValue = 1;
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