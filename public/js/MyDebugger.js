var MyDebugger =
{
    debugmode : true,
    getCoordsFromMouse : function()
    {
        if(this.debugmode && Input.mouseClicked){
            console.log("X: " + Input.currentMousePos.x + " Y: " + Input.currentMousePos.y);
        }
            
    }
}