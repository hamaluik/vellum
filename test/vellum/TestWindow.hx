package vellum;

import buddy.*;
using buddy.Should;

import vellum.Window;
import vellum.KeyCode;
import vellum.KeyBinding;

class TestWindow extends BuddySuite {
	public function new() {
		describe('Using Windows', {
			var w:Window;
			beforeEach({
				w = new Window(0, 0, 0, 80, 25);
			});
			afterEach({
				w = null;
			});

			it('should allow you to subscribe and unsubscribe to key input events', {
				var spacePressed:Bool = false;
				var b:KeyBinding = new KeyBinding(KeyCode.space, KeyEventType.PRESSED, function() {
					spacePressed = true;
				});
				w.bindKey(b);

				w.handleKeys(KeyCode.a, KeyEventType.PRESSED, false, false);
				spacePressed.should.be(false);

				w.handleKeys(KeyCode.space, KeyEventType.PRESSED, false, false);
				spacePressed.should.be(true);

				spacePressed = false;
				w.unBindKey(b);
				w.handleKeys(KeyCode.space, KeyEventType.PRESSED, false, false);
				spacePressed.should.be(false);
			});
			it('should properly deal with alt + shift modifiers', {
				var spacePressed:Bool = false;
				var b:KeyBinding = new KeyBinding(KeyCode.space, KeyEventType.PRESSED, true, false, function() {
					spacePressed = true;
				});
				w.bindKey(b);

				w.handleKeys(KeyCode.space, KeyEventType.PRESSED, false, false);
				spacePressed.should.be(false);

				w.handleKeys(KeyCode.space, KeyEventType.PRESSED, false, true);
				spacePressed.should.be(false);

				w.handleKeys(KeyCode.space, KeyEventType.PRESSED, true, true);
				spacePressed.should.be(false);

				w.handleKeys(KeyCode.space, KeyEventType.PRESSED, true, false);
				spacePressed.should.be(true);
			});
		});
	}
}
