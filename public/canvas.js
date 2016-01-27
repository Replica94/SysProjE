
var clicked = 0;
var clickPosY = 0.0;
var clickPosX = 0.0;
var clickTime = 100.0;
var time = 0.0;


function initiateGraphics()
{
	var canvas = document.getElementById("gCanvas");
	var gl = canvas.getContext("webgl");
	
	gl.disable(gl.BLEND);
	Shader.gl = gl;
	Texture.gl = gl;
	Mesh.gl = gl;
	Framebuffer.gl = gl;
	
	Mesh.createBasicMeshes();
	Framebuffer.initFramebuffers(canvas.width, canvas.height);
	Texture.initTextures();	
	
	
	Shader.makeShader("lsd","lsd-vs","lsd-fs");
	Shader.makeShader("fbThreshold","fbThreshold-vs","fbThreshold-fs");
	
	var fun = function()
	{
		if (Texture.loadedTextures != Texture.maxTextures)
		{
			setTimeout(fun, 50);
			return;
		}
		updateCanvas();
	};
	fun();
}

function updateCanvas()
{
	var canvas = document.getElementById("gCanvas");
	var gl = canvas.getContext("webgl");
	var shader = Shader.map["lsd"];
	var program = shader.program;
	gl.useProgram(program);
	
	
	gl.bindBuffer(gl.ARRAY_BUFFER, Mesh.map["quad"].buffer);
	
	gl.enableVertexAttribArray(shader.a_position);
	gl.enableVertexAttribArray(shader.a_texCoord);
	gl.vertexAttribPointer(shader.a_position, 2, gl.FLOAT, false, 4*4, 0);
	gl.vertexAttribPointer(shader.a_texCoord, 2, gl.FLOAT, false, 4*4, 4*2);
	
	
	
	
	
	gl.bindFramebuffer(gl.FRAMEBUFFER, Framebuffer.map["blob"].framebuffer);
	gl.bindTexture(gl.TEXTURE_2D,Texture.map["blur"].texture);
	
	var uf = gl.getUniformLocation(program,"time");
    gl.uniform1f(uf, time);
	uf = gl.getUniformLocation(program,"clickPos");
    gl.uniform2f(uf, clickPosX, canvas.height - clickPosY);
	uf = gl.getUniformLocation(program,"clickData");
	gl.uniform1f(uf, clickTime);
	uf = gl.getUniformLocation(program,"texture",0);
	gl.uniform1i(uf, 0);
	
	
	uf = gl.getUniformLocation(program,"size");
	gl.uniform2f(uf, 32, 32);
	uf = gl.getUniformLocation(program,"center");
	gl.uniform2f(uf, clickPosX,clickPosY);
	uf = gl.getUniformLocation(program,"screenSize");
	gl.uniform2f(uf, canvas.width, canvas.height);
	// draw
	gl.enable(gl.BLEND);
	
	gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
	if (clicked)
		gl.drawArrays(gl.TRIANGLES, 0, Mesh.map["quad"].count);
	gl.disable(gl.BLEND);
	
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	
	
	gl.useProgram(Shader.map["fbThreshold"].program);
	
	uf = gl.getUniformLocation(Shader.map["fbThreshold"].program,"texture",0);
	gl.uniform1i(uf, 0);
	
	gl.bindTexture(gl.TEXTURE_2D,Framebuffer.map["blob"].colorTexture);
	
	
	gl.drawArrays(gl.TRIANGLES, 0, Mesh.map["quad"].count);
	
	
	time += 0.03;
	clicked = 0;
	
	setTimeout(updateCanvas,16);
};

var canvas = document.getElementById("gCanvas");
canvas.addEventListener("click", function (ev)
{
	clicked = 1;
	clickPosX = ev.clientX;
	clickPosY = ev.clientY;
	
}, false);


setTimeout(initiateGraphics,10);