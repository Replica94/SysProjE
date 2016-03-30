EngineInitializationFunctions.push(function ()
{
	var recipebutton = new ButtonObject();
	recipebutton.position.x = 0;
	recipebutton.position.y = 132;
	recipebutton.depth = 400;
	recipebutton.drawOffset = Context.drawOffset["behindDesk"];
	recipebutton.setText("Prescription");
	recipebutton.update = function()
	{
		this.updateRealObject();
	};
	recipebutton.onClick = function()
	{
        Engine.setDrawContext(Context.map["recipeDesk"]);
	};
    recipebutton.inputContext = Context.map["gstates"];
    recipebutton.drawContext += Context.map["gameScreenDesk"];
	Engine.addObject(recipebutton);
    
	
	//Restart button in game
	var restartbutton = new ButtonObject();
	restartbutton.position.x = 5;
	restartbutton.position.y = 0;
	restartbutton.depth = 1000;
	restartbutton.setText("Restart");
	restartbutton.size.x = context.measureText("Restart").width + 20;
	restartbutton.onClick = function()
	{
		Engine.setDrawContext(1);
	}
    
    restartbutton.inputContext = Context.map["gstates"];
    restartbutton.drawContext = Context.map["gstates"];
	Engine.addObject(restartbutton);
    
    //Whole screen invisible button when recipe is shown on desk
    var invRecipeBackButton = new InvisibleButton();
    invRecipeBackButton.position.x = 0;
    invRecipeBackButton.position.y = 0;
    invRecipeBackButton.size.x = screenSize.x;
    invRecipeBackButton.size.y = screenSize.y;
    invRecipeBackButton.depth = 100000;
    invRecipeBackButton.inputContext += Context.map["recipeDesk"];
    invRecipeBackButton.onClick = function()
    {
        Engine.setDrawContext(Context.map["gameScreenDesk"]);
    }
    Engine.addObject(invRecipeBackButton);
    
    //huge recipe object
    var recipeDrawObject = new RealObject();
    recipeDrawObject.position.x = 678;
    recipeDrawObject.position.y = 154;
    recipeDrawObject.size.x = 640;
    recipeDrawObject.size.y = 400;
    //recipeDrawObject.depth = 200;
    recipeDrawObject.drawContext += Context.map["recipeDesk"];

    recipeDrawObject.draw = function()
    {
        context.drawImage(Texture.map["prescription"], this.position.x, this.position.y, this.size.x, this.size.y);
    }
    Engine.addObject(recipeDrawObject);
    //audio pause button
	var pause = new RealObject();
	pause.position.x = 90;
	pause.position.y = 0;
    pause.size.x = 20;
    pause.size.y = 30;
	pause.depth = 1000;
	pause.onClick = function()
	{
		MyAudio.paused = !MyAudio.paused;
	}
	Engine.addObject(pause);
    pause.draw = function()
    {
        if(!MyAudio.paused)
            context.drawImage(Texture.map["note"], this.position.x, this.position.y, this.size.x, this.size.y);
        else
            context.drawImage(Texture.map["noteoff"], this.position.x, this.position.y, this.size.x, this.size.y);
    }
	
	//timer 
	var timerr = new Timer();
	timerr.depth = 1000;
	Engine.addObject(timerr);
    //scores
    var scores = new ScoreShow();
	scores.depth = 1000;
    Engine.addObject(scores);
    
    //the flower
    var flowerDrawObject = new RealObject();
    flowerDrawObject.position.x = -800;
    flowerDrawObject.position.y = 20;
    flowerDrawObject.size.x = 130;
    flowerDrawObject.size.y = 170;
    flowerDrawObject.drawOffset = Context.drawOffset["behindDesk"];
    //recipeDrawObject.depth = 200;
    flowerDrawObject.drawContext += Context.map["menuanddesk"];

    flowerDrawObject.draw = function()
    {
        context.drawImage(Texture.map["plant"], this.position.x, this.position.y, this.size.x, this.size.y);
    }
    Engine.addObject(flowerDrawObject);
    


    
    var darknessCalculations = new GameObject;

	darknessCalculations.depth = 100;
	
	darknessCalculations.drawContext += Context.map["gameCalculationScreen"];
	
	//background darkness
	darknessCalculations.draw = function()
	{
		context.fillStyle="#000000";
		context.globalAlpha=0.8;
		context.fillRect(0,0,screenSize.x,screenSize.y);
		context.globalAlpha=1;
	};
	
	Engine.addObject(darknessCalculations);
    
    var confirmdrug = new ButtonObject();
	confirmdrug.position.x = screenSize.x / 1.5;
	confirmdrug.position.y = screenSize.y / 7;
	confirmdrug.depth = 400;
	confirmdrug.setText("Confirm");
	confirmdrug.update = function()
	{
		this.updateRealObject();
	};
	confirmdrug.onClick = function()
	{
        Engine.setDrawContext(7);
	};
    confirmdrug.inputContext += Context.map["gameMedicineCabinetExamine"];
    confirmdrug.drawContext += Context.map["gameMedicineCabinetExamine"];
	Engine.addObject(confirmdrug);
    
        
    var confirmamount = new ButtonObject();
	confirmamount.position.x = screenSize.x / 1.4;
	confirmamount.position.y = screenSize.y / 3.1;
	confirmamount.depth = 400;
	confirmamount.setText("Confirm");
	confirmamount.update = function()
	{
		this.updateRealObject();
	};
	confirmamount.onClick = function()
	{
        if(RadioButtons.isselected)
        {
            Engine.setDrawContext(Context.map["gameScreenDesk"]);
            Persons.allPersons[0].setIsServed();
            Score.updateScore();
            Score.newRound();
        }
	};
    confirmamount.draw = function()
	{
		context.lineWidth = 2;
		//Set the current drawing font
		context.font = this.font;
		
		//this.mouseHover is set by the Engine
		//if the mouse is over the object
		
		if (this.mouseHover && RadioButtons.isselected) //if mouse.hover or button selected
			context.fillStyle = "#AAAAAA"; //use some darker background
		else if(!RadioButtons.isselected)
			context.fillStyle = "#AAAAAA";
        else
            context.fillStyle = "#FFFFFF";
		
		//Fill the area from position to position+size
		context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
		
		//Stroke a nice shadow
		context.strokeStyle = "#888888";
		context.strokeRect(this.position.x, this.position.y, this.size.x-2, this.size.y-2);
		
		//Stroke dat edges 2
		context.strokeStyle = "#000000";
		context.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
		
		//Change color to black
		context.fillStyle = "#000000";
		
		//And print our text
		context.fillText(this.text,this.position.x+10,this.position.y+22);
	}
    confirmamount.inputContext += Context.map["gameCalculationScreen"];
    confirmamount.drawContext += Context.map["gameCalculationScreen"];
	Engine.addObject(confirmamount);
});