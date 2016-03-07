function GameObject()
{
	//All wanted contexts, or zero for all 
	this.drawContext = new Array();
	//Bitwise OR of all wanted contexts, or zero for all
	this.inputContext = new Array();
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
		this.mouseClicked = true;
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
TiledObject.constructor = TiledObject;


//Call addObject for stuff

var Engine =
{
	objects: new Array(),
	currentDrawContext: 1,
	currentInputContext: 1,
	
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
	
	setDrawContext: function (ctx)
	{
		Engine.currentDrawContext = ctx;
	},
	
	update: function ()
	{
		var mouseHit = false;
		var clicked = Input.isPressed();
		for (var i = Engine.objects.length - 1; i >= 0; i--)
		{
			var obj = Engine.objects[i];
			try
			{
				if ((obj.inputContext.length == 0) || (obj.inputContext.indexOf(Engine.currentInputContext) != -1))
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
						mouseHit = true;
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
					Engine.objects.splice(i, 1);
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
		Engine.addObject(new RealObject);
		_EngineInit(Engine);
	},
	draw: function (context) 
	{
		var contextOffset = new Vector2(0,0);
		for (var i = 0; i <  Engine.objects.length; i++)
		{
			var obj = Engine.objects[i];
			if (obj.draw != null)
			if ((obj.drawContext.length == 0) || (obj.drawContext.indexOf(Engine.currentDrawContext) != -1))
			{
				obj.draw(context, contextOffset);
			}
			
		}
	}
}