import js.Browser;
import js.html.Console;

import vellum.CanvasTerminal;

class Example {
	static var term:CanvasTerminal;
	static var x:Bool = true;

	public static function main() {
		term = new CanvasTerminal(80, 25, vellum.Font.Menlo());
		term.print(0, 0, 'Hello world!');
		term.render();

		js.Browser.window.setInterval(refresh, 500);
	}

	public static function refresh() {
		term.print(0, 1, x ? '█' : ' ');
		term.render();
		x = !x;
	}
}
