var GameLogic = 
{
    isRecipeOnDesk : false,
	step : function(){
        MyDebugger.getCoordsFromMouse();
		switch(Engine.currentDrawContext)
		{
			case Context.map["gameScreenDesk"]:
				Time.calcDelta();
				Persons.update();
				MyAudio.loopMusic();
				break;
            case Context.map["recipeDesk"]:
                
                break;
			case Context.map["mainMenu"]:
				break;
		}
	}
	
}