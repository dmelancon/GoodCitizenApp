
var containerWidth = .9*document.getElementById("smile2").offsetWidth/2;
//var smile = document.getElementById("smile").style.padding = containerWidth*.2 + "px";

var myCircle = new Path.Circle(new Point(containerWidth*1.1,containerWidth*1.1), containerWidth);
myCircle.fillColor = 'black';
var startAngle = 0;
var angleVel = 0.1;
var startAngle2 = 0;
var angleVel2 = 0.6;
var counter = 0;
var smileCounter = 0;
var smileNow = false;
var path = new Path({
      strokeColor: [0.8],
      strokeWidth: 1,
      strokeCap: 'square'
});

initializePath();
document.getElementById("smile").addEventListener('touchstart',decide, false);
document.addEventListener('ratingChange', decide, false);
// document.addEventListener('brushChange', decide, false);
// document.addEventListener('rollChange', decide, false);
// document.addEventListener('fridgeChange', decide, false);
  function initializePath() {
    var eye1 = new Path.Line({
      from: [52, 42],
      to: [52, 54],
      strokeColor: 'white',
      strokeWidth: 4,
      strokeCap: 'round'
    }); 
      var eye2 = new Path.Line({
      from: [98, 42],
      to: [98, 54],
      strokeColor: 'white',
      strokeWidth: 4,
      strokeCap: 'round'
      }); 
    for (var i = 34; i <= 112; i+=2) {
      path.add(new Point(i));
    }
  }

function decide(){
    smileCounter = 20;
    smileNow= true;
}

function smile(){
    
    var angle = 0;
    if (smileCounter>0){
        for (var i = 0; i <=39; i++) {
            var segment = path.segments[i];
            var sinus = Math.sin(angle-.4)*11+96;
            angle += angleVel;
            segment.point.y = sinus;
        }
//        console.log("this is happening");
        smileCounter--;
    }else{
        smileNow = false;
    }
}
function frown(){
    var angle = 0;
    if (smileCounter>0){
        for (var i = 0; i <=39; i++) {
            var segment = path.segments[i];
            var sinus = Math.sin(angle+2.8)*11+100
            angle += angleVel;
            segment.point.y = sinus;
        }
        smileCounter--;
    }else{
        smileNow = false;
    }

}

function analyzing(){
    startAngle += 0.4;
    var angle = startAngle;
    startAngle2 += 1.2;
    var angle2 = startAngle2;
    for (var i = 0; i <= 39; i++){
        var segment = path.segments[i];
        var sinus = Math.sin(angle)*11*Math.sin(angle2)+100;
        angle += angleVel;
        angle2 += angleVel2;
        segment.point.y = sinus;
    }
}

  function onFrame(event) {
        if (counter%3 ==0){
            if (smileNow == true){
                if (mData.score>0){
                    smile();
                }else{
                    frown();
                }
         
            }else{
                analyzing();
            }
        }
      counter ++;
  }