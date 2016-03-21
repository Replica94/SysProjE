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
				MyAudio.loopMusic();
                Persons.update();
				break;
            case Context.map["recipeDesk"]:
                
                break;
			case Context.map["mainMenu"]:
				break;
		}
	}
	
}
