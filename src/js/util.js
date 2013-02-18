Util = function(){};
Util.Random = function()
{
    var x = 123456789;
    var y = 362436069;
    var z = 521288629;
    var seed = arguments.length==0?88675123:arguments[0];
    this.rand = function(){
        var tmp;
        tmp = x ^ (x << 11);
        x = y;
        y = z;
        z = seed;
        seed = (seed^(seed>>>19))^(tmp^(tmp>>>8))
            return seed >>>0;
    }
    this.getseed = function(){
        return [x, y, z, seed];
    }
    return this;
}
/* vim:set ts=4 sts=4 sw=4 tw=4: */
