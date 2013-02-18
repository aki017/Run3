/**
 * Spec for InputManager
 * getframes: frame count(if the key is not pushed it is 0)
 * ispushed: if it is pushed, it is true
 *
 * keydown + update
 ** getframes(...) == 1
 ** ispushed(...) == true
 *
 * keydown
 ** getframes(...) == 0
 ** ispushed(...) == true
 *
 * keydown + n updates
 ** getframes(...) == n
 ** ispushed(...) == true
 *
 * keyup
 ** getframes(...) == 0
 ** ispushed(...) = false
 */
describe("InputManager", function(){
    input = new InputManager();

    tester = function(keycode, n){
        // keydown test
        input.keydown(keycode);

        var i;
        for (i = 0; i < n; i++){
            input.update();
        }

        var push_frames = input.getframes(keycode);
        var push_pushed = input.ispushed(keycode);

        it("push: getframes == " + n, function(){
            expect(push_frames).toBe(n);
        });
        it("push: ispushed == true", function(){
            expect(push_pushed).toBe(true);
        });

        // keyup test
        input.keyup(keycode);

        var up_frames = input.getframes(keycode);
        var up_pushed = input.ispushed(keycode);

        it("up: getframes == 0", function(){
            expect(up_frames).toBe(0);
        });
        it("up: ispushed == false", function(){
            expect(up_pushed).toBe(false);
        });
    }

    // first time using test
    // keydown + update test
    tester(KEY_BS, 1);

    // second time using test
    // keydown only
    tester(KEY_BS, 0);

    // third time using test
    // keydown + 100 update test
    tester(KEY_BS, 100);
});

/* vim:set ts=4 sts=4 sw=4 tw=4: */
