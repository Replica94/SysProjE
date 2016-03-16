var GameLogic = 
{
	step : function(){
        MyDebugger.getCoordsFromMouse();
		switch(Engine.currentDrawContext)
		{
			case Context.map["gameScreenDesk"]:
				Time.calcDelta();
				Persons.update();
				MyAudio.loopMusic();
				break;
			case Context.map["mainMenu"]:
				break;
		}
	}
	
}