package vellum;

class Terminal extends Display {
	var windows:Array<Window>;

	public var handlingInput(default, set):Bool;
	public function set_handlingInput(x:Bool):Bool {
		handlingInput = x;
		return handlingInput;
	}

	public function new(width:Int, height:Int) {
		windows = [];
		super(width, height);
	}

	public function sortWindows() {
		// sort the windows based on depth
		windows.sort(function(wa:Window, wb:Window):Int {
			return wa.z - wb.z;
		});
	}

	public function addWindow(window:Window) {
		windows.push(window);
		sortWindows();
	}

	public function removeWindow(window:Window) {
		windows.remove(window);
		sortWindows();
	}

	public function pushWindow(x:Int, y:Int, width:Int, height:Int):Window {
		var z:Int = 0;
		if(windows.length > 0) z = windows[windows.length - 1].z + 1;
		var window:Window = new Window(x, y, z, width, height);
		windows.push(window);
		return window;
	}

	public function popWindow():Null<Window> {
		return windows.pop();
	}

	public function getWindow(index:Int):Null<Window> {
		if(index < 0 || index >= windows.length) return null;
		return windows[index];
	}

	override public function render() {
		// copy the glyphs (the windows should always be sorted based on depth)
		for(w in windows) {
			// render the window
			w.render();

			// now place it
			for(wy in 0...w.height) {
				for(wx in 0...w.width) {
					var tx:Int = w.x + wx;
					var ty:Int = w.y + wy;

					// ensure bounds
					// (fail silently if out of them)
					if(tx < 0 || ty < 0 || tx >= width || ty >= height) continue;

					// and write the glyph!
					writeGlyph(tx, ty, w.glyphs[wy][wx]);
				}
			}
		}
	}
}
