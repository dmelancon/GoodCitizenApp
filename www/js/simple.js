 var value = document.getElementById("barChart").value;
  setInterval(function(){
    if (value == 99.5 || value ==0) value = 100;
    var curRating = mData.score;
    $('.rating-container h1').html( "+" + (value/100 * curRating).toFixed(1));
  }, 20);

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log("console.log works well");
}

setInterval(function(){
    $.getJSON( 'http://128.122.6.57:3000/data', function( data ) {
              console.log(data);
              if ( mData.score == data.score){
              }else{
              mData.score = data.score;
              app.connect();
              }
              });
            }, 2000);
