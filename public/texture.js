var Texture = {
	
	maxTextures: 0,
	loadedTextures: 0,
	map: new Array(),
	gl: null,
	initTextures: function ()
	{
		this.addTexture("blur","textures/blur.png");
	},
	
	addTexture: function(name,source)
	{
		this.maxTextures+=1;
		
		tex = this.gl.createTexture();
		img = new Image();
		
		var capt = this;
		
		img.onload = function()
		{
			capt.textureLoaded(img, tex, name);
		};
		img.onerror = function()
		{
			console.log("Failed to load texture " + name + " from "+ source);
			capt.loadedTextures++;
		};
		img.src = source;
	},

	textureLoaded: function(image, texture, name)
	{
		this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
		this.gl.generateMipmap(this.gl.TEXTURE_2D);
		var tex = {};
		tex.texture = texture;
		this.map[name] = tex;
		this.loadedTextures++;
	}
}