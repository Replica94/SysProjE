function _EngineInit(eng)
{
	var ts = new TiledObject;
	
	ts.image = Texture.map["desk"];
	ts.patternType = "repeat-x";
	ts.depth = -100;
	ts.drawContext += 1;
	
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
		//sky.size.y = screenSize.y;
	};
	eng.addObject(sky);
	
	
	
	var btn = new ButtonObject();
	
	btn.position.y = 22;
	btn.setText("YO CLICK HERE SON!");
	btn.onClick = function()
	{
		Engine.setDrawContext(2);
	};
	
	eng.addObject(btn);
	var btn2 = new ButtonObject();
	btn2.position.y = 188;
	btn2.setText("OR CLICK HERE BROTHA'");
	btn2.onClick = function()
	{
		Engine.setDrawContext(1);
	};
	
	eng.addObject(btn2);
	
}