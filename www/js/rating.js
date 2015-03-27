var width, height, center;
var points = 5;
var smooth = true;
var point = new Point(0, 0);
var size = new Size(64, 64);
var rect = new Path.Rectangle(point, size);
rect.fillColor = '#e1e1e1';
rect.opacity = .7;
var path = new Path();
var mousePos = view.center/2;
var pathHeight = mousePos.y/1.3;
document.getElementById("rating").width = 64;
document.getElementById("rating").height = 64;
view.viewSize = new Size(64, 64);
view.draw();
initializePath();


function initializePath() {
	
	center = view.center;
	width = view.size.width;
	height = view.size.height / 2;
	path.segments = [];
	path.add(view.bounds.bottomLeft);
	path.add(new Point(0,height*1.5));
	for (var i = 1; i < points; i++) {
		var point = new Point(width / points * i, center.y);
		path.add(point);
	}
	path.add(new Point(width,height*1.5));
	path.add(view.bounds.bottomRight);
	path.fillColor = 'black';
	path.opacity = .7;

}

function onFrame(event) {
	var value = document.getElementById("barChart").value;
	if (value<99.5){
		path.segments[1].point.y =2*height-(value/100*height);
		path.segments[points+1].point.y= 2*height-(value/100*height);
	}
	pathHeight += (center.y - mousePos.y - pathHeight) / 10;
	for (var i = 2; i < points-1; i++) {
		var sinSeed = event.count + (i + i % 10) * 100;
		var sinHeight = Math.sin(sinSeed / 200) * pathHeight;
		var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
		path.segments[i].point.y = yPos;
	}
		path.smooth();
	
}
