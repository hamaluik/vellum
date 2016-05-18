package vellum;

class Window extends Display {
	public var x:Int;
	public var y:Int;
	public var z:Int;

	public function new(x:Int, y:Int, z:Int, width:Int, height:Int) {
		this.x = x;
		this.y = y;
		this.z = z;
		super(width, height);
	}
}
