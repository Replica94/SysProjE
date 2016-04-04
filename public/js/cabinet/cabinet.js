var mboRowsPerScreen = 3;
var mboColumnsPerScreen = 3;
var mboChosenBox = null;
var mboBoxes = [];

var MedicineBoxObject = function()
{
	ButtonObject.call(this);
	this.row = 0;
	this.column = 0;
	this.depth = 155;
	
	var description = "asdjhawdn awiodmnaw poidmnsifosen pognaeöonaeöonwöefnweöni fse ö nifeö s sdgljgoseö seongse gnseöogek asdfaw niefös f.";
	
	this.label = GenerateRandomLabel(RandomBrandName(Math.random()),"300mg ibuprofen",description,Math.random());
	
	this.inputContext += Context.map["gameMedicineCabinetContexts"];
	this.drawContext += Context.map["gameMedicineCabinetContexts"];
	this.size = new Vector2(64,80);
	
	if (Math.random() < 0.25)
		this.image = Texture.map["medicine1"];
	else if (Math.random() < 0.33)
		this.image = Texture.map["medicine2"];
	else if (Math.random() < 0.5)
		this.image = Texture.map["medicine3"];
	else
		this.image = Texture.map["medicine4"];
		
	this.update = function()
	{
		this.updateRealObject();
		this.position.x = screenSize.x*(0.9*this.column/mboColumnsPerScreen +0.1);
		this.position.y = screenSize.y*(0.7*this.row/mboColumnsPerScreen +0.3)-64;
		
	}
	
	this.draw = function()
	{
		context.drawImage(this.image,this.position.x,this.position.y,this.size.x,this.size.y);
	}
	
	this.onClick = function()
	{
		mboChosenBox = this;
		Engine.setDrawContext(Context.map["gameMedicineCabinetExamine"]);
	}
	
}

MedicineBoxObject.prototype = new RealObject();
MedicineBoxObject.constructor = MedicineBoxObject;

EngineInitializationFunctions.push(function ()
{
	for (var i = 0; i < 3; i++)
		for (var j = 0; j < 3; j++)
		{
			var box = new MedicineBoxObject();
			mboBoxes.push(box);
			box.row = i;
			box.column = j;
			Engine.addObject(box);
		}
		/*
	var back = new GameObject;

	back.depth = 40;
	back.drawContext += Context.map["gameMedicineCabinetContexts"];
	
	back.draw = function()
	{
		context.fillStyle="#000000";
		context.globalAlpha = 0.8;
		context.fillRect(0,0,screenSize.x,screenSize.y);
		context.globalAlpha = 1;
	};
	
	Engine.addObject(back);
	*/
	
	var back = new RealObject;
	back.size = new Vector2(64,64);
	back.position = new Vector2(screenSize.x / 50, screenSize.y / 1.1);
	back.image = Texture.map["backArrow"];
	back.draw = function()
	{
		context.drawImage(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
	};
	
	back.drawContext += Context.map["gameMedicineCabinetContexts"];
	back.inputContext = back.drawContext;
	back.depth =451;
	back.onClick = function()
	{
		Engine.setDrawContext(Context.map["gameScreenDesk"]);
	};
	Engine.addObject(back);
	
	var cbm = new PropObject;
	cbm.image = Texture.map["cabinet"];
	cbm.drawContext += Context.map["gameMedicineCabinetContexts"];
	
	cbm.depth = 110;
	
	cbm.update = function()
	{
		this.position.y = 0;
		this.position.x = 0;
		
		this.size.y = screenSize.y;
		this.size.x = screenSize.x;
	};
	Engine.addObject(cbm);
	
	var boxm = new GameObject;
	boxm.depth = 450;
	boxm.drawContext += Context.map["gameMedicineCabinetExamine"];
	boxm.draw = function()
	{
		RenderLabel(new Vector2(screenSize.x/2-200, 10), mboChosenBox.label);
	};
	
	Engine.addObject(boxm);

});
