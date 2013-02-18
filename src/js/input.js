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
    var self       = this;
    var nowInput   = {};
    var bitNumbers = [];

    var keyNumbers   = [KEY_BS, KEY_ENTER, KEY_SHIFT, KEY_CTRL, KEY_ALT, KEY_SPACE, KEY_LEFT, KEY_UP, KEY_RIGHT, KEY_DOWN];

    for (var i in keyNumbers)
    {
        nowInput[keyNumbers[i]]   = 0;
        bitNumbers[keyNumbers[i]] = i
    }

    var inputbit = 0;

    this.keydown = function(i){
        inputbit |= 1 << bitNumbers[i];
    }
    this.keyup = function(i){
        inputbit &= ~(1 << bitNumbers[i]);
        nowInput[i] = 0;
    }
    this.getframes = function(type){
        if (type === null) 
            throw new Error("type must not be null");
        if (typeof type != 'number')
            throw new Error("type must be number");

        return nowInput[type];
    }
    this.ispushed = function(type){
        return (inputbit & 1 << bitNumbers[type]) != 0;
    }
    this.update  = function(){
        for(var i = 0; i < keyNumbers.length ; i++ )
        {
            if(inputbit & 1 << bitNumbers[keyNumbers[i]])
            {
                nowInput[keyNumbers[i]]++;
            }else{
                nowInput[keyNumbers[i]] = 0;
            }
        }
    }
    $(window).on("keydown", function(e){ self.keydown(e.keyCode)});
    $(window).on("keyup",   function(e){ self.keyup(e.keyCode)  });
}
/* vim:set ts=4 sts=4 sw=4 tw=4: */
