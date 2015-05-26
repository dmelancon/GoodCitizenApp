//get all data and set up Event Listeners

var mData = {
	'score': 4.0
};

var fridge = {
  counter:0
};
var roll = {counter:0};
var brush = {counter:0};

var increaseValue = 1;

var ratingChange = new Event('ratingChange');
var fridgeChange = new Event('fridgeChange');
var rollChange = new Event('rollChange');
var brushChange = new Event('brushChange');
var serverConnected = false;
var prevServerState = false;



document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    setTimeout(function(){setInterval(getAllData, 250);},2000);

    setTimeout(setInterval(function(){
      if (increaseValue == 99.5 || increaseValue == 0) increaseValue = 100;
      var curRating = mData.score;
      if (curRating>0){
        $('.rating-container h1').html( "+" + (increaseValue/100 * curRating).toFixed(1));
      }else{
         $('.rating-container h1').html((increaseValue/100 * curRating).toFixed(1));
      }

    }, 20),2000);
}










var getAllData = function(){
  $.getJSON( 'http://128.122.6.57:3000/allData', function( data ) {
      serverConnected == true;
      
      if (brush.counter != data.brush.counter||brush.status != data.brush.status){
          brush = data.brush;
          document.dispatchEvent(brushChange);
      }
      if (roll.counter != data.roll.counter||roll.status != data.roll.status){
          roll = data.roll;
          document.dispatchEvent(rollChange);
      }
      if (fridge.counter != data.fridge.counter||fridge.status != data.fridge.status){
          fridge = data.fridge;
          document.dispatchEvent(fridgeChange);
      }
      if ( mData.score != data.score){
            mData.score = data.score;
            document.dispatchEvent(ratingChange);
        }
   });

   if (serverConnected == true && prevServerState == false){
          $('.smile-container h2').html("<center>Device</center><center>Found!</center>");
      }
   prevServerState = serverConnected;
}


