		var tp;
		var tpImage;
		var tpCanvas;
		var tpBool;

		var fridgeAn;
		var fridgeImage;
		var fridgeCanvas;
		var frigeBool;

		var brushAn;
		var brushImage;
		var brushCanvas;
		var brushBool;

	function gameLoop () {
	
	  window.requestAnimationFrame(gameLoop);

	  tp.update();
	  fridgeAn.update();
	  brushAn.update();
	  
	  tp.render();
	  fridgeAn.render();
	  brushAn.render();

	}
	



	function sprite (options) {
		var that = {},
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;
		
		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;
		that.update = function () {
            tickCount += 1;
            if (tickCount > ticksPerFrame) {
				tickCount = 0;
                if (frameIndex < numberOfFrames - 1) {	
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };
		
		that.render = function () {
		  that.context.clearRect(0, 0, that.width, that.height);
		  that.context.drawImage(
		    that.image,
		    frameIndex * that.width / numberOfFrames,
		    0,
		    that.width / numberOfFrames,
		    that.height,
		    0,
		    0,
		    that.width / numberOfFrames,
		    that.height);
		};
		return that;
	}

	tpCanvas = document.getElementById("tpAnimation");
	tpCanvas.width = 100;
	tpCanvas.height = 150;

	tpImage = new Image();	

	tp = sprite({
		context: tpCanvas.getContext("2d"),
		width: 2200,
		height: 300,
		image: tpImage,
		numberOfFrames: 11,
		ticksPerFrame: 4
	});
	tp.context.moveTo(.5, 0);
	tp.context.lineTo(.5, 0);
	tp.context.scale(.5,.5);
	tpImage.addEventListener("load", gameLoop);
	tpImage.src = "img/tP_white.png";


fridgeCanvas = document.getElementById("fridgeAnimation");
	fridgeCanvas.width = 100;
	fridgeCanvas.height = 150;

	fridgeImage = new Image();	

	fridgeAn = sprite({
		context: fridgeCanvas.getContext("2d"),
		width: 2200,
		height: 300,
		image: fridgeImage,
		numberOfFrames: 11,
		ticksPerFrame: 4
	});
	fridgeAn.context.moveTo(.5, 0);
	fridgeAn.context.lineTo(.5, 0);
	fridgeAn.context.scale(.5,.5);
	fridgeImage.addEventListener("load", gameLoop);
	fridgeImage.src = "img/fridge_white.png";

	brushCanvas = document.getElementById("brushAnimation");
	brushCanvas.width = 100;
	brushCanvas.height = 150;

	brushImage = new Image();	

	brushAn = sprite({
		context: brushCanvas.getContext("2d"),
		width: 1400,
		height: 300,
		image: brushImage,
		numberOfFrames: 7,
		ticksPerFrame: 4
	});
	brushAn.context.moveTo(.5, 0);
	brushAn.context.lineTo(.5, 0);
	brushAn.context.scale(.5,.5);
	brushImage.addEventListener("load", gameLoop);
	brushImage.src = "img/toothBrush_white.png";