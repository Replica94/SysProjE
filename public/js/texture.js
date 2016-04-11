var Texture = {
	
	maxTextures: 0,
	loadedTextures: 0,
	map: new Array(),
	initTextures: function ()
	{
		Texture.addTexture("desk","assets/img/desk.png");
		Texture.addTexture("barcode","assets/img/barcode.png");
		Texture.addTexture("sky_day","assets/img/sky_day.png");
        Texture.addTexture("prescription","assets/img/prescription.png");
        Texture.addTexture("note","assets/img/note.png");
        Texture.addTexture("noteoff","assets/img/noteoff.png");
		Texture.addTexture("background","assets/img/background.png");
		Texture.addTexture("cabinet","assets/img/cabinet.png");
		Texture.addTexture("backArrow","assets/img/back.png");
		Texture.addTexture("cabinetArrow","assets/img/da_arrow.png");
        Texture.addTexture("plant","assets/img/cigarplant.png");
        Texture.addTexture("computer","assets/img/computer.png");
		Texture.addTexture("presc","assets/img/prescription_table.png");
		Texture.addTexture("medicine1","assets/img/container-blank.png");
		Texture.addTexture("medicine2","assets/img/container-blue.png");
        Texture.addTexture("medicine3","assets/img/container-green.png");
        Texture.addTexture("medicine4","assets/img/container-red.png");
	},
	
	addTexture: function(name,source)
	{
		this.maxTextures+=1;
		
		var img = new Image();
		
		var capt = this;
		
		img.onload = function()
		{
			capt.textureLoaded(img, name);
		};
		
		img.onerror = function()
		{
			console.log("Failed to load texture " + name + " from "+ source);
			capt.textureFailedToLoad(name);
		};
		
		img.src = source;
	},
	


	textureLoaded: function(image, name)
	{
		Texture.map[name] = image;
		Texture.loadedTextures++;
	},
	textureFailedToLoad: function(name)
	{
		Texture.map[name] = null;
		Texture.loadedTextures++;
	}
}

AssetLoadFunctions.push(function()
{
	return (Texture.loadedTextures == Texture.maxTextures);
});
