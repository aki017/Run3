
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

    var INPUT_BIT_LEFT = 1 << 0;
    var INPUT_BIT_RIGHT = 1 << 1;
    var INPUT_BIT_SPACE = 1 << 2;
    var INPUT_BIT_ENTER = 1 << 3;

    var inputbit = 0;
    var nowInput = [];
    nowInput.left = nowInput.right = nowInput.space = nowInput.enter = 0;
    this.keydown = function(i){
        switch(i){
        case KEY_LEFT:
            inputbit |= INPUT_BIT_LEFT;
            break;
        case KEY_RIGHT:
            inputbit |= INPUT_BIT_RIGHT;
            break;
        case KEY_SPACE:
            inputbit |= INPUT_BIT_SPACE;
            break;
        case KEY_ENTER:
            inputbit |= INPUT_BIT_ENTER;
            break;
        }
    }
    this.keyup = function(i){
        switch(i){
        case KEY_LEFT:
            inputbit &= (~INPUT_BIT_LEFT);
            break;
        case KEY_RIGHT:
            inputbit &= (~INPUT_BIT_RIGHT);
            break;
        case KEY_SPACE:
            inputbit &= (~INPUT_BIT_SPACE);
            break;
        case KEY_ENTER:
            inputbit &= (~INPUT_BIT_ENTER);
            break;
        }
    }
    this.getkey  = function(){ return nowInput; }
    this.update  = function(){
        if(inputbit & INPUT_BIT_LEFT){
            nowInput.left++;
        }else{
            nowInput.left = 0;
        }
        if(inputbit & INPUT_BIT_RIGHT){
            nowInput.right++;
        }else{
            nowInput.right = 0;
        }
        if(inputbit & INPUT_BIT_SPACE){
            nowInput.space++;
        }else{
            nowInput.space = 0;
        }
        if(inputbit & INPUT_BIT_ENTER){
            nowInput.enter++;
        }else{
            nowInput.enter = 0;
        }
    }
    $(window).on("keydown", function(e){input.keydown(e.keyCode)});
    $(window).on("keyup", function(e){input.keyup(e.keyCode)});
}
