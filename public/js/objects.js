EngineInitializationFunctions.push(function ()
{
	var recipebutton = new ButtonObject();
	recipebutton.position.x = 0;
	recipebutton.position.y = 132;
	recipebutton.depth = 400;
	
	recipebutton.drawOffset = Context.drawOffset["behindDesk"];
	recipebutton.setText("Recipe!!!!! :DDDD");
	recipebutton.update = function()
	{
		this.updateRealObject();
		this.visible = (Math.sin(Time.getSecondsSinceStart()) > 0);
		
	};
	recipebutton.onClick = function()
	{
		alert("Yo recupee!!!");
	};
    recipebutton.inputContext = Context.map["gstates"];
    recipebutton.drawContext = Context.map["gstates"];
	Engine.addObject(recipebutton);
});