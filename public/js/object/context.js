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
		"gameMedicineCabinetContexts": [5,6],
		
		"menus":					[1], //List of all menus
        "gstates":					[2,3,4,5,6],
        "menuanddesk":              [1,2,4],
        "deskshowing":              [2,4]
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
	
	gameContexts : [2, 3, 4, 5, 6]
};
