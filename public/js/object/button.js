var ButtonObject = function()
{
	RealObject.call(this);
	
	this.image = null;
	this.font = "18px Arial";
	this.text = "";
	
	this.update = function()
	{
		this.updateRealObject();
	}
	
	this.setText = function(text)
	{
		context.font = this.font;
		this.size.x = context.measureText(text).width+25;
		this.size.y = 32;
		this.text = text;
	}
	
	this.draw = function()
	{
		context.font = this.font;
		if (this.mouseHover)
			context.fillStyle = "#AAAAAA";
		else
			context.fillStyle = "#FFFFFF";
		
		context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
		context.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
		
		context.fillStyle = "#000000";
		context.fillText(this.text,this.position.x+6,this.position.y+22);
	}
}

ButtonObject.prototype = new RealObject();
ButtonObject.constructor = ButtonObject;
