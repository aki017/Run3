$(function(){
    new Game($("canvas")[0]);
})

Game = function(canvas){
    this.ctx = canvas.getContext("2d");
    this.WIDTH = canvas.width;
    this.HEIGHT = canvas.height;
    this.reset();

    this.update();
}

Game.prototype.reset = function(){
    this.chara = new Game.Chara(this, 100, 10);
    this.map = new Map.SinMap(100000);
    this.FPS = 60;
    this.frame = 0;
    this.offset = 0;
    this.speed = 3;
    this.nextFrameFunc = this.title;
}
Game.prototype.title = function(){
    ctx = this.ctx;
    ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);


    ctx.font = "40pt TimesNewRoman";
    ctx.fillText("Title", 100, 100);
    ctx.fillText("push enter key", 100, 150);

    input.update();
    if(input.ispushed(KEY_ENTER) == 1){
        this.nextFrameFunc = this.gmain;
    }
}
Game.prototype.gmain = function(){
    this.chara.update(this.map);
    input.update();
    this.offset+=this.speed;
    this.draw();
    this.frame++;
}
Game.prototype.gameover = function(){
    ctx = this.ctx;
    ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "40pt TimesNewRoman";
    ctx.fillText("GameOver", 100, 100);
    ctx.fillText("push enter key", 100, 150);

    input.update();
    if(input.ispushed(KEY_ENTER) == 1){
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

        dx += speed * ( -1*input.getframes(KEY_LEFT) + 1*input.getframes(KEY_RIGHT));
        dx = dx * 0.95;
        x += dx;
        if(x<game.offset){
            x = game.offset;
            dx = game.speed;
        }
        if(x<game.offset+game.WIDTH*(1/5)){
            game.speed -= 0.01;
            game.speed = game.speed > 0 ? game.speed : 0;
        }
        if(x>game.offset+game.WIDTH*(4/5)){
            game.speed += 0.01;
        }
        if(x>game.offset+game.WIDTH){
            x = game.offset+game.WIDTH;
            dx = game.speed;
        }

        dy = dy * 0.95;
        if(map.get(x)<=y){
            if (this.MAX_JUMP_COUNT * 2 > this.jumpState){
                if (this.jumpState % 2 == 1){
                    if(input.getframes(KEY_SPACE)<=0){
                        this.jumpState++;
                    }
                }else if (this.jumpState % 2 == 0){
                    if(input.getframes(KEY_SPACE)>0){
                        dy = jumpHeight;
                        this.jumpState++;
                    }
                }
            }
            dy -= 1;
        }else if (this.jumpState == 0){
            dy = 0;
            if(input.getframes(KEY_SPACE)>0){
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
        game.ctx.fillRect(x-offset, game.HEIGHT-y, 30, -40);
    }
}

Game.prototype.draw = function(){
    ctx = this.ctx;
    map = this.map;
    ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    ctx.fillStyle = "rgb(0, 0, 1)";
    ctx.strokeStyle = "rgb(0, 0, 1)";
    for(i = 0;i<this.WIDTH;i++){
        ctx.beginPath();
        ctx.moveTo(i,  this.HEIGHT);
        ctx.lineTo(i,  this.HEIGHT-map.get(this.offset+i));
        ctx.stroke();
    }
    this.chara.draw(ctx, this.offset);
}

Game.prototype.update = function(){
    this.nextFrameFunc();
    setTimeout(this.update.bind(this), 1000/this.FPS)
}

input = new InputManager();

/* vim:set ts=4 sts=4 sw=4 tw=4: */
