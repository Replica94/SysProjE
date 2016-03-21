var Dialogue = 
{
	dialogue : {},
	loaded: false,
	load : function ()
	{
		var get = new XMLHttpRequest();
		get.onreadystatechange = function(event)
		{
			if (get.readyState==4)
			{
				if (get.status==200)
				{
					console.log(get.responseText);
					Dialogue.dialogue = JSON.parse(get.responseText);
					Dialogue.loaded = true;
				}
				else
				{
					console.log("Error loading dialogues");
					Dialogue.loaded = true;
				}
			}
		}
		get.open("GET","./assets/Dialogue.json",true);
		get.send();
	},
	getRandomGreeting : function()
	{
		if ("dialogue" in this.dialogue &&
			"greetings" in this.dialogue["dialogue"] &&
			this.dialogue["dialogue"]["greetings"].length > 0)
			{
				return this.dialogue["dialogue"]["greetings"][GetRandomBetween(0,this.dialogue["dialogue"]["greetings"].length)]["greeting"];
			}
		else
			return "...";
	}
}
Dialogue.load();
AssetLoadFunctions.push(function()
{
	//console.log("fdsfsd sdfds dialogues");
	//console.log(Dialogue.dialogue);
	return Dialogue.loaded;
});