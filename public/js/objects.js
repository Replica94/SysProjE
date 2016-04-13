EngineInitializationFunctions.push(function ()
{
	var recipebutton = new ButtonObject();
	recipebutton.position.x = 0;
	recipebutton.position.y = 132;
	recipebutton.depth = 400;
    recipebutton.size.x = 100;
    recipebutton.size.y = 40;
	recipebutton.drawOffset = Context.drawOffset["behindDesk"];
	recipebutton.update = function()
	{
		this.updateRealObject();
        if(Persons.showrecipe)
        {
            recipebutton.visible = false;
        }
        else 
            recipebutton.visible = true;
	};
	recipebutton.onClick = function()
	{
        Engine.setDrawContext(Context.map["recipeDesk"]);
	};
    
    recipebutton.draw = function()
	{
		if (this.mouseHover)
			context.drawImage(Texture.map["presc"], this.position.x-10, this.position.y-10, this.size.x+20, this.size.y+20);
		else
			context.drawImage(Texture.map["presc"], this.position.x, this.position.y, this.size.x, this.size.y);
	};
    
    recipebutton.inputContext += Context.map["gameScreenDesk"];
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
    recipeDrawObject.position.x = screenSize.x / 3;
    recipeDrawObject.position.y = screenSize.y / 4;
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
	pause.position.x = 120;
	pause.position.y = 0;
    pause.size.x = 30;
    pause.size.y = 45;
	pause.depth = 1000;
    pause.drawContext = Context.map["gstates"];
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
    timerr.update = function()
    {
        timerr.position.x = screenSize.x - 150;
        timerr.position.y = 20;
        timerr.position.x -= timerr.size.x - timerr.oldwidth;
		timerr.currenttime = Time.getSecondsSinceStart();
		timerr.setText(this.currenttime);

	}
	Engine.addObject(timerr);
    
    //scores
    var scores = new ScoreShow();
    scores.update = function()
    {
        scores.position.x = screenSize.x - 150;
        scores.position.y = 80;
		scores.setText(Score.currentScore);
	}
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
    
    //the computer
    var computerDrawObject = new RealObject();
    computerDrawObject.position.x = 200;
    computerDrawObject.position.y = -25;
    computerDrawObject.size.x = 130*1.3;
    computerDrawObject.size.y = 170*1.3;
    computerDrawObject.drawOffset = Context.drawOffset["behindDesk"];
    //recipeDrawObject.depth = 200;
	computerDrawObject.checkForInput = true;
    computerDrawObject.drawContext += Context.map["menuanddesk"];
	computerDrawObject.inputContext += Context.map["menuanddesk"];
	computerDrawObject.onClick = function()
	{
		var ad = new Audio("assets/sounds/computer.ogg");
		ad.playbackRate = Math.random()*1.0+0.5;
		ad.play();
	}
	
    computerDrawObject.draw = function()
    {
        context.drawImage(Texture.map["computer"], this.position.x, this.position.y, this.size.x, this.size.y);
    }
    Engine.addObject(computerDrawObject);
    
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
    
        
    var confirmamount = new ButtonObject();
	confirmamount.position.x = screenSize.x / 1.3;
	confirmamount.position.y = screenSize.y / 2.2;
	confirmamount.depth = 400;
    confirmamount.font = "28px Arial";
	confirmamount.setText("Confirm");
	confirmamount.update = function()
	{
		this.updateRealObject();
	};
	confirmamount.onClick = function()
	{
        if(RadioButtons.isselected)
        {
            if(RadioButtons.getSelectedButtonValue() == currentCalculation.choices[currentCalculation.correctAnswer] 
               && mboChosenBox.drug.drug == currentCalculation.agent)
            {
                Engine.setDrawContext(Context.map["gameScreenDesk"]);
                Persons.allPersons[0].setIsServed();
                Score.updateScore();
                Score.newRound();
            }
            else 
            {
                GameLogic.gameover(0);
            }

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
    
    var backFromCalcScreen = new ButtonObject();
	backFromCalcScreen.position.x = screenSize.x / 30;
	backFromCalcScreen.position.y = screenSize.y / 1.1;
	backFromCalcScreen.depth = 400;
	backFromCalcScreen.setText("Back");
	backFromCalcScreen.update = function()
	{
		this.updateRealObject();
	};
	backFromCalcScreen.onClick = function()
	{
        Engine.setDrawContext(5);
	};
    backFromCalcScreen.inputContext += Context.map["gameCalculationScreen"];
    backFromCalcScreen.drawContext += Context.map["gameCalculationScreen"];
	Engine.addObject(backFromCalcScreen);
    
    //huge recipe object
    var recipeDrawObject2 = new RealObject();
    recipeDrawObject2.position.x = screenSize.x / 4;
    recipeDrawObject2.position.y = screenSize.y / 4;
    recipeDrawObject2.size.x = 640;
    recipeDrawObject2.size.y = 400;
    recipeDrawObject2.depth = 500;
    recipeDrawObject2.checkForInput = false;
    recipeDrawObject2.drawContext += Context.map["gameCalculationScreen"];

    recipeDrawObject2.draw = function()
    {
        context.drawImage(Texture.map["prescription"], this.position.x, this.position.y, this.size.x, this.size.y);
    }
    Engine.addObject(recipeDrawObject2);
    
    var prescriptiontext = new WriteObject();
    
    prescriptiontext.position = new Vector2(screenSize.x / 4, screenSize.y / 2.65);
    prescriptiontext.drawContext += Context.map["gameCalculationScreen"];
    prescriptiontext.depth = 1000;
    prescriptiontext.update = function()
    {
        this.setText(currentCalculation.agent + " " + currentCalculation.wanted);
    };
    
    Engine.addObject(prescriptiontext);
    
    var prescriptiontextdesk = new WriteObject(); 
    prescriptiontextdesk.position = new Vector2(screenSize.x / 3, screenSize.y / 2.65);
    prescriptiontextdesk.drawContext += Context.map["recipeDesk"];
    prescriptiontextdesk.depth = 1000;
    prescriptiontextdesk.update = function()
    {
        this.setText(currentCalculation.agent + " " + currentCalculation.wanted);
    };
    Engine.addObject(prescriptiontextdesk);
    
    var prescriptiontextdeskname = new WriteObject();
    prescriptiontextdeskname.position = new Vector2(screenSize.x / 2.55, screenSize.y / 3.25);
    prescriptiontextdeskname.drawContext += Context.map["recipeDesk"];
    prescriptiontextdeskname.depth = 1000;
    prescriptiontextdeskname.setText("No name");
    Engine.addObject(prescriptiontextdeskname);
    
    var prescriptiontextdeskbirth = new WriteObject();
    prescriptiontextdeskbirth.position = new Vector2(screenSize.x / 1.92, screenSize.y / 3.25);
    prescriptiontextdeskbirth.drawContext += Context.map["recipeDesk"];
    prescriptiontextdeskbirth.depth = 1000;
    prescriptiontextdeskbirth.setText("Unknown");
    Engine.addObject(prescriptiontextdeskbirth);
    
    var prescriptiontextdeskweight = new WriteObject();
    prescriptiontextdeskweight.position = new Vector2(screenSize.x / 1.62, screenSize.y / 3.25);
    prescriptiontextdeskweight.drawContext += Context.map["recipeDesk"];
    prescriptiontextdeskweight.depth = 1000;
    prescriptiontextdeskweight.setText("Too much");
    Engine.addObject(prescriptiontextdeskweight);
    
    var prescriptiontextname = new WriteObject();
    prescriptiontextname.position = new Vector2(screenSize.x / 3.1875, screenSize.y / 3.25);
    prescriptiontextname.drawContext += Context.map["gameCalculationScreen"];
    prescriptiontextname.depth = 1000;
    prescriptiontextname.setText("No name");
    Engine.addObject(prescriptiontextname);
    
    var prescriptiontextbirth = new WriteObject();
    prescriptiontextbirth.position = new Vector2(screenSize.x / 2.28, screenSize.y / 3.25);
    prescriptiontextbirth.drawContext += Context.map["gameCalculationScreen"];
    prescriptiontextbirth.depth = 1000;
    prescriptiontextbirth.setText("Unknown");
    Engine.addObject(prescriptiontextbirth);
    
    var prescriptiontextweight = new WriteObject();
    prescriptiontextweight.position = new Vector2(screenSize.x / 1.875, screenSize.y / 3.25);
    prescriptiontextweight.drawContext += Context.map["gameCalculationScreen"];
    prescriptiontextweight.depth = 1000;
    prescriptiontextweight.setText("Too much");
    Engine.addObject(prescriptiontextweight);
    
    var boxm2 = new GameObject;
	boxm2.depth = 450;
	boxm2.drawContext += Context.map["gameCalculationScreen"];
	boxm2.draw = function()
	{
		RenderLabel(new Vector2(screenSize.x/4, 10), mboChosenBox.label);
	};
	
	Engine.addObject(boxm2);
    
    
    var recipebuttoncabinet = new ButtonObject();
	recipebuttoncabinet.position.x = screenSize.x / 2;
	recipebuttoncabinet.position.y = screenSize.y / 1.08;
	recipebuttoncabinet.depth = 400;
	recipebuttoncabinet.setText("Prescription");
	recipebuttoncabinet.update = function()
	{
		this.updateRealObject();
	};
	recipebuttoncabinet.onClick = function()
	{
        Engine.setDrawContext(Context.map["gameCabinetRecipeShow"]);
	};
    recipebuttoncabinet.inputContext += Context.map["gameMedicineCabinetContexts"];
    recipebuttoncabinet.drawContext += Context.map["gameMedicineCabinetContexts"];
	Engine.addObject(recipebuttoncabinet);
    
    //Whole screen invisible button when recipe is shown on desk
    var invRecipeBackButtonCabinet = new InvisibleButton();
    invRecipeBackButtonCabinet.position.x = 0;
    invRecipeBackButtonCabinet.position.y = 0;
    invRecipeBackButtonCabinet.size.x = screenSize.x;
    invRecipeBackButtonCabinet.size.y = screenSize.y;
    invRecipeBackButtonCabinet.depth = 100000;
    invRecipeBackButtonCabinet.inputContext += Context.map["gameCabinetRecipeShow"];
    invRecipeBackButtonCabinet.onClick = function()
    {
        if(mboChosenBox != null)
            Engine.setDrawContext(Context.map["gameMedicineCabinet"]);
        Engine.setDrawContext(Context.map["gameMedicineCabinetExamine"]);
    }
    Engine.addObject(invRecipeBackButtonCabinet);
    
    //huge recipe object
    var recipeDrawObjectCabinet = new RealObject();
    recipeDrawObjectCabinet.position.x = screenSize.x / 3;
    recipeDrawObjectCabinet.position.y = screenSize.y / 4;
    recipeDrawObjectCabinet.size.x = 640;
    recipeDrawObjectCabinet.size.y = 400;
    recipeDrawObjectCabinet.depth = 10000;
    recipeDrawObjectCabinet.checkForInput = false;
    recipeDrawObjectCabinet.drawContext += Context.map["gameCabinetRecipeShow"];

    recipeDrawObjectCabinet.draw = function()
    {
        context.drawImage(Texture.map["prescription"], this.position.x, this.position.y, this.size.x, this.size.y);
    }
    Engine.addObject(recipeDrawObjectCabinet);
    
    
    var prescriptiontextdesk = new WriteObject(); 
    prescriptiontextdesk.position = new Vector2(screenSize.x / 3, screenSize.y / 2.65);
    prescriptiontextdesk.drawContext += Context.map["recipeDesk"];
    prescriptiontextdesk.depth = 1000;
    prescriptiontextdesk.update = function()
    {
        this.setText(currentCalculation.agent + " " + currentCalculation.wanted);
    };
    Engine.addObject(prescriptiontextdesk);
    
    var prescriptiontextcabinetname = new WriteObject();
    prescriptiontextcabinetname.position = new Vector2(screenSize.x / 2.55, screenSize.y / 3.25);
    prescriptiontextcabinetname.drawContext += Context.map["gameCabinetRecipeShow"];
    prescriptiontextcabinetname.depth = 1000000;
    prescriptiontextcabinetname.setText("No name");
    Engine.addObject(prescriptiontextcabinetname);
    
    var prescriptiontextcabinetbirth = new WriteObject();
    prescriptiontextcabinetbirth.position = new Vector2(screenSize.x / 1.92, screenSize.y / 3.25);
    prescriptiontextcabinetbirth.drawContext += Context.map["gameCabinetRecipeShow"];
    prescriptiontextcabinetbirth.depth = 1000000;
    prescriptiontextcabinetbirth.setText("Unknown");
    Engine.addObject(prescriptiontextcabinetbirth);
    
    var prescriptiontextcabinetweight = new WriteObject();
    prescriptiontextcabinetweight.position = new Vector2(screenSize.x / 1.62, screenSize.y / 3.25);
    prescriptiontextcabinetweight.drawContext += Context.map["gameCabinetRecipeShow"];
    prescriptiontextcabinetweight.depth = 1000000;
    prescriptiontextcabinetweight.setText("Too much");
    Engine.addObject(prescriptiontextcabinetweight);
    
    var prescriptiontextcabinet = new WriteObject(); 
    prescriptiontextcabinet.position = new Vector2(screenSize.x / 3, screenSize.y / 2.65);
    prescriptiontextcabinet.drawContext += Context.map["gameCabinetRecipeShow"];
    prescriptiontextcabinet.depth = 1000000;
    prescriptiontextcabinet.update = function()
    {
        this.setText(currentCalculation.agent + " " + currentCalculation.wanted);
    };
    Engine.addObject(prescriptiontextcabinet);
    
    
});