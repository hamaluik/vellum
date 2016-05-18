package vellum;

class Window extends Display {
	public var x:Int;
	public var y:Int;
	public var z:Int;

	var keyBindings:Array<KeyBinding>;

	public function new(x:Int, y:Int, z:Int, width:Int, height:Int) {
		keyBindings = [];
		this.x = x;
		this.y = y;
		this.z = z;
		super(width, height);
	}

	public function bindKey(binding:KeyBinding) {
		keyBindings.push(binding);
	}

	public function unBindKey(binding:KeyBinding) {
		keyBindings.remove(binding);
	}

	public function handleKeys(keyCode:KeyCode, type:KeyEventType, shift:Bool, alt:Bool):Bool {
		var handled:Bool = false;
		for(b in keyBindings) {
			if(b.keyCode == keyCode && b.type == type && b.shift == shift && b.alt == alt) {
				b.callback();
				handled = true;
			}
		}
		return handled;
	}
}
