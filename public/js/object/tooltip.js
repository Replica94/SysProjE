function TooltipObject(msata)
{
	GameObject.call(this);
	
	this.font = "12px Arial";
	this.text = "";
	this.master = msata;
	
	this.size = new Vector2(0,0);
	this.depth = 9000;
	

	this.setText = function(text)
	{
		context.font = this.font;
		
		var width = context.measureText(text).width;
		
		this.size.x = width+25;
		
		this.size.y = 24;
		
		this.text = text;
	}
	
	this.draw = function()
	{
		if (!this.master.mouseHover)
			return;
		if (this.master.isDoomed)
		{
			this.isDoomed = true;
			return;
		}
		
		context.lineWidth = 2;
		context.font = this.font;
		
		context.fillStyle = "#FFFFAA";
		var pos = Input.currentMousePos.copy();
		pos.y -= 26;
		
		context.fillRect(pos.x, pos.y, this.size.x, this.size.y);
		
		context.fillStyle = "#000000";
		
		context.fillText(this.text,pos.x+10,pos.y+17);
	}
}

TooltipObject.prototype = new GameObject();
TooltipObject.constructor = TooltipObject;