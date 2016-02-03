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
	
	context.fillStyle = "#111811";
	context.fillRect(0,0,size.x,size.y);
	
	
	var label = {};
	var description = "Asd fdges dfklwadio nnrgajdhgfe. Zopd seifuesa kjwdn auwidqwdsj gdskefja nd. Fsadwue rknefsadkadn waawd. 430 sad asffsasd ahgdfhg.";
	var label = GenerateRandomLabel(RandomBrandName(Math.random()*8888),"300mg "+RandomBrandName(Math.random()*99999),description);
	
	RenderLabel(new Vector2(30, 30), label);
}



window.addEventListener("resize", CanvasResize, false);

CanvasResize();


Texture.initTextures();	
InitRandomNames();

var fun = function()
{
	if (Texture.loadedTextures != Texture.maxTextures)
	{
		setTimeout(fun, 50);
		return;
	}
	setInterval(CanvasDraw,1555);
};
fun();