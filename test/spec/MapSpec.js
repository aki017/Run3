/**
 * Spec for Map 
 */
Map = function(len){
    var len = len;
    this.get = function(i){
        if(i>=len || i<0) throw new RangeError( "Map length is [0-"+(len-1)+"], but arguments is "+i );
        return 1;
    }
    this.getName = function(){return "testMap"};
}
describe("Map", function(){
    var MapList = {
        "testMap" : Map
    }

    tester = function(MAP, len, name){
        var map  = new MAP(len);
        var map2 = new MAP(len);

        describe(name + "("+len+")", function(){
            it("getName is return String" , function(){
                expect(typeof map.getName()).toBe(typeof "string");
            });
            it("getName is return sameName" , function(){
                expect(map.getName()).toMatch(name);
            });

            describe("get", function(){
                it("is return number" , function(){
                    expect(typeof map.get(0)).toBe(typeof 0);
                });
                it("is always return same number" , function(){
                    expect(map.get(0)).toBe(map.get(0));
                });
                it("is throwing Error" , function(){
                    expect(function(){ map.get(len) }).toThrow();
                });
                it("is throwing Error" , function(){
                    expect(function(){ map.get(-1) }).toThrow();
                });
            });
        });
    }

    for (var keyString in MapList){
        tester(MapList[keyString], 1, keyString);
        tester(MapList[keyString], 10000, keyString);
    }
});

/* vim:set ts=4 sts=4 sw=4 tw=4: */
