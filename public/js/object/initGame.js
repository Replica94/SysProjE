function _EngineInit(eng)
{
	var ts = new TiledObject;
	
	ts.image = Texture.map["desk"];
	ts.patternType = "repeat-x";
	ts.depth = -100;
	ts.update = function()
	{
		ts.position.x = 0;
		ts.position.y = screenSize.y-320;
		ts.size.x = screenSize.x;
		ts.size.y = 320;
		this.updateSize();
	};
	eng.addObject(ts);
	
	var sky = new PropObject;
	
	sky.image = Texture.map["sky_night"];
	sky.depth = -250;
	
	sky.update = function()
	{
		var aspectRatio = this.image.width / this.image.height;
		var tasp = screenSize.x / screenSize.y;
		
		this.position.y = 0;
		this.position.x = 0;
		
		this.size.y = screenSize.y-32;
		this.size.x = screenSize.x;
		
		//this.size.y = 0;
		//this.size.x = 0;
	
		//sky.size.x = screenSize.x;
	//	sky.size.y = screenSize.y;
		this.updateSize();
	};
	eng.addObject(sky);
	
}