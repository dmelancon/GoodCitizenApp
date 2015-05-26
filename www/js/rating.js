var width, height, center;
var points = 5;
var smooth = true;
var point = new Point(0, 0);
var containerWidth = .9*document.getElementById("rating2").offsetWidth;
var size = new Size(containerWidth,containerWidth);
var rect = new Path.Rectangle(point, size);
rect.fillColor = '#e1e1e1';
rect.opacity = .7;
var path = new Path();
var mousePos = view.center/2;
var pathHeight = mousePos.y/1.3;
document.getElementById("rating").width = containerWidth;
document.getElementById("rating").height = containerWidth;
view.viewSize = new Size(containerWidth, containerWidth);
view.draw();
initializePath();


function initializePath() {
	
	center = view.center;
	width = view.size.width;
	height = view.size.height;
	path.segments = [];
	path.add(new Point(-points/width,height));
	path.add(new Point(0,height/2));
	for (var i = 2; i < points-2; i++) {
		var point = new Point(width / points * i, height);
		path.add(point);
	}
	path.add(new Point(width,height/2));
	path.add(new Point(width+points/width,height));
	path.fillColor = 'black';
	path.opacity = .7;
}
function map( in_min , in_max , out_min , out_max ) {
  return ( this - in_min ) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
}
function onFrame(event) {
	var mValue = increaseValue;
	pathHeight += (center.y - mousePos.y - pathHeight) / 10;
	for (var i = 1; i < points-1; i++) {
		// var sinHeight = Math.sin(sinSeed / 200) * pathHeight;
		var sinSeed = event.count + (i + i % 10) * 100;
		yPos =  Math.sin(sinSeed/50)*Math.cos(sinSeed/200)*pathHeight/3+height-(mValue/100)*((mData.score/10) +.5)*height;
		path.segments[i].point.y = yPos;
	}
		// path.smooth();
}
// $('body').click(function(event){
// 	mousePos.y= event.offsetY;
// });
