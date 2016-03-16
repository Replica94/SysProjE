
var Persons = {    
    hatids : 0,
    bodyids : 0,
    faceids : 0,
    personids : 0,
	//last persons arrive time
	lpersonarrtime : 0,
	hatscount : 17,
	facescount : 16,
	bodiescount : 7,
	allPersons : [],
    Hats : [],
    Hats2 : [],
    Bodies : [],
    Bodies2 : [],
    Faces : [],
    Faces2 : [],
	
	update : function()
	{
		if(Date.now() - this.lpersonarrtime > 4000 && this.allPersons.length < 10){
			this.addPersonToLine();
		}
	},
		
	addAllHatTextures : function()
	{
		var test = 1;
		var count = 0;
		for(count = 0; count < this.hatscount; count++)
		{
			Texture.addTexture("hat" + count, "assets/img/hat" + count + ".png");
			Texture.addTexture("hatbg" + count, "assets/img/hatbg" + count + ".png");
			
			this.Hats.push(new Hat("hat" + count, "hatbg" + count));
		}
	},
	
	addAllFaceTextures : function()
	{
		var test = 1;
		var count = 0;
		for(count = 0; count < this.facescount; count++) 
		{
			test = Texture.addTexture("head" + count, "assets/img/head" + count + ".png");
			this.Faces.push(new Face("head" + count, "assets/img/head" + count + ".png"));
		}
	},
	
	addAllBodyTextures : function()
	{
		var test = 1;
		var count = 0;
		for(count = 0; count < this.bodiescount; count++)
		{
			test = Texture.addTexture("body" + count, "assets/img/body" + count + ".png");
			this.Bodies.push(new Body("body" + count, "assets/img/body" + count + ".png"));
		}
	},
    
	addTexture : function(name,source)
	{
		var img = new Image();
		img.onload = function()
		{
			Texture.textureLoaded(img, name);
			img.src = source;
		};
		
		img.onerror = function()
		{
			console.log("Failed to load texture " + name + " from "+ source);
		};
		img.src = source;
		return 1;

	},
	
	
	initPersons : function()
	{
		this.addAllHatTextures();
		this.addAllBodyTextures();
		this.addAllFaceTextures();
	},
	
    getRandomHat : function()
    {
        var item = this.Hats[Math.floor(Math.random()*this.Hats.length)];
        return item;
    },
    getRandomBody : function()
    {
        var item = this.Bodies[Math.floor(Math.random()*this.Bodies.length)];
        return item;
    },
    getRandomFace : function()
    {
        var item = this.Faces[Math.floor(Math.random()*this.Faces.length)];
        return item;
    },
	
	addPersonToLine : function()
	{
		
		var p = new Person();
		this.allPersons.push(p);
		Engine.addObject(p);
		this.lpersonarrtime = Date.now();
	},
	
	renderAllPersons : function() 
	{
		for(var i = 0; i < this.allPersons.length; i++)
		{
			
		}
	}
}

function Hat(img, bgimg){this.id = Persons.hatids++; this.name = img; this.bgname = bgimg;};
function Body(img){this.id = Persons.bodyids++; this.name = img;};
function Face(img){this.id = Persons.faceids++; this.name = img;};


function Person()
{
	GameObject.call(this);
	//TODO: find positions for the parts
	this.updateContext = Context.updateContext.game;
    this.hatoffsety = -35;
	this.hatoffset = new Vector2(0, this.hatoffsety);
	this.bodyoffset = new Vector2(0, 0);
	this.faceoffset = new Vector2(30, 0);
	this.position = new Vector2(screenSize.x/2, -100);
	this.size = new Vector2(160, 300);
    this.checkForInput = true;
	this.sizehat = new Vector2(180, 225);
	this.sizeface = new Vector2(130, 170);
	this.sizebody = new Vector2(200, 300);
	this.drawOffset = Context.drawOffset["behindDesk"];
    this.depth = -30 - Persons.allPersons.length;
	this.targetpos = new Vector2(0 + Persons.allPersons.length * 100, -100);
	this.entering = true;
    this.a = 0;
    this.kasvaako = false;
    this.update = function()
    {	
	//TODO: only update in right context
		if(this.entering)
		{
			this.a += 0.10 * Time.delta;
            var sini = Math.abs(Math.sin(this.a));
            this.kasvaako = Math.sin(this.a * 2) > 0;
			if(this.position.x >= this.targetpos.x){
				this.position = new Vector2(this.position.x - 1 * Time.delta, -100 + 30 * sini);
			}
            if(this.kasvaako){
                this.hatoffset.y = this.hatoffsety - Math.sin(this.a * 2) * 20;
            }
            if(this.position.x <= this.targetpos.x && this.hatoffset.y >= this.hatoffsety -5){
                this.entering = false;
            }
		}
        
    }
	this.hat = Persons.getRandomHat();
	this.face = Persons.getRandomFace(); 
	this.body = Persons.getRandomBody();
	this.id = Persons.personids++;
	this.draw = function()
	{	
	//TODO: persons in line are rendered in wrong order. 
		if (Texture.map[this.hat.bgname])
				context.drawImage(Texture.map[this.hat.bgname], this.position.x + this.hatoffset.x, this.position.y + this.hatoffset.y, this.sizehat.x, this.sizehat.y);
		context.drawImage(Texture.map[this.body.name], this.position.x + this.bodyoffset.x, this.position.y + this.bodyoffset.y, this.sizebody.x, this.sizebody.y);
		context.drawImage(Texture.map[this.face.name], this.position.x + this.faceoffset.x, this.position.y + this.faceoffset.y, this.sizeface.x, this.sizeface.y);
		context.drawImage(Texture.map[this.hat.name], this.position.x + this.hatoffset.x, this.position.y + this.hatoffset.y, this.sizehat.x, this.sizehat.y);
	}
};

Person.prototype = new GameObject();
Person.constructor = Person.Object;



