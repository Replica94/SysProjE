var Context = {
	map : 
	{
		"nullContext":				0,
		"mainMenu":					1,
		"gameScreenDesk":			2,
		"gameScreenSomethingElse":	3,
        "recipeDesk":               4,

		
		"gameMedicineCabinet":		5,
		"gameMedicineCabinetExamine": 6,
		"gameCalculationScreen":    7,
        "gameCabinetRecipeShow":    8,
		"gameMedicineCabinetContexts": [5,6,8],
		
		
		
		"gameDeskContexts": [2,4],
		
		"menus":					[1], //List of all menus
        "gstates":					[2,3,4,5,6,7,8],
        "menuanddesk":              [1,2,4,7],
	},
	
	drawOffset :
	{
		"normal": 0,
		"behindDesk": 1
	},
	
	updateContext :
	{
		global: 0,
		game: 1
	},
	
	gameContexts : [2, 3, 4, 5, 6, 7, 8]
};
