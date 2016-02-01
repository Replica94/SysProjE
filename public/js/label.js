function GenerateCoolColor(seed)
{
	var hexs = "0123456789ABCDEF";
	var random = new SeededRandom(seed);
	var dom = 10 + random.getBetween(0,5);
	var rec = 5 + random.getBetween(0,5);
	
	var arr = [];
	arr.push(hexs[dom] + "0");
	arr.push(hexs[rec] + "0");
	arr.push(hexs[rec] + "0");
	
	var str = "#";
	
	ShuffleArraySeed(arr,random);
	
	for (x in arr)
		str += arr[x];
	
	console.log(str);
	
	return str;
}

function GenerateRandomLabel(name, subName, desc)
{
	var random = new SeededRandom(GetRandomBetween(0,65421));
	if (random.getBetween(0,3) == 1)
	{
		desc = desc + " " + subName;
		subName = "";
	}
	
	var label = {};
	label.size = new Vector2(430,110);
	label.fillColor = GenerateCoolColor(random.get());
	label.namePos = new Vector2(62,24);
	label.subNamePos = new Vector2(12,42);
	label.descPos = new Vector2(240,42);
	label.nameFont = "30px Arial";
	label.nameColor = "#000077";
	label.name = name;
	label.subNameFont = "20px Arial";
	label.subNameColor = "#000077";
	label.subName = subName;
	label.barCodePos = new Vector2(20,58);
	label.description = desc;
	return label;
}


function RenderLabel(pos, label)
{
	var max = pos.add(label.size);
	
	var textPos = pos.add(label.descPos);
	
	var namePos = pos.add(label.namePos);
	var subNamePos = pos.add(label.subNamePos);
	var barCodePos = pos.add(label.barCodePos);
	
	context.lineWidth = 4;
	context.strokeRect(pos.x,pos.y,max.x,max.y);
	context.fillStyle = label.fillColor;
	context.fillRect(pos.x,pos.y,max.x,max.y);
	
	context.fillStyle = "#000000";
	context.font = "12px Courier";
	context.wrapText(label.description,textPos.x,textPos.y,200,14);
	
	context.fillStyle = label.nameColor;
	context.font = label.nameFont;
	context.fillText(label.name,namePos.x,namePos.y);
	
	context.fillStyle = label.subNameColor;
	context.font = label.subNameFont;
	context.fillText(label.subName,subNamePos.x,subNamePos.y);
	
	context.drawImage(Texture.map["barcode"], barCodePos.x,barCodePos.y,120,80);
}