var Framebuffer = {
	map: new Array(),
	gl: null,
	initFramebuffers: function (width, height)
	{
		var fb;
		fb = this.gl.createFramebuffer();
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fb);
		fb.width = width;
		fb.height = height;
		
		var tex;
		tex = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
		
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
		
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, fb.width, fb.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
		
		
		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, tex, 0);
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
		var fs = {};
		fs.framebuffer = fb;
		fs.colorTexture = tex;
		this.map["blob"] = fs;
	}
}