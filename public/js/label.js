function GenerateCoolColor(seed)
{
	var hexs = "0123456789ABCDEF";
	var random = new SeededRandom(seed);
	var dom = 12 + random.getBetween(0,3);
	var rec = 7 + random.getBetween(0,7);
	var rec2 = 7 + random.getBetween(0,5);
	
	var cent = dom + rec + rec2;
	cent = cent / 3;
	dom = dom + cent;
	rec = rec + cent;
	rec2 = rec2 + cent;
	
	dom = Math.floor(dom / 2);
	rec = Math.floor(rec / 2);
	rec2 = Math.floor(rec2 / 2);
	
	var arr = [];
	arr.push(hexs[dom] + "0");
	arr.push(hexs[rec] + "0");
	arr.push(hexs[rec2] + "0");
	
	var str = "#";
	
	ShuffleArraySeed(arr,random);
	
	for (x in arr)
		str += arr[x];
	
	return str;
}

function GenerateDarkColor(seed)
{
	var hexs = "0123456789ABCDEF";
	var random = new SeededRandom(seed);
	var dom = 3 + random.getBetween(0,3);
	var rec = 2 + random.getBetween(0,2);
	var rec2 = 2 + random.getBetween(0,2);

	
	var arr = [];
	arr.push(hexs[dom] + "0");
	arr.push(hexs[rec] + "0");
	arr.push(hexs[rec2] + "0");
	
	var str = "#";
	
	ShuffleArraySeed(arr,random);
	
	for (x in arr)
		str += arr[x];
	
	return str;
}

function GetCoolFont(seed)
{
	var random = new SeededRandom(seed);
	
	var fonts = ["Arial", "Impact", "Times New Roman", "Comic Sans MS", "Tahoma", "Lucida Console", "Georgia"];
	

	return fonts[random.getBetween(0,fonts.length)];
}

function GetDullFont(seed)
{
	var random = new SeededRandom(seed);
	
	var fonts = ["Arial", "Tahoma", "Lucida Console"];
	
	return fonts[random.getBetween(0,fonts.length)];
}

var LabelLayouts = [];
LabelLayouts.push
(
{
	size : new Vector2(455,140),
	namePos : new Vector2(62, 24),
	descPos : new Vector2(180, 62),
	subNamePos : new Vector2(12,42),
	barCodePos : new Vector2(20,58),
	descWidth : 250
},
{
	size : new Vector2(355,175),
	namePos : new Vector2(32, 24),
	subNamePos : new Vector2(20,52),
	descPos : new Vector2(10, 72),
	barCodePos : new Vector2(220,93),
	descWidth : 200
},
{
	size : new Vector2(415,145),
	namePos : new Vector2(24, 34),
	subNamePos : new Vector2(24,52),
	descPos : new Vector2(10, 72),
	barCodePos : new Vector2(285,52),
	descWidth : 280
}
);


function GenerateRandomLabel(name, subName, desc)
{
	var random = new SeededRandom(GetRandomBetween(0,65421));
	if (random.getBetween(0,3) == 1)
	{
		desc = desc + " " + subName;
		subName = "";
	}
	
	var layoutIndex = random.getBetween(0,LabelLayouts.length);
	
	var layout = LabelLayouts[layoutIndex];
	
	
	var label = {};
	label.size = layout.size;
	label.fillColor = GenerateCoolColor(random.get());
	label.namePos = layout.namePos;
	label.subNamePos = layout.subNamePos;
	label.descPos = layout.descPos;
	
	var cfont = GetCoolFont(random.getBetween(0,23213));
	
	label.nameFont = "" + (random.getBetween(0,8) + 24) + "px "+cfont;
	label.nameColor = GenerateCoolColor(random.get());
	label.name = name;
	label.subNameFont = "" + (random.getBetween(0,4) + 16) + "px "+cfont;
	label.subNameColor = GenerateDarkColor(random.get());
	label.subName = subName;
	
	label.descFont = "12px " + GetDullFont(random.getBetween(0,23213));
	
	
	label.barCodePos = layout.barCodePos;
	label.description = desc;
	label.descWidth = layout.descWidth;
	return label;
}


function RenderLabel(pos, label)
{
	var max = label.size;
	
	var textPos = pos.add(label.descPos);
	
	var namePos = pos.add(label.namePos);
	var subNamePos = pos.add(label.subNamePos);
	var barCodePos = pos.add(label.barCodePos);
	
	context.lineWidth = 8;
	context.strokeRect(pos.x,pos.y,max.x,max.y);
	context.fillStyle = label.fillColor;
	context.fillRect(pos.x,pos.y,max.x,max.y);
	
	context.fillStyle = "#000000";
	context.font = label.descFont;
	context.wrapText(label.description,textPos.x,textPos.y,label.descWidth,14);
	
	context.lineWidth = 2;
	context.fillStyle = label.nameColor;
	context.font = label.nameFont;
	context.strokeText(label.name,namePos.x,namePos.y);
	context.fillText(label.name,namePos.x,namePos.y);
	
	context.fillStyle = label.subNameColor;
	context.font = label.subNameFont;
	context.fillText(label.subName,subNamePos.x,subNamePos.y);
	
	context.drawImage(Texture.map["barcode"], barCodePos.x,barCodePos.y,120,80);
}
