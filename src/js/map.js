Map = {};
Map.getMapList = function(){
    var list = {};
    for(var i in Map){
        if(i!="getMapList"){
            var obj = Map[i];
            list[(new obj(1)).getName()] = obj;
        }
    }
    return list;
}
Map.SimpleMap = function(len){
    var len = len;
    this.get = function(i){
        if(i>=len || i<0) throw new RangeError( "Map length is [0-"+(len-1)+"], but arguments is "+i );
        return 100;
    }
    this.getName = function(){return "SimpleMap"};
}
Map.SinMap = function(len){
    var len = len;
    var _map = new Array(len);
    for(i = 0;i<len;i++)
        _map[i] = ((i==0)?0:_map[i-1]) + Math.sin(i*0.01);
    this.get = function(i){
        if(i>=len || i<0) throw new RangeError( "Map length is [0-"+(len-1)+"], but arguments is "+i );
        return 100+0.5*_map[~~i];
    }
    this.getName = function(){return "SinMap"};
}

/* vim:set ts=4 sts=4 sw=4 tw=4: */
