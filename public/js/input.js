var Input = {
	currentMousePos: new Vector2(0,0),
	mouseClicked: false,
	uptMouseClicked: false,
	inputAreaScale: 1.0, //determines how the window coordinates scale to the game coordinates
	update: function (scale)
	{
		Input.inputAreaScale = scale;
		//To avoid concurrency issues and stuff, we do it like this
		Input.mouseClicked = Input.uptMouseClicked;
		Input.uptMouseClicked = false;
	},
	init: function(canvas)
	{
		canvas.addEventListener("mousemove",
		function(ev)
		{
			Input.currentMousePos.x = ev.clientX/Input.inputAreaScale;
			Input.currentMousePos.y = ev.clientY/Input.inputAreaScale;
		}
		, false);
		
		canvas.addEventListener("click",
		function(ev)
		{
			Input.uptMouseClicked = true;
		}
		, false);
	},
	checkMouseOver: function(aabb)
	{
		if (Input.currentMousePos.x > aabb.aa.x)
		if (Input.currentMousePos.y > aabb.aa.y)
		if (Input.currentMousePos.x < aabb.bb.x)
		if (Input.currentMousePos.y < aabb.bb.y)
			return true;
		
		return false;
	},
	checkMouseOverOffset: function(aabb, offset)
	{
		if (Input.currentMousePos.x > aabb.aa.x + offset.x)
		if (Input.currentMousePos.y > aabb.aa.y + offset.y)
		if (Input.currentMousePos.x < aabb.bb.x + offset.x)
		if (Input.currentMousePos.y < aabb.bb.y + offset.y)
			return true;
		
		return false;
	},
	isPressed: function()
	{
		return Input.mouseClicked;
	}
}