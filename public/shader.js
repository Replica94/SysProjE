var Shader = {
	
	gl: null,
	map: new Array(),
	
	compileShader: function (source, type)
	{
		var shader = this.gl.createShader(type);

		this.gl.shaderSource(shader, source);

		this.gl.compileShader(shader);

		var success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
		if (!success)
		{
			throw "Failed to compile shader: " + this.gl.getShaderInfoLog(shader);
		}
		return shader;
	},
	
	createShaderFromScript: function (id, type)
	{
		var script = document.getElementById(id);
		if (!script)
		{
			throw("Failed to find shader " + id);
		}
		var src;
		if (script.src)
		{
			var xhrObj = new XMLHttpRequest();
			xhrObj.open('GET', script.src, false);
			xhrObj.send(null);
			src = xhrObj.responseText;
		}
		else
			var src = script.text;
		
		return this.compileShader(src, type);
	},
	createProgram: function(vertex, fragment)
	{
		
		var program = this.gl.createProgram();

		this.gl.attachShader(program, vertex);
		this.gl.attachShader(program, fragment);

		this.gl.linkProgram(program);

		var success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
		if (!success)
		{
			console.log("Shader failed to link: " + this.gl.getProgramInfoLog (program));
			return program;
		}

		return program;
	},
	makeShader: function(name, vertex, fragment)
	{
		try
		{
			var vs = this.createShaderFromScript(vertex,this.gl.VERTEX_SHADER);
			var fs = this.createShaderFromScript(fragment,this.gl.FRAGMENT_SHADER);
			var program = this.createProgram(vs,fs);
			var posloc = this.gl.getAttribLocation(program, "vertex_position");

			
			var sh = {};
			sh.program = program;
			sh.a_position = posloc;
			
			posloc = this.gl.getAttribLocation(program, "vertex_texCoord");
			sh.a_texCoord = posloc;
			this.map[name] = sh;
			
		}
		catch (err)
		{
			console.log( err );
		}
		
	}
};
