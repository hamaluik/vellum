import js.Browser;
import js.html.Console;

import vellum.CanvasTerminal;
import vellum.KeyBinding;
import vellum.KeyEventType;
import vellum.KeyCode;

class Example {
	static var term:CanvasTerminal;
	static var x:Bool = true;

	static var w1:BorderedWindow;
	static var w2:BorderedWindow;

	public static function main() {
		term = new CanvasTerminal(80, 25, vellum.Font.Menlo());

		term.pushWindow(0, 0, 20, 1).print(0, 0, 'Some windows:');

		w1 = new BorderedWindow(2, 2, 1, 30, 5);
		w1.print(1, 1, 'Hello world!');
		term.addWindow(w1);

		w2 = new BorderedWindow(18, 4, 2, 31, 10);
		w2.print(1, 1, 'I\'m on top!');
		w2.print(1, 2, 'Move me randomly with [SPACE]');
		w2.bindKey(new KeyBinding(KeyCode.space, KeyEventType.PRESSED, function() {
			w2.x = randomInt(0, 49);
			w2.y = randomInt(0, 15);
			term.clear();
			term.render();
		}));
		term.addWindow(w2);

		js.Browser.window.setInterval(refresh, 500);
	}

	public static inline function randomInt(from:Int, to:Int):Int {
		return from + Math.floor(((to - from + 1) * Math.random()));
	}

	public static function refresh() {
		w1.print(1, 2, x ? '█' : ' ');
		term.render();
		x = !x;
	}
}
