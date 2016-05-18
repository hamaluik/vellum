package vellum;

using StringTools;

class Display {
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

		// initialize our glyphs
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

	public function print(x:Int, y:Int, text:String, ?foreground:Colour, ?background:Colour) {
		for(i in 0...text.length) {
			// @todo: investigate line wrapping{}
			if(x + i >= width) break;
			writeCharCode(x + i, y, text.fastCodeAt(i), foreground, background);
		}
	}

	/**
	 * @brief      Enter coloured text easily using escape codes
	 *
	 * To set the foreground, use the '@' character, to set the background
	 * use the '#' character. Then follow it by either an 'l' or 'd' to
	 * indicate light or dark variants (respectively). Then follow it with
	 * a colour character:
	 *
	 * * 'k': black
	 * * 'w': white
	 * * 'e' grey
	 * * 'r': red
	 * * 'o': orange
	 * * 'a': gold
	 * * 'y': yellow
	 * * 'g': green
	 * * 'q': aqua
	 * * 'b': blue
	 * * 'p': purple
	 * * 'n': brown
	 * * '_': reset to normal foreground / background.
	 *
	 * To escape the colour sequence and write a normal '@' or '#' symbol,
	 * double the symbol (to be like '@@' or '##').
	 *
	 * For example, to make red text on a black background following by
	 * white text on a dark green background, you could do this:
	 *
	 * ```haxe
	 * display.printColour(0, 0, '@r#kHello@_#_@w#dgworld!');
	 * ```
	 *
	 * Where the `@r#k` makes a red foreground on black background,
	 * `@_#_` resets to default colours, and `@w#dg` makes white text
	 * on a dark green background.
	 *
	 * @param      x           where to print the string horizontally
	 * @param      y           where to print the string vertically
	 * @param      text        The text
	 * @param      foreground  The default foreground colour
	 * @param      background  The default background colour
	 */
	public function printColoured(x:Int, y:Int, text:String, ?foreground:Colour, ?background:Colour) {
		var i:Int = 0;
		var charCount:Int = 0;

		var originalForeground:Colour = foreground;
		var originalBackground:Colour = background;

		if(foreground == null) foreground = Glyph.CLEAR_FOREGROUND;
		if(background == null) background = Glyph.CLEAR_BACKGROUND;

		// look for a colour escape char
		while(i < text.length) {
			if(text.charAt(i) == '@' || text.charAt(i) == '#') {
				var fore:Bool = text.charAt(i) == '@';
				i++;

				// allow double characters to escape
				if(text.charAt(i) == '@' || text.charAt(i) == '#') {
					break;
				}

				// determine if it is dark or light or a reset or normal
				var col:Colour;
				if(text.charAt(i) == 'l') {
					i++;
					col = switch(text.charAt(i)) {
						case 'k': Colour.DARKGREY;
						case 'w': Colour.WHITE;
						case 'e': Colour.LIGHTGREY;
						case 'r': Colour.LIGHTRED;
						case 'o': Colour.LIGHTORANGE;
						case 'a': Colour.LIGHTGOLD;
						case 'y': Colour.LIGHTYELLOW;
						case 'g': Colour.LIGHTGREEN;
						case 'q': Colour.LIGHTAQUA;
						case 'b': Colour.LIGHTBLUE;
						case 'p': Colour.LIGHTPURPLE;
						case 'n': Colour.LIGHTBROWN;
						default: fore ? originalForeground : originalBackground;
					};
				}
				else if(text.charAt(i) == 'd') {
					i++;
					col = switch(text.charAt(i)) {
						case 'k': Colour.BLACK;
						case 'w': Colour.LIGHTGREY;
						case 'e': Colour.DARKGREY;
						case 'r': Colour.DARKRED;
						case 'o': Colour.DARKORANGE;
						case 'a': Colour.DARKGOLD;
						case 'y': Colour.DARKYELLOW;
						case 'g': Colour.DARKGREEN;
						case 'q': Colour.DARKAQUA;
						case 'b': Colour.DARKBLUE;
						case 'p': Colour.DARKPURPLE;
						case 'n': Colour.DARKBROWN;
						default: fore ? originalForeground : originalBackground;
					};
				}
				else if(text.charAt(i) == '_') {
					col = fore ? originalForeground : originalBackground;
				}
				else {
					col = switch(text.charAt(i)) {
						case 'k': Colour.BLACK;
						case 'w': Colour.WHITE;
						case 'e': Colour.GREY;
						case 'r': Colour.RED;
						case 'o': Colour.ORANGE;
						case 'a': Colour.GOLD;
						case 'y': Colour.YELLOW;
						case 'g': Colour.GREEN;
						case 'q': Colour.AQUA;
						case 'b': Colour.BLUE;
						case 'p': Colour.PURPLE;
						case 'n': Colour.BROWN;
						default: fore ? originalForeground : originalBackground;
					};
				}
				i++;

				// assign the colour
				if(fore) foreground = col;
				else background = col;
			}
			else {
				if(x + charCount >= width) break;
				writeCharCode(x + charCount, y, text.fastCodeAt(i), foreground, background);
				i++;
				charCount++;
			}
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
