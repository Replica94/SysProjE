var Mesh = {
	
	
	gl: null,
	map: new Array(),
	
	createBasicMeshes: function ()
	{
		var buf = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buf);
		
		this.gl.bufferData(this.gl.ARRAY_BUFFER, 
			new Float32Array([
				-1.0, -1.0, 0.0, 0.0, 
				1.0, -1.0, 1.0, 0.0,
				-1.0, 1.0, 0.0, 1.0,
				-1.0, 1.0, 0.0, 1.0,
				1.0, -1.0, 1.0, 0.0,
				1.0, 1.0, 1.0, 1.0
				]), 
			this.gl.STATIC_DRAW);
		
		var bf = {};
		bf.buffer = buf;
		bf.count = 6;
		this.map["quad"] = bf;
	}
};