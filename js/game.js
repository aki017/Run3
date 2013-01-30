$(function(){
  new Game($("canvas")[0]);
})


Game = function(canvas){
  this.chara = new Game.Chara(100, 10);
  this.map = new Game.Map(10000);
  this.FPS = 60;
  this.ctx = canvas.getContext("2d");
  this.frame = 0;
  this.sx = 0;
  this.update();
}
Game.Chara = function(x, y)
{
  this.x = x;
  this.y = y;
  this.dx = 0;
  this.dy = 0;
}
Game.Chara.prototype.update = function(map)
{
  this.dx += -1*input.key[37] + 1*input.key[39];
  this.dy += -1*input.key[40] + 1*input.key[38];
  this.dx = this.dx * 0.95;
  this.dy = this.dy * 0.95;
  if(map.get(this.x)<=this.y)
  {
    this.dy -= 1;
  }else
  {
    this.dy = 0;
    this.y = map.get(this.x);
  }
  this.x += this.dx;
  this.y += this.dy;
  // console.log(this.y);
}
Game.Chara.prototype.draw = function(ctx, offset)
{
  ctx.fillRect(this.x-offset, 480-this.y, 10, 10);
}
  
Game.Map = function(len)
{
  this.len = len;
  this._map = new Array(len);
  for(i = 0;i<len;i++)
    this._map[i] = ((i==0)?0:this._map[i-1]) + Math.sin(i*0.01);
}
Game.Map.prototype.get = function(i)
{
  return 100+0.5*this._map[~~i];
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
  this.sx+=3;
  this.draw();
  this.frame++;
  setTimeout(this.update.bind(this), 1000/this.FPS)
}

InputManager = function()
{
  this.key = new Array(100);
  for(i=0;i<100;i++)this.key[i]=0;
  $(window).on("keydown", function(e){input.key[e.keyCode]=1});
  $(window).on("keyup", function(e){input.key[e.keyCode]=0});
}
input = new InputManager();


