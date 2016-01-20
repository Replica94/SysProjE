function compileShader(gl, shaderSource, shaderType) {
  // Create the shader object
  var shader = gl.createShader(shaderType);
 
  // Set the shader source code.
  gl.shaderSource(shader, shaderSource);
 
  // Compile the shader
  gl.compileShader(shader);
 
  // Check if it compiled
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!success) {
    // Something went wrong during compilation; get the error
    throw "could not compile shader:" + gl.getShaderInfoLog(shader);
  }
 
  return shader;
}
function createShaderFromScript(gl, scriptId, opt_shaderType)
{
  // look up the script tag by id.
  var shaderScript = document.getElementById(scriptId);
  if (!shaderScript) {
    throw("*** Error: unknown script element" + scriptId);
  }
 
  // extract the contents of the script tag.
  var shaderSource = shaderScript.text;
 
  // If we didn't pass in a type, use the 'type' from
  // the script tag.
  if (!opt_shaderType) {
    if (shaderScript.type == "x-shader/x-vertex") {
      opt_shaderType = gl.VERTEX_SHADER;
    } else if (shaderScript.type == "x-shader/x-fragment") {
      opt_shaderType = gl.FRAGMENT_SHADER;
    } else if (!opt_shaderType) {
      throw("*** Error: shader type not set");
    }
  }
 
  return compileShader(gl, shaderSource, opt_shaderType);
};

function createProgram(gl, vertexShader, fragmentShader) {
  // create a program.
  var program = gl.createProgram();
 
  // attach the shaders.
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
 
  // link the program.
  gl.linkProgram(program);
 
  // Check if it linked.
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
      // something went wrong with the link
      throw ("program filed to link:" + gl.getProgramInfoLog (program));
  }
 
  return program;
};

function createProgramFromScripts(
    gl, vertexShaderId, fragmentShaderId) {
  var vertexShader = createShaderFromScript(gl, vertexShaderId);
  var fragmentShader = createShaderFromScript(gl, fragmentShaderId);
  return createProgram(gl, vertexShader, fragmentShader);
}
var clicked = 0;
var clickPosY = 0.0;
var clickPosX = 0.0;
var clickTime = 100.0;
var time = 0.0;
function updateCanvas()
{
	var canvas = document.getElementById("gCanvas");
	var gl = canvas.getContext("experimental-webgl");

	// setup a GLSL program
	var program = createProgramFromScripts(gl, "2d-vertex-shader","2d-fragment-shader");
	gl.useProgram(program);

	// look up where the vertex data needs to go.
	var positionLocation = gl.getAttribLocation(program, "a_position");

	// Create a buffer and put a single clipspace rectangle in
	// it (2 triangles)
	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(
		gl.ARRAY_BUFFER, 
		new Float32Array([
			-1.0, -1.0, 
			 1.0, -1.0, 
			-1.0,  1.0, 
			-1.0,  1.0, 
			 1.0, -1.0, 
			 1.0,  1.0]), 
		gl.STATIC_DRAW);
	gl.enableVertexAttribArray(positionLocation);
	gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
	
	
	if (clicked)
		clickTime = 0;
	clickTime += 0.01;
	clicked = 0;
	
	
	var uf = gl.getUniformLocation(program,"time");
    gl.uniform1f(uf, time);
	uf = gl.getUniformLocation(program,"clickPos");
    gl.uniform2f(uf, clickPosX, canvas.height - clickPosY);
	uf = gl.getUniformLocation(program,"clickData");
	gl.uniform1f(uf, clickTime);
	// draw
	gl.drawArrays(gl.TRIANGLES, 0, 6);
	time += 0.03;
	
	setTimeout(updateCanvas,16);
};

var canvas = document.getElementById("gCanvas");
canvas.addEventListener("click", function (ev)
{
	clicked = 1;
	clickPosX = ev.clientX;
	clickPosY = ev.clientY;
	
}, false);



updateCanvas();