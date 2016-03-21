


//Cooler button for menus

/**
 	Constructor for MenuButton
	@constructor
*/
var MenuButtonObject = function()
{
	ButtonObject.call(this);
	
	this.font = "48px Arial";
	
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
	
	var NewGame = new MenuButtonObject();
	
	NewGame.position.x = screenSize.x / 4;
	NewGame.position.y = screenSize.y / 3;
	
	NewGame.setText("New Game");
	
	NewGame.depth = 500;
	
	//Set the target draw & input context
	NewGame.drawContext += mainMenuContext;
	NewGame.inputContext += mainMenuContext;
	
	//Override the onClick, like all the good buttons do
	NewGame.onClick = function()
	{
		//start the game or something i guess
        GameLogic.resetGame();
		Engine.setDrawContext(Context.map["gameScreenDesk"]);
	};
	
	Engine.addObject(NewGame);
    
    
    var logout = new MenuButtonObject();
	
	logout.position.x = screenSize.x / 4;
	logout.position.y = NewGame.position.y + 100;
	
	logout.setText("Logout");
	
	logout.depth = 500;
	
	//Set the target draw & input context
	logout.drawContext += mainMenuContext;
	logout.inputContext += mainMenuContext;
	
	//Override the onClick, like all the good buttons do
	logout.onClick = function()
	{
		//start the game or something i guess
        location.href = 'logout.php';
		
	};
	
	Engine.addObject(logout);
    
    
	
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
