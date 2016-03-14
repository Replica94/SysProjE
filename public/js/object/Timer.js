function Timer()
{
	this.position = new Vector2(32,128);
	this.size = new Vector2(128,48);
	this.checkForInput = false;
	this.position.x = screenSize.x - 150;																																																																			
	this.position.y = 20;
	this.font = "36px Arial";
	this.text = "";
	this.currenttime = 0;
	this.setText = function(text)
	{
		//Temporarily change the canvas' font
		context.font = this.font;
		
		//context.measureText(text) gets the approximate
		//width of the button text
		var oldwidth = this.size.x;
		var width = context.measureText(text).width;
		
		//Our button size will be that width plus some extra
		this.size.x = width+15;
		this.position.x -= this.size.x - oldwidth;
		
		//Nice hardcoded height
		
		this.text = text;
	}

	this.draw = function()
	{
		context.lineWidth = 2;
		//Set the current drawing font
		context.font = this.font;
		
		//this.mouseHover is set by the Engine
		//if the mouse is over the object
		
		context.fillStyle = "#FFFFFF";
		
		//Fill the area from position to position+size
		context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
		
		//Stroke a nice shadow
		context.strokeStyle = "#888888";
		context.strokeRect(this.position.x, this.position.y, this.size.x-2, this.size.y-2);
		
		//Stroke dat edges 2
		context.strokeStyle = "#000000";
		context.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
		
		//Change color to black
		context.fillStyle = "#000000";
		
		//And print our text
		context.fillText(this.text,this.position.x+7,this.position.y+37);
	}
	this.update = function(){
		this.currenttime = Time.getSecondsSinceStart();
		this.setText(this.currenttime);
	}
}
Timer.prototype = new RealObject();
Timer.constructor = Timer.Object;