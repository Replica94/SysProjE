var Persons = {    
    var hatids = 0;
    var bodyids = 0;
    var faceids = 0;
    var personids = 0;
    function Hat(img) {this.id = hatids++; this.name = img;}
    function Body(img) {this.id = bodyids++; this.name = img;}
    function Face(img) {this.id = faceids++; this.name = img;}
    
    var Hats[];
    var Bodies[];
    var Faces[];
    Hats.push(new hat());
    var Bodies[];
    var Faces[];
    function Person()
    {
        this.hatpos = new Vector2(455,140);
        this.clientbodypos = new Vector2(62, 24);
        this.facepos = new Vector2(180, 62);
        this.hat = getRandomHat();
        this.face = getRandomFace(); 
        this.body = getRandomBody();
        this.id = personids++;
        this.render = function(x, y)
        {
            context.drawImage()
        }
    }
    
    function getRandomHat()
    {
        var item = Hats[Math.floor(Math.random()*Hats.length)];
        return item;
    }
    function getRandomBody()
    {
        var item = Bodies[Math.floor(Math.random()*Bodies.length)];
        return item;
    }
    function getRandomFace()
    {
        var item = Faces[Math.floor(Math.random()*Faces.length)];
        return item;
    }


}


