/**
	The Engine contruct
	
	Manages the object system and object drawing
*/
var Engine =
{
	/** Array containing all the game objects */
	objects: new Array(),
	/**
		Numerical representation of the current "drawing view".
		
		Usually used to separate different views of the game,
		such as main menu, the customer view, shelf view etc.
	*/
	currentDrawContext: 1,
	/**
		Numerical representation of the current input context.
		
		Highly similar to the currentDrawContext, except this controls
		the ability to interact with the object.
		
	*/
	currentInputContext: 1,
	currentUpdateContext: 0,
	
	contextOffsets: [new Vector2(0,0)],
	
	/**
		Engine internal sort function.
		
		Used for Z-sorting game objects.
	*/
	sort: function()
	{
		//sorts the object list based on depth
		this.objects.sort(function(a,b)
		{
			return a.depth - b.depth;
		});
	},
	
	/**
		Adds a new object to the engine lists
		
		This subjects the object to the world:
		object's  update(), onClick() and others
		will be called automatically. The draw()
		is also called if the drawing context matches.
	*/
	addObject: function (obj)
	{
		Engine.objects.push(obj);
		Engine.sort();
	},
	
	/**
		Sets the current context
	*/
	setDrawContext: function (ctx)
	{
		Engine.currentDrawContext = ctx;
		Engine.currentInputContext = ctx;
		Engine.currentUpdateContext = 0;
		if (Context.gameContexts.indexOf(ctx) != -1)
			Engine.currentUpdateContext = Context.updateContext.game;
	},
	
	
	/**
		Engine updating routine.
		
		Should be called relatively often by the main loop.
		
		This updates all the game objects, handles their input
		and possibly calls their draw methods.
	*/
	update: function ()
	{
		var behindDesk = new Vector2(0,0);
		behindDesk.x = screenSize.x/2;
		behindDesk.y = screenSize.y-400;
		
		this.contextOffsets[Context.drawOffset["behindDesk"]] = behindDesk;
		
		//If the mouse is over something
		var mouseHit = false;
		var clicked = Input.isPressed();
		
		
		
		//We iterate the array from top to bottom
		//from closest to the farthest object
		//to ensure that clicking stuff will invoke the onClick handler of the 
		//nearest objects
		
		for (var i = Engine.objects.length - 1; i >= 0; i--)
		{
			var obj = Engine.objects[i];
			try
			{
				//If the object's inputContext is empty, it is univeral
				//Otherwise, check for the correct inputContext 
				if (obj.checkForInput)
				if ((obj.inputContext.length == 0) || (obj.inputContext.indexOf(Engine.currentInputContext) != -1))
				{
					if ((obj.visible) && (!mouseHit) && Input.checkMouseOverOffset(obj.bounds, this.contextOffsets[obj.drawOffset]))
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
				
				if ((obj.updateContext == 0) || (obj.updateContext == Engine.currentUpdateContext))
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
	
	remoteDoom : function() 
	{
		for (var i = Engine.objects.length - 1; i >= 0; i--)
		{
			var obj = Engine.objects[i];
			if (obj.isDoomed)
				Engine.objects.splice(i, 1); 		
		}
	},
	
	init: function ()
	{
		_EngineInit(Engine);
	},
	
	draw: function (context) 
	{
		for (var i = 0; i <  Engine.objects.length; i++)
		{
			var obj = Engine.objects[i];
			try
			{
				if (obj.visible && obj.draw != null)
				if ((obj.drawContext.length == 0) || (obj.drawContext.indexOf(Engine.currentDrawContext) != -1))
				{
					if (obj.drawOffset)
					{
						context.save();
						context.translate(this.contextOffsets[obj.drawOffset].x, this.contextOffsets[obj.drawOffset].y);
						obj.draw(context);
						context.restore();
					}
					else
						obj.draw(context);
					
				}
			}
			catch(err)
			{
				//ERROR
				console.log("Error handling object: ")
				console.log(obj);
				console.log(err);
			}
			
		}
	}
}