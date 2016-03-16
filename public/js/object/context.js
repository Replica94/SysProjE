var Context = {
	map : 
	{
		"nullContext":				0,
		"mainMenu":					1,
		"gameScreenDesk":			2,
		"gameScreenSomethingElse":	3,
		"gameMedicineCabinet":		4,
		"gameMedicineCabinetExamine":5,
		"gameMedicineCabinetContexts":[4,5],
		"menus":					[1], //List of all menus
        "gstates":					[2,3,4,5]
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
	
	gameContexts : [2,3,4,5]
};
