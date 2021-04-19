class TableauStart extends Phaser.Scene {
    /*constructor(){
      super("bootGame");
    }*/
  
    preload ()
    {
        super.preload();
        this.load.video('ripo', 'assets/video/ripo.mp4', 'loadeddata', false, true);
    }  
  
    create()
    {
        super.create();
        var vid = this.add.video(400, 300, 'ripo');

        vid.play(true);
        
        // Prevents video freeze when game is out of focus (i.e. user changes tab on the browser)
        vid.setPaused(false);
    }

}