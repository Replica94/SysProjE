var canvas = document.getElementById("gCanvas");
var context = canvas.getContext("2d");

function CanvasResize()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function CanvasDraw()
{
	var size = new Vector2(canvas.width, canvas.height);
	var minSize = new Vector2(480, 480);
	var scale = 1;
	
	if (size.x < minSize.x)
		scale = size.x/minSize.x;
	if (size.y < minSize.y)
	{
		var tScale = size.y/minSize.y;
		if (tScale < scale)
			tScale = scale;
	}
	
	Engine.update();
	
	context.fillStyle = "#111811";
	context.fillRect(0,0,size.x,size.y);
	context.save();
	context.scale(scale,scale);
	
	var label = {};
	var description = "";//= "Asd fdges dfklwadio nnrgajdhgfe. Zopd seifuesa kjwdn auwidqwdsj gdskefja nd. Fsadwue rknefsadkadn waawd. 430 sad asffsasd ahgdfhg.";
	for (var i = 0; i < 70; i++)
	{
		var c = (GetRandomBetween(19968,25344));
		//if (Math.random() > 0.15)
			description += String.fromCharCode(c);	
		
			description += " ";
		
	}
	var label = GenerateRandomLabel(RandomBrandName(Math.random()*8888),"300mg ibuprofen",description);
	
	RenderLabel(new Vector2(25, 25), label);
	context.restore();
}


var fun = function()
{
	if (Texture.loadedTextures != Texture.maxTextures)
	{
		setTimeout(fun, 50);
		return;
	}
	setInterval(CanvasDraw,1555);
};

Engine.init();

window.addEventListener("resize", CanvasResize, false);
CanvasResize();

Texture.initTextures();	
InitRandomNames();

fun();