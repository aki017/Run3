$(function(){
  new Game($("canvas")[0]);
})


Game = function(canvas){
  this.chara = new Game.Chara(this, 100, 10);
  this.map = new Game.Map(10000);
  this.FPS = 60;
  this.ctx = canvas.getContext("2d");
  this.frame = 0;
  this.sx = 0;
  this.update();
}
Game.Chara = function(game, x, y)
{
  var dx = 0;
  var dy = 0;
  var speed = 0.05;
  var jumpHeight= 20;

  this.update = function()
  {
    var map = game.map;
    
    dx += speed * ( -1*input.getkey(37) + 1*input.getkey(39));
    dx = dx * 0.95;
    x += dx;

    dy = dy * 0.95;
    if(map.get(x)<=y)
    {
      dy -= 1;
    }else
    {
      dy = 0;
      if(input.getkey(32)>0)dy += jumpHeight;
      y = map.get(x);
    }
    y += dy;
  }

  this.draw = function()
  {
    var offset = game.sx;
    game.ctx.fillStyle = "rgb(0, 0, 255)";
    game.ctx.fillRect(x-offset, 480-y, 30, -40);
  }
}
Game.Map = function(len)
{
  var len = len;
  var _map = new Array(len);
  for(i = 0;i<len;i++)
    _map[i] = ((i==0)?0:_map[i-1]) + Math.sin(i*0.01);
  this.get = function(i)
  {
    return 100+0.5*_map[~~i];
  }
}
Game.prototype.draw = function()
{
  // console.log("draw");
  ctx = this.ctx;
  map = this.map;
  ctx.clearRect(0, 0, 640, 480);
  ctx.fillStyle = "rgb(0, 0, 1)";
  ctx.strokeStyle = "rgb(0, 0, 1)";
  for(i = 0;i<640;i++)
  {
    // ctx.fillRect(i, 0, i+1, map.get(i));
    ctx.beginPath();
    ctx.moveTo(i,  480);
    ctx.lineTo(i,  480-map.get(this.sx+i));
    ctx.stroke();
  }
  this.chara.draw(ctx, this.sx);
  // console.log(this.sx);
}
Game.prototype.update = function()
{
  // console.log("update");
  this.chara.update(this.map);
  input.update();
  this.sx+=3;
  this.draw();
  this.frame++;
  setTimeout(this.update.bind(this), 1000/this.FPS)
}

InputManager = function()
{
  var key = new Array(100);
  for(i=0;i<100;i++) key[i]=0;
  this.keydown = function(i){ if(!key[i]) key[i] = 1; }
  this.keyup   = function(i){             key[i] = 0; }
  this.getkey  = function(i){ return key[i]; }
  this.update  = function()
  {
    for(i=0;i<100;i++)
      if(key[i])
        key[i]++;
  }
  $(window).on("keydown", function(e){input.keydown(e.keyCode)});
  $(window).on("keyup", function(e){input.keyup(e.keyCode)});
}
input = new InputManager();


