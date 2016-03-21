function SpeechBubbleObject(masta)
{
	GameObject.call(this);
	
	this.font = "18px Arial";
	this.text = "";
	this.master = masta;
	
	this.position = new Vector2(0,0);
	this.size = new Vector2(0,0);
	this.depth = 9000;
	this.displayTimeLimit = 0;
	this.display = false;
	this.displayTimer = 0;
	
	this.setText = function(text)
	{
		context.font = this.font;
		
		this.size.x = 225;
		
		this.size.y = 96;
		
		this.text = text;
		this.displayTimeLimit = text.length+60;
	}
	
	this.draw = function()
	{
		this.isDoomed = this.master.isDoomed;
		if (!this.display)
			return;
		this.displayTimer++;
		if (this.displayTimeLimit <= this.displayTimer)
		{
			this.display = false;
			this.displayTimer = 0;
		}
		context.lineWidth = 2;
		context.font = this.font;
		context.fillStyle = "#FFFFFF";
		
		
		context.drawBubble(this.position.x, this.position.y-200, this.size.x, this.size.y, this.position.x, this.position.y,25);
		
		context.fillStyle = "#000000";
		context.wrapText(this.text,this.position.x+10,this.position.y-167,200,18);
	
	}
}

SpeechBubbleObject.prototype = new GameObject();
SpeechBubbleObject.constructor = SpeechBubbleObject;