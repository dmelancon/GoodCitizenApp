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

function onFrame(event) {
	var value = document.getElementById("barChart").value;
	for (var i = 1; i < points-1; i++) {
		var sinSeed = event.count + (i + i % 10) * 100;
		yPos =  Math.sin(sinSeed/40)*Math.sin(sinSeed/200)+height-(value/100)*(mData.score/10)*height;
		path.segments[i].point.y = yPos;
	}
		path.smooth();
	
}
