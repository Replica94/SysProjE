var Texture = {
	
	maxTextures: 0,
	loadedTextures: 0,
	map: new Array(),
	initTextures: function ()
	{
		this.addTexture("barcode","assets/barcode.png");
	},
	
	addTexture: function(name,source)
	{
		this.maxTextures+=1;
		
		img = new Image();
		
		var capt = this;
		
		img.onload = function()
		{
			capt.textureLoaded(img, name);
		};
		img.onerror = function()
		{
			console.log("Failed to load texture " + name + " from "+ source);
			capt.loadedTextures++;
		};
		img.src = source;
	},

	textureLoaded: function(image, name)
	{
		this.map[name] = image;
		this.loadedTextures++;
	}
}