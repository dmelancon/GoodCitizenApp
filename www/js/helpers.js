//this comes from Data Server
var testData = [100,50,56,70, 40, 71, 23];
var tranValue = 100;
var prevRollCounter = 0;
var prevBrushCounter = 0;
var tC = 'toothChart';
var lineChart = new lineChart(testData,tC);

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
  if (tranValue >= 100 || tranValue <=0){
    tranValue = 100;
  }else{
    tranValue += inc;
    var chartInc = lineChart.maxVal/100; 
    lineChart.animate(chartInc);
    lineChart.createBarChart();
  }
	;
};

setInterval(animate, 1000/60);



var brushTrigger = function(){

    lineChart.valArray  = lineChart.brushArray;
    $('#toothBrush h1').html("Toothbrush");
    tranValue = 1;
    if(!$('.brushAnim').hasClass('big'))$('.brushAnim').toggleClass('big');
    if ($('.fridgeAnim').hasClass('big'))$('.fridgeAnim').toggleClass('big');
    if ($('.rollAnim').hasClass('big'))$('.rollAnim').toggleClass('big');  
    $('.smile-container h3').html(brush.counter);
    $('.smile-container h2').html("<center>Seconds</center><center>Brushed</center><center>Today</center>");
}

var fridgeTrigger = function(){
  lineChart.valArray  = lineChart.fridgeArray;
    $('#toothBrush h1').html("Refrigerator");
    tranValue = 1;
     if (!$('.fridgeAnim').hasClass('big'))$('.fridgeAnim').toggleClass('big');
    if ($('.rollAnim').hasClass('big'))$('.rollAnim').toggleClass('big');
    if ($('.brushAnim').hasClass('big'))$('.brushAnim').toggleClass('big');
    $('.smile-container h3').html(fridge.counter);
    $('.smile-container h2').html("<center>Times</center><center>Opened</center><center>Today</center>");
}

var tpTrigger = function(){
    lineChart.valArray  = lineChart.tpArray;
    $('#toothBrush h1').html("Toilet Paper");
    tranValue = 1;
    if (!$('.rollAnim').hasClass('big'))$('.rollAnim').toggleClass('big');
    if ($('.fridgeAnim').hasClass('big'))$('.fridgeAnim').toggleClass('big');
    if ($('.brushAnim').hasClass('big'))$('.brushAnim').toggleClass('big');
    $('.smile-container h3').html(roll.counter);   
    $('.smile-container h2').html("<center>Sheets</center><center>Used</center><center>Today</center>");
}

setTimeout(function(){
  document.getElementById('fridgeAnimation').addEventListener("touchstart", function(){
      fridgeTrigger();
  });
  document.getElementById('tpAnimation').addEventListener("touchstart", function(){
      tpTrigger();
  });
  document.getElementById('brushAnimation').addEventListener("touchstart", function(){
    brushTrigger();
  });

  document.addEventListener("brushChange", function(){
    lineChart.brushArray = brush.week;
     if (!brush.status){
      $('.brushAnim').css({ opacity: 0.2 });
    }else{
      $('.brushAnim').css({ opacity: 0.4 });
    }
      brushTrigger();

  });
  document.addEventListener("rollChange", function(){
      lineChart.tpArray = roll.week;
      if (!roll.status){
        $('.rollAnim').css({ opacity: 0.2 });
      }else{
        $('.rollAnim').css({ opacity: 0.4 });
      }
      tpTrigger();
  });
  document.addEventListener("fridgeChange", function(){
    if (!fridge.status){
      $('.fridgeAnim').css({ opacity: 0.2 });
    }else{
      $('.fridgeAnim').css({ opacity: 0.4 });
    }
    lineChart.fridgeArray =fridge.week;
    fridgeTrigger();
  });
}, 2000);
// //////Resetting the Rating


document.getElementById('rating2').addEventListener("touchstart", function(){
    resetRating();
});

document.addEventListener("ratingChange", newRating);

//rating handlers

var newRating = function(){
    //navigator.vibrate(2000);
    document.getElementById("centerChart").style.visibility = "visible";
    $( "#darkCanvas" ).css({opacity: .8, "z-index": 100});
    $('#darkCanvas').show();
    $( "#darkText" ).css({opacity: .9, "z-index": 100});
    
    $('#darkText').show();
    $( "#darkCanvas" ).animate({opacity: 0.0}, 2500, function(){
       $( "#darkCanvas" ).hide();
       $( "#darkText" ).animate({opacity: 0.0}, 500, function(){
          $( "#darkText" ).hide();
        });
       $( "#darkCanvas" ).css({opacity: .8, "z-index": 1});  
    });
};

var resetRating = function(){
    //navigator.vibrate(2000);
    document.getElementById("centerChart").style.visibility = "visible";
    lineChart.values = [0,0,0,0,0,0,0];
    increaseValue = 1;
    $( "#darkCanvas" ).css({opacity: .8, "z-index": 100});
    $('#darkCanvas').show();
    $( "#darkText" ).css({opacity: .9, "z-index": 100});
    $('#darkText').show();
    $( "#darkCanvas" ).animate({opacity: 0.0}, 2500, function(){
       $( "#darkCanvas" ).hide();
       $( "#darkText" ).animate({opacity: 0.0}, 500, function(){
                $( "#darkText" ).hide();
        });
       $( "#darkCanvas" ).css({opacity: .8, "z-index": 1});  
    });
};