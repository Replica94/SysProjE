function GameObject()
{
	this.drawContext = 0;
	this.inputContext = 0;
	this.z = 0;
	this.mouseHover = false;
	this.checkForInput = false;
	this.bounds = new AABB(0, 0);
	this.draw = null;
	this.update = null;
	this.onClick = null;
	this.isDoomed = true;
}

TestObject.prototype = new GameObject();
TestObject.constructor = new TestObject();

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
	draw: function ()
	{
		
	}
}