function playerMenu(player){
    this.player=player;
    this.selectorPower=0;
    this.selectorItems=0;
    this.menuCooldown=0;
    this.toggle=false;
    this.setPlayer = function(player){
        this.player=player;
    }
    this.update = function(){
        if(this.menuCooldown>0){
            this.menuCooldown=this.menuCooldown-1;
        }
        else{
            if(pressingDown){
                if(this.player.inventory.length != 0 && this.toggle==false){
                    this.toggle=true;
                    this.menuCooldown=this.menuCooldown+18;
                    playASound("soundEffects/inventoryMove.mp3");
                }
            } 
            if(pressingUp){
                if(this.player.powers.length != 0 && this.toggle==true){
                    this.toggle=false;
                    this.menuCooldown=this.menuCooldown+18;
                    playASound("soundEffects/inventoryMove.mp3");
                }
            }
            if(pressingLeft){
                if(this.toggle==false && this.selectorPower-1 >= 0){
                    this.selectorPower=this.selectorPower-1;
                    this.menuCooldown=this.menuCooldown+18;
                    playASound("soundEffects/inventoryMove.mp3");
                }
                if(this.toggle==true && this.selectorItems-1 >= 0){
                    this.selectorItems=this.selectorItems-1;
                    this.menuCooldown=this.menuCooldown+18;
                    playASound("soundEffects/inventoryMove.mp3");
                }
            }
            if(pressingRight){
                if((this.toggle==false) && (this.selectorPower+1 < this.player.powers.length)){
                    this.selectorPower=this.selectorPower+1;
                    this.menuCooldown=this.menuCooldown+18;
                    playASound("soundEffects/inventoryMove.mp3");
                }
                if(this.toggle==true && this.selectorItems+1 < this.player.inventory.length/2){
                    this.selectorItems=this.selectorItems+1;
                    this.menuCooldown=this.menuCooldown+18;
                    playASound("soundEffects/inventoryMove.mp3");
                }
            }
            if(pressingPower1){
                if(this.toggle==false){
                    this.player.selected1=this.player.powers[this.selectorPower];
                    this.menuCooldown=this.menuCooldown+18;
                    playASound("soundEffects/inventorySet.mp3");
                }
                else{
                    this.player.selected1=this.player.inventory[this.selectorItems*2];
                    this.menuCooldown=this.menuCooldown+18;
                    playASound("soundEffects/inventorySet.mp3");
                }
            }
            if(pressingPower2){
                if(this.toggle==false){
                    this.player.selected2=this.player.powers[this.selectorPower];
                    this.menuCooldown=this.menuCooldown+18;
                    playASound("soundEffects/inventorySet.mp3");
                }
                else{
                    this.player.selected2=this.player.inventory[this.selectorItems*2];
                    this.menuCooldown=this.menuCooldown+18;
                    playASound("soundEffects/inventorySet.mp3");
                }
            }
        }
    }
    this.draw = function(){
        ctx.fillStyle="#FFFFFF";
        ctx.fillRect(298,163,604,334);
        ctx.fillStyle="#000000";
        ctx.fillRect(300,165,600,330);
        ctx.fillStyle="#FFFFFF";
        ctx.font = "30px Arial";
        ctx.fillText("Powers",600-40,200);
        ctx.fillText("Items",600-40,200+40+64);
        if(this.toggle==false){
            ctx.fillStyle="#FFFFFF";
            ctx.fillRect(300+(64*this.selectorPower)+20,150+64,64,64);
            ctx.fillStyle="#505050";
            ctx.fillRect(300+(64*this.selectorItems)+20,150+128+40,64,64);
        }
        else{
            ctx.fillStyle="#505050";
            ctx.fillRect(300+(64*this.selectorPower)+20,150+64,64,64);
            ctx.fillStyle="#FFFFFF";
            ctx.fillRect(300+(64*this.selectorItems)+20,150+128+40,64,64);
        }
        for(i=0;i<this.player.powers.length;i++){
            if(this.player.powers[i]=="magic missle"){
                var img = ImageAtlas[magicMissileKey];
                    ctx.drawImage(
                    img, // image
                    i*64+300+20,  // target x
                    64+150, // target y
                    64, // target width
                    64 // target height
                );
            }
            else if(this.player.powers[i]=="staff hit"){
                var img = ImageAtlas[swordKey];
                    ctx.drawImage(
                    img, // image
                    i*64+300+20,  // target x
                    64+150, // target y
                    64, // target width
                    64 // target height
                );
            }
            else if(this.player.powers[i]=="fire ball"){
                var img = ImageAtlas[fireballKey];
                    ctx.drawImage(
                    img, // image
                    i*64+300+20,  // target x
                    64+150, // target y
                    64, // target width
                    64 // target height
                );
            }
        }
        for(i=0;i<this.player.inventory.length;i=i+2){
            if(this.player.inventory[i]=="med kit"){
                ctx.fillStyle="#505050";
                if(this.selectorItems==0 && this.toggle==true){
                    ctx.fillStyle="#FFFFFF";
                }
                var img = ImageAtlas[medkitKey];
                ctx.drawImage(
                    img, // image
                    i/2*64+300+20,  // target x
                    128+150+40, // target y
                    64, // target width
                    64 // target height
                );
                ctx.fillStyle="#FF0000";
                ctx.font = "20px Arial";
                ctx.fillText(this.player.inventory[i+1],320,382);
            }
            if(this.player.inventory[i]=="bomb"){
                ctx.fillStyle="#505050";
                if(this.selectorItems==1 && this.toggle==true){
                    ctx.fillStyle="#FFFFFF";
                }
                var img = ImageAtlas[bombKey];
                ctx.drawImage(
                    img, // image
                    i/2*64+300+20,  // target x
                    128+150+40, // target y
                    64, // target width
                    64 // target height
                );
                ctx.fillStyle="#FF0000";
                ctx.font = "20px Arial";
                ctx.fillText(this.player.inventory[i+1],384,382);
            }
        }
    }
}