
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



function RandomBrandName(seed)
{
	var random = new SeededRandom(seed);
	
	var arr = [];
	arr.push(bn_cools[random.getBetween(0,bn_cools.length)]);
	arr.push(bn_vc[random.getBetween(0,bn_vc.length)]);
	arr.push(bn_cvc[random.getBetween(0,bn_cvc.length)]);
	arr = ShuffleArraySeed(arr,random);
	var str = "";
	for (x in arr)
		str = str + arr[x];
	return str;
}