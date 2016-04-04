/**
 	Constructor for Button
	@constructor
*/
var ButtonObject = function()
{
	//Call the parent constructor!!!!
	RealObject.call(this);
	
	//Add a property "font" and "text" to button
	this.font = "18px Arial";
	this.text = "";
	this.checkForInput = true;
	
	
	//Let's override the method "update"
	//Even though the update in RealObject is exactly same
	this.update = function()
	{
		//Call this to update the bounding box of the object
		//Otherwise, the object would be unclickable	
		this.updateRealObject();
	}
	
	//Declare a new method called setText
	//so we can change the button text
	this.setText = function(text)
	{
		//Temporarily change the canvas' font
		context.font = this.font;
		
		//context.measureText(text) gets the approximate
		//width of the button text
		var width = context.measureText(text).width;
		
		//Our button size will be that width plus some extra
		this.size.x = width+25;
		
		//Nice hardcoded height
		this.size.y = 32;
		
		this.text = text;
	}
	
	//Override the draw function a bit
	this.draw = function()
	{
		context.lineWidth = 2;
		//Set the current drawing font
		context.font = this.font;
		
		//this.mouseHover is set by the Engine
		//if the mouse is over the object
		
		if (this.mouseHover) //if mouse.hover
			context.fillStyle = "#AAAAAA"; //use some darker background
		else
			context.fillStyle = "#FFFFFF";
		
		//Fill the area from position to position+size
		context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
		
		//Stroke a nice shadow
		context.strokeStyle = "#888888";
		context.strokeRect(this.position.x, this.position.y, this.size.x-2, this.size.y-2);
		
		//Stroke dat edges 2
		context.strokeStyle = "#000000";
		context.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
		
		//Change color to black
		context.fillStyle = "#000000";
		
		//And print our text
		context.fillText(this.text,this.position.x+10,this.position.y+22);
	}
	
	
	//Override this in instantiation to
	//do some cool stuff
	this.onClick = function()
	{
		alert("ERROR: No button action!!!")
	}
}

//The "inheritance"
ButtonObject.prototype = new RealObject();

//The constructor assignment
ButtonObject.constructor = ButtonObject;


var InvisibleButton = function()
{
    this.draw = function()
    {
        
    }
}

//The "inheritance"
InvisibleButton.prototype = new ButtonObject();

//The constructor assignment
InvisibleButton.constructor = InvisibleButton;

var RadioButton = function(pos, buttonnumber)
{
    
    this.selected = false;
    this.value = 0;
    this.position = pos;
    this.size = new Vector2(48, 48);
    this.font = "18px Arial";
	this.text = this.value;
    this.depth = 500;
    this.buttonnumber = buttonnumber;
    this.inputContext += Context.map["gameCalculationScreen"];
    this.drawContext += Context.map["gameCalculationScreen"];
	this.checkForInput = true;
    this.setText = function(text)
	{
		//Temporarily change the canvas' font
		context.font = this.font;
		
		//context.measureText(text) gets the approximate
		//width of the button text
		var width = context.measureText(text).width;
		
		//Our button size will be that width plus some extra
		this.size.x = width+22;
		
		//Nice hardcoded height
		this.size.y = 32;
		
		this.text = text;
	}
    this.draw = function()
	{
		context.lineWidth = 2;
		//Set the current drawing font
		context.font = this.font;
		
		//this.mouseHover is set by the Engine
		//if the mouse is over the object
		
		if (this.mouseHover || this.selected) //if mouse.hover or button selected
			context.fillStyle = "#AAAAAA"; //use some darker background
		else
			context.fillStyle = "#FFFFFF";
		
		//Fill the area from position to position+size
		context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
		
		//Stroke a nice shadow
		context.strokeStyle = "#888888";
		context.strokeRect(this.position.x, this.position.y, this.size.x-2, this.size.y-2);
		
		//Stroke dat edges 2
		context.strokeStyle = "#000000";
		context.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
		
		//Change color to black
		context.fillStyle = "#000000";
		
		//And print our text
		context.fillText(this.text,this.position.x+10,this.position.y+22);
	}
    
    this.update = function()
    {
        this.updateRealObject();
    }
    
    this.onClick = function()
    {
        this.selected = true;
        RadioButtons.checkForSelections(this.buttonnumber);
    }
    
}

RadioButton.prototype = new ButtonObject();
RadioButton.constructor = RadioButton;
    
var RadioButtons =
{

    buttons : [],
    buttonsAmount : 4,
    position : new Vector2(1235, 232),
    size : new Vector2(1,1),
    depth : 0,
    isselected : false,
    changeButtonValues : function(values)
    {
        for(var i = 0; i < this.buttonsAmount; i++)
        {
            this.buttons[i].value = values[i];
            this.buttons[i].setText(values[i]);
        }
        this.reSize();
    },
    
    reSize : function()
    {
        if(this.buttons[0])
            this.size = new Vector2(this.buttons[0].size.x, this.buttons[0].size.y + this.buttonsAmount * 20);
    },
    
    generateButtons : function()
    {
        for(var i = 0; i < this.buttonsAmount; i++)
        {
            this.buttons.push(new RadioButton(new Vector2(this.position.x, this.position.y + i * 50), i));
        }
        for(var i = 0; i < this.buttonsAmount; i++)
            Engine.addObject(this.buttons[i]);
    },
    
    checkForSelections : function(num)
    {
        for(var i = 0; i < this.buttonsAmount; i++)
        {
            if(this.buttons[i].selected && this.buttons[i].buttonnumber != num)
            {
                this.buttons[i].selected = false;
            }
        }
        this.isselected = true;
    },
    
    getSelectedButtonValue : function()
    {
        for(var i = 0; i < this.buttonsAmount; i++) 
        {
            if(this.buttons[i].selected)
            {
                return this.buttons[i].value;
            }
        }
    },
    
    update : function()
    {
        
    },
    
    draw : function()
    {


    },
}


