var canvas = document.getElementById("gCanvas");
var context = canvas.getContext("2d");

var resizing = false;

var resizeToWidth = 0;
var resizeToHeight = 0;

//* Holds the camera screen size, not the window size
var screenSize = new Vector2(0,0);

function CanvasResize()
{
	resizeToWidth = window.innerWidth;
	resizeToHeight = window.innerHeight;
	
	resizing = true;
}

function CanvasDraw()
{
	if (resizing)
	{
		canvas.width = resizeToWidth;
		canvas.height = resizeToHeight;
		resizing = false;
	}
	var size = new Vector2(canvas.width, canvas.height);
	var minSize = new Vector2(480, 480);
	var scale = 1;
	
	if (size.x < minSize.x)
		scale = size.x/minSize.x;
	
	if (size.y < minSize.y)
	{
		var tScale = size.y/minSize.y;
		if (tScale < scale)
			scale = tScale;
	}
	
	screenSize.x = size.x/scale;
	screenSize.y = size.y/scale;
	
	Input.update(scale);
	Engine.update();
	
	context.fillStyle = "#111811";
	context.fillRect(0,0,size.x,size.y);
	context.save();
	context.scale(scale,scale);
	
	var label = {};
	var description = "asdjhawdn awiodmnaw poidmnsifosen pognaeöonaeöonwöefnweöni fse ö nifeö s sdgljgoseö seongse gnseöogek asdfaw niefös f.";
	
	var label = GenerateRandomLabel(RandomBrandName(1),"300mg ibuprofen",description,43);
	
	RenderLabel(new Vector2(25, 25), label);
	
	
	Engine.draw();
	
	Persons.renderAllPersons();
	context.restore();
}


var fun = function()
{
	if (Texture.loadedTextures != Texture.maxTextures)
	{
		setTimeout(fun, 50);
		return;
	}
	Engine.init();
	
	setInterval(CanvasDraw,15);
};

Input.init(canvas);
//Loads textures
Persons.initPersons();
//creates new person
Persons.addPersonToLine();

window.addEventListener("resize", CanvasResize, false);
CanvasResize();

Texture.initTextures();	
InitRandomNames();

fun();