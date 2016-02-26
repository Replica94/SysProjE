/**
 	Constructor for Axis Aligned Bounding Box struct
	@param {Vector2} (aa) top-left of the bounding box
	@param {Vector2} (bb) bottom-right of the bounding box
	@constructor
*/
function AABB(aa, bb)
{
	this.aa = aa.copy();
	this.bb = bb.copy();
}

/** Generates an AABB from size and position (top-left) */
function GenerateAABB(position, size)
{
	return new AABB(position,position.add(size));
}
