import js.Browser;
import js.html.Console;

import vellum.CanvasTerminal;

class Example {
	static var term:CanvasTerminal;
	static var x:Bool = true;

	static var w1:BorderedWindow;
	static var w2:BorderedWindow;

	public static function main() {
		term = new CanvasTerminal(80, 25, vellum.Font.Menlo());
		term.print(0, 0, 'Some windows:');

		w1 = new BorderedWindow(2, 2, 0, 30, 5);
		w1.print(1, 1, 'Hello world!');
		term.addWindow(w1);

		w2 = new BorderedWindow(18, 4, 1, 20, 10);
		w2.print(1, 1, 'I\'m on top!');
		term.addWindow(w2);

		js.Browser.window.setInterval(refresh, 500);
	}

	public static function refresh() {
		w1.print(1, 2, x ? '█' : ' ');
		term.render();
		x = !x;
	}
}
