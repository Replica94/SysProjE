/**
	Array which stores all functions doing asynchronous requests for required assets
	
	These functions should not block exectution, they should return false when the
	asynchronous requests are not ready.
	
	All of these functions will be called before engine initialization.
**/

var AssetLoadFunctions = [];

/*
	Example:
	
	//A well named variable to store current state
	var hasLoadedAjaxStuff = false;
	
	//Make an ajax request
	var someAjaxRequest = DoSomeSortOfAjaxRequest("asd.json");
	
	//When it's done
	someAjaxRequest.onFinish = function ()
	{
		//Change the state
		hasLoadedAjaxStuff = true;
	};
	
	AssetLoadFunctions += function ()
	{
		//This function only serves as a check whether our stuff is loaded
		return hasLoadedAjaxStuff;
	}

*/


function GetRandomBetween(min, onepastmax)
{
	return Math.floor(Math.random() * onepastmax) + min;
}

function GetRandomWithSeed(seed)
{
	var x = Math.sin(seed) * 10000;
	return x - Math.floor(x);
}

function GetRandomBetweenWithSeed(min, onepastmax, seed)
{
	return Math.floor(GetRandomWithSeed(seed) * onepastmax) + min;
}

function ShuffleArray(arr)
{
	var j, x, i;
	i = arr.length;
    while (i)
	{
		j = Math.floor(Math.random() * i);
		i -= 1;
		x = arr[i];
		arr[i] = arr[j];
		arr[j] = x;
	}
    return arr;
}

function ShuffleArraySeed(arr, random)
{
	var j, x, i;
	i = arr.length;
    while (i)
	{
		j = random.getBetween(0,i);
		i -= 1;
		x = arr[i];
		arr[i] = arr[j];
		arr[j] = x;
	}
    return arr;
}

function SeededRandom(seed)
{
	this.seed = seed;
	this.get = function ()
	{
		this.seed = this.seed*65531+11
		return GetRandomWithSeed(this.seed);
	};
	this.getBetween = function (min, max)
	{
		this.seed = this.seed*65531+11
		return GetRandomBetweenWithSeed(min, max, this.seed)
	};
}

//Thanks stackoverflow
CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight)
{
    var lines = text.split("\n");

    for (var i = 0; i < lines.length; i++) {

        var words = lines[i].split(' ');
        var line = '';

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = this.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                this.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }

        this.fillText(line, x, y);
        y += lineHeight;
    }
}

CanvasRenderingContext2D.prototype.drawBubble = function (x, y, w, h, tgx, tgy, radius)
{
  var r = x + w;
  var b = y + h;
  this.beginPath();
  this.moveTo(x+radius, y);
  this.lineTo(r-radius, y);
  this.quadraticCurveTo(r, y, r, y+radius);
  this.lineTo(r, y+h-radius);
  this.quadraticCurveTo(r, b, r-radius, b);
  this.lineTo(x+radius+20, b);
  this.lineTo(tgx, tgy);
  this.lineTo(x+radius,b);
  this.quadraticCurveTo(x, b, x, b-radius);
  this.lineTo(x, y+radius);
  this.quadraticCurveTo(x, y, x+radius, y);
  this.fill();
  this.stroke();
}

