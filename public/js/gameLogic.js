var GameLogic = 
{
    isRecipeOnDesk : false,
	step : function(){
        MyDebugger.getCoordsFromMouse();
		Time.calcDelta();
        Persons.update();
		switch(Engine.currentDrawContext)
		{
			case Context.map["gameScreenDesk"]:
				MyAudio.loopMusic();
				break;
            case Context.map["recipeDesk"]:
                
                break;
			case Context.map["mainMenu"]:
				break;
		}
	}
	
}
