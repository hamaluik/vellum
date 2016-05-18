import vellum.Window;
import vellum.Colour;

class BorderedWindow extends Window {
	override public function render() {
		for(i in 1...(width - 1)) {
			writeChar(i, 0, '═', Colour.GREY);
			writeChar(i, height - 1, '═', Colour.GREY);
		}
		for(j in 1...(height - 1)) {
			writeChar(0, j, '║', Colour.GREY);
			writeChar(width - 1, j, '║', Colour.GREY);
		}
		writeChar(0, 0, '╔', Colour.GREY);
		writeChar(width - 1, 0, '╗', Colour.GREY);
		writeChar(width - 1, height - 1, '╝', Colour.GREY);
		writeChar(0, height - 1, '╚', Colour.GREY);
	}
}
