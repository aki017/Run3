//重いのでテストしない
xdescribe("Util", function() {
    describe("Random", function() {
        var rnd = Util.Random();
        var i;
        var max=0, min=100000000;
        for(i=0;i<(1<<25);i++){
            var tmp = rnd.rand();
            if(tmp>max)max=tmp;
            if(tmp<min)min=tmp;
        }
        it("min<1000", function() {
            expect(min<1000).toBe(true);
        });
        it("max>2**32-1000", function() {
            expect(max>4294967296-1000).toBe(true);
        });
    });
    describe("Math.Random", function() {
        var i;
        var max=0, min=100000000;
        for(i=0;i<(1<<25);i++){
            var tmp = 4294967296*Math.random();
            if(tmp>max)max=tmp;
            if(tmp<min)min=tmp;
        }
        it("min<1000", function() {
            expect(min<1000).toBe(true);
        });
        it("max>2**32-1000", function() {
            expect(max>4294967296-1000).toBe(true);
        });
    });
})
/* vim:set ts=4 sts=4 sw=4 tw=4: */
