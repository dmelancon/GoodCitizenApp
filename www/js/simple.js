 var value = document.getElementById("toothChart").value;
  setInterval(function(){
    if (value == 99.5 || value ==0) value = 100;
    var curRating = mData.score;
    $('.rating-container h1').html( "+" + (value/100 * curRating).toFixed(1));
  }, 20);

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    // console.log("console.log works well");
}


var getAllData = function(){
  $.getJSON( 'http://128.122.6.57:3000/allData', function( data ) {
      if (brush.counter != data.brush.counter){
          brush = data.brush;
          // console.log("brush " + brush.counter);
          // console.log("brush" + brush.week);
          document.dispatchEvent(brushChange);
      }
      if (roll.counter != data.roll.counter){
          roll = data.roll;
          // console.log("roll" + roll.counter);
          // console.log("roll" + roll.week);
          document.dispatchEvent(rollChange);
      }
      if (fridge.counter != data.fridge.counter){
          fridge = data.fridge;
          // console.log("fridge " + fridge.counter);
          // console.log("fridge" + fridge.week);
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
setInterval(getAllData, 1000);
