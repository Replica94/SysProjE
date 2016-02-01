function Vector2(x, y)
{
	this.x = x;
	this.y = y;
	this.add = function (vec)
	{
		return new Vector2(this.x+vec.x,this.y+vec.y);
	};
	this.sub = function (vec)
	{
		return new Vector2(this.x-vec.x,this.y-vec.y);
	};
}