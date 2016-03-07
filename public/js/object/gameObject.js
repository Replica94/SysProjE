function GameObject()
{
	//Bitwise OR of all wanted contexts, or zero for all 
	this.drawContext = 0;
	//Bitwise OR of all wanted contexts, or zero for all
	this.inputContext = 0;
	//The z index; greater z is "closer" to the screen
	this.depth = 0;
	//Is set by the Engine, if the mouse is hovering on the object
	this.mouseHover = false;
	//Is set by the Engine, if the object was clicked
	this.clicked = false;
	//Whether the Engine should send input events to this object
	this.checkForInput = false;
	//The object bounds for input checking
	this.bounds = new AABB(new Vector2(0,0),new Vector2(0,0));
	//The method used to draw the object
	this.draw = null;
	//The method used for updating the object
	this.update = null;
	//The onClick callback
	this.onClick = null;
	//If the following is true, object will be deleted at next step
	this.isDoomed = false;
}

//How to inherit stuff in JavaScript?
//
var RealObject = function()
{
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
		this.mouseClicked = true;
	}
}

RealObject.prototype = new GameObject();
RealObject.constructor = new RealObject();

var PropObject = function()
{
	
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
PropObject.constructor = new PropObject();


var TiledObject = function()
{
	//Do not touch
	this.oldImage = null;
	
	
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
TiledObject.constructor = new TiledObject();


//Call addObject for stuff

var Engine =
{
	objects: new Array(),
	sort: function()
	{
		this.objects.sort(function(a,b)
		{
			return a.depth - b.depth;
		});
	},
	
	addObject: function (obj)
	{
		Engine.objects.push(obj);
		Engine.sort();
	},
	
	update: function ()
	{
		var mouseHit = false;
		var clicked = Input.isPressed();
		for (var i = this.objects.length - 1; i >= 0; i--)
		{
			var obj = this.objects[i];
			try
			{
				if (obj.checkForInput)
				{
					if ((!mouseHit) && Input.checkMouseOver(obj.bounds))
					{
						obj.mouseHover = true;
						if (clicked)
						{
							obj.clicked = true;
							obj.onClick();
						}
						else
							obj.clicked = false;
					}
					else
					{
						obj.mouseHover = false;
						obj.clicked = false;
					}
				}
				
				if (obj.update != null)
					obj.update();
				if (obj.isDoomed)
					this.objects.splice(i, 1);
			}
			catch(err)
			{
				//ERROR
				console.log("Error handling object: ")
				console.log(obj);
				console.log(err);
			}
		}
	},
	init: function ()
	{
		this.addObject(new RealObject);
		_EngineInit(this);
	},
	draw: function (context) 
	{
		var currentContext = 1;
		var contextOffset = new Vector2(0,0);
		for (var i = 0; i <  this.objects.length; i++)
		{
			var obj = this.objects[i];
			if (obj.draw != null)
			if ((obj.drawContext == 0) || (obj.drawContext & currentContext))
			{
				obj.draw(context, contextOffset);
			}
			
		}
	}
}