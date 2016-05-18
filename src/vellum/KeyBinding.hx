package vellum;

class KeyBinding {
	public var keyCode:KeyCode;
	public var type:KeyEventType;
	public var shift:Bool;
	public var alt:Bool;

	public var callback:Void->Void;

	public function new(keyCode:KeyCode, type:KeyEventType, ?shift:Bool, ?alt:Bool, callback:Void->Void) {
		this.keyCode = keyCode;
		this.type = type;
		this.shift = shift != null && shift;
		this.alt = alt != null && alt;
		this.callback = callback;
	}
}
