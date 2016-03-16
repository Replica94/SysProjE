var GameLogic = 
{
    isRecipeOnDesk : false,
	step : function(){
        MyDebugger.getCoordsFromMouse();
        Persons.update();
		switch(Engine.currentDrawContext)
		{
			case Context.map["gameScreenDesk"]:
				Time.calcDelta();
				MyAudio.loopMusic();
				break;
            case Context.map["recipeDesk"]:
                
                break;
			case Context.map["mainMenu"]:
				break;
		}
	}
	
}