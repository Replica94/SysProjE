function MovableObject()
{
    GameObject.call(this);
	this.position = new Vector2(500,500);
	this.size = new Vector2(128,128);
	this.checkForInput = true;
	this.bounds = GenerateAABB(this.position, this.size);
    this.mouseClicked = false;
	this.updateRealObject = function()
	{
		
	}
    
	this.update = function()
	{
		if(this.mouseClicked)
        {
            this.position = new Vector2(Input.currentMousePos.x - this.size.x/2, Input.currentMousePos.y - this.size.y/2);
            this.bounds = GenerateAABB(this.position, this.size);
        }
	}
    
	this.draw = function()
	{
		if (this.clicked)
			context.fillStyle = "#ffffff";
		else
		if (this.mouseHover)
			context.fillStyle = "#897867";
		else
			context.fillStyle = "#345678";
		context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
	}
	this.onClick = function()
	{
        if(this.mouseClicked)
        {
            this.mouseClicked = false;
        }
        else
        {
            this.mouseClicked = true;
        }
	}
}

MovableObject.prototype = new RealObject();
MovableObject.constructor = MovableObject.Object;