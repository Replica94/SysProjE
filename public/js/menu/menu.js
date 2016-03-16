


//Cooler button for menus

/**
 	Constructor for MenuButton
	@constructor
*/
var MenuButtonObject = function()
{
	ButtonObject.call(this);
	
	this.font = "30px Arial";
	
	this.draw = function()
	{
		context.font = this.font;
		
		if (this.mouseHover)
			context.fillStyle = "#FF0000";
		else
			context.fillStyle = "#FFFFFF";
		
		//And print our text
		context.fillText(this.text,this.position.x+6,this.position.y+32);
		
		//Change color to black
		context.fillStyle = "#000000";
	}
	
	this.onClick = function()
	{
		alert("ERROR: No button action!!!")
	}
}

MenuButtonObject.prototype = new ButtonObject();

MenuButtonObject.constructor = MenuButtonObject;

//Init menu stuff
EngineInitializationFunctions.push(function ()
{
	var menuContext;
	menuContext = [];
	menuContext += Context.map["menus"];
	
	var mainMenuContext = [];
	mainMenuContext += Context.map["mainMenu"];
	
	var button = new MenuButtonObject();
	
	button.position.x = 160;
	button.position.y = 60;
	
	button.setText("Go to da game!!!");
	
	button.depth = 500;
	
	//Set the target draw & input context
	button.drawContext += mainMenuContext;
	button.inputContext += mainMenuContext;
	
	//Override the onClick, like all the good buttons do
	button.onClick = function()
	{
		//start the game or something i guess
		Engine.setDrawContext(Context.map["gameScreenDesk"]);
	};
	
	Engine.addObject(button);
	
	var darkness = new GameObject;

	darkness.depth = 499;
	
	darkness.drawContext += menuContext;
	
	//background darkness
	darkness.draw = function()
	{
		context.fillStyle="#000000";
		context.globalAlpha=0.8;
		context.fillRect(0,0,screenSize.x,screenSize.y);
		context.globalAlpha=1;
	};
	
	Engine.addObject(darkness);
});
