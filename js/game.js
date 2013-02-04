$(function(){
    new Game($("canvas")[0]);
})

Game = function(canvas){
    this.chara = new Game.Chara(this, 100, 10);
    this.map = new Game.Map(100000);
    this.FPS = 60;
    this.ctx = canvas.getContext("2d");
    this.frame = 0;
    this.offset = 0;
    this.nextFrameFunc = this.title;

    this.update();
}

Game.prototype.reset = function(){
    this.chara = new Game.Chara(this, 100, 10);
    this.map = new Game.Map(1000);
    this.FPS = 60;
    this.frame = 0;
    this.offset = 0;
    this.nextFrameFunc = this.title;
}
Game.prototype.title = function(){
    ctx = this.ctx;
    ctx.clearRect(0, 0, 640, 480);


    ctx.font = "40pt TimesNewRoman";
    ctx.fillText("Title", 100, 100);
    ctx.fillText("push enter key", 100, 150);

    input.update();
    if(input.getkey(KEY_ENTER) == 1){
        this.nextFrameFunc = this.gmain;
    }
}
Game.prototype.gmain = function(){
    this.chara.update(this.map);
    input.update();
    this.offset+=3;
    this.draw();
    this.frame++;
}
Game.prototype.gameover = function(){
    ctx = this.ctx;
    ctx.clearRect(0, 0, 640, 480);

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "40pt TimesNewRoman";
    ctx.fillText("GameOver", 100, 100);
    ctx.fillText("push enter key", 100, 150);

    input.update();
    if(input.getkey(KEY_ENTER) == 1){
        this.nextFrameFunc = this.reset;
    }
}


Game.Chara = function(game, x, y){
    var dx = 0;
    var dy = 0;
    var speed = 0.05;
    var jumpHeight= 20;

    this.jumpState = 0;
    this.MAX_JUMP_COUNT = 2;

    this.update = function(){
        var map = game.map;

        dx += speed * ( -1*input.getkey(KEY_LEFT) + 1*input.getkey(KEY_RIGHT));
        dx = dx * 0.95;
        x += dx;
        if(x<game.offset){
            x = game.offset;
            dx = 3;
        }
        if(x>game.offset+640){
            x = game.offset+640;
            dx = 0;
        }

        dy = dy * 0.95;
        if(map.get(x)<=y){
            if (this.MAX_JUMP_COUNT * 2 > this.jumpState){
                if (this.jumpState % 2 == 1){
                    if(input.getkey(KEY_SPACE)<=0){
                        this.jumpState++;
                    }
                }else if (this.jumpState % 2 == 0){
                    if(input.getkey(KEY_SPACE)>0){
                        dy = jumpHeight;
                        this.jumpState++;
                    }
                }
            }
            dy -= 1;
        }else if (this.jumpState == 0){
            dy = 0;
            if(input.getkey(KEY_SPACE)>0){
                dy += jumpHeight;
                this.jumpState++;
            }

            y = map.get(x);
            // NaNになったらゲームオーバー扱いに
            if(isNaN(y)){
                game.nextFrameFunc = game.gameover;
            }
        }else{
            this.jumpState = 0;
        }
        y += dy;
    }

    this.draw = function(){
        var offset = game.offset;
        game.ctx.fillStyle = "rgb(0, 0, 255)";
        game.ctx.fillRect(x-offset, 480-y, 30, -40);
    }
}

Game.Map = function(len){
    var len = len;
    var _map = new Array(len);
    for(i = 0;i<len;i++)
        _map[i] = ((i==0)?0:_map[i-1]) + Math.sin(i*0.01);
    this.get = function(i){
        return 100+0.5*_map[~~i];
    }
}

Game.prototype.draw = function(){
    ctx = this.ctx;
    map = this.map;
    ctx.clearRect(0, 0, 640, 480);
    ctx.fillStyle = "rgb(0, 0, 1)";
    ctx.strokeStyle = "rgb(0, 0, 1)";
    for(i = 0;i<640;i++){
        ctx.beginPath();
        ctx.moveTo(i,  480);
        ctx.lineTo(i,  480-map.get(this.offset+i));
        ctx.stroke();
    }
    this.chara.draw(ctx, this.offset);
}

Game.prototype.update = function(){
    this.nextFrameFunc();
    setTimeout(this.update.bind(this), 1000/this.FPS)
}

input = new InputManager();
