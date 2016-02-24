


function GameObject()
{
	//Bitwise OR of all wanted contexts, or zero for all 
	this.drawContext = 0;
	//Bitwise OR of all wanted contexts, or zero for all
	this.inputContext = 0;
	//The z index; greater z is "closer" to the screen
	this.z = 0;
	//Is set by the Engine, if the mouse is hovering on the object
	this.mouseHover = false;
	//Whether the Engine should send input events to this object
	this.checkForInput = false;
	//The object bounds for input checking
	this.bounds = new AABB(0, 0);
	//The method used to draw the object
	this.draw = null;
	//The method used for updating the object
	this.update = null;
	//The onClick callback
	this.onClick = null;
	//If the following is true, object will be deleted at next step
	this.isDoomed = true;
}

//How to inherit stuff in JavaScript?
//
//var TestObject = function(){stuff...}
//
//TestObject.prototype = new GameObject();
//TestObject.constructor = new TestObject();

//Call addObject for stuff

var Engine =
{
	objects: new Array(),
	sort: function()
	{
		this.objects.sort(function(a,b)
		{
			return a.z - b.z;
		});
	},
	
	addObject: function (obj)
	{
		this.objects.push(obj);
		this.sort();
	},
	
	update: function ()
	{
		for (var i = this.objects.length - 1; i >= 0; i--)
		{
			var obj = this.objects[i];
			if (obj.update != null)
				obj.update();
			if (obj.isDoomed)
				this.objects.splice(i, 1);
		}
	},
	init: function ()
	{
		
	},
	draw: function () //TODO
	{
		
	}
}