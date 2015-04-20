//get all data and set up Event Listeners

var mData = {
	'score': 4.0
};

var fridge = {};
var roll = {};
var brush = {};

var increaseValue = 1;

var ratingChange = new Event('ratingChange');
var fridgeChange = new Event('fridgeChange');
var rollChange = new Event('rollChange');
var brushChange = new Event('brushChange');
 

setInterval(function(){
  if (increaseValue == 99.5 || increaseValue == 0) increaseValue = 100;
  var curRating = mData.score;
  // if (increaseValue<100){
  		$('.rating-container h1').html( "+" + (increaseValue/100 * curRating).toFixed(1));
  // }else{
  // 		$('.rating-container h1').html( "+" + (tranValue/100 * curRating).toFixed(1));
  // }
}, 20);


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    setInterval(getAllData, 1000)
}


var getAllData = function(){
  $.getJSON( 'http://128.122.6.57:3000/allData', function( data ) {
      if (brush.counter != data.brush.counter){
          brush = data.brush;
          document.dispatchEvent(brushChange);
      }
      if (roll.counter != data.roll.counter){
          roll = data.roll;
          document.dispatchEvent(rollChange);
      }
      if (fridge.counter != data.fridge.counter){
          fridge = data.fridge;
          document.dispatchEvent(fridgeChange);
      }
   });
   $.getJSON( 'http://128.122.6.57:3000/data', function( data ) {
        if ( mData.score != data.score){
            mData.score = data.score;
            document.dispatchEvent(ratingChange);
        }
  });
}

