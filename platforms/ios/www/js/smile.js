
var containerWidth = .9*document.getElementById("smile2").offsetWidth/4;
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
      from: [26, 21],
      to: [26, 27],
      strokeColor: 'white',
      strokeWidth: 2,
      strokeCap: 'round'
    }); 
      var eye2 = new Path.Line({
      from: [49, 21],
      to: [49, 27],
      strokeColor: 'white',
      strokeWidth: 2,
      strokeCap: 'round'
      }); 
    for (var i = 17; i <= 58; i++) {
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
        for (var i = 0; i <42; i++) {
            var segment = path.segments[i];
            var sinus = Math.sin(angle-.4)*7+48;
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
        for (var i = 0; i <42; i++) {
            var segment = path.segments[i];
            var sinus = Math.sin(angle+2.6)*7+50
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
    for (var i = 0; i <= 41; i++){
        var segment = path.segments[i];
        var sinus = Math.sin(angle)*6*Math.sin(angle2)+50;
        angle += angleVel;
        angle2 += angleVel2;
        segment.point.y = sinus;
    }
}

  function onFrame(event) {
        if (counter%3 ==0){
            if (smileNow == true){
                if (mData.score>5){
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