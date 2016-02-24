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
	
	this.div = function (vec)
	{
		return new Vector2(this.x/vec.x,this.y/vec.y);
	};
	
	this.mul = function (vec)
	{
		return new Vector2(this.x*vec.x,this.y*vec.y);
	};
	
	this.addScalar = function (s)
	{
		return new Vector2(this.x+s,this.y+s);
	};
	
	this.subScalar = function (s)
	{
		return new Vector2(this.x-s,this.y-s);
	};
	
	this.mulScalar = function (s)
	{
		return new Vector2(this.x*s,this.y*s);
	};
	
	this.divScalar = function (s)
	{
		return new Vector2(this.x/s,this.y/s);
	};
}