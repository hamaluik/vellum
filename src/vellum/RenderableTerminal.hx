package vellum;

class RenderableTerminal extends Terminal {
	var oldGlyphs:Array<Array<Glyph>>;

	public function new(width:Int, height:Int) {
		super(width, height);
		oldGlyphs = [];
		for(y in 0...height) {
			var row:Array<Glyph> = [];
			for(x in 0...width) {
				row.push(glyphs[y][x].copy());
			}
			oldGlyphs.push(row);
		}
	}

	override public function render() {
		// render the windows into the terminal's display
		super.render();

		// calculate the change in glyphs
		// so that we only draw changes
		for(y in 0...height) {
			for(x in 0...width) {
				if(glyphs[y][x].notEquals(oldGlyphs[y][x])) {
					// yup! it's dirty!
					// redraw it
					drawGlyph(x, y, glyphs[y][x]);

					// remember the last state
					oldGlyphs[y][x].code = glyphs[y][x].code;
					oldGlyphs[y][x].foreground = glyphs[y][x].foreground;
					oldGlyphs[y][x].background = glyphs[y][x].background;
				}
			}
		}
	}

	public function drawGlyph(x:Int, y:Int, glyph:Glyph) {}
}
