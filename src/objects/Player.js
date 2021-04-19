class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0.3);
        this.setGravityY(1200)
        this.setFriction(1,1);
     
        this.setBodySize(this.body.width,this.body.height+46);
       this.setOffset(15, 0)
        this.scale= 0.9;
      
   
    

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('yasuo2', { start: 0, end: 7}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('yasuo2', { start: 9, end: 16}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'stance',
            frames: this.anims.generateFrameNumbers('iddle', { start: 0, end: 7  }),
            frameRate: 5,
            repeat: -1
        });
        
        this.anims.create({
            key: 'back',
            frames: this.anims.generateFrameNumbers('iddle2', { start: 7, end: 0  }),
            frameRate: 8,

            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'yasuo2', frame: 8 } ],
            frameRate: 20
        });

        this._directionX=0;
        this._directionY=0;

    }

    set directionX(value){
        this._directionX=value;
    }
    set directionY(value){
        this._directionY=value;
    }

    /**
     * arrête le joueur
     */
    stop(){
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.setAccelerationX(0);
        this.directionY=0;
        this.directionX=0;
    }
    move(){

        
        switch (true){
            case this._directionX<0:
                this.sens=-1;
                this.setVelocityX(-300);
                //autre deplacement ( le perso accelere) mais bug avec le saut le pp peut pas sauter
               /* this.setAccelerationX(-500);
                this.setMaxVelocity(300);*/
                
               // this.setFrictionX(0.5);
                this.anims.play('left', true);
                break;
            case this._directionX>0:
                this.sens=1;    
                this.setVelocityX(300);
                 //autre deplacement ( le perso accelere) mais bug avec le saut le pp peut pas sauter
              /*  this.setAccelerationX(500);
                this.setMaxVelocity(300);*/
                
                this.anims.play('right', true);
                break;
            default:
                this.setVelocityX(0);
                this.setAccelerationX(0);
                
               // this.anims.play('turn');
                this.anims.play(this.sens===-1 ? 'back' : 'stance' ,true);
        }

        if(this._directionY<0){
            if(this.body.blocked.down || this.body.touching.down){
                this.setVelocityY(-650);
            }
        }


    }
    
     dash(){
         
        this.posX = this.x;
        this.posY = this.y;

        var direct;

        if (this._directionX < 0 || this.sens===-1) { 
            direct = this.posX - 5;
        } else if (this._directionX > 0 || this.sens===1) {
            direct = this.posX + 5;
        }
        if (direct < this.posX) {
            this.animGauche();
            
        
        } else if (direct > this.posX) {
            this.animDroite();
            
        }

       /* if (this._directionY < 0 || this.sens===-1) { 
            direct = this.posY - 5;
        } else if (this._directionY> 0 || this.sens===1) {
            direct = this.posY + 5;
        }
        if (direct < this.posY) {
            
            this.animBas();
        
        } else if (direct > this.posY) {
            this.animHaut();
            
        }*/

    }

    animDroite(){
        
        this.scene.tweens.add({
            targets: this,
                x: '+=200',
                //y: '-=150',
                ease: 'Circ.easeInOut',
                duration: 200,                              
                ease: 'Power2',
        });
     
  }
 
    animGauche(){
      
       // this.setVelocityX(-10000);
       this.scene.tweens.add({
            targets: this,
            x: '-=200' ,            
            ease: 'Circ.easeInOut', 
            duration: 200,
            ease: 'Power2',         
       });      
    }


  /*  animHaut(){
        this.scene.tweens.add({
            targets: this,
                y: '+=200',
                //y: '-=150',
                ease: 'Circ.easeInOut',
                duration: 200,                              
                ease: 'Power2',
        });
     
  }
 
    animBas(){
       // this.setVelocityX(-10000);
       this.scene.tweens.add({
            targets: this,
            y: '-=200' ,            
            ease: 'Circ.easeInOut', 
            duration: 200,
            ease: 'Power2',         
       });      
    }*/
    
}