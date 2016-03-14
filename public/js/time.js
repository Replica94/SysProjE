var Time =
{
	inittime : Date.now(),
	delta : 0,
	lastupdate : 0,
	now : 0,
	reset : function(){
		inittime : Date.now();
	},
	calcDelta : function(){
		this.now = Date.now();
		this.delta = this.now - this.lastupdate;
	},
	getSecondsSinceStart : function() {
		return Math.floor((Date.now() - this.inittime) / 1000);
	}
}