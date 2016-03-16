function MyDebugger()
{
    this.debugmode = false;
    this.getCoordsFromMouse = function()
    {
        if(debugmode)
            alert("X: " + Input.currentMousePos.x + " Y: " Input.currentMousePos.y);
    }
}