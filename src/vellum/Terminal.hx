package vellum;

using StringTools;

class Terminal {
	var glyphs:Array<Array<Glyph>>;

	public var width(default, set):Int;
	@SuppressWarnings('checkstyle:InnerAssignment')
	public function set_width(w:Int):Int {
		// @todo: resize!
		return width = w;
	}

	public var height(default, set):Int;
	@SuppressWarnings('checkstyle:InnerAssignment')
	public function set_height(h:Int):Int {
		// @todo: resize!
		return height = h;
	}

	public function new(width:Int, height:Int) {
		this.width = width;
		this.height = height;
		glyphs = [];
		for(y in 0...height) {
			var row:Array<Glyph> = [];
			for(x in 0...width) {
				row.push(Glyph.fromChar(' '));
			}
			glyphs.push(row);
		}
	}

	public function clear(?clearGlyph:Glyph) {
		if(clearGlyph == null) clearGlyph = Glyph.fromChar(' ');
		for(y in 0...height) {
			for(x in 0...width) {
				writeGlyph(x, y, clearGlyph);
			}
		}
	}

	public function glyph(x:Int, y:Int):Glyph {
		if(x < 0) throw '_x_ must be >= 0!';
		if(y < 0) throw '_y_ must be >= 0!';
		if(x >= width) throw '_x_ must be < width = ${width}';
		if(y >= height) throw '_y_ must be < height = ${height}';
		return glyphs[y][x];
	}

	public function print(x:Int, y:Int, text:String, ?foreground, ?background) {
		for(i in 0...text.length) {
			// @todo: investigate line wrapping{}
			if(x + i >= width) break;
			writeCharCode(x + i, y, text.fastCodeAt(i), foreground, background);
		}
	}

	public function writeGlyph(x:Int, y:Int, glyph:Glyph) {
		writeCharCode(x, y, glyph.code, glyph.foreground, glyph.background);
	}

	public function writeCharCode(x:Int, y:Int, code:Int, ?foreground:Colour, ?background:Colour) {
		if(x < 0) throw '_x_ must be >= 0!';
		if(y < 0) throw '_y_ must be >= 0!';
		if(x >= width) throw '_x_ must be < width = ${width}';
		if(y >= height) throw '_y_ must be < height = ${height}';
		glyphs[y][x].code = code;
		glyphs[y][x].foreground = foreground;
		glyphs[y][x].background = background;
	}

	public function writeChar(x:Int, y:Int, char:String, ?foreground:Colour, ?background:Colour) {
		if(char.length < 1) throw '_char_ **must** have at least 1 character!';
		writeCharCode(x, y, char.fastCodeAt(0), foreground, background);
	}

	public function render() {}
}
