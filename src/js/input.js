InputManager = function(){
    var keyCodePair = {};
    var nowInput    = {};
    var bitNumber   = [];

    var keyNames    = "KEY_BS KEY_ENTER KEY_SHIFT KEY_CTRL KEY_ALT KEY_SPACE KEY_LEFT KEY_UP KEY_RIGHT KEY_DOWN".split(/ /);
    var keyNumber   = [8, 13, 16, 17, 18, 32, 37, 38, 39, 40];

    for (var i in keyNames)
    {
        keyCodePair[keyNames[i]] = keyNumber[i];
        nowInput[keyNames[i]]    = 0;
        bitNumber[keyNumber[i]]  = i
    }

    var inputbit = 0;
    this.keydown = function(i){
        inputbit |= 1 << bitNumber[i];
    }
    this.keyup   = function(i){
        inputbit &= ~(1 << bitNumber[i]);
    }
    this.getkey  = function(){ return nowInput; }
    this.update  = function(){
        for(var i = 0; i < keyNumber.length ; i++ )
        {
            if(inputbit & 1 << bitNumber[keyNumber[i]])
            {
                nowInput[keyNumber[i]]++;
            }else{
                nowInput[keyNumber[i]]=0;
            }
        }
    }
    $(window).on("keydown", function(e){input.keydown(e.keyCode)});
    $(window).on("keyup", function(e){input.keyup(e.keyCode)});
}
