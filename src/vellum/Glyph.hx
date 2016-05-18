package vellum;

using StringTools;

class Glyph {
	public static var CLEAR_FOREGROUND:Colour = Colour.WHITE;
	public static var CLEAR_BACKGROUND:Colour = Colour.BLACK;

	public var code:Int;
	public var foreground(default, set):Colour;
	public function set_foreground(c:Colour):Colour {
		if(c == null) foreground = CLEAR_FOREGROUND;
		else foreground = c;
		return foreground;
	}

	public var background(default, set):Colour;
	public function set_background(c:Colour):Colour {
		if(c == null) background = CLEAR_BACKGROUND;
		else background = c;
		return background;
	}

	public function new(code:Int, ?foreground:Colour, ?background:Colour) {
		this.code = code;
		this.foreground = foreground;
		this.background = background;
	}

	public static function fromChar(char:String, ?foreground:Colour, ?background:Colour):Glyph {
		if(char.length < 1) {
			throw '_char_ **must** have at least 1 character!';
		}
		return new Glyph(char.fastCodeAt(0), foreground, background);
	}

	public function equals(other:Glyph):Bool {
		return this.code == other.code && this.foreground == other.foreground && this.background == other.background;
	}

	public function notEquals(other:Glyph):Bool {
		return this.code != other.code || this.foreground != other.foreground || this.background != other.background;
	}

	public function copy():Glyph {
		return new Glyph(this.code, this.foreground, this.background);
	}
}
