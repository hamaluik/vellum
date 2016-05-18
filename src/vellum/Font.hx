package vellum;

class Font {
	public var family:String;
	public var size:Int;
	public var charWidth:Int;
	public var lineHeight:Int;
	public var x:Int;
	public var y:Int;

	public function new(family:String, size:Int, charWidth:Int, lineHeight:Int, x:Int, y:Int) {
		this.family = family;
		this.size = size;
		this.charWidth = charWidth;
		this.lineHeight = lineHeight;
		this.x = x;
		this.y = y;
	}

	@SuppressWarnings('checkstyle:MagicNumber', 'checkstyle:MethodName')
	public static function Courier():Font {
		return new Font('Courier', 12, 8, 14, 1, 10);
	}

	@SuppressWarnings('checkstyle:MagicNumber', 'checkstyle:MethodName')
	public static function Menlo():Font {
		return new Font('Menlo, Consolas', 12, 9, 14, 1, 11);
	}
}
