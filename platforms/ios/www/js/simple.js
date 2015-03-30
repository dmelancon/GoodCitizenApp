 var value = document.getElementById("barChart").value;
  var curRating = 5.7;
  setInterval(function(){
    if (value == 99.5 || value ==0) value = 100;
    $('.rating-container h1').html( "+" + (value/100 * curRating).toFixed(1));
  }, 20);

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log("console.log works well");
}