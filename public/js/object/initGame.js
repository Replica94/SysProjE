/**
 	Called upon game initialization
*/
function _EngineInit(eng)
{
	for (i = 0; i < EngineInitializationFunctions.length; i++)
	{
		try
		{
			EngineInitializationFunctions[i]();
		}
		catch(err)
		{
		
			console.log("Error in engine initialization: ")
			console.log(err);
		}
	}	
	//Create a desk
	var ts = new TiledObject;
	
	ts.image = Texture.map["desk"];

	ts.depth = -10;
	//set the draw context 
	ts.drawContext += 1;
	
	//overload the update
	ts.update = function()
	{
		ts.position.x = 0;
		ts.position.y = screenSize.y-320;
		ts.size.x = screenSize.x;
		ts.size.y = 320;
		
		this.updateSize();
	};
	//add the object
	eng.addObject(ts);
	
	//Create a sky
	var sky = new PropObject;
	sky.image = Texture.map["sky_night"];
	
	//far far behind
	sky.depth = -250;
	
	//overload da update
	sky.update = function()
	{
		
		//var aspectRatio = this.image.width / this.image.height;
		//var tasp = screenSize.x / screenSize.y;
		
		//Set the position to {0,0}
		this.position.y = 0;
		this.position.x = 0;
		
		//Maximize the size
		this.size.y = screenSize.y;
		this.size.x = screenSize.x;
		
		//this.size.y = 0;
		//this.size.x = 0;
	
		//sky.size.x = screenSize.x;
		//sky.size.y = screenSize.y;
	};
	//add the object
	eng.addObject(sky);
	
	
	//Create a button
	var btn = new ButtonObject();
	
	//set the position
	btn.position.x = 112;
	btn.position.y = 22;
	//set button text
	btn.setText("YO CLICK HERE SON!");
	
	//Set the click handler
	btn.onClick = function()
	{
		Engine.setDrawContext(2);
	};
	
	eng.addObject(btn);
	
	//Same thing as above
	var btn2 = new ButtonObject();
	btn2.position.x = 112;
	btn2.position.y = 188;
	btn2.setText("OR CLICK HERE BROTHA'");
	btn2.onClick = function()
	{
		Engine.setDrawContext(1);
	};
	
	eng.addObject(btn2);
	
}
