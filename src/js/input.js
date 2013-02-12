InputManager = function(){
    var self       = this;
    var nowInput   = {};
    var bitNumbers = [];

    var keyNames   = "KEY_BS KEY_ENTER KEY_SHIFT KEY_CTRL KEY_ALT KEY_SPACE KEY_LEFT KEY_UP KEY_RIGHT KEY_DOWN".split(/ /);
    var keyNumbers = [8,     13,       16,       17,      18,     32,       37,      38,    39,       40];

    for (var i in keyNames)
    {
        nowInput[keyNames[i]]     = 0;
        bitNumbers[keyNumbers[i]] = i
    }

    var inputbit = 0;

    this.keydown = function(i){
        inputbit |= 1 << bitNumbers[i];
    }
    this.keyup = function(i){
        inputbit &= ~(1 << bitNumbers[i]);
    }
    this.getframes = function(type){
        if (type === null) 
            throw new Error("type must not be null");
        if (typeof type == 'undefined') 
            throw new Error("type must not be undefined");
        if (typeof type == 'boolean') 
            throw new Error("type must not be boolean");
        if (typeof type == 'number') 
            throw new Error("Not Implemented");

        if (typeof type == 'string') 
            return nowInput[type];
    }
    this.ispushed = function(type){
        return this.getframes(type) > 0;
    }
    this.update  = function(){
        for(var i = 0; i < keyNumbers.length ; i++ )
        {
            if(inputbit & 1 << bitNumbers[keyNumbers[i]])
            {
                nowInput[keyNames[i]]++;
            }else{
                nowInput[keyNames[i]] = 0;
            }
        }
        
    }
    $(window).on("keydown", function(e){ self.keydown(e.keyCode)});
    $(window).on("keyup",   function(e){ self.keyup(e.keyCode)  });
}
