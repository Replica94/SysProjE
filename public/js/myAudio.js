var MyAudio =
{
    soundEffects : [],
    music : [],
    currentMusicId : 0,
    playing : false,
    loadMusic : function()
    {
        this.music.push(new Audio("assets/sounds/music.mp3"));
    },
    
    loopMusic : function()
    {
        if(!this.playing)
        {
            this.music[this.currentMusicId].play();
            this.music[this.currentMusicId].loop = true;
        }
        if(this.music[this.currentMusicId].ended){
            this.playing = false;
        }
    }
    
}