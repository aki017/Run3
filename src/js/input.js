
var KEY_BS    = 8;
var KEY_ENTER = 13;
var KEY_SHIFT = 16;
var KEY_CTRL  = 17;
var KEY_ALT   = 18;
var KEY_SPACE = 32;
var KEY_LEFT  = 37;
var KEY_UP    = 38;
var KEY_RIGHT = 39;
var KEY_DOWN  = 40;

InputManager = function(){
    var key = new Array(100);
    for(i=0;i<100;i++) key[i]=0;
    this.keydown = function(i){ if(!key[i]) key[i] = 1; }
    this.keyup   = function(i){             key[i] = 0; }
    this.getkey  = function(i){ return key[i]-1; }
    this.update  = function(){
        for(i=0;i<100;i++){
            if(key[i]){
                key[i]++;
            }
        }
    }
    $(window).on("keydown", function(e){input.keydown(e.keyCode)});
    $(window).on("keyup", function(e){input.keyup(e.keyCode)});
}
