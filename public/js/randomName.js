
var bn_cools = [
	"max",
	"mix",
	"ax",
	"ix",
	"mex",
	"mox",
	"ox",
	"ex"
];
var bn_vc = [
	"im",
	"ub",
	"at",
	"al",
	"zop",
	"zip"
];

var bn_cvc = [
	"res",
	"kes",
	"tes",
	"ses",
	"bes"
];

var DrugNames = ["null"];
function InitRandomNames()
{
    var rf = new XMLHttpRequest();
    rf.open("GET", "assets/drugnames.txt", false);
    rf.onreadystatechange = function ()
    {
        if(rf.readyState === 4)
        {
            if(rf.status === 200 || rf.status == 0)
            {
                var text = rf.responseText;
                DrugNames = text.split("\n");
            }
        }
    }
    rf.send(null);
	DrugNames = DrugNames.filter(function(t){return (t.length < 15) && (t.length > 3);});
}


function RandomBrandName(seed)
{
	var random = new SeededRandom(seed);
	/*
	var arr = [];
	arr.push(bn_cools[random.getBetween(0,bn_cools.length)]);
	arr.push(bn_vc[random.getBetween(0,bn_vc.length)]);
	arr.push(bn_cvc[random.getBetween(0,bn_cvc.length)]);
	arr = ShuffleArraySeed(arr,random);
	var str = "";
	for (x in arr)
		str = str + arr[x];*/
	return DrugNames[random.getBetween(0,DrugNames.length)];
}