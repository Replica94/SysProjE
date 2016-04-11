


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
	var diff = "Easy";
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
    
    NewGame.update = function()
    {
        NewGame.position.x = screenSize.x / 4;
        NewGame.position.y = screenSize.y / 3;
        NewGame.updateRealObject();
    }
        
	//Override the onClick, like all the good buttons do
	NewGame.onClick = function()
	{
		//start the game or something i guess
        GameLogic.resetGame();
        GameLogic.startRound();
		Engine.setDrawContext(Context.map["gameScreenDesk"]);
	};
	
	Engine.addObject(NewGame);
    
	
    var difficultyButton = new MenuButtonObject();
	
	difficultyButton.position.x = screenSize.x / 4;
	difficultyButton.position.y = NewGame.position.y + 100;
	
	difficultyButton.setText("Difficulty: " + diff);
	
	difficultyButton.depth = 500;
	
	//Set the target draw & input context
	difficultyButton.drawContext += mainMenuContext;
	difficultyButton.inputContext += mainMenuContext;
    
        
    difficultyButton.update = function()
    {
	   difficultyButton.position.x = screenSize.x / 4;
	   difficultyButton.position.y = NewGame.position.y + 100;
        difficultyButton.updateRealObject();
    }
	
	//Override the onClick, like all the good buttons do
	difficultyButton.onClick = function()
	{
        if(!Difficulty.disabled){
            Difficulty.changeDifficulty();
            difficultyButton.setText("Difficulty: " + Difficulty.gameDifficultyString);
        }

	};
    
    difficultyButton.draw = function()
	{
		context.font = this.font;
		
        if(!Difficulty.disabled)
        {
            if (this.mouseHover)
                context.fillStyle = "#FF0000";
            else
                context.fillStyle = "#FFFFFF";
        }
        else
        {
            context.fillStyle = "#BBBBBB";
        }
            

		
		//And print our text
		context.fillText(this.text,this.position.x+6,this.position.y+32);
		
		//Change color to black
		context.fillStyle = "#000000";
	}

	
	Engine.addObject(difficultyButton);
    
    var logout = new MenuButtonObject();
	
	logout.position.x = screenSize.x / 4;
	logout.position.y = difficultyButton.position.y + 100;
	
	logout.setText("Logout");
	
	logout.depth = 500;
	
	//Set the target draw & input context
	logout.drawContext += mainMenuContext;
	logout.inputContext += mainMenuContext;
    
    logout.update = function()
    {
        logout.position.x = screenSize.x / 4;
        logout.position.y = difficultyButton.position.y + 100;
        logout.updateRealObject();
    }
	
	logout.onClick = function()
	{
        location.href = 'logout.php';
		
	};
	
	Engine.addObject(logout);
	
	var gotoscore = new MenuButtonObject();
	
	gotoscore.position.x = screenSize.x / 4;
	gotoscore.position.y = logout.position.y + 100;
	
	gotoscore.setText("Highscores");
	
	gotoscore.depth = 500;
	
	gotoscore.drawContext += mainMenuContext;
	gotoscore.inputContext += mainMenuContext;
    
    gotoscore.update = function()
    {
        gotoscore.position.x = screenSize.x / 4;
        gotoscore.position.y = logout.position.y + 100;
        gotoscore.updateRealObject();
    }
	
	gotoscore.onClick = function()
	{
		window.open('highscore.php');
		
	};
	Engine.addObject(gotoscore);
	
    var user = new MenuButtonObject();
	
	user.position.x = screenSize.x / 4;
	user.position.y = screenSize.y / 40;
    user.font = "30px Arial";
	
	user.setText("Logged in as: " + username);
	
	user.depth = 500;
	
	//Set the target draw & input context
	user.drawContext += mainMenuContext;
	user.inputContext += mainMenuContext;
    
    user.update = function()
    {
        
    }
    
    user.draw = function()
	{
		context.font = user.font;
		
        context.fillStyle = "#FFFFFF";
		
		//And print our text
		context.fillText(user.text,user.position.x+6,user.position.y+32);
		
		//Change color to black
		context.fillStyle = "#000000";
	}
        
	//Override the onClick, like all the good buttons do
	user.onClick = function()
	{

	};
	
	Engine.addObject(user);
	
	

    
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




