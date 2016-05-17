package vellum;

class Terminal {
	public var width(default, set):Int;
	public function set_width(w:Int):Int {
		// @todo: resize!
		return width = w;
	}

	public var height(default, set):Int;
	public function set_height(h:Int):Int {
		// @todo: resize!
		return height = h;
	}

	public function clear() {
		for(y in 0...height) {
			for(x in 0...width) {
				drawGlyph(x, y, Glyph.CLEAR);
			}
		}
	}

	public function writeAt(x:Int, y:Int, text:String, foreground:Colour = Colour.white, background:Colour = Colour.black) {
		for(i in 0...text.length) {
			if(x + i >= width) break;
			drawGlyph(x + i, y, new Glyph())
		}
	}

	public function drawGlyph(x:Int, y:Int, glyph:Glyph) {}
}
