  var myCircle = new Path.Circle(new Point(38,36), 32);
  myCircle.fillColor = 'black';
  var startAngle = 0;
  var angleVel = 0.1;
  var startAngle2 = 0;
  var angleVel2 = 0.6;
  var counter = 0;
  
  var path = new Path({
      strokeColor: [0.8],
      strokeWidth: 1,
      strokeCap: 'square'
    });
  initializePath();

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
  
  function onFrame(event) {
    if (counter%3 ==0){
      startAngle += 0.4;
      var angle = startAngle;
      startAngle2 += 1.2;
      var angle2 = startAngle2;
      for (var i = 0; i <= 41; i++){
        var segment = path.segments[i];
        var sinus = Math.sin(angle)*6*Math.sin(angle2)+50
        angle += angleVel;
        angle2 += angleVel2;
        segment.point.y = sinus;
      }
    }  
    counter ++;
  }