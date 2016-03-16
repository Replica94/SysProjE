/** Array which stores all functions to be called upon game initialization **/
var EngineInitializationFunctions = [];

/**
 	Constructor for game objects
 	
	@constructor
*/
function GameObject()
{
	/** All wanted drawing contexts, or empty array for all */
	this.drawContext = new Array();
	/** All wanted input contexts, or empty array for all */
	this.inputContext = new Array();
	/** Target update context */
	this.updateContext = 0;
	
	/** Draw offset index to use (see context.js) */
	this.drawOffset = 0;
	
	/** The z index; greater z is "closer" to the screen */
	this.depth = 0;

	/** Whether the Engine should send input events to this object, such as onClick or mouseHover */
	this.checkForInput = false;
	
	/** Is set by the Engine if the mouse is hovering on the object before the update, assuming checkForInput is true */
	this.mouseHover = false;
	/** Is set by the Engine if the object was clicked before the update, assuming checkForInput is true */
	this.clicked = false;
	
	/** The object bounds for input checking */
	this.bounds = new AABB(new Vector2(0,0),new Vector2(0,0));
	/** The method used to draw the object */
	this.draw = null;
	/** The method used for updating the object */
	this.update = null;
	/** The onClick callback */
	this.onClick = null;
	/** If the following is set to true, object will be deleted at the next step */
	this.isDoomed = false;
	
	this.visible = true;
}

//How to inherit stuff in JavaScript?
//
var RealObject = function()
{
	GameObject.call(this);
	//some testing stuff
	this.position = new Vector2(32,128);
	this.size = new Vector2(128,128);
	this.checkForInput = true;
	
	this.updateRealObject = function()
	{
		this.bounds = GenerateAABB(this.position, this.size);
	}
	this.update = function()
	{
		this.updateRealObject();
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
		
	}
}

RealObject.prototype = new GameObject();
RealObject.constructor = RealObject;

var PropObject = function()
{
	GameObject.call(this);
	
	this.position = new Vector2(32,128);
	this.size = new Vector2(128,128);
	this.image = null;

	this.update = function()
	{
		
	}
	
	this.draw = function()
	{
		context.drawImage(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
	}
}

PropObject.prototype = new GameObject();
PropObject.constructor = PropObject;


var TiledObject = function()
{
	GameObject.call(this);
	
	this.position = new Vector2(32,128);
	this.size = new Vector2(128,128);
	
	this.image = null;
	this.pattern = null;
	this.repeatX = true;
	this.repeatY = true;
	
	this.updateSize = function()
	{
	}
	
	this.update = function()
	{
		this.updateSize();
	}
	
	this.draw = function()
	{
		var w = 0;
		var h = 0;
		while (w < this.size.x)
		{
			h = 0;
			while (h < this.size.y)
			{
				context.drawImage(this.image,this.position.x+w,this.position.y+h);
				h += this.image.height;
			}
			w += this.image.width;
			
		}
	}
}

TiledObject.prototype = new GameObject();
TiledObject.constructor = TiledObject;

var WriteObject = function()
{
	RealObject.call(this);
	//some testing stuff
	this.position = new Vector2(0,0);
	this.size = new Vector2(128,128);
	this.checkForInput = false;
    this.font = "18px Arial";
	this.text = "";
    //if false, the width will be calculated from text size.
    this.fixedsize = false;
    
	
	this.update = function()
	{
		
	}
    
	this.draw = function()
    {
        context.lineWidth = 2;
		//Set the current drawing font
		context.font = this.font;
		
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
		context.fillText(this.text,this.position.x+10,this.position.y+22);
	}
	this.onClick = function()
	{
		
	}
    this.setText = function(text)
	{
		//Temporarily change the canvas' font
		context.font = this.font;
		
		//context.measureText(text) gets the approximate
		//width of the button text
        if(fixedsize){
            var width = context.measureText(text).width;
		      
		  //Add some extra width
            this.size.x = width+25;
		      
		  //Nice hardcoded height
            this.size.y = 32;
        }

		this.text = text;
	}
}

WriteObject.prototype = new GameObject();
WriteObject.constructor = WriteObject;


