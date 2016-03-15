var GameLogic = 
{
	step : function(){
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