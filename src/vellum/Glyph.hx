package vellum;

class Glyph {
	public static var CLEAR_FOREGROUND:Colour = Colour.WHITE;
	public static var CLEAR_BACKGROUND:Colour = Colour.BLACK;

	public var code:Int;
	public var foreground:Colour;
	public var background:Colour;

	public function new(code:Int, ?foreground:Colour, ?background:Colour) {
		this.code = code;
		this.foreground = foreground != null ? foreground : CLEAR_FOREGROUND;
		this.background = background != null ? background : CLEAR_BACKGROUND;
	}

	public static function fromChar(char:String, ?foreground:Colour, ?background:Colour):Glyph {
		if(char.length < 1) {
			throw '_char_ **must** have at least 1 character!';
		}
		return new Glyph(char.charCodeAt(0), foreground, background);
	}

	public function equals(other:Glyph):Bool {
		return this.code == other.code && this.foreground == other.foreground && this.background == other.background;
	}

	public function notEquals(other:Glyph):Bool {
		return this.code != other.code || this.foreground != other.foreground || this.background != other.background;
	}
}
