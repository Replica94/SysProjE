var GameLogic = 
{
    isRecipeOnDesk : false,
	step : function(){
        MyDebugger.getCoordsFromMouse();
		Time.calcDelta();
		switch(Engine.currentDrawContext)
		{
			case Context.map["gameScreenDesk"]:
            case Context.map["gameScreenSomethingElse"]:
            case Context.map["gameMedicineCabinetExamine"]:
            case Context.map["gameMedicineCabinet"]:
            case Context.map["recipeDesk"]:
            case Context.map["gameCalculationScreen"]:
                if(Time.getSecondsSinceStart() > 10)
                {

                }
				MyAudio.loopMusic();
                Persons.update();
				break;
            case Context.map["recipeDesk"]:
                
                break;
			case Context.map["mainMenu"]:
				break;
		}
	},
    
    startRound : function()
    {
        Score.roundStartTime = Date.now();
    },
    
    resetGame : function()
    {
        Score.resetScore();
		Persons.resetPersons();
		Time.reset(); 
    },
    
    gameover : function()
    {
		Engine.gameEnd = true;
    }

}

var Difficulty =
{
	gameDifficultyString : "Easy",
	gameDifficulty : 1,
	
	changeDifficulty : function()
	{
		if(this.gameDifficulty < 3)
			this.gameDifficulty++
		else
			this.gameDifficulty = 1;
		switch(this.gameDifficulty)
		{
			case 1:
			this.gameDifficultyString = "Easy";
			break;
			case 2:
			this.gameDifficultyString = "Medium";
			break;
			case 3:
			this.gameDifficultyString = "Hard";
			break;
			
		}
	}
}