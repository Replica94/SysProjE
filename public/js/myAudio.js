var MyAudio =
{
    soundEffects : [],
    music : [],
    currentMusicId : 0,
    currentMusic : 0,
	paused : true,
    playing : false,
    loadMusic : function()
    {
        this.music.push(new Audio("assets/sounds/music.mp3"));
        this.currentMusic = this.music[0];
    },
    
    loopMusic : function()
    {
		if(!this.paused)
		{
			this.currentMusic.play();
		}
		else if(this.currentMusic.ended){
			this.paused = true;
		}
		else if(this.paused)
		{
			this.currentMusic.pause();
		}
    },
    
    changeMusic : function(id)
    {
        this.currentMusic.pause();
        this.currentMusic = this.music[id];
        this.currentMusic.play();
    }
    
}